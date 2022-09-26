import { Department } from "@prisma/client";
import { Cluster } from "puppeteer-cluster";
import { AppError } from "../shared/errors/AppError";

interface IDepartment {
  name: string | null;
  value: string;
}

interface ICourse {
  name: string;
  code: string;
  department: string;
  semester: string;
  teacher: string;
  classroom: string;
  location: string;
  schedule: string[];
  simplifiedSchedule: string[];
}

export async function getCourses(departments: Department[], url: string) {
  console.log("Achou " + departments.length + " departamentos");
  const courses: ICourse[] = [];

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 5,
  });

  await cluster.task(async ({ page, data }) => {
    await page.goto(url);

    console.log("Procurando em: " + data.name);

    await page.select("select[id='formTurma:inputDepto']", data.value);
    await page.click("[type='submit']");

    await page.waitForSelector("div[id='rodape']");

    const table = await page.$$(".listagem > tbody > tr");

    const departmentCourses = [];

    for (const row of table) {
      const course = {
        name: "unavailable",
        code: "unavailable",
        department: data.name,
        semester: "unavailable",
        teacher: "unavailable",
        classroom: "unavailable",
        location: "unavailable",
        schedule: ["unavailable"],
        simplifiedSchedule: ["unavailable"],
      };

      course.name = await row.$$eval("span.tituloDisciplina", (el: any) =>
        el.map((td: any) => td.textContent)
      );

      course.classroom = await row.$$eval("td.turma", (el: any) =>
        el.map((td: any) => td.textContent)
      );

      course.semester = await row.$$eval("td.anoPeriodo", (el: any) =>
        el.map((td: any) => td.textContent)
      );

      course.teacher = await row.$$eval("td.nome", (el: any) =>
        el.map((td: any) => td.textContent)
      );

      course.location = await row.$$eval("td[nowrap=nowrap]", (el: any) =>
        el.map((td: any) => td.textContent)
      );

      course.schedule = await row.$$eval("div.popUp", (el: any) =>
        el.map((td: any) => td.textContent)
      );

      departmentCourses.push(course);
    }

    courses.push(...departmentCourses);
  });

  for (const department of departments) {
    cluster.queue(department);
  }

  await cluster.idle();
  await cluster.close();

  // Pegar último nome da matéria, pois a matéria é uma linha separada
  courses.forEach((course, index) => {
    if (course.name.length === 0) {
      course.name = courses[index - 1].name;
    }
  });

  const filteredCourses = courses.map((course) => {
    if (course.teacher.length > 0) {
      // Data treatment
      const fullName = course.name;

      course.name = fullName
        .toString()
        .split(" - ")
        .splice(1, fullName.toString().split(" - ").length - 1)
        .join(" - ");

      course.code = fullName.toString().split(" - ")[0];

      if (course.schedule.length > 0) {
        course.schedule = course.schedule[0]
          .replace(/(\t\n|\n|\t)/gm, "")
          .trim()
          .split(/(?=[A-Z])/);

        const simplifiedSchedule: string[] = [];

        if (course.schedule[0].length > 0) {
          course.schedule.forEach(schedule => {
            const day = schedule.split(' ')[0];
            let start = schedule.split(' ')[1];
            let end = schedule.split(' ')[3];

            start = `${start.split(':')[0]}:00`;
            end = `${end.split(':')[0]}:00`;

            simplifiedSchedule.push(`${day} ${start}`);
            simplifiedSchedule.push(`${day} ${end}`);
          })

          course.simplifiedSchedule = simplifiedSchedule;
        }
      }

      course.semester = course.semester.toString().trim();
      course.teacher = course.teacher.toString().trim();
      course.classroom = course.classroom.toString().trim();
      course.location = course.location.toString().trim();

      return course;
    }
  });

  return filteredCourses.filter((course) => course !== undefined);
}

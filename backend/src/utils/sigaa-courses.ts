export interface IDepartment {
  name: string;
  value: number;
}

export const scrapeCourses = async (
  department: IDepartment,
  page: any,
  url: String,
  initials: String
) => {
  await page.goto(url);

  await page.select('select[id="formTurma:inputDepto"]', department.value);
  await page.click("[type='submit']");

  await page.waitForSelector("caption", { visible: true });
  await page.waitForTimeout(1000);

  const table = await page.$$("table > tbody > tr");
  // Jump first table, because it's related to the other options
  table.shift();

  const disciplines: object[] = [];

  for (const row of table) {
    const course = {
      university: initials,
      department: department.name,
      code: "unavailable",
      name: "unavailable",
      classroom: "unavailable",
      period: "unavailable",
      teacher: "unavailable",
      schedule: [],
      simplifiedSchedule: [],
      offers: 0,
      occupied: 0,
      location: "unavailable",
    };

    /* Use a bunch of trycatch, because not all info is available for every discipline, and we don't need to do anything if we catch any errors */

    try {
      course.name = await page.evaluate(
        (el: any) => el.querySelector("span.tituloDisciplina").textContent,
        row
      );
    } catch (error) {}

    try {
      course.teacher = await page.evaluate(
        (el: any) => el.querySelector("td.nome").textContent,
        row
      );
    } catch (error) {}

    try {
      course.classroom = await page.evaluate(
        (el: any) => el.querySelector("td.turma").textContent,
        row
      );

      if (course.classroom.length > 0) {
        course.classroom = course.classroom.trim();
      }
    } catch (error) {}

    try {
      course.period = await page.evaluate(
        (el: any) => el.querySelector("td.anoPeriodo").textContent,
        row
      );
    } catch (error) {}

    try {
      course.location = await page.evaluate(
        (el: any) => el.querySelector("td[nowrap=nowrap]").textContent.trim(),
        row
      );
    } catch (error) {}

    try {
      course.schedule = await page.evaluate(
        (el: any) => el.querySelector("div.popUp").textContent,
        row
      );

      course.schedule = (course.schedule as any)
        .replace(/(\t\n|\n|\t)/gm, "")
        .trim()
        .split(/(?=[A-Z])/);

      course.simplifiedSchedule = (course.schedule as any).map(
        (schedule: string) => {
          const daySchedule = schedule.split("às");
          let first = daySchedule[0].trim();
          let second = `${first.split(" ")[0]} ${daySchedule[1].trim()}`;

          first = `${first.split(":")[0]}:${first
            .split(":")[1]
            .replace(first.split(":")[1][0], "0")}`;

          second = `${second.split(":")[0]}:${second
            .split(":")[1]
            .replace(second.split(":")[1][0], "0")}`;

          return [first, second];
        }
      );
    } catch (error) {}

    try {
      const offers = await page.evaluate(
        (el: any) =>
          Array.from(el.querySelectorAll("td[style]")).map(
            // @ts-ignore
            (elem) => (elem.textContent ? elem.textContent : "unavailable")
          ) /* Ignore TypeScript because textElement's type is being overwritten */,
        row
      );

      if (offers.length > 0) {
        course.offers = offers[0];
        course.occupied = offers[1];
      }
    } catch (error) {}

    if (course.name == "unavailable") {
      const lastCourse = disciplines[disciplines.length - 1];

      try {
        course.name = (lastCourse as any).name;
        disciplines.push(course);
      } catch (error) {}
    } else {
      disciplines.push(course);
    }
  }

  disciplines.forEach((discipline: any) => {
    if (discipline.teacher !== "unavailable") {
      discipline.code = discipline.name.split("-")[0].trim();
      discipline.name = discipline.name.split("-")[1].trim();
      
      console.log(discipline);
    }
  });
};

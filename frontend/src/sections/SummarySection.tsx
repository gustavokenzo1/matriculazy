import { useEffect } from "react";
import { ICourse } from "./TeachersSection";

interface SummaryProps {
  occupied: String[];
  fixedCourses: ICourse[];
  selectedCourses: string[];
  courses: ICourse[];
}

function SummarySection({
  occupied,
  fixedCourses,
  selectedCourses,
  courses,
}: SummaryProps) {
  function simplifySchedule(schedule: string[]) {
    return schedule.map((day) => {
      const daySchedule = day.split("às");
      let first = daySchedule[0].trim();
      let second = `${first.split(" ")[0]} ${daySchedule[1].trim()}`;

      first = `${first.split(":")[0].split(" ")[0]} às ${
        first.split(":")[0].split(" ")[1]
      }:${first.split(":")[1].replace(first.split(":")[1][0], "0")}`;

      second = `${second.split(":")[0].split(" ")[0]} às ${
        second.split(":")[0].split(" ")[1]
      }:${second.split(":")[1].replace(second.split(":")[1][0], "0")}`;

      return [first, second];
    });
  }

  function handleGenerate() {
    // 1: Reformatar horários e resumir
    const formatedFixedCourses = fixedCourses.map((course) => {
      course.simplifiedSchedule = simplifySchedule(course.schedule);

      return [course];
    });

    // 2: Retirar fixedCourses de selectedCourses
    const filteredSelectedCourses = selectedCourses.filter(
      (course) => !fixedCourses.map((c) => c.name).includes(course)
    );

    // 3: Pegar as informações de selectedCourses
    const selectedCoursesInfo = filteredSelectedCourses.map((course) => {
      const matches = courses.filter((c) => c.name === course);
      matches.forEach((match) => {
        match.simplifiedSchedule = simplifySchedule(match.schedule);
      });

      return matches;
    });

    // 4: Juntar fixedCourses e selectedCoursesInfo
    const allCourses = [...formatedFixedCourses, ...selectedCoursesInfo];

    // 5: Realizar todas as combinações entre allCourses
    // Thank you, StackOverflow!
    function recursion(args: Array<Array<object>>) {
      let onePossibleSchedule: any[] = [];
      let max = args.length - 1;

      function helper(arr: Array<object>, i: number) {
        if (args[i]) {
          for (let j = 0; j < args[i].length; j++) {
            let array_copy = arr.slice(0);
            array_copy.push(args[i][j]);
            if (i == max) onePossibleSchedule.push(array_copy);
            else helper(array_copy, i + 1);
          }
        }
      }
      helper([], 0);
      return onePossibleSchedule;
    }

    const allPossibleSchedules = recursion(allCourses);

    // 6: Remover conflitos de horários
    const results = allPossibleSchedules.map((timetable) => {
      const schedules: string[] = [];

      timetable.forEach((course: ICourse) => {
        course.simplifiedSchedule.forEach((schedule) => {
          schedules.push(...schedule);
        });
      });

      const uniqueSchedules = [...new Set(schedules)];

      if (uniqueSchedules.length === schedules.length) {
        return timetable;
      }
    });

    // 7: Remover undefined
    const finalResults = results.filter((timetable) => timetable !== undefined);

    console.log(finalResults);
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-6xl text-stone-800 dark:text-stone-200 mt-8 mb-10 font-bold">
        Resumo
      </h1>
      <h2 className="text-2xl text-stone-800 dark:text-stone-200 font-bold mt-10">
        Horários ocupados:
      </h2>
      {occupied.length !== 0 ? (
        <ul className="text-xl text-stone-800 dark:text-stone-200 mt-4">
          {occupied.map((o) => (
            <li className="mt-2">{o}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-stone-800 dark:text-stone-200 mt-2">
          Nenhum horário ocupado
        </p>
      )}
      <h2 className="text-2xl text-stone-800 dark:text-stone-200 font-bold mt-10">
        Cursos selecionados:
      </h2>
      {selectedCourses.length !== 0 ? (
        <ul className="text-xl text-stone-800 dark:text-stone-200 mt-4">
          {selectedCourses.map((s) => (
            <li className="mt-2">{s}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-stone-800 dark:text-stone-200 mt-2">
          Nenhum curso selecionado
        </p>
      )}
      <h2 className="text-2xl text-stone-800 dark:text-stone-200 font-bold mt-10">
        Cursos fixados por você:
      </h2>
      {fixedCourses.length !== 0 ? (
        <ul className="text-xl text-stone-800 dark:text-stone-200 mt-4">
          {fixedCourses.map((f) => (
            <li className="mt-2">{f.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-stone-800 dark:text-stone-200 mt-2">
          Nenhum curso fixado
        </p>
      )}
      <button
        className="focus:outline-none self-center focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold border-stone-800 dark:border-stone-200  border-[1px] rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all mt-16"
        onClick={handleGenerate}
      >
        GERAR GRADE HORÁRIA
      </button>
    </div>
  );
}

export default SummarySection;

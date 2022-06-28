import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { days, hours } from "../components/Calendar";

interface Course {
  classroom: string;
  code: string;
  createdAt: string;
  department: string;
  id: string;
  location: string;
  name: string;
  occupied: number;
  offers: number;
  period: string;
  schedule: string[];
  simplifiedSchedule: string[][];
  teacher: string;
  university: string;
  updatedAt: string;
}

interface IDay {
  index: number;
  hour: String;
  timetable: Course[];
}

function Day({ hour, index, timetable }: IDay) {
  const time = `${days[index + 1]} às ${hour}`;
  const courseMatches = timetable.filter((course) =>
    course.simplifiedSchedule.some(
      ([first, second]) => first.includes(time) || second.includes(time)
    )
  );

  return (
    <td className="border-b text-center border-slate-200 dark:border-slate-700 p-2 md:p-4 pl-6 md:pl-8 text-stone-800 dark:text-slate-400">
      {courseMatches.map((course) => (
        <div key={course.id} className="text-sm dark:text-stone-200 py-4">
          <span>{course.name}</span> <br />
          <span>{course.teacher}</span>
        </div>
      ))}
    </td>
  );
}

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  // @ts-ignore
  const timetables = location.state.timetables;

  const [currentTimetable, setCurrentTimetable] = useState<Course[]>(
    timetables[0]
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!timetables) {
      navigate("/");
    }
  }, []);

  function handleChangeTimetable(action: string) {
    if (action === "next" && currentIndex <= timetables.length) {
      setCurrentIndex(currentIndex + 1);
      setCurrentTimetable(timetables[currentIndex + 1]);
    } else if (action === "prev" && currentIndex >= 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentTimetable(timetables[currentIndex - 1]);
    }
  }

  return (
    <div className="flex flex-col items-center p-20 dark:bg-stone-900 transition-all">
      <h1 className="text-6xl text-stone-800 dark:text-stone-200 mt-8 mb-10 font-bold">
        Resultado
      </h1>
      <div className="w-1/2 flex justify-around my-10 items-center">
        <button
          className="border border-stone-800 hover:bg-stone-800 hover:text-stone-200 transition-colors text-stone-800 dark:text-stone-200 dark:border-stone-200 dark:hover:bg-stone-200 dark:hover:text-stone-800 py-2 px-4 rounded"
          onClick={() => handleChangeTimetable("prev")}
        >
          Anterior
        </button>
        <span className="text-stone-800 dark:text-stone-200">
          {currentIndex + 1} / {timetables.length}
        </span>
        <button
          className="border border-stone-800 hover:bg-stone-800 hover:text-stone-200 transition-colors text-stone-800 dark:text-stone-200 dark:border-stone-200 dark:hover:bg-stone-200 dark:hover:text-stone-800 py-2 px-4 rounded"
          onClick={() => handleChangeTimetable("next")}
        >
          Próximo
        </button>
      </div>
      <div></div>
      <table>
        <thead>
          <tr>
            {days.map((day, index) => (
              <th
                className="border-b text-center border-stone-800 dark:border-stone-200 font-medium p-0 md:p-4 pl-2 md:pl-8 pt-0 pb-0 md:pb-3 text-stone-800 dark:text-white"
                key={`${day}`}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, index) => (
            <tr key={`${hour}`}>
              <td className="border-b border-slate-200 dark:border-slate-700 p-2 md:p-4 pl-4 md:pl-8 text-slate-800  dark:text-slate-200">
                {hour}
              </td>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <Day
                    index={index}
                    hour={hour}
                    key={`${days[index + 1]} às ${hour}`}
                    timetable={currentTimetable}
                  />
                ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="grid grid-cols-2 gap-16 mt-20">
        {currentTimetable.map((course) => {
          return (
            <div className="flex flex-col">
              <span className="text-xl">
                <strong>
                  {course.name} - {course.code}
                </strong>
              </span>
              <span className="text-lg mb-4">
                <strong>{course.department}</strong>
              </span>
              <span>
                <strong>Turma: </strong>
                {course.classroom}
              </span>
              <span>
                <strong>Professor(a): </strong>
                {course.teacher}
              </span>
              <span>
                <strong>Local: </strong>
                {course.location}
              </span>
              <span>
                <strong>Horários: </strong>
                {course.schedule.join(", ")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Result;

import { useEffect, useState } from "react";

export interface ICourse {
  id: string;
  name: string;
  department: string;
  teacher: string;
  location: string;
  schedule: string[];
  updatedAt: string;
}

interface TeachersSectionProps {
  selectedCourses: string[];
  courses: ICourse[];
  fixedCourses: ICourse[];
  setFixedCourses: (fixedCourses: ICourse[]) => void;
}

function TeachersSection({
  selectedCourses,
  courses,
  fixedCourses,
  setFixedCourses,
}: TeachersSectionProps) {
  const [selectedCoursesInfos, setSelectedCoursesInfos] = useState<ICourse[]>(
    []
  );

  useEffect(() => {
    setSelectedCoursesInfos(
      courses.filter((course) => selectedCourses.includes(course.name))
    );
  }, [selectedCourses]);

  function handleFixedCourses(course: ICourse) {
    if (fixedCourses.includes(course)) {
      setFixedCourses(fixedCourses.filter((c) => c.id !== course.id));
    } else {
      const newFixedCourses = fixedCourses.filter(
        (c) => c.name !== course.name
      );
      setFixedCourses([...newFixedCourses, course]);
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-6xl text-stone-800 dark:text-stone-200 mt-8 mb-10 font-bold">
        Selecione Professores(as)
      </h1>
      <h2 className="text-xl text-stone-800 dark:text-stone-200">
        Caso você já possua preferência por um professor ou por um horário, você
        pode selecionar logo abaixo (caso não tenha, você pode pular essa
        etapa):
      </h2>
      <ul className="mt-10 grid grid-cols-2 gap-4">
        {selectedCourses.map((course) => (
          <li key={course} className="mt-12">
            <strong className="text-2xl dark:text-stone-200">{course}</strong>
            <ul className="mt-4 text-lg dark:text-stone-200">
              {selectedCoursesInfos.map(
                (courseInfo: ICourse) =>
                  courseInfo.name === course && (
                    <div
                      className={
                        fixedCourses.includes(courseInfo)
                          ? "bg-green-400 mt-4 p-4 rounded cursor-pointer dark:text-stone-800"
                          : "mt-4 p-4 rounded cursor-pointer hover:bg-green-500 transition-all"
                      }
                      key={courseInfo.id}
                      onClick={() => handleFixedCourses(courseInfo)}
                    >
                      <li>
                        <strong>Professor(a): </strong>
                        {courseInfo.teacher}
                      </li>
                      <li>
                        <strong>Local: </strong>
                        {courseInfo.location}
                      </li>
                      <li>
                        <strong>Horário: </strong>
                        {courseInfo.schedule.join(", ")}
                      </li>
                    </div>
                  )
              )}
            </ul>
          </li>
        ))}
      </ul>
      <button
        className="w-1/2 focus:outline-none self-center focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold border-stone-800 dark:border-stone-200  border-[1px] rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all mt-8"
        onClick={() => {
          window.location.href = "#summary";
        }}
      >
        Resumo
      </button>
    </div>
  );
}

export default TeachersSection;

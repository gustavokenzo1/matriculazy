import { useEffect, useState } from "react";

interface ICourse {
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
}

function TeachersSection({ selectedCourses, courses }: TeachersSectionProps) {
  const [selectedCoursesInfos, setSelectedCoursesInfos] = useState<ICourse[]>(
    []
  );

  useEffect(() => {
    setSelectedCoursesInfos(
      courses.filter((course) => selectedCourses.includes(course.name))
    );
  }, [selectedCourses]);

  return (
    <div className="flex flex-col">
      <h1 className="text-6xl text-stone-800 dark:text-stone-200 mt-8 mb-10 font-bold">
        Selecionar Professores
      </h1>
      <h2 className="text-xl text-stone-800 dark:text-stone-200">
        Caso você já possua preferência por um professor ou por um horário, você
        pode selecionar logo abaixo (caso não tenha, você pode pular essa
        etapa):
      </h2>
      <ul className="mt-10">
        {selectedCourses.map((course) => (
          <li key={course} className="mt-12">
            <strong className="text-2xl">{course}</strong>
            <ul className="mt-4 text-lg">
              {selectedCoursesInfos.map(
                (courseInfo: ICourse) =>
                  courseInfo.name === course && (
                    <div className="mt-4">
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
    </div>
  );
}

export default TeachersSection;

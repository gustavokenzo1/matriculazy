import { useEffect, useState } from "react";

interface CourseProps {
  id: string;
  name: string;
  department: string;
  code: string;
}

interface SelectCoursesSectionProps {
  isLoadingCourses: boolean;
  courses: CourseProps[];
}

function SelectCoursesSection({
  isLoadingCourses,
  courses,
}: SelectCoursesSectionProps) {
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [filteredDepartments, setFilteredDepartments] = useState<string[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<string[]>([]);

  useEffect(() => {
    if (courses) {
      const deps: string[] = [];
      const coursesNames: string[] = [];

      courses.forEach((course) => {
        if (!deps.includes(course.department)) {
          deps.push(course.department);
        }
      });

      setDepartments(deps);
      setFilteredDepartments(deps);
      setFilteredCourses(getCoursesNames(courses));
    }
  }, [courses]);

  function getCoursesNames(courses: CourseProps[]) {
    const coursesNames: string[] = [];

    courses.forEach((course) => {
      if (!coursesNames.includes(course.name)) {
        coursesNames.push(course.name);
      }
    });

    return coursesNames;
  }

  function handleFilterDepartments(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    const filtered: string[] = [];

    value = value.toLowerCase();

    departments.forEach((department) => {
      if (department.toLowerCase().includes(value)) {
        filtered.push(department);
      }
    });
    setFilteredDepartments(filtered);
  }

  function handleFilterCourses(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    const filtered: string[] = [];

    value = value.toLowerCase();

    courses.forEach((course) => {
      if (
        course.name.toLowerCase().includes(value) &&
        !filtered.includes(course.name)
      ) {
        filtered.push(course.name);
      }
    });

    setFilteredCourses(filtered);
  }

  function handleSelectDepartment(department: string) {
    if (department === selectedDepartment) {
      setSelectedDepartment("");
      setFilteredCourses(getCoursesNames(courses));
    } else {
      const filtered: string[] = [];

      courses.forEach((course) => {
        if (
          course.department === department &&
          !filtered.includes(course.name)
        ) {
          filtered.push(course.name);
        }
      });
      setFilteredCourses(filtered);
      setSelectedDepartment(department);
    }
  }

  return (
    <>
      <h1 className="text-4xl text-stone-800 dark:text-stone-200 mt-8 mb-10 font-bold">
        Matérias
      </h1>
      {isLoadingCourses ? (
        <h1 className="text-2xl text-stone-800 mt-8 mb-10">
          Por favor, aguarde enquanto carregamos as matérias...
        </h1>
      ) : courses.length === 0 ? (
        <h1 className="text-2xl text-stone-800 mt-8 mb-10">
          Selecione uma universidade para prosseguir
        </h1>
      ) : (
        <div className="flex flex-row items-center justify-around h-screen w-full">
          <div className="flex items-center justify-around h-full w-full">
            <div className="flex flex-col items-center justify-center h-full w-1/2">
              <h1 className="text-2xl text-stone-800 dark:text-stone-200 mt-8 mb-10">
                Departamentos:
              </h1>
              <h2 className="text-xl text-stone-800 dark:text-stone-200">
                Selecione um departamento para filtrar os cursos desse
                departamento (opcional):
              </h2>
              <input
                type="text"
                className="m-8 border-[1px] border-stone-800 dark:bg-stone-900 dark:border-stone-200 w-1/2 py-2 px-4 rounded"
                placeholder="Filtrar departamento"
                onChange={handleFilterDepartments}
              />
              <ul className="w-1/2 h-1/2 pr-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-stone-200 scrollbar-thumb-rounded-md">
                {filteredDepartments.map((department) => (
                  <li
                    key={department}
                    className="flex flex-col items-start justify-center my-10 border-b-[1px] border-stone-800 dark:border-stone-200"
                  >
                    {selectedDepartment === department ? (
                      <button
                        className="p-2 w-full mb-2 rounded text-start bg-stone-800 text-stone-200 dark:bg-stone-200 dark:text-stone-800 transition-all"
                        onClick={() => handleSelectDepartment(department)}
                      >
                        {department}
                      </button>
                    ) : (
                      <button
                        className="p-2 w-full mb-2 rounded text-start hover:bg-stone-800 hover:text-stone-200 dark:hover:bg-stone-200 dark:hover:text-stone-800 dark:text-stone-200 transition-all"
                        onClick={() => handleSelectDepartment(department)}
                      >
                        {department}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center h-full w-1/2">
              <h1 className="text-2xl text-stone-800 dark:text-stone-200 mt-8 mb-10">
                Cursos:
              </h1>
              <h2 className="text-xl text-stone-800 dark:text-stone-200">
                Selecione os cursos que deseja fazer
              </h2>
              <input
                type="text"
                className="m-8 border-[1px] border-stone-800 dark:bg-stone-900 dark:border-stone-200 w-1/2 py-2 px-4 rounded"
                placeholder="Filtrar curso"
                onChange={handleFilterCourses}
              />
              <ul className="w-1/2 h-1/2 pr-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-stone-200 scrollbar-thumb-rounded-md">
                {filteredCourses.map((course) => (
                  <li
                    key={course}
                    className="flex flex-col items-start justify-center my-10 border-b-[1px] border-stone-800 dark:border-stone-200"
                  >
                    <button className="p-2 w-full mb-2 rounded text-start hover:bg-stone-800 hover:text-stone-200 dark:hover:bg-stone-200 dark:hover:text-stone-800 dark:text-stone-200 transition-all">
                      {course}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SelectCoursesSection;

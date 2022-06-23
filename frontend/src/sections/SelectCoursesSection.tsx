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
  selectedCourses: string[];
  setSelectedCourses: (selectedCourses: string[]) => void;
}

function SelectCoursesSection({
  isLoadingCourses,
  courses,
  selectedCourses,
  setSelectedCourses,
}: SelectCoursesSectionProps) {
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [filteredDepartments, setFilteredDepartments] = useState<string[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<string[]>([]);

  useEffect(() => {
    if (courses) {
      const deps: string[] = [];

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

  function handleSelectCourse(course: string) {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  }

  return (
    <>
      <h1 className="text-xl sm:text-3xl md:text-6xl text-stone-800 dark:text-stone-200 mt-8 mb-10 font-bold">
        Matérias
      </h1>
      {isLoadingCourses ? (
        <h1 className="text-md sm:text-xl md:text-2xl text-center text-stone-800 mt-8 mb-10">
          Por favor, aguarde enquanto carregamos as matérias...
        </h1>
      ) : courses.length === 0 ? (
        <>
          <h1 className="text-md sm:text-xl md:text-2xl text-center text-stone-800 mt-8 mb-10">
            Selecione uma universidade para prosseguir
          </h1>
          <a href="#selectUniversity">
            <button className="focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold border-stone-800 dark:border-stone-200  border rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all">
              Selecionar
            </button>
          </a>
        </>
      ) : (
        <div className="flex flex-col items-center justify-around">
          <div className="flex xl:flex-row flex-col items-center justify-around">
            <div className="flex flex-col items-center justify-center w-1/2">
              <h1 className="text-2xl text-stone-800 dark:text-stone-200 mt-8 mb-10">
                Departamentos:
              </h1>
              <h2 className="text-xl text-center text-stone-800 dark:text-stone-200">
                Selecione um departamento para filtrar os cursos desse
                departamento (opcional):
              </h2>
              <input
                type="text"
                className="m-8 border border-stone-800 dark:bg-stone-900 dark:border-stone-200 w-full lg:w-1/2 py-2 px-4 rounded"
                placeholder="Filtrar departamento"
                onChange={handleFilterDepartments}
              />
              <ul className="w-[300px] sm:w-[400px] lg:w-[600px] h-[400px] pr-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-stone-200 scrollbar-thumb-rounded-md">
                {filteredDepartments.map((department) => (
                  <li
                    key={department}
                    className="flex flex-col items-start justify-center my-10 border-b border-stone-800 dark:border-stone-200"
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
            <div className="flex flex-col items-center justify-center w-1/2">
              <h1 className="text-2xl text-stone-800 dark:text-stone-200 mt-8 mb-10">
                Cursos:
              </h1>
              <h2 className="text-xl text-center text-stone-800 dark:text-stone-200">
                Selecione os cursos que deseja fazer:
              </h2>
              <input
                type="text"
                className="m-8 border border-stone-800 dark:bg-stone-900 dark:border-stone-200 w-full lg:w-1/2 py-2 px-4 rounded"
                placeholder="Filtrar curso"
                onChange={handleFilterCourses}
              />
              <ul className="w-[300px] sm:w-[400px] lg:w-[600px] h-[400px] pr-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-stone-200 scrollbar-thumb-rounded-md">
                {filteredCourses.map((course) => (
                  <li
                    key={course}
                    className="flex flex-col items-start justify-center my-10 border-b border-stone-800 dark:border-stone-200"
                  >
                    {selectedCourses.includes(course) ? (
                      <button
                        className="p-2 w-full mb-2 rounded text-start bg-green-400 text-white dark:text-stone-800 hover:bg-stone-800 hover:text-stone-200 dark:hover:bg-stone-200 dark:hover:text-stone-800 transition-all"
                        onClick={() => handleSelectCourse(course)}
                      >
                        {course}
                      </button>
                    ) : (
                      <button
                        className="p-2 w-full mb-2 rounded text-start hover:bg-stone-800 hover:text-stone-200 dark:hover:bg-stone-200 dark:hover:text-stone-800 dark:text-stone-200 transition-all"
                        onClick={() => handleSelectCourse(course)}
                      >
                        {course}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full flex flex-col items-center mt-20">
            <h1 className="text-2xl text-center text-stone-800 dark:text-stone-200 mt-8 mb-10">
              Cursos Selecionados:
            </h1>
            <h2 className="text-xl text-center text-stone-800 dark:text-stone-200">
              Para excluir um curso, basta clicar nele.
            </h2>
            {selectedCourses.length > 0 ? (
              <ul className="w-[300px] sm:w-[400px] lg:w-[600px] flex items-center flex-col justify-center p-2 sm:p-8 mt-8 border-2 border-stone-500 rounded overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-stone-400 scrollbar-track-stone-200 scrollbar-thumb-rounded-md">
                {selectedCourses.map((course) => (
                  <li
                    key={course}
                    className="flex flex-col m-4 mt-6 w-full items-start justify-center border-b-[1px] border-stone-800 dark:border-stone-200"
                  >
                    <button
                      className="p-2 w-full mb-2 rounded text-start hover:bg-red-500 hover:text-white dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-red-500 transition-all"
                      onClick={() => handleSelectCourse(course)}
                    >
                      {course}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <h2 className="text-xl text-center mt-8 text-stone-800 dark:text-stone-200">
                Você ainda não selecionou nenhum curso.
              </h2>
            )}
          </div>
        </div>
      )}
      {selectedCourses.length > 0 && (
        <a href="#selectTeachers">
          <button className="focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold border-stone-800 dark:border-stone-200  border-[1px] rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all mt-20">
            Selecionar professores
          </button>
        </a>
      )}
    </>
  );
}

export default SelectCoursesSection;

import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import { ICourse } from "../../page/Timetable";

interface DepartmentPopUpProps {
  selectedDepartmentCourses: ICourse[];
  setShowDepartmentPopUp: (show: boolean) => void;
  setSelectedCourses: (courses: ICourse[][]) => void;
  selectedCourses: ICourse[][];
  setShowSideBar: (show: boolean) => void;
}

export const DepartmentPopUp = ({
  selectedDepartmentCourses,
  setShowDepartmentPopUp,
  setSelectedCourses,
  selectedCourses,
  setShowSideBar,
}: DepartmentPopUpProps) => {
  const [filteredCourses, setFilteredCourses] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDepartmentCourses) {
      const unique: string[] = [];

      selectedDepartmentCourses.forEach((course) => {
        if (!unique.includes(course.name)) {
          unique.push(course.name);
        }
      });

      setFilteredCourses(unique);
    }
  }, [selectedDepartmentCourses]);

  function handleCourseFilter(e: React.ChangeEvent) {
    const { value } = e.target as HTMLSelectElement;

    const filtered: string[] = [];

    const unique: string[] = [];

    selectedDepartmentCourses.forEach((course) => {
      if (!unique.includes(course.name)) {
        unique.push(course.name);
      }
    });

    unique.forEach((course) => {
      if (course.toLowerCase().includes(value.toLowerCase())) {
        filtered.push(course);
      }
    });

    setFilteredCourses(filtered);
  }

  function handleAddCourses(courseName: string) {
    const courseAlreadyAdded = selectedCourses.some((course) =>
      course.some((c) => c.name === courseName)
    );

    if (!courseAlreadyAdded) {
      const courses: ICourse[] = [];

      selectedDepartmentCourses.forEach((course) => {
        if (course.name === courseName) {
          courses.push(course);
        }
      });

      setSelectedCourses([...selectedCourses, courses]);
    } else {
      const replacedCourses: ICourse[][] = [];

      selectedCourses.forEach((course) => {
        if (course[0].name === courseName) {
          const courseMatch = selectedDepartmentCourses.filter(
            (c) => c.name === courseName
          );
          
          replacedCourses.push(courseMatch);
        } else {
          replacedCourses.push(course);
        }
      })

      setSelectedCourses(replacedCourses);
    }

    setShowDepartmentPopUp(false);
    setShowSideBar(false);
  }

  return (
    <div className="absolute top-20 m-4 flex flex-col max-h-[800px] max-w-[500px] overflow-y-scroll bg-white shadow-lg rounded dark:bg-[#1a1a1a] scrollbar-thin scrollbar-thumb-brand-500 scrollbar-track-stone-200 dark:scrollbar-track-stone-700 px-6 pb-4">
      <span
        className="self-end cursor-pointer dark:bg-stone-700 bg-stone-200 dark:text-white text-stone-800 rounded-full p-1 mt-4"
        onClick={() => setShowDepartmentPopUp(false)}
      >
        <X size={18} />
      </span>
      {selectedDepartmentCourses.length === 0 ? (
        <h1 className="text-2xl font-medium mt-4 text-center">
          Nenhuma matéria foi encontrada para esse departamento
        </h1>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-col gap-4 my-10">
            <h1 className="text-2xl font-medium text-brand-500">
              Aqui, você pode ver as matérias disponíveis no departamento
              selecionado.
            </h1>
            <p className="text-xl">
              Clique na matéria para adicioná-la na lista de matérias
              selecionadas
            </p>
            <p className="text-xl">
              Caso já saiba qual professor quer, recomendamos que você opte pela
              opção "Procure por um curso"
            </p>
          </div>
          <hr className="mb-8 border-brand-500" />
          <input
            type="text"
            placeholder="Nome do curso"
            className="p-2 rounded dark:bg-stone-700 mb-8 bg-stone-100 focus:outline-none focus:ring focus:ring-brand-500"
            onChange={(e) => handleCourseFilter(e)}
          />
          <div className="flex flex-col gap-10">
            {filteredCourses.map((course) => {
              return (
                <h1
                  key={course}
                  className="text-xl font-medium hover:bg-stone-200 dark:hover:bg-stone-800 p-4 rounded transition-colors cursor-pointer"
                  onClick={() => handleAddCourses(course)}
                >
                  {course}
                </h1>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

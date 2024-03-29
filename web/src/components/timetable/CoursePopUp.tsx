import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import { ICourse } from "../../pages/Timetable";

interface CoursePopUpProps {
  searchSubjectResults?: ICourse[];
  setShowCoursePopUp: (show: boolean) => void;
  setSelectedCourses: (courses: ICourse[][]) => void;
  selectedCourses: ICourse[][];
  setShowSideBar: (show: boolean) => void;
}

export const CoursePopUp = ({
  searchSubjectResults,
  setShowCoursePopUp,
  setSelectedCourses,
  selectedCourses,
  setShowSideBar,
}: CoursePopUpProps) => {
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    setCourses(searchSubjectResults || []);
  }, [searchSubjectResults]);

  function handleSelectFixedCourse(course: ICourse) {
    const courseAlreadySelected = selectedCourses.some((courses) =>
      courses.some((c) => c.name === course.name)
    );

    if (!courseAlreadySelected) {
      setSelectedCourses([...selectedCourses, [course]]);
    } else {
      const replacedCourse = selectedCourses.map((courses) =>
        courses[0].name === course.name ? [course] : courses
      );

      setSelectedCourses(replacedCourse);
    }

    setShowCoursePopUp(false);
    setShowSideBar(false);
  }

  function handleDontKnow(courses: ICourse[]) {
    const courseAlreadySelected = selectedCourses.some((cs) =>
      cs.some((c) => c.name === courses[0].name)
    );

    if (!courseAlreadySelected) {
      setSelectedCourses([...selectedCourses, courses]);
    } else {
      const replacedCourse = selectedCourses.map((cs) =>
        cs[0].name === courses[0].name ? courses : cs
      );

      setSelectedCourses(replacedCourse);
    }

    setShowCoursePopUp(false);
    setShowSideBar(false);
  }

  return (
    <div className="absolute top-20 m-4 flex flex-col max-h-[800px] max-w-[500px] overflow-y-scroll bg-white shadow-lg rounded dark:bg-[#1a1a1a] scrollbar-thin scrollbar-thumb-brand-500 scrollbar-track-stone-200 dark:scrollbar-track-stone-700 px-6 pb-4">
      <span
        className="self-end cursor-pointer dark:bg-stone-700 bg-stone-200 dark:text-white text-stone-800 rounded-full p-1 mt-4"
        onClick={() => setShowCoursePopUp(false)}
      >
        <X size={18} />
      </span>
      {courses.length > 0 ? (
        <>
          <div className="flex flex-col p-6">
            <h1 className="text-3xl font-medium text-brand-500">
              Cursos Encontrados:
            </h1>
            <p className="mt-10 text-xl font-medium">
              Já sabe qual professor/horário prefere para essa matéria?
            </p>
            <p className="mt-8 text-xl font-medium">
              Aqui, você pode selecionar e fixá-la.
            </p>
            {/* <p className="mt-8 text-xl font-medium">
              Caso contrário, você pode selecionar que não sabe, e o sistema irá
              gerar todas as possibilidades.
            </p> */}
          </div>
          {/* <div
            className="mt-4 border border-brand-500 text-lg hover:bg-stone-200 dark:hover:bg-stone-800 p-6 rounded transition-colors cursor-pointer"
            onClick={() => handleDontKnow(courses)}
          >
            Não sei qual professor/horário prefiro
          </div> */}
        </>
      ) : (
        <h1 className="text-3xl font-medium text-brand-500">
          Não foram econtrados cursos para essa matéria :(
        </h1>
      )}
      {courses.map((course: ICourse) => {
        return (
          <div
            key={course.id}
            className="mt-4 text-lg hover:bg-stone-200 dark:hover:bg-stone-800 p-6 rounded transition-colors cursor-pointer"
            onClick={() => handleSelectFixedCourse(course)}
          >
            <h2 className="text-xl font-bold text-secondary-500">
              {course.name} - {course.code}
            </h2>
            <p>
              <strong className="text-primary-500">Professor(a):</strong>{" "}
              {course.teacher}
            </p>
            <p>
              <strong className="text-primary-500">Turma:</strong>{" "}
              {course.classroom}
            </p>
            <p>
              <strong className="text-primary-500">Local:</strong>{" "}
              {course.location}
            </p>
            <p>
              <strong className="text-primary-500">Horário:</strong>{" "}
              {course.schedule.join(", ")}
            </p>
          </div>
        );
      })}
    </div>
  );
};

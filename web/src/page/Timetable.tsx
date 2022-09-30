import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { UniversityPopUp } from "../components/timetable/UniversityPopUp";
import { SideBar } from "../components/timetable/SideBar";
import { CoursePopUp } from "../components/timetable/CoursePopUp";
import { DepartmentPopUp } from "../components/timetable/DepartmentPopUp";
import { CourseCard } from "../components/timetable/CourseCard";
import { Calendar } from "../components/timetable/Calendar";
import api from "../services/api";

export interface IUniversity {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDepartment {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  universityId: string;
}

export interface ICourse {
  id: string;
  name: string;
  code: string;
  semester: string;
  teacher: string;
  classroom: string;
  location: string;
  schedule: string[];
  simplifiedSchedule: string[];
  createdAt: Date;
  updatedAt: Date;
  departmentId: string;
  universityId: string;
}

export const Timetable = () => {
  const [step, setStep] = useState(0);

  const [selectedCourses, setSelectedCourses] = useState<ICourse[][]>([]);

  const [selectedUniversity, setSelectedUniversity] = useState<IUniversity>(
    {} as IUniversity
  );
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<IDepartment[]>(
    []
  );

  const [showCoursePopUp, setShowCoursePopUp] = useState(false);
  const [searchSubjectResults, setSearchSubjectResults] = useState<ICourse[]>(
    []
  );

  const [showDepartmentPopUp, setShowDepartmentPopUp] = useState(false);
  const [selectedDepartmentCourses, setSelectedDepartmentCourses] = useState<
    ICourse[]
  >([]);

  const [finalResults, setFinalResults] = useState<ICourse[][]>([]);

  function handleClosePopUps() {
    setShowCoursePopUp(false);
    setShowDepartmentPopUp(false);
  }

  function handleDeleteSelectedCourse(course: ICourse) {
    const newSelectedCourses = selectedCourses.filter(
      (c) => c[0].name !== course.name
    );

    setSelectedCourses(newSelectedCourses);
  }

  function handleFelizometro() {
    switch (selectedCourses.length) {
      case 1:
        return "😁";
      case 2:
        return "😀";
      case 3:
        return "🙂";
      case 4:
        return "😐";
      case 5:
        return "🤨";
      case 6:
        return "🥴";
      case 7:
        return "😳";
      default:
        return "🤣".repeat(selectedCourses.length - 7);
    }
  }

  async function makeTimetable() {
    const finalCourses = selectedCourses.flat(1);
    const timetables = await api.post("/courses/timetable", {
      courses: finalCourses,
    });

    setFinalResults(timetables.data);
    console.log(timetables.data);
  }

  return (
    <section className="w-screen min-h-screen flex flex-col justify-center items-center font-gt dark:bg-[#0f0f0f] bg-[#f5f5f5] dark:text-white text-[#121214] transition-colors">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <UniversityPopUp
            setSelectedUniversity={setSelectedUniversity}
            selectedUniversity={selectedUniversity}
            setStep={setStep}
            setDepartments={setDepartments}
            setFilteredDepartments={setFilteredDepartments}
          />
        )}
      </AnimatePresence>
      {step === 1 && (
        <div className="flex w-full">
          <SideBar
            selectedUniversity={selectedUniversity}
            departments={departments}
            filteredDepartments={filteredDepartments}
            setFilteredDepartments={setFilteredDepartments}
            setSearchSubjectResults={setSearchSubjectResults}
            setShowCoursePopUp={setShowCoursePopUp}
            setSelectedDepartmentCourses={setSelectedDepartmentCourses}
            setShowDepartmentPopUp={setShowDepartmentPopUp}
          />
          <div
            className="flex flex-col p-8 items-start w-full"
            onClick={handleClosePopUps}
          >
            <h1 className="text-4xl font-bold text-brand-500">
              Gerador de Grade Horária
            </h1>
            <div className="mt-10 flex flex-col">
              <h2 className="text-2xl font-medium">Matérias Selecionadas:</h2>
              {selectedCourses.length > 0 ? (
                <>
                  <div className="grid grid-cols-3 h-[200px] gap-6 mt-10 bg-stone-200 p-6 rounded dark:bg-stone-800 overflow-y-scroll scrollbar-thin scrollbar-thumb-brand-500 scrollbar-track-stone-300 dark:scrollbar-track-stone-800 transition-all">
                    {selectedCourses.map((courses) => (
                      <CourseCard
                        key={courses[0].id}
                        courses={courses}
                        handleDeleteSelectedCourse={handleDeleteSelectedCourse}
                      />
                    ))}
                  </div>
                  <button
                    className="mt-10 bg-brand-500 text-white font-bold py-2 px-4 rounded w-[200px] hover:brightness-90 transition-colors"
                    onClick={() => {
                      setSelectedCourses([]);
                      setFinalResults([]);
                    }}
                  >
                    Limpar tudo
                  </button>
                  <p className="mt-8 text-xl font-medium">
                    Total de matérias: {selectedCourses.length}
                  </p>
                  <p className="mt-2 text-xl font-medium">
                    Felizômetro: {handleFelizometro()}
                  </p>
                  <button
                    className="my-10 bg-brand-500 text-white font-bold py-2 px-4 rounded w-[200px] hover:brightness-90 transition-colors"
                    onClick={makeTimetable}
                  >
                    Gerar Grade Horária
                  </button>
                  {finalResults.length > 0 && (
                    <Calendar finalResults={finalResults} />
                  )}
                </>
              ) : (
                <p className="mt-8 text-xl font-medium">
                  Você ainda não selecionou nenhuma matéria :)
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {showCoursePopUp && (
        <CoursePopUp
          searchSubjectResults={searchSubjectResults}
          setShowCoursePopUp={setShowCoursePopUp}
          setSelectedCourses={setSelectedCourses}
          selectedCourses={selectedCourses}
        />
      )}
      {showDepartmentPopUp && (
        <DepartmentPopUp
          setShowDepartmentPopUp={setShowDepartmentPopUp}
          selectedDepartmentCourses={selectedDepartmentCourses}
          setSelectedCourses={setSelectedCourses}
          selectedCourses={selectedCourses}
        />
      )}
    </section>
  );
};

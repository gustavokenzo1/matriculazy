import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { UniversityPopUp } from "../components/timetable/UniversityPopUp";
import { SideBar } from "../components/timetable/SideBar";
import { CoursePopUp } from "../components/timetable/CoursePopUp";
import { DepartmentPopUp } from "../components/timetable/DepartmentPopUp";
import { X } from "phosphor-react";
import { CourseCard } from "../components/timetable/CourseCard";

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
                <div className="w-full dark:bg-stone-800 bg-stone-200 mt-6 p-4 rounded flex justify-evenly overflow-x-scroll gap-4">
                  {selectedCourses.map((course) => {
                    return (
                      <CourseCard
                        courses={course}
                        key={course[0].id}
                        handleDeleteSelectedCourse={handleDeleteSelectedCourse}
                      />
                    );
                  })}
                </div>
              ) : (
                <h1 className="mt-6 text-2xl">
                  Nenhuma matéria selecionada até o momento :)
                </h1>
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

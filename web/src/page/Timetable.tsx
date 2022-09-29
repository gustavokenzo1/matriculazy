import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { UniversityPopUp } from "../components/timetable/UniversityPopUp";
import api from "../services/api";
import { SideBar } from "../components/timetable/SideBar";
import { CoursePopUp } from "../components/timetable/CoursePopUp";

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
  const [selectedCourses, setSelectedCourses] = useState<ICourse[][]>([]);

  const [step, setStep] = useState(0);
  const [selectedUniversity, setSelectedUniversity] = useState<IUniversity>(
    {} as IUniversity
  );
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<IDepartment[]>(
    []
  );
  const [searchSubjectResults, setSearchSubjectResults] = useState<ICourse[]>(
    []
  );

  const [showCoursePopUp, setShowCoursePopUp] = useState(false);

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
          />
          <div
            className="flex flex-col p-8 items-start w-full"
            onClick={() => setShowCoursePopUp(false)}
          >
            <h1 className="text-4xl font-bold">Gerador de Grade Horária</h1>
            <div className="mt-10 flex flex-col w-full">
              <h2 className="text-2xl font-medium">Matérias Selecionadas:</h2>
              {selectedCourses.length > 0 ? (
                <div className="w-full dark:bg-stone-800 bg-stone-200 mt-6 p-4 rounded flex gap-4">
                  {selectedCourses.map((course) => {
                    return course.length === 1 ? (
                      <div
                        key={course[0].id}
                        className="dark:bg-stone-900 bg-stone-100 w-fit p-4 flex flex-col items-center gap-2"
                      >
                        <h3 className="font-bold">{course[0].name}</h3>
                        <p className="font-medium">{course[0].teacher}</p>
                      </div>
                    ) : (
                      <div
                        key={course[0].id}
                        className="dark:bg-stone-900 bg-stone-100 w-fit p-4 flex flex-col items-center gap-2"
                      >
                        <h3 className="font-bold">{course[0].name}</h3>
                        <p className="font-medium">
                          {course.length} cursos encontrados
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <h1 className="mt-6 text-2xl">Nenhuma matéria selecionada até o momento :)</h1>
              )}
            </div>
          </div>
        </div>
      )}
      {showCoursePopUp && searchSubjectResults.length > 0 && (
        <CoursePopUp
          searchSubjectResults={searchSubjectResults}
          setShowCoursePopUp={setShowCoursePopUp}
          setSelectedCourses={setSelectedCourses}
          selectedCourses={selectedCourses}
        />
      )}
    </section>
  );
};

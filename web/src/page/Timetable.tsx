import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { UniversityPopUp } from "../components/timetable/UniversityPopUp";
import api from "../services/api";
import { formatDate } from "../utils/dateFormatter";

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
  const [selectedUniversity, setSelectedUniversity] = useState<IUniversity>(
    {} as IUniversity
  );
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<IDepartment[]>(
    []
  );

  function handleDepartmentFilter(e: React.ChangeEvent) {
    const { value } = e.target as HTMLSelectElement;

    setFilteredDepartments(
      departments.filter((el) =>
        el.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  return (
    <section className="w-screen min-h-screen flex flex-col justify-center items-center font-gt dark:bg-[#121214] bg-[#f5f5f5] dark:text-white text-[#121214] transition-colors">
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
        <aside className="dark:bg-[#1b1b1b] shadow-lg shadow-brand-500/25 w-[400px] self-start flex flex-col p-4 ml-8 rounded">
          <div className="flex flex-col gap-4 text-xl">
            <h1 className="text-3xl font-medium text-secondary-500">
              {selectedUniversity.name}
            </h1>
            <span className="text-xl text-primary-500">
              <a href={selectedUniversity.url} target="_blank">
                Link das matérias
              </a>
            </span>
            <p>
              Adicionada ao MatricuLazy em: <br />
              {formatDate(selectedUniversity.createdAt)}
            </p>
            <p>
              Última atualização: <br />
              {formatDate(selectedUniversity.updatedAt)}
            </p>
          </div>
          <hr className="my-6 border-brand-500/50" />
          <div className="flex flex-col gap-4 text-xl">
            <p className="font-medium">Procure por um departamento:</p>
            <input
              type="text"
              className="rounded text-black p-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-stone-800 dark:text-white"
              onChange={handleDepartmentFilter}
            />
            <div className="h-[200px] overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-stone-800 pr-4">
              {filteredDepartments.map((department) => (
                <p
                  className="text-sm mt-4 hover:bg-primary-500 transition-colors cursor-pointer p-2 rounded"
                  key={department.id}
                >
                  {department.name}
                </p>
              ))}
            </div>
          </div>
          <hr className="my-6 border-brand-500/50" />
        </aside>
      )}
    </section>
  );
};

import { motion } from "framer-motion";
import { useState } from "react";
import { ICourse, IDepartment, IUniversity } from "../../page/Timetable";
import api from "../../services/api";
import { formatDate } from "../../utils/dateFormatter";

interface SideBarProps {
  selectedUniversity: IUniversity;
  setFilteredDepartments: (departments: IDepartment[]) => void;
  departments: IDepartment[];
  filteredDepartments: IDepartment[];
  setSearchSubjectResults: (courses: ICourse[]) => void;
  setShowCoursePopUp: (show: boolean) => void;
}

export const SideBar = ({
  selectedUniversity,
  setFilteredDepartments,
  departments,
  filteredDepartments,
  setSearchSubjectResults,
  setShowCoursePopUp,
}: SideBarProps) => {
  const [searchSubject, setSearchSubject] = useState("");

  function handleDepartmentFilter(e: React.ChangeEvent) {
    const { value } = e.target as HTMLSelectElement;

    setFilteredDepartments(
      departments.filter((el) =>
        el.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  async function getCourseBySubject() {
    const response = await api.get(`/courses/subject`, {
      params: {
        university: selectedUniversity.name,
        subject: searchSubject,
      },
    });

    const data = response.data;
    
    setSearchSubjectResults(data.courses);
    setShowCoursePopUp(true);
  }

  return (
    <motion.aside
      className="dark:bg-[#141414] bg-white shadow-lg  w-[400px] self-start flex flex-col p-8"
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      exit={{ x: -400 }}
      transition={{ duration: 0.5 }}
    >
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
          className="rounded text-black p-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-stone-800 bg-stone-200 dark:text-white"
          onChange={handleDepartmentFilter}
        />
        <div className="h-[200px] overflow-y-scroll scrollbar-thin scrollbar-thumb-brand-500 scrollbar-track-stone-200 dark:scrollbar-track-stone-800 pr-4">
          {filteredDepartments.map((department: IDepartment) => (
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
      <div className="flex flex-col gap-4 text-xl">
        <p className="font-medium">Procure por um curso:</p>
        <input
          type="text"
          className="rounded text-black p-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-stone-800 bg-stone-200 dark:text-white"
          onChange={(e) => setSearchSubject(e.target.value)}
          value={searchSubject}
        />
      </div>
      <button
        className="bg-brand-500 text-white mt-4 p-2 rounded hover:brightness-90"
        onClick={() => getCourseBySubject()}
      >
        Pesquisar
      </button>
    </motion.aside>
  );
};
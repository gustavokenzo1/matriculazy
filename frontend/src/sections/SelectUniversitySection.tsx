import { useState } from "react";
import { IUniversity } from "../App";

interface SecondSectionProps {
  universities: IUniversity[];
  getCourses: (initials: string) => void;
  courses: {
    updatedAt: string;
  }[];
}

function SelectUniversitySection({
  universities,
  getCourses,
  courses,
}: SecondSectionProps) {
  const [selectedUniversity, setSelectedUniversity] = useState<IUniversity>();

  return (
    <>
      <div className="flex flex-col justify-center w-1/2 p-16">
        <h1 className="text-5xl text-stone-800 dark:text-stone-100 mt-8 mb-10 font-bold">
          Selecione a Universidade
        </h1>
        <p className="text-xl dark:text-white">
          O MatricuLazy funciona para universidades que utilizam o Sistema
          Integrado de Gestão de Atividades Acadêmicas (SIGAA). A coleta de
          dados é feita sob demanda, ou seja, caso a sua universidade ainda não
          apareça na lista, você pode solicitar logo abaixo:
        </p>
        <button className="focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold border-stone-800 dark:border-stone-200  border-[1px] rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all w-1/2 mt-8">
          Solicitar
        </button>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 p-16">
        <select
          name="university"
          id="university"
          className="form-select appearance-none block w-3/4 px-4 py-2 text-base font-normal text-stone-800 dark:text-stone-100 bg-white dark:bg-stone-900 bg-clip-padding bg-no-repeat border-stone-800 dark:border-stone-200 border-[1px] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
            getCourses(e.target.value);
            setSelectedUniversity(
              universities.find((u) => u.initials === e.target.value)
            );
          }}
        >
          <option value="">Selecione a Universidade</option>
          {universities.map((university: IUniversity) => (
            <option key={university.id} value={university.initials}>
              {university.name}
            </option>
          ))}
        </select>
        {selectedUniversity && (
          <div className="mt-8 flex flex-col items-center">
            <h2 className="text-xl mb-2 text-stone-800 dark:text-stone-200">
              {selectedUniversity.name} - {selectedUniversity.initials}
            </h2>
            <a
              className="text-blue-600"
              href={selectedUniversity.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedUniversity.url}
            </a>
            <h2 className="text-xl my-4 text-stone-800 dark:text-stone-200">
              Última coleta de dados:{" "}
              {new Date(courses[0].updatedAt).toLocaleDateString()}
            </h2>
          </div>
        )}
        <a href="#selectOccupied">
          <button className="focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold border-stone-800 dark:border-stone-200  border-[1px] rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all mt-8">
            Próximo
          </button>
        </a>
      </div>
    </>
  );
}

export default SelectUniversitySection;

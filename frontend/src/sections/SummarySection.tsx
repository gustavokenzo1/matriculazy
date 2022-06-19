import { ICourse } from "./TeachersSection";

interface SummaryProps {
  occupied: String[];
  fixedCourses: ICourse[];
  selectedCourses: string[];
}

function SummarySection({
  occupied,
  fixedCourses,
  selectedCourses,
}: SummaryProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-6xl text-stone-800 dark:text-stone-200 mt-8 mb-10 font-bold">
        Resumo
      </h1>
      <h2 className="text-2xl text-stone-800 dark:text-stone-200 font-bold mt-10">
        Horários ocupados:
      </h2>
      {occupied.length !== 0 ? (
        <ul className="text-xl text-stone-800 dark:text-stone-200 mt-4">
          {occupied.map((o) => (
            <li className="mt-2">{o}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-stone-800 dark:text-stone-200 mt-2">
          Nenhum horário ocupado
        </p>
      )}
      <h2 className="text-2xl text-stone-800 dark:text-stone-200 font-bold mt-10">
        Cursos selecionados:
      </h2>
      {selectedCourses.length !== 0 ? (
        <ul className="text-xl text-stone-800 dark:text-stone-200 mt-4">
          {selectedCourses.map((s) => (
            <li className="mt-2">{s}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-stone-800 dark:text-stone-200 mt-2">
          Nenhum curso selecionado
        </p>
      )}
      <h2 className="text-2xl text-stone-800 dark:text-stone-200 font-bold mt-10">
        Cursos fixados por você:
      </h2>
      {fixedCourses.length !== 0 ? (
        <ul className="text-xl text-stone-800 dark:text-stone-200 mt-4">
          {fixedCourses.map((f) => (
            <li className="mt-2">{f.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-stone-800 dark:text-stone-200 mt-2">
          Nenhum curso fixado
        </p>
      )}
      <button className="focus:outline-none self-center focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold border-stone-800 dark:border-stone-200  border-[1px] rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all mt-16">
        GERAR GRADE HORÁRIA
      </button>
    </div>
  );
}

export default SummarySection;

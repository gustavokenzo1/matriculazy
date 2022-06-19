import Calendar from "../components/Calendar";

function CalendarSection() {
  return (
    <>
      <h1 className="text-5xl text-stone-800 dark:text-stone-200 mt-8 mb-10 font-bold">
        Horários Ocupados
      </h1>
      <h2 className="text-xl dark:text-white mb-12">
        Selecione os horários em que você possui compromissos, como aulas de
        cursos externos, estágio, trabalho, etc.
      </h2>
      <Calendar />
      <a href="#selectCourses">
        <button className="focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold  mt-16 dark:border-stone-200 border-stone-800 border-[1px] rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all">
          Próximo
        </button>
      </a>
    </>
  );
}

export default CalendarSection;

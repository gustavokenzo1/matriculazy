import Calendar from "../components/Calendar";

export interface CalendarSectionProps {
  occupied: String[];
  setOccupied: (occupied: String[]) => void;
}

function CalendarSection({ occupied, setOccupied }: CalendarSectionProps) {
  return (
    <>
      <h1 className="text-xl sm:text-3xl md:text-5xl text-stone-800 dark:text-stone-200 mt-8 mb-10 font-bold">
        Horários Ocupados
      </h1>
      <h2 className="text-md sm:text-xl md:text-2xl dark:text-white mb-12 text-center">
        Selecione os horários em que você possui compromissos, como aulas de
        cursos externos, estágio, trabalho, etc.
      </h2>
      <Calendar occupied={occupied} setOccupied={setOccupied} />
      <button
        className="focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold  mt-16 dark:border-stone-200 border-stone-800 border-[1px] rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all"
        onClick={() => {
          window.location.href = "#selectCourses";
        }}
      >
        Próximo
      </button>
    </>
  );
}

export default CalendarSection;

import Calendar from "./components/Calendar";
import DarkModeToggle from "./components/DarkModeToggle";
import "./global.css";

function App() {
  return (
    <div className="font-roboto dark:bg-stone-800 max-w-screen min-h-screen flex flex-col transition-all">
      <DarkModeToggle />
      <section className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-sky-500">MatricuLazy</h1>
        <h2 className="text-2xl text-orange-400 mt-8 mb-10 font-bold">
          GERADOR DE GRADE HORÁRIA PARA PESSOAS PREGUIÇOSAS
        </h2>
        <a href="#selectUniversity">
          <button className="focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-orange-400 dark:text-white px-16 py-2 font-bold border-orange-400 border-2 rounded-md hover:bg-orange-400 hover:text-white transition-all">
            Começar
          </button>
        </a>
      </section>
      <section
        id="selectUniversity"
        className="h-screen flex flex-row justify-around p-16"
      >
        <div className="flex flex-col justify-center w-1/2 p-16">
          <h1 className="text-4xl text-sky-500 mt-8 mb-10 font-bold">
            Selecione a Universidade
          </h1>
          <p className="text-xl dark:text-white">
            O MatricuLazy funciona para universidades que utilizam o Sistema
            Integrado de Gestão de Atividades Acadêmicas (SIGAA). A coleta de
            dados é feita sob demanda, ou seja, caso a sua universidade ainda
            não apareça na lista, você pode solicitar logo abaixo:
          </p>
          <button className="focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-orange-400 dark:text-white px-16 py-2 font-bold w-1/2 mt-8 self-center border-orange-400 border-2 rounded-md hover:bg-orange-400 hover:text-white transition-all">
            Solicitar
          </button>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 p-16">
          <select
            name="university"
            id="university"
            className="p-4 w-3/4 cursor-pointer rounded-md focus:outline-2 focus:outline-orange-400"
          >
            <option value="">Selecione a Universidade</option>
            <option value="1">Universidade de Brasília</option>
          </select>
          <a href="#selectOccupied">
            <button className="focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-orange-400 dark:text-white px-16 py-2 font-bold  mt-8 border-orange-400 border-2 rounded-md hover:bg-orange-400 hover:text-white transition-all">
              Próximo
            </button>
          </a>
        </div>
      </section>
      <section
        id="selectOccupied"
        className="min-h-screen flex flex-col justify-center items-center p-24"
      >
        <h1 className="text-4xl text-sky-500 mt-8 mb-10 font-bold">
          Horários Ocupados
        </h1>
        <h2 className="text-xl dark:text-white mb-12">
          Selecione os horários em que você possui compromissos, como aulas de
          cursos externos, estágio, trabalho, etc.
        </h2>
        <Calendar />
        <a href="#selectCourses">
          <button className="focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-orange-400 dark:text-white px-16 py-2 font-bold  mt-16 border-orange-400 border-2 rounded-md hover:bg-orange-400 hover:text-white transition-all">
            Próximo
          </button>
        </a>
      </section>
      <section
        id="selectCourses"
        className="min-h-screen flex flex-col justify-center items-center p-24"
      >
        <h1 className="text-4xl text-sky-500 mt-8 mb-10 font-bold">
          Matérias
        </h1>
      </section>
    </div>
  );
}

export default App;

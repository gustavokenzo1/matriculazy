import { useEffect, useState } from "react";
import "./global.css";
import Calendar from "./components/Calendar";
import DarkModeToggle from "./components/DarkModeToggle";
import api from "./services/api";

interface IUniversity {
  id: string;
  initials: string;
  name: string;
  url: string;
}

function App() {
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);

  useEffect(() => {
    async function getUniversities() {
      const response = await api.get("/university");
      setUniversities(await response.data.universities.reverse());
    }

    getUniversities();
  }, []);

  async function getCourses(initials: string) {
    setIsLoadingCourses(true);

    const response = await api.get(`/university/${initials}`);
    setCourses(await response.data.university.courses);

    setIsLoadingCourses(false);
  }

  return (
    <div className="font-roboto dark:bg-stone-900 max-w-screen min-h-screen flex flex-col transition-all">
      <DarkModeToggle />
      <section className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-8xl font-bold dark:text-stone-100 text-stone-800">
          MatricuLazy
        </h1>
        <h2 className="text-2xl dark:text-stone-300  text-stone-700 mt-8 mb-10 font-bold">
          GERADOR DE GRADE HORÁRIA PARA PESSOAS PREGUIÇOSAS
        </h2>
        <a href="#selectUniversity">
          <button className="focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold border-stone-800 dark:border-stone-200  border-2 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all">
            Começar
          </button>
        </a>
      </section>
      <section
        id="selectUniversity"
        className="h-screen flex flex-row justify-around p-16"
      >
        <div className="flex flex-col justify-center w-1/2 p-16">
          <h1 className="text-5xl text-stone-800 dark:text-stone-100 mt-8 mb-10 font-bold">
            Selecione a Universidade
          </h1>
          <p className="text-xl dark:text-white">
            O MatricuLazy funciona para universidades que utilizam o Sistema
            Integrado de Gestão de Atividades Acadêmicas (SIGAA). A coleta de
            dados é feita sob demanda, ou seja, caso a sua universidade ainda
            não apareça na lista, você pode solicitar logo abaixo:
          </p>
          <button className="focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold border-stone-800 dark:border-stone-200  border-2 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all w-1/2 mt-8">
            Solicitar
          </button>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 p-16">
          <select
            name="university"
            id="university"
            className="p-4 w-3/4 cursor-pointer rounded-md focus:outline-2 focus:outline-stone-800"
            onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
              getCourses(e.target.value);
            }}
          >
            <option value="">Selecione a Universidade</option>
            {universities.map((university: IUniversity) => (
              <option key={university.id} value={university.initials}>
                {university.name}
              </option>
            ))}
          </select>
          <a href="#selectOccupied">
            <button className="focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold border-stone-800 dark:border-stone-200  border-2 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all mt-8">
              Próximo
            </button>
          </a>
        </div>
      </section>
      <section
        id="selectOccupied"
        className="min-h-screen flex flex-col justify-center items-center p-24"
      >
        <h1 className="text-5xl text-stone-800 dark:text-stone-200 mt-8 mb-10 font-bold">
          Horários Ocupados
        </h1>
        <h2 className="text-xl dark:text-white mb-12">
          Selecione os horários em que você possui compromissos, como aulas de
          cursos externos, estágio, trabalho, etc.
        </h2>
        <Calendar />
        <a href="#selectCourses">
          <button className="focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold  mt-16 dark:border-stone-200 border-stone-800 border-2 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all">
            Próximo
          </button>
        </a>
      </section>
      <section
        id="selectCourses"
        className="min-h-screen flex flex-col justify-center items-center p-24"
      >
        <h1 className="text-4xl text-stone-800 dark:text-stone-200 mt-8 mb-10 font-bold">
          Matérias
        </h1>
        {isLoadingCourses ? (
          <h1 className="text-2xl text-stone-800 mt-8 mb-10">
            Por favor, aguarde enquanto carregamos as matérias...
          </h1>
        ) : (
          <h1>TODO</h1>
        )}
      </section>
    </div>
  );
}

export default App;

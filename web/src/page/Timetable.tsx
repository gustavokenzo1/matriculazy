import { useEffect, useState } from "react";
import api from "../services/api";

interface IUniversity {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IDepartment {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  universityId: string;
}

interface ICourse {
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
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<IUniversity>();
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<IDepartment>();
  const [departmentCourses, setDepartmentCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    async function fetchUniversities() {
      try {
        const response = await api.get("/universities");
        const data = response.data;

        setUniversities(data);
      } catch (error) {
        console.log("Erro ao listar universidades");
      }
    }

    fetchUniversities();
  }, []);

  async function handleUniversitySelection(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    setSelectedUniversity(
      universities.find((university) => university.name === e.target.value)
    );

    try {
      const response = await api.get("/departments", {
        data: {
          university: e.target.value,
        },
      });

      const departments = response.data;
      setDepartments(departments);
    } catch (error) {
      console.log("Erro ao listar departamentos da universidade.");
    }
  }

  async function handleDepartmentSelection(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    setSelectedDepartment(
      departments.find((department) => (department.name = e.target.value))
    );

    try {
      const response = await api.get("/courses/department", {
        data: {
          department: e.target.value,
          university: selectedUniversity?.name,
        },
      });

      const courses = response.data;

      setDepartmentCourses(courses);
    } catch (error) {
      console.log("Erro ao listar os cursos do departamento");
    }
  }

  return (
    <div className="font-gt dark:bg-[#1a1a1a] bg-[#f5f5f5] dark:text-white text-[#1a1a1a] transition-colors">
      <section className="flex flex-col items-center">
        <h1 className="text-center text-5xl font-medium mt-16">
          Gerador de Grade Horária
        </h1>
        <div className="flex flex-col items-start w-full mt-20 p-10 gap-10">
          <div className="w-full flex gap-8">
            <p className="text-2xl">
              Selecione a universidade em que você estuda:
            </p>
            <select
              name="university"
              className="text-black px-4 py-2 rounded cursor-pointer"
              onChange={handleUniversitySelection}
            >
              <option value="">Selecione uma universidade</option>
              {universities.map((university) => (
                <option key={university.id} value={university.name}>
                  {university.name}
                </option>
              ))}
            </select>
          </div>
          {selectedUniversity && (
            <div>
              <div className="flex font-medium text-xl gap-4 items-center">
                <span className="text-primary-500">
                  Universidade Selecionada:
                </span>
                <span>{selectedUniversity.name}</span>
              </div>
              <div className="flex font-medium text-xl gap-4 items-center">
                <span className="text-primary-500">Link de coleta:</span>
                <a
                  href={selectedUniversity.url}
                  className="text-brand-500"
                  target="_blank"
                >
                  {selectedUniversity.url}
                </a>
              </div>
              <div className="flex font-medium text-xl gap-4 items-center">
                <span className="text-primary-500">
                  Data de adição ao MatricuLazy:
                </span>
                <span>
                  {new Date(selectedUniversity.createdAt).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex font-medium text-xl gap-4 items-center">
                <span className="text-primary-500">Última atualização:</span>
                <span>
                  {new Date(selectedUniversity.updatedAt).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
      {departments.length > 0 && (
        <section className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mt-10">Matérias</h1>
          <p className="text-2xl font-medium mt-10">
            Aqui você poderá selecionar as matérias que deseja cursar no próximo
            semestre!
          </p>
          <p className="text-xl font-medium my-6">
            Você tem duas opções: procurar pelo nome da matéria ou ir navegando
            pelos departamentos.
          </p>
          <div className="flex w-full justify-evenly m-20">
            <div className="flex flex-col gap-4 w-1/3">
              <h1>Digite o nome da matéria:</h1>
              <input type="text" />
            </div>
            <div className="flex flex-col gap-8 w-1/3">
              <div className="flex flex-col gap-4">
                <h1 className="text-xl font-medium">Departamento:</h1>
                <select
                  onChange={handleDepartmentSelection}
                  className="text-black px-4 py-2 rounded"
                >
                  <option value="">Selecione um departamento:</option>
                  {departments.map((department) => {
                    return (
                      <option key={department.id} value={department.name}>
                        {department.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {selectedDepartment && (
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-medium">Matérias:</h1>
                  <select className="text-black px-4 py-2 rounded">
                    <option value="">Selecione uma matéria:</option>
                    {departmentCourses.map((course) => {
                      return (
                        <option key={course.id} value={course.name}>
                          {course.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

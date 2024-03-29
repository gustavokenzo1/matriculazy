import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IDepartment, IUniversity } from "../../pages/Timetable";
import api from "../../services/api";
import { TailSpin } from "react-loader-spinner";
import { Alert } from "../Alert";

interface UniversityPopUpProps {
  setSelectedUniversity: (university: IUniversity) => void;
  selectedUniversity: IUniversity;
  setStep: (step: number) => void;
  setDepartments: (departments: IDepartment[]) => void;
  setFilteredDepartments: (departments: IDepartment[]) => void;
}

export const UniversityPopUp = ({
  setSelectedUniversity,
  selectedUniversity,
  setStep,
  setDepartments,
  setFilteredDepartments,
}: UniversityPopUpProps) => {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    async function getUniversities() {
      try {
        const { data } = await api.get("/universities");
        setUniversities(data);
      } catch (error) {
        setShowAlert(true);
      }
    }

    getUniversities();
  }, []);

  async function getDepartments() {
    const response = await api.get("/departments", {
      params: {
        university: selectedUniversity.name,
      },
    });

    setDepartments(response.data);
    setFilteredDepartments(response.data);
  }

  async function handleSelectUniversity(e: React.ChangeEvent) {
    const { value } = e.target as HTMLSelectElement;

    if (value.length > 0) {
      const university = universities.find((el) => el.id === value);

      setSelectedUniversity(university as IUniversity);
    } else {
      setSelectedUniversity({} as IUniversity);
    }
  }

  async function handleClick(e: React.FormEvent) {
    e.preventDefault();

    if (selectedUniversity.id) {
      getDepartments();
      setStep(1);
    }
  }

  return (
    <motion.form
      className="flex flex-col items-start p-8 m-8 dark:bg-[#1b1b1b] absolute shadow-secondary-500/25 shadow-xl rounded-lg"
      initial={{ opacity: 0, y: "-50vh" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-50vh" }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
    >
      <h1 className="text-4xl font-bold">Vamos começar?</h1>
      <label htmlFor="university" className="text-2xl mt-10">
        Selecione a Universidade em que você estuda:
      </label>
      {universities.length > 0 ? (
        <select
          name="university"
          id="university"
          className="w-full md:w-2/3 mt-6 self-center text-black p-2 focus:outline-none rounded focus:ring focus:ring-brand-500 dark:bg-stone-800 dark:text-white"
          onChange={handleSelectUniversity}
        >
          <option value="">Selecione uma universidade</option>
          {universities.map((university) => (
            <option key={university.id} value={university.id}>
              {university.name}
            </option>
          ))}
        </select>
      ) : (
        <TailSpin
          height="30"
          width="30"
          color="#9922ff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperClass="self-center mt-6"
          visible={true}
        />
      )}
      <button
        className="self-center mt-8 bg-brand-500 disabled:bg-brand-500/50 text-white px-20 py-2 rounded-lg font-bold"
        disabled={!selectedUniversity}
        onClick={handleClick}
      >
        Avançar
      </button>
      {showAlert && (
        <Alert
          message="Ocorreu um erro ao carregar as universidades, tente novamente mais tarde"
          setShowAlert={setShowAlert}
        />
      )}
    </motion.form>
  );
};

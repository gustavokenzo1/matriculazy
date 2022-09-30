import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { UniversityPopUp } from "../components/timetable/UniversityPopUp";
import { SideBar } from "../components/timetable/SideBar";
import { CoursePopUp } from "../components/timetable/CoursePopUp";
import { DepartmentPopUp } from "../components/timetable/DepartmentPopUp";
import { CourseCard } from "../components/timetable/CourseCard";
import { Calendar } from "../components/timetable/Calendar";
import api from "../services/api";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, List } from "phosphor-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import useDarkMode from "../hooks/useDarkMode";

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

  const [selectedCourses, setSelectedCourses] = useState<ICourse[][]>([]);
  const timetableRef = useRef(null);

  const [selectedUniversity, setSelectedUniversity] = useState<IUniversity>(
    {} as IUniversity
  );
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<IDepartment[]>(
    []
  );

  const [showCoursePopUp, setShowCoursePopUp] = useState(false);
  const [searchSubjectResults, setSearchSubjectResults] = useState<ICourse[]>(
    []
  );

  const [showDepartmentPopUp, setShowDepartmentPopUp] = useState(false);
  const [selectedDepartmentCourses, setSelectedDepartmentCourses] = useState<
    ICourse[]
  >([]);

  const [finalResults, setFinalResults] = useState<ICourse[][]>([]);

  const isMobile = window.innerWidth <= 768;
  const [showSideBar, setShowSideBar] = useState(!isMobile);
  const [resultToShow, setResultToShow] = useState(0);

  function handleClosePopUps() {
    setShowCoursePopUp(false);
    setShowDepartmentPopUp(false);
    setShowSideBar(false);
  }

  function handleDeleteSelectedCourse(course: ICourse) {
    const newSelectedCourses = selectedCourses.filter(
      (c) => c[0].name !== course.name
    );

    setSelectedCourses(newSelectedCourses);
  }

  function handleFelizometro() {
    switch (selectedCourses.length) {
      case 1:
        return "😁";
      case 2:
        return "😀";
      case 3:
        return "🙂";
      case 4:
        return "😐";
      case 5:
        return "🤨";
      case 6:
        return "🥴";
      case 7:
        return "😳";
      default:
        return "🤣".repeat(selectedCourses.length - 7);
    }
  }

  async function makeTimetable() {
    const finalCourses = selectedCourses.flat(1);
    const timetables = await api.post("/courses/timetable", {
      courses: finalCourses,
    });

    setFinalResults(timetables.data);
  }

  function handleReduceResultToShow() {
    if (resultToShow > 0) {
      setResultToShow(resultToShow - 1);
    }
  }

  function handleIncreaseResultToShow() {
    if (resultToShow < finalResults.length - 1) {
      setResultToShow(resultToShow + 1);
    }
  }

  async function handleDownload() {
    const timetable = timetableRef.current;
    const canvas = await html2canvas(timetable!);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const properties = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (properties.height * pdfWidth) / properties.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("grade_horaria.pdf");
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center font-gt dark:bg-[#0f0f0f] bg-[#f5f5f5] dark:text-white text-[#121214] transition-colors">
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
        <div className="flex w-full">
          {!isMobile ? (
            <SideBar
              selectedUniversity={selectedUniversity}
              departments={departments}
              filteredDepartments={filteredDepartments}
              setFilteredDepartments={setFilteredDepartments}
              setSearchSubjectResults={setSearchSubjectResults}
              setShowCoursePopUp={setShowCoursePopUp}
              setSelectedDepartmentCourses={setSelectedDepartmentCourses}
              setShowDepartmentPopUp={setShowDepartmentPopUp}
            />
          ) : (
            <div className="absolute top-0 m-4">
              <AnimatePresence mode="wait">
                {!showSideBar ? (
                  <List size={24} onClick={() => setShowSideBar(true)} />
                ) : (
                  <SideBar
                    key="sidebar"
                    selectedUniversity={selectedUniversity}
                    departments={departments}
                    filteredDepartments={filteredDepartments}
                    setFilteredDepartments={setFilteredDepartments}
                    setSearchSubjectResults={setSearchSubjectResults}
                    setShowCoursePopUp={setShowCoursePopUp}
                    setSelectedDepartmentCourses={setSelectedDepartmentCourses}
                    setShowDepartmentPopUp={setShowDepartmentPopUp}
                    setShowSideBar={setShowSideBar}
                  />
                )}
              </AnimatePresence>
            </div>
          )}
          <div
            className="flex flex-col p-8 items-start w-full"
            onClick={handleClosePopUps}
          >
            <motion.h1
              className="text-4xl font-bold text-brand-500 mt-10 md:mt-0"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Gerador de Grade Horária
            </motion.h1>
            <div className="mt-10 flex flex-col w-full">
              <motion.h2
                className="text-2xl font-medium"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Matérias Selecionadas:
              </motion.h2>
              {selectedCourses.length > 0 ? (
                <div className="flex flex-col gap-10">
                  <div className="flex lg:flex-row flex-col items-center gap-10">
                    <motion.div
                      className="flex flex-col w-full md:w-fit gap-6 h-[400px] mt-10 bg-stone-200 p-6 rounded dark:bg-stone-800 overflow-y-scroll scrollbar-thin scrollbar-thumb-brand-500 scrollbar-track-stone-300 dark:scrollbar-track-stone-800 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      {selectedCourses.map((courses) => (
                        <CourseCard
                          key={courses[0].id}
                          courses={courses}
                          handleDeleteSelectedCourse={
                            handleDeleteSelectedCourse
                          }
                        />
                      ))}
                    </motion.div>
                    <div className="flex flex-col items-center gap-10 self-center mt-10">
                      <motion.p
                        className="text-xl font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                      >
                        Total de matérias: {selectedCourses.length}
                      </motion.p>
                      <motion.p
                        className="text-xl font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.3 }}
                      >
                        Felizômetro: {handleFelizometro()}
                      </motion.p>
                      <a href="#table">
                        <motion.button
                          className="bg-brand-500 text-white font-bold py-2 px-4 rounded w-[200px] hover:brightness-90 transition-colors"
                          onClick={makeTimetable}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1, delay: 1.6 }}
                        >
                          Gerar Grade Horária
                        </motion.button>
                      </a>
                      <motion.button
                        className="bg-brand-500 text-white font-bold py-2 px-4 rounded w-[200px] hover:brightness-90 transition-colors"
                        onClick={() => {
                          setSelectedCourses([]);
                          setFinalResults([]);
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.9 }}
                      >
                        Limpar tudo
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.p
                  className="mt-8 text-xl font-medium"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  Você ainda não selecionou nenhuma matéria :)
                </motion.p>
              )}
            </div>
          </div>
        </div>
      )}
      {showCoursePopUp && (
        <CoursePopUp
          searchSubjectResults={searchSubjectResults}
          setShowCoursePopUp={setShowCoursePopUp}
          setSelectedCourses={setSelectedCourses}
          selectedCourses={selectedCourses}
          setShowSideBar={setShowSideBar}
        />
      )}
      {showDepartmentPopUp && (
        <DepartmentPopUp
          setShowDepartmentPopUp={setShowDepartmentPopUp}
          selectedDepartmentCourses={selectedDepartmentCourses}
          setSelectedCourses={setSelectedCourses}
          selectedCourses={selectedCourses}
          setShowSideBar={setShowSideBar}
        />
      )}
      {finalResults.length > 0 && (
        <div className="flex items-center justify-center w-4/5">
          <div id="table" className="flex flex-col items-center my-10 w-full">
            <h1 className="text-2xl font-medium">
              Foram geradas {finalResults.length} grades horárias!
            </h1>
            <div className="flex items-center gap-8 my-10 text-2xl">
              <ArrowLeft
                className="cursor-pointer"
                onClick={handleReduceResultToShow}
              />
              <p className="font-medium text-lg">
                {resultToShow + 1} de {finalResults.length}
              </p>
              <ArrowRight
                className="cursor-pointer"
                onClick={handleIncreaseResultToShow}
              />
            </div>
            <button
              className="bg-brand-500 text-white font-bold py-2 px-4 rounded w-[200px] hover:brightness-90 transition-colors mb-8"
              onClick={handleDownload}
            >
              Baixar PDF
            </button>
            <div
              className="w-full overflow-auto flex justify-center flex-col items-center"
              ref={timetableRef}
            >
              <h1 className="text-4xl my-10 font-bold text-secondary-500">
                Gerado pelo MatricuLazy
              </h1>
              <a
                href="https://matriculazy.vercel.app/"
                className="text-2xl mb-10 text-primary-500 font-medium"
              >
                https://matriculazy.vercel.app/
              </a>
              <Calendar
                finalResults={finalResults}
                resultToShow={resultToShow}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

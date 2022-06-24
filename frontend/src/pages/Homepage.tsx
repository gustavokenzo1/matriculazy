import { useEffect, useState } from "react";
import api from "../services/api";
import CalendarSection from "../sections/CalendarSection";
import SelectCoursesSection from "../sections/SelectCoursesSection";
import HomeSection from "../sections/HomeSection";
import SelectUniversitySection from "../sections/SelectUniversitySection";
import TeachersSection, { ICourse } from "../sections/TeachersSection";
import SummarySection from "../sections/SummarySection";

function Homepage() {
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [fixedCourses, setFixedCourses] = useState<ICourse[]>([]);
  const [occupied, setOccupied] = useState<String[]>([]);

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
      <section
        id="home"
        className="h-screen flex flex-col items-center justify-center"
      >
        <HomeSection />
      </section>
      <section
        id="selectUniversity"
        className="h-screen flex flex-col md:justify-around justify-center md:gap-0 gap-10 p-8 lg:flex-row sm:p-16"
      >
        <SelectUniversitySection
          universities={universities}
          getCourses={getCourses}
          courses={courses}
        />
      </section>
      <section
        id="selectOccupied"
        className="min-h-screen flex flex-col justify-center items-center p-24"
      >
        <CalendarSection occupied={occupied} setOccupied={setOccupied} />
      </section>
      <section
        id="selectCourses"
        className="min-h-screen flex flex-col justify-center items-center p-24"
      >
        <SelectCoursesSection
          courses={courses}
          isLoadingCourses={isLoadingCourses}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
        />
      </section>
      <section
        id="selectTeachers"
        className="min-h-screen flex flex-col justify-center items-center p-24"
      >
        <TeachersSection
          selectedCourses={selectedCourses}
          courses={courses}
          fixedCourses={fixedCourses}
          setFixedCourses={setFixedCourses}
        />
      </section>
      <section
        id="summary"
        className="min-h-screen flex flex-col justify-center items-center p-24"
      >
        <SummarySection
          occupied={occupied}
          selectedCourses={selectedCourses}
          fixedCourses={fixedCourses}
          courses={courses}
        />
      </section>
    </div>
  );
}

export default Homepage;

import { useEffect, useState } from "react";
import "./global.css";
import DarkModeToggle from "./components/DarkModeToggle";
import api from "./services/api";
import CalendarSection from "./sections/CalendarSection";
import SelectCoursesSection from "./sections/SelectCoursesSection";
import HomeSection from "./sections/HomeSection";
import SelectUniversitySection from "./sections/SelectUniversitySection";

export interface IUniversity {
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
        <HomeSection />
      </section>
      <section
        id="selectUniversity"
        className="h-screen flex flex-row justify-around p-16"
      >
        <SelectUniversitySection
          universities={universities}
          getCourses={getCourses}
        />
      </section>
      <section
        id="selectOccupied"
        className="min-h-screen flex flex-col justify-center items-center p-24"
      >
        <CalendarSection />
      </section>
      <section
        id="selectCourses"
        className="min-h-screen flex flex-col justify-center items-center p-24"
      >
        <SelectCoursesSection
          courses={courses}
          isLoadingCourses={isLoadingCourses}
        />
      </section>
    </div>
  );
}

export default App;

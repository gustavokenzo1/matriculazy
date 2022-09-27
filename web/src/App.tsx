import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DarkModeToggle from "./components/ThemeToggle";
import { Home } from "./page/Home";
import { Timetable } from "./page/Timetable";

function App() {
  return (
    <Router>
      <DarkModeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timetable" element={<Timetable />} />
      </Routes>
    </Router>
  );
}

export default App;

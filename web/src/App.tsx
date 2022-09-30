import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DarkModeToggle from "./components/ThemeToggle";
import { Home } from "./pages/Home";
import { Timetable } from "./pages/Timetable";

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

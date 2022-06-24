import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DarkModeToggle from "./components/DarkModeToggle";
import Homepage from "./pages/Homepage";
import "./global.css";
import Result from "./pages/Result";

export interface IUniversity {
  id: string;
  initials: string;
  name: string;
  url: string;
}

function App() {
  return (
    <>
      <DarkModeToggle />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

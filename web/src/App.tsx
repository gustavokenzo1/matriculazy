import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DarkModeToggle from "./components/ThemeToggle";
import { Home } from "./page/Home";

function App() {
  return (
    <Router>
      <DarkModeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

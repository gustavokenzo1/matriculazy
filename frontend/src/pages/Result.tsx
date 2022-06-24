import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Timetable {
  classroom: string;
  code: string;
  createdAt: string;
  department: string;
  id: string;
  location: string;
  name: string;
  occupied: number;
  offers: number;
  period: string;
  schedule: string[];
  simplifiedSchedule: string[][];
  teacher: string;
  university: string;
  updatedAt: string;
}

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  // @ts-ignore
  const timetables = location.state.timetables;

  useEffect(() => {
    if (!timetables) {
      navigate("/");
    }
  }, []);

  return <h1>result</h1>;
}

export default Result;

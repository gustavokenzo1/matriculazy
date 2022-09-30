import { useState } from "react";
import { ICourse } from "../../page/Timetable";

interface CalendarProps {
  finalResults: ICourse[][];
}

export const Calendar = ({ finalResults }: CalendarProps) => {
  const days = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  const [resultToShow, setResultToShow] = useState(0);

  return (
    <table className="table-fixed">
      <thead>
        <tr>
          <th></th>
          {days.map((day) => (
            <th className="p-2 border" key={day}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {hours.map((hour) => {
          return (
            <tr key={hour}>
              <td className="border p-2">{hour}</td>
              {days.map((day) => {
                return (
                  <td key={`${day} ${hour}`} className="border p-2">
                    {finalResults[resultToShow].map((course) => {
                      if (
                        course.simplifiedSchedule.includes(`${day} ${hour}`)
                      ) {
                        return (
                          <div
                            key={course.name}
                            className="text-white rounded-md p-2 font-medium flex flex-col gap-4 text-center"
                          >
                            <p>{course.name}</p>
                            <p>{course.teacher}</p>
                          </div>
                        );
                      }
                    })}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

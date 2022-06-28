import { Dispatch, useState } from "react";
import { CalendarSectionProps } from "../sections/CalendarSection";

export const days: String[] = [
  "",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
export const hours: String[] = [
  "07:00",
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
  "23:00",
];

interface IDay {
  index: number;
  hour: String;
  setOccupied: Dispatch<String[]>;
  occupied: String[];
}

function Day({ index, hour, setOccupied, occupied }: IDay) {
  const handleOccupied = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: String = e.target.value;
    const newOccupied = [...occupied];

    if (!newOccupied.includes(value)) {
      newOccupied.push(value);
    } else {
      newOccupied.splice(newOccupied.indexOf(value), 1);
    }

    setOccupied(newOccupied);
  };
  return (
    <tr key={`${hour}`}>
      <td className="border-b border-slate-200 dark:border-slate-700 p-2 md:p-4 pl-4 md:pl-8 text-slate-800  dark:text-slate-200">
        {hour}
      </td>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <td
            className="border-b text-center border-slate-200 dark:border-slate-700 p-2 md:p-4 pl-6 md:pl-8 text-slate-500 dark:text-slate-400"
            key={`${days[index + 1]} às ${hour}`}
          >
            <input
              onChange={handleOccupied}
              type="checkbox"
              className="w-4 h-4 md:w-8 md:h-8 cursor-pointer"
              value={`${days[index + 1]} às ${hour}`}
            />
          </td>
        ))}
    </tr>
  );
}

function Calendar({ occupied, setOccupied }: CalendarSectionProps) {
  return (
    <div className="flex items-center justify-center">
      <table className="border-collapse table-auto w-full text-xs md:text-sm">
        <thead>
          <tr>
            {days.map((day, index) => (
              <th
                className="border-b border-stone-800 dark:border-stone-200 font-medium p-0 md:p-4 pl-2 md:pl-8 pt-0 pb-0 md:pb-3 text-stone-800 dark:text-white text-left"
                key={`${day}`}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, index) => (
            <Day
              index={index}
              hour={hour}
              setOccupied={setOccupied}
              occupied={occupied}
              key={`${hour}`}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;

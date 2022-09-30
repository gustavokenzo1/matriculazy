import { ArrowLeft, ArrowRight } from "phosphor-react";
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
    "8:00",
    "9:00",
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

  function getFirstLetters(name: string) {
    const words = name.split(" ");
    const firstLetters = words.map((word) => {
      if (word.length > 2) {
        return word[0];
      } else if (Number(word)) {
        return word;
      }
    });
    return firstLetters.join("");
  }

  function getFirstTwoNames(name: string) {
    const words = name.split(" ");
    if (words[1].length > 2) {
      return words[0] + "\n" + words[1];
    } else {
      return words[0] + " " + words[1] + "\n" + words[2];
    }
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

  return (
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
      <table className="table-auto w-4/5 self-center rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="w-[75px]"></th>
            {days.map((day) => (
              <th
                className="p-2 bg-brand-500 border border-brand-500/25 dark:border-brand-500/50 text-white"
                key={day}
              >
                {day.split("-")[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => {
            return (
              <tr key={hour}>
                <td className="p-2 bg-brand-500 text-white w-[50px] text-center font-bold">
                  {hour}
                </td>
                {days.map((day) => {
                  return (
                    <td
                      key={`${day} ${hour}`}
                      className="p-2 border border-brand-500/25 dark:border-brand-500/50"
                    >
                      {finalResults[resultToShow].map((course) => {
                        if (
                          course.simplifiedSchedule.includes(`${day} ${hour}`)
                        ) {
                          return (
                            <div
                              key={`${course.id} ${day} ${hour}`}
                              className="dark:text-white rounded-md p-2 font-medium flex flex-col gap-2 text-center"
                            >
                              <p>{getFirstLetters(course.name)}</p>
                              <p>{getFirstTwoNames(course.teacher)}</p>
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
    </div>
  );
};

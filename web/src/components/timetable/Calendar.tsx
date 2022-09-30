import { ICourse } from "../../pages/Timetable";

interface CalendarProps {
  finalResults: ICourse[][];
  resultToShow: number;
}

export const Calendar = ({ finalResults, resultToShow }: CalendarProps) => {
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

  return (
    <table className="table-auto w-4/5 self-center rounded-lg">
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
                            className="bg-brand-500 text-white rounded-md p-2 font-medium flex flex-col gap-2 text-center"
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
  );
};

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Graph = () => {
  const data = [
    {
      name: "Antes da matrícula",
      "Usuário Médio do MatricuLazy": 7,
      Leigo: 6,
    },
    {
      name: "Antes da matrícula",
      "Usuário Médio do MatricuLazy": 6,
      Leigo: 7,
    },
    {
      name: "Antes da matrícula",
      "Usuário Médio do MatricuLazy": 7,
      Leigo: 6,
    },
    {
      name: "1 dia antes",
      "Usuário Médio do MatricuLazy": 10,
      Leigo: 4,
    },
    {
      name: "Dia M",
      "Usuário Médio do MatricuLazy": 8,
      Leigo: 3,
    },
    {
      name: "Depois da matrícula",
      "Usuário Médio do MatricuLazy": 7,
      Leigo: 5,
    },
    {
      name: "Depois da matrícula",
      "Usuário Médio do MatricuLazy": 7.5,
      Leigo: 6,
    },
    {
      name: "Depois da matrícula",
      "Usuário Médio do MatricuLazy": 8,
      Leigo: 7,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Usuário Médio do MatricuLazy"
          stroke="#dd22cc"
        />
        <Line type="monotone" dataKey="Leigo" stroke="orange" />
      </LineChart>
    </ResponsiveContainer>
  );
};

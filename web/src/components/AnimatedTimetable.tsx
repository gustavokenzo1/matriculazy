import { motion } from "framer-motion";
import { ExampleItem } from "./ExampleItem";

export const AnimatedTimetable = () => {
  return (
    <motion.div
      className={`bg-brand-500 rounded-xl shadow-lg py-8 px-4 md:p-8 grid grid-cols-5 gap-x-4 gap-y-10 md:gap-10 overflow-hidden shadow-brand-500/40`}
      animate={{
        height: [110, 200, 300, 300, 200, 110],
        opacity: 1,
      }}
      transition={{
        times: [0, 0.1, 0.2, 0.8, 0.9, 1],
        duration: 6,
        loop: Infinity,
        delay: 2.5,
        repeatDelay: 2,
      }}
    >
      <ExampleItem text="Seg" />
      <ExampleItem text="Ter" />
      <ExampleItem text="Qua" />
      <ExampleItem text="Qui" />
      <ExampleItem text="Sex" />
      {/* Second row */}
      <ExampleItem text="C1" />
      <ExampleItem text="" />
      <ExampleItem text="APC" />
      <ExampleItem text="TEP" />
      <ExampleItem text="" />
      {/* Third row */}
      <ExampleItem text="DIAC" />
      <ExampleItem text="OO" />
      <ExampleItem text="" />
      <ExampleItem text="TCC" />
      <ExampleItem text="TED" />
    </motion.div>
  );
};

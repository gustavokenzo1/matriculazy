import { ExampleItem } from "../components/ExampleItem";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <div className="w-screen flex flex-col items-center font-gt dark:bg-[#1a1a1a] bg-white dark:text-white text-[#1a1a1a] transition-colors">
      <section className="flex min-h-screen w-screen">
        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-6 ml-20">
            <h1 className="text-8xl font-bold">MatricuLazy</h1>
            <p className="text-3xl text-primary-500 font-medium">
              Um gerador de grade horária para pessoas preguiçosas.
            </p>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <motion.div
            className="bg-brand-500 rounded-xl shadow-lg p-8 grid grid-cols-3 gap-10 transition overflow-hidden"
            animate={{
              height: [100, 200, 300, 300, 200, 100],
            }}
            transition={{
              times: [0, 0.1, 0.2, 0.8, 0.9, 1],
              duration: 6,
              loop: Infinity,
              delay: 0.5,
              repeatDelay: 2,
            }}
          >
            <ExampleItem text="Seg" position={0} />
            <ExampleItem text="Qua" position={0} />
            <ExampleItem text="Qui" position={0} />
            {/* Second row */}
            <ExampleItem text="C1" position={1} />
            <ExampleItem text="" position={1} />
            <ExampleItem text="APC" position={1} />
            {/* Third row */}
            <ExampleItem text="DIAC" position={2} />
            <ExampleItem text="OO" position={2} />
            <ExampleItem text="" position={2} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

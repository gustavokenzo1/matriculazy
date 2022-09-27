import { motion } from "framer-motion";
import { ArrowRight } from "phosphor-react";
import { ExampleItem } from "../components/ExampleItem";

import sigaa from "/sigaa.png";

export const Home = () => {
  return (
    <div className="font-gt dark:bg-[#1a1a1a] bg-[#f5f5f5] dark:text-white text-[#1a1a1a] transition-colors">
      <section className="flex min-h-screen">
        <div className="w-1/2 flex flex-col items-center justify-center p-20">
          <div className="flex flex-col gap-4 ml-10">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-8xl font-bold"
            >
              MatricuLazy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-4xl text-primary-500 font-bold mb-4"
            >
              Um gerador de grade horária para pessoas preguiçosas.
            </motion.p>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              href="#about"
              className="flex items-center gap-2 text-2xl font-bold text-secondary-500 hover:gap-4 transition-all"
            >
              <span>Conheça mais</span>
              <ArrowRight size={24} weight="duotone" />
            </motion.a>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              href=""
              className="flex items-center gap-2 text-2xl font-bold text-secondary-500 hover:gap-4 transition-all"
            >
              <span>Montar grade horária</span>
              <ArrowRight size={24} weight="duotone" />
            </motion.a>
          </div>
        </div>
        <motion.div
          className="w-1/2 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            className={`bg-brand-500 rounded-xl shadow-lg p-8 grid grid-cols-5 gap-10 overflow-hidden shadow-brand-500/50`}
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
        </motion.div>
      </section>
      <section className="flex flex-col items-center" id="about">
        <div className="my-20 self-start ml-32">
          <motion.h1
            className="text-6xl font-bold"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-secondary-500">
              Funciona em qualquer Universidade
            </span>
            <br /> que utiliza o SIGAA.
          </motion.h1>
          <motion.p
            className="text-3xl w-1/2 mt-10 font-medium"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            O MatricuLazy foi feito para coletar dados do SIGAA de maneira
            automatizada. Basta que a listagem de disciplinas possua o campo de{" "}
            <span className="text-primary-500 font-bold">Horário</span>:
          </motion.p>
        </div>
        <motion.img
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="mb-10 rounded-xl shadow-2xl"
          src={sigaa}
          alt="Exemplo do SIGAA da Universidade de Brasília que possui o campo de horário."
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center gap-4 text-2xl mb-10 font-medium text-secondary-500 hover:brightness-75 cursor-pointer transition-colors"
        >
          Minha Universidade atende a esse requisito, como faço para incluí-la
          no MatricuLazy? <ArrowRight />
        </motion.p>
      </section>
    </div>
  );
};

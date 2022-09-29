import { motion } from "framer-motion";
import { ArrowRight } from "phosphor-react";
import { AnimatedTimetable } from "../components/home/AnimatedTimetable";
import { Graph } from "../components/home/Graph";

import sigaa from "/sigaa.png";

export const Home = () => {
  return (
    <div className="font-gt dark:bg-[#1a1a1a] bg-[#f5f5f5] dark:text-white text-[#1a1a1a] transition-colors ">
      <section className="flex min-h-screen items-center gap-10 lg:gap-0 flex-col lg:flex-row">
        <div className="w-1/2 flex flex-col items-center justify-center p-10 lg:p-20">
          <div className="flex flex-col gap-4 lg:ml-10">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-8xl font-bold mt-20 lg:mt-0"
            >
              MatricuLazy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-2xl md:text-4xl text-primary-500 font-bold mb-4"
            >
              Um gerador de grade horária para pessoas preguiçosas.
            </motion.p>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              href="#about"
              className="flex items-center gap-2 text-xl md:text-2xl font-bold dark:text-secondary-500 hover:gap-4 transition-all"
            >
              <span>Conheça mais</span>
              <ArrowRight size={24} weight="duotone" />
            </motion.a>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              href="/timetable"
              className="flex items-center gap-2 text-xl md:text-2xl font-bold dark:text-secondary-500 hover:gap-4 transition-all"
            >
              <span>Montar grade horária</span>
              <ArrowRight size={24} weight="duotone" />
            </motion.a>
          </div>
        </div>
        <motion.div
          className="w-4/5 lg:w-1/2 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <AnimatedTimetable />
        </motion.div>
      </section>
      <section
        className="flex flex-col min-h-screen items-center justify-center"
        id="about"
      >
        <div className="flex gap-8 lg:gap-10 flex-col lg:flex-row items-center p-4 md:p-10">
          <div className="w-[95%] lg:w-1/2 flex flex-col md:ml-20">
            <motion.h1
              className="text-4xl lg:text-6xl font-bold"
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
              className="text-xl md:text-3xl mt-10 font-medium"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              O MatricuLazy foi feito para coletar dados do SIGAA de maneira
              automatizada. Basta que a listagem de disciplinas possua o campo
              de <span className="text-primary-500 font-bold">Horário</span>:
            </motion.p>
          </div>
          <motion.img
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="w-4/5 md:w-2/3 lg:w-1/2 rounded-xl"
            src={sigaa}
            alt="Exemplo do SIGAA da Universidade de Brasília que possui o campo de horário."
          />
        </div>
        <div className="flex flex-col items-center mt-10 md:mt-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
            className="text-center gap-4 w-4/5 text-md md:text-2xl mb-10 font-medium text-secondary-500 hover:brightness-75 cursor-pointer transition-colors"
          >
            Minha Universidade atende a esse requisito, como faço para incluí-la
            no MatricuLazy?
          </motion.p>
          <a href="#advantages">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
              className="text-md md:text-2xl font-bold flex items-center gap-4 text-secondary-500"
            >
              Ver Vantagens <ArrowRight />
            </motion.p>
          </a>
        </div>
      </section>
      <section
        id="advantages"
        className="flex flex-col items-center h-screen justify-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold mb-24 mx-10 md:mx-20 text-brand-500 text-center"
        >
          Durma enquanto eles fazem a grade horária
        </motion.h1>
        <motion.p
          className="text-md md:text-2xl font-medium mb-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Horas Dormidas x Período de Matrículas
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-4/5 md:w-2/3 lg:w-1/2 h-[400px]"
        >
          <Graph />
        </motion.div>
      </section>
    </div>
  );
};

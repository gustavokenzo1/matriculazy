import { motion } from "framer-motion";
import { X } from "phosphor-react";

interface AlertProps {
  message: string;
  setShowAlert: (showAlert: boolean) => void;
}

export const Alert = ({ message, setShowAlert }: AlertProps) => {
  return (
    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-4 flex flex-col max-h-[800px] max-w-[500px] overflow-y-scroll bg-white shadow-lg rounded dark:bg-[#1a1a1a] scrollbar-thin scrollbar-thumb-brand-500 scrollbar-track-stone-200 dark:scrollbar-track-stone-700 px-6 pb-4"
      initial={{ opacity: 0, top: "-50vh" }}
      animate={{ opacity: 1, top: "50%" }}
      exit={{ opacity: 0, top: "-50vh" }}
      transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
    >
      <h1 className="mt-8 text-3xl font-bold">Deu Ruim :(</h1>
      <X
        className="absolute top-4 right-4 text-2xl cursor-pointer"
        onClick={() => setShowAlert(false)}
      />
      <p className="mt-4 text-lg">{message}</p>
    </motion.div>
  );
};

import { motion } from "framer-motion";

interface ExampleItemProps {
  text: string;
  position: number;
}

export const ExampleItem = ({ text, position }: ExampleItemProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      className="w-[50px] h-[50px] bg-white rounded flex items-center justify-center font-medium shadow-xl cursor-pointer text-black"
    >
      {text}
    </motion.div>
  );
};

import { X } from "phosphor-react";
import { ICourse } from "../../pages/Timetable";
import { motion } from "framer-motion";

interface CourseCardProps {
  courses: ICourse[];
  handleDeleteSelectedCourse: (course: ICourse) => void;
}

export const CourseCard = ({
  courses,
  handleDeleteSelectedCourse,
}: CourseCardProps) => {
  return (
    <motion.div
      key={courses[0].id}
      className="dark:bg-stone-900 bg-stone-100 max-w-[400px] p-4 flex flex-col items-center gap-6 rounded"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex w-full justify-between items-start gap-6">
        <h3 className="font-bold w-4/5 text-secondary-500">
          {courses[0].name}
        </h3>
        <X
          className="border rounded-full p-1 border-stone-600 hover:bg-red-500 hover:text-white transition-all cursor-pointer hover:border-none"
          size={24}
          onClick={() => handleDeleteSelectedCourse(courses[0])}
        />
      </div>
      {courses.length === 1 ? (
        <p className="font-medium">{courses[0].teacher}</p>
      ) : (
        <p className="font-medium">{courses.length} cursos encontrados</p>
      )}
    </motion.div>
  );
};

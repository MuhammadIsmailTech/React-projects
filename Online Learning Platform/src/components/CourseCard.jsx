import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiClock, FiUsers } from 'react-icons/fi';

export default function CourseCard({ course }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      <Link to={`/courses/${course.id}`}>
        <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-sm text-indigo-600 font-semibold mb-2">{course.category}</div>
        <Link to={`/courses/${course.id}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition mb-2 line-clamp-2">
          {course.title}
        </Link>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">by {course.instructor}</p>
        
        <div className="flex items-center gap-2 mb-4 text-yellow-500">
          <span className="font-bold text-gray-900 dark:text-white">{course.rating}</span>
          <FiStar className="fill-current" />
          <span className="text-sm text-gray-500 dark:text-gray-400">({course.reviews})</span>
        </div>

        <div className="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1"><FiClock /> {course.duration}</div>
          <div className="flex items-center gap-1"><FiUsers /> {course.students}</div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">${course.price}</span>
          <Link to={`/courses/${course.id}`} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
            Enroll Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
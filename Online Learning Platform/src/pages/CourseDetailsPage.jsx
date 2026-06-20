import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courses } from '../data';
import { FiStar, FiClock, FiUsers, FiPlayCircle, FiCheckCircle } from 'react-icons/fi';

export default function CourseDetailsPage() {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) {
    return <div className="text-center py-20 text-2xl text-gray-500">Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Banner */}
      <div className="relative h-80 w-full">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm mb-4 inline-block">{course.level}</span>
            <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
            <p className="text-gray-300 text-lg">by {course.instructor}</p>
            <div className="flex items-center gap-6 mt-4 text-sm text-gray-300">
              <span className="flex items-center gap-1 text-yellow-400 font-bold">{course.rating} <FiStar className="fill-current" /></span>
              <span>({course.reviews} reviews)</span>
              <span className="flex items-center gap-1"><FiUsers /> {course.students} students</span>
              <span className="flex items-center gap-1"><FiClock /> {course.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About this course</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{course.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What you'll learn</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {course.outcomes.map((out, i) => (
                <div key={i} className="flex items-start gap-2">
                  <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{out}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Curriculum</h2>
            <div className="space-y-2">
              {course.curriculum.map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
                  <FiPlayCircle className="text-indigo-600" />
                  <span className="text-gray-700 dark:text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 overflow-hidden">
            <img src={course.thumbnail} alt="Preview" className="w-full aspect-video object-cover" />
            <div className="p-6">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">${course.price}</div>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition mb-4">
                Enroll Now
              </button>
              <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Add to Wishlist
              </button>
              <div className="mt-6 pt-6 border-t dark:border-gray-700 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between"><span>Duration</span><span className="font-semibold text-gray-900 dark:text-white">{course.duration}</span></div>
                <div className="flex justify-between"><span>Level</span><span className="font-semibold text-gray-900 dark:text-white">{course.level}</span></div>
                <div className="flex justify-between"><span>Certificate</span><span className="font-semibold text-gray-900 dark:text-white">Yes</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
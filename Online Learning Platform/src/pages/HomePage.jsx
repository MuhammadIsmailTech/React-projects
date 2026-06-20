import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courses, categories, testimonials } from '../data';
import CourseCard from '../components/CourseCard';
import { FiArrowRight } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-medium">#1 Online Learning Platform</span>
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mt-4 leading-tight">
              Learn Without <span className="text-indigo-600">Limits</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Start, switch, or advance your career with over 5,000 courses from world-class universities and companies.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/courses" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2">
                Explore Courses <FiArrowRight />
              </Link>
              <Link to="/about" className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Learn More
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hero" className="rounded-2xl shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-gray-900 border-y dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "50K+", label: "Students" },
            { val: "500+", label: "Courses" },
            { val: "100+", label: "Instructors" },
            { val: "4.9", label: "Average Rating" }
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-3xl font-bold text-indigo-600">{stat.val}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              key={cat.id} 
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center cursor-pointer hover:shadow-lg transition group"
            >
              <span className="text-4xl block mb-3">{cat.icon}</span>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 transition">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.count} Courses</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Courses</h2>
            <Link to="/courses" className="text-indigo-600 font-semibold hover:underline flex items-center gap-1">View All <FiArrowRight /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => <CourseCard key={course.id} course={course} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">What Our Students Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full" />
                <span className="font-semibold text-gray-900 dark:text-white">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
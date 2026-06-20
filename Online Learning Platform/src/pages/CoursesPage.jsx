import { useState } from 'react';
import { motion } from 'framer-motion';
import { courses, categories } from '../data';
import CourseCard from '../components/CourseCard';
import { FiSearch } from 'react-icons/fi';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  let filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Explore Our Courses</h1>
        
        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
          </div>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          >
            <option value="All" className="bg-white dark:bg-gray-800">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name} className="bg-white dark:bg-gray-800">{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {filteredCourses.map(course => <CourseCard key={course.id} course={course} />)}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <h3 className="text-2xl font-semibold">No courses found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
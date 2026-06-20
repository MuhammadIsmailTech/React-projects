import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:id" element={<CourseDetailsPage />} />
              
              {/* Placeholder routes for remaining requirements */}
              <Route path="/about" element={<div className="text-center py-20 text-3xl font-bold">About Page (To be implemented)</div>} />
              <Route path="/contact" element={<div className="text-center py-20 text-3xl font-bold">Contact Page (To be implemented)</div>} />
              <Route path="/login" element={<div className="text-center py-20 text-3xl font-bold">Login Page (To be implemented)</div>} />
              <Route path="/register" element={<div className="text-center py-20 text-3xl font-bold">Register Page (To be implemented)</div>} />
              <Route path="/student-dashboard" element={<div className="text-center py-20 text-3xl font-bold">Student Dashboard (To be implemented)</div>} />
              <Route path="/instructor-dashboard" element={<div className="text-center py-20 text-3xl font-bold">Instructor Dashboard (To be implemented)</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}
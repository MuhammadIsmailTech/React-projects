import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">LearnX</h3>
          <p className="text-sm">Empowering learners globally with top-tier courses and world-class instructors.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses" className="hover:text-white transition">Browse Courses</Link></li>
            <li><Link to="/" className="hover:text-white transition">Categories</Link></li>
            <li><Link to="/" className="hover:text-white transition">Become an Instructor</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link to="/" className="hover:text-white transition">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" className="bg-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
        © 2023 LearnX. All rights reserved.
      </div>
    </footer>
  );
}
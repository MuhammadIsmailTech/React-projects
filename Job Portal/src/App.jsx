import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import JobsSection from "./components/JobsSection";
import WhyChooseSection from "./components/WhyChooseSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FooterSection from "./components/FooterSection";
import Register from "./pages/Register";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";

/**
 * Main App Component
 * Entry point for the Job Portal Application
 */
function App() {
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/signup">Sign In</Link>
        <Link to="/search">Search Jobs</Link>
      </nav>

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>National Jobs Portal</h2>
                <p>Use Register or Sign In to continue.</p>
              </div>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

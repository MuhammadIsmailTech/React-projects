import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import JobsSection from './components/JobsSection';
import WhyChooseSection from './components/WhyChooseSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FooterSection from './components/FooterSection';

/**
 * Main App Component
 * Entry point for the Job Portal Application
 */
function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      
      {/* Section 1: Hero Banner with Search */}
      <HeroSection />
      
      {/* Section 2: Latest Government Jobs */}
      <JobsSection />

      {/* Section 3: Why Choose National Jobs Portal */}
      <WhyChooseSection />

      {/* Section 4: Statistics Counters */}
      <StatsSection />

      {/* Section 5: Testimonials / Success Stories */}
      <TestimonialsSection />

      {/* Section 6: Footer + Contact Area */}
      <FooterSection />
    </div>
  );
}

export default App;

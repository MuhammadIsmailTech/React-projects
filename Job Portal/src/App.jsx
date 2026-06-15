import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import JobsSection from './components/JobsSection';

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

      {/* Main Content - Will be added in future sections */}
      <main className="bg-slate-950 py-12">
        {/* Placeholder for future sections */}
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">More Sections Coming Soon</h1>
          <p className="text-gray-400 text-lg">Section 3, 4, and 5 will be added step by step...</p>
        </div>
      </main>
    </div>
  );
}

export default App;

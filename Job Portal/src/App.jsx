import React, { useState } from 'react';
import Header from './components/Header';

/**
 * Main App Component
 * Entry point for the Job Portal Application
 */
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Main Content - Will be added in future sections */}
      <main className="pt-20">
        {/* Placeholder for future sections */}
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Welcome to National Jobs Portal</h1>
          <p className="text-gray-600 text-lg">More sections coming soon...</p>
        </div>
      </main>
    </div>
  );
}

export default App;

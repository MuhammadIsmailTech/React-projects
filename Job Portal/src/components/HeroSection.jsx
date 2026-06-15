import React, { useState } from 'react';
import { Search, MapPin, Briefcase, TrendingUp } from 'lucide-react';

/**
 * HeroSection Component - Main Banner with Advanced Search
 * 
 * Features:
 * - Gradient background with overlay
 * - Prominent heading and subtitle
 * - Advanced 4-field search bar:
 *   - Job Title/Keywords
 *   - Location/City (Dropdown)
 *   - Job Category/Industry (Dropdown)
 *   - Experience Level (Dropdown)
 * - Popular tags/trending searches
 * - Fully responsive design
 * 
 * @component
 */
const HeroSection = () => {
  // State for search form inputs
  const [searchData, setSearchData] = useState({
    keywords: '',
    location: '',
    jobCategory: '',
    experience: '',
  });

  /**
   * Handle input change for search fields
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle search submission
   */
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search submitted:', searchData);
    // TODO: Implement actual search functionality
  };

  /**
   * Handle popular tag click
   */
  const handlePopularTagClick = (tag) => {
    setSearchData(prev => ({
      ...prev,
      keywords: tag
    }));
  };

  // Data for dropdowns
  const locations = [
    'Islamabad',
    'Karachi',
    'Lahore',
    'Peshawar',
    'Quetta',
    'Gilgit',
    'Muzaffarabad',
    'All Pakistan'
  ];

  const jobCategories = [
    'Information Technology',
    'Civil Engineering',
    'Education',
    'Healthcare',
    'Administration',
    'Finance',
    'Marketing',
    'Human Resources',
    'Legal',
    'Agriculture'
  ];

  const experienceLevels = [
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Executive',
    'Any Experience'
  ];

  // Popular tags/trending searches
  const popularTags = [
    'Software Engineer',
    'Civil Engineer',
    'Teacher',
    'Healthcare',
    'Administration'
  ];

  return (
    <section className="relative w-full min-h-screen md:min-h-[600px] pt-20 pb-12">
      
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-blue-900">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        
        {/* Heading and Subtitle */}
        <div className="text-center mb-8 md:mb-12">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary-400 mb-4 drop-shadow-lg">
            JOB SEARCH
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Search from thousands of verified government job opportunities across Pakistan.
            Build your career with transparency, trust, and excellence.
          </p>
        </div>

        {/* Advanced Search Form */}
        <form onSubmit={handleSearch} className="bg-gray-900 bg-opacity-60 backdrop-blur-sm border border-gray-700 rounded-3xl p-6 md:p-8 shadow-2xl">
          
          {/* First Row: Keywords, Location, Job Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3 mb-4">
            
            {/* Job Title / Keywords Field */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                name="keywords"
                value={searchData.keywords}
                onChange={handleInputChange}
                placeholder="Job title, keywords, or company"
                className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
              />
            </div>

            {/* Location / City Dropdown */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MapPin size={20} />
              </div>
              <select
                name="location"
                value={searchData.location}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">Select City, Province, or Region</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Job Category / Industry Dropdown */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Briefcase size={20} />
              </div>
              <select
                name="jobCategory"
                value={searchData.jobCategory}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">Select Job Category/Industry</option>
                {jobCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Second Row: Experience Level and Search Button */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-3">
            
            {/* Experience Level Dropdown */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <select
                name="experience"
                value={searchData.experience}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">Select Experience Level</option>
                {experienceLevels.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Search Button - Spans on mobile, single cell on desktop */}
            <button
              type="submit"
              className="md:col-span-3 px-6 py-3 bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 rounded-2xl hover:from-secondary-500 hover:to-secondary-600 font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Search size={20} />
              <span>Search Jobs</span>
            </button>
          </div>
        </form>

        {/* Popular Tags Section */}
        <div className="mt-8 md:mt-10">
          <div className="flex items-center justify-center flex-wrap gap-4 md:gap-6">
            {/* Popular Label */}
            <div className="flex items-center space-x-2 text-gray-300 font-semibold">
              <TrendingUp size={20} />
              <span>Popular:</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 justify-center">
              {popularTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularTagClick(tag)}
                  className="px-4 py-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-80 text-gray-200 border border-gray-600 rounded-full font-medium text-sm transition-all duration-200 hover:border-secondary-400 hover:text-secondary-400"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

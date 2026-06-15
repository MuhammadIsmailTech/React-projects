import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

/**
 * Header Component - Responsive Navigation Bar
 * 
 * Features:
 * - Dual logo display (Organization + Government Brand)
 * - Full navigation menu with links
 * - Dropdown menu for Register (Candidate/Employer)
 * - Mobile-responsive hamburger menu
 * - Sticky header positioning
 * 
 * @component
 */
const Header = () => {
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State to manage register dropdown menu
  const [isRegisterDropdownOpen, setIsRegisterDropdownOpen] = useState(false);

  /**
   * Toggle mobile menu visibility
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Toggle register dropdown menu
   */
  const toggleRegisterDropdown = () => {
    setIsRegisterDropdownOpen(!isRegisterDropdownOpen);
  };

  /**
   * Close mobile menu and dropdown when navigating
   */
  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
    setIsRegisterDropdownOpen(false);
  };

  return (
    <>
      {/* Main Header Container - Sticky at top */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Left Section: Logo */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Organization Logo (Placeholder) */}
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NJP</span>
                </div>
                <div className="hidden sm:block">
                  <p className="font-bold text-primary-900 text-sm">National Jobs</p>
                  <p className="text-xs text-gray-600">Government of Pakistan</p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-gray-300 mx-2"></div>

              {/* Government Brand Logo (Placeholder) */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-primary-900 font-bold text-xs">GOV.PK</span>
                </div>
              </div>
            </div>

            {/* Center Section: Navigation Links (Hidden on Mobile) */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Home Link */}
              <a
                href="#home"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={handleNavigation}
              >
                Home
              </a>

              {/* Find Job Link */}
              <a
                href="#find-jobs"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={handleNavigation}
              >
                Find a Job
              </a>

              {/* Training Link */}
              <a
                href="#training"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={handleNavigation}
              >
                Training
              </a>

              {/* About Us Link */}
              <a
                href="#about"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={handleNavigation}
              >
                About Us
              </a>

              {/* Contact Link */}
              <a
                href="#contact"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={handleNavigation}
              >
                Contact
              </a>

              {/* FAQs Link */}
              <a
                href="#faqs"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={handleNavigation}
              >
                FAQs
              </a>
            </nav>

            {/* Right Section: Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              
              {/* Sign In Button */}
              <a
                href="#signin"
                className="hidden sm:inline-block px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 font-medium transition-colors duration-200"
                onClick={handleNavigation}
              >
                Sign In
              </a>

              {/* Register Button with Dropdown (Desktop) */}
              <div className="hidden sm:block relative">
                <button
                  onClick={toggleRegisterDropdown}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary-500 text-primary-900 rounded-lg hover:bg-secondary-600 font-medium transition-colors duration-200"
                >
                  <span>Register</span>
                  <ChevronDown
                    size={18}
                    className={`transform transition-transform duration-200 ${
                      isRegisterDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isRegisterDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    <a
                      href="#register-candidate"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 transition-colors duration-200"
                      onClick={() => {
                        handleNavigation();
                        setIsRegisterDropdownOpen(false);
                      }}
                    >
                      Register as Candidate
                    </a>
                    <a
                      href="#register-employer"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 transition-colors duration-200"
                      onClick={() => {
                        handleNavigation();
                        setIsRegisterDropdownOpen(false);
                      }}
                    >
                      Register as Employer
                    </a>
                  </div>
                )}
              </div>

              {/* Hamburger Menu Button (Mobile) */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-gray-700" />
                ) : (
                  <Menu size={24} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu (Visible on Mobile) */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden pb-6 border-t border-gray-200 pt-6">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-3">
                <a
                  href="#home"
                  className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={handleNavigation}
                >
                  Home
                </a>
                <a
                  href="#find-jobs"
                  className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={handleNavigation}
                >
                  Find a Job
                </a>
                <a
                  href="#training"
                  className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={handleNavigation}
                >
                  Training
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={handleNavigation}
                >
                  About Us
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={handleNavigation}
                >
                  Contact
                </a>
                <a
                  href="#faqs"
                  className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={handleNavigation}
                >
                  FAQs
                </a>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex flex-col space-y-3 mt-6 pt-6 border-t border-gray-200">
                {/* Mobile Sign In */}
                <a
                  href="#signin"
                  className="w-full px-4 py-2 text-center text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 font-medium transition-colors duration-200"
                  onClick={handleNavigation}
                >
                  Sign In
                </a>

                {/* Mobile Register Button */}
                <button
                  onClick={toggleRegisterDropdown}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-secondary-500 text-primary-900 rounded-lg hover:bg-secondary-600 font-medium transition-colors duration-200"
                >
                  <span>Register</span>
                  <ChevronDown
                    size={18}
                    className={`transform transition-transform duration-200 ${
                      isRegisterDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Mobile Register Dropdown */}
                {isRegisterDropdownOpen && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg py-2 mt-2">
                    <a
                      href="#register-candidate"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 transition-colors duration-200"
                      onClick={() => {
                        handleNavigation();
                        setIsRegisterDropdownOpen(false);
                      }}
                    >
                      Register as Candidate
                    </a>
                    <a
                      href="#register-employer"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 transition-colors duration-200"
                      onClick={() => {
                        handleNavigation();
                        setIsRegisterDropdownOpen(false);
                      }}
                    >
                      Register as Employer
                    </a>
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

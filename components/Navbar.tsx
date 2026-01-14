import React, { useState } from 'react';
import { MapPin, ArrowRight, Sun, Moon, Menu, X, UserPlus } from 'lucide-react';
import { AppState } from '../types';

interface NavbarProps {
  onSignUpClick: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentAppState: AppState;
  onNavigateHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSignUpClick, isDarkMode, toggleTheme, currentAppState, onNavigateHome }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If we are not on the landing page, links should just go home first
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (currentAppState !== AppState.LANDING) {
      onNavigateHome();
      // Allow time for state change before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "The Struggle", id: "problem" },
    { name: "How It Works", id: "system-overview" },
    { name: "Features", id: "features" },
    { name: "Future", id: "roadmap" },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-5xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-full shadow-2xl transition-all duration-300">
        <div className="px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={onNavigateHome}>
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 shadow-lg group-hover:shadow-green-500/50 transition-all duration-300">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              PathVerse <span className="text-green-500">AR</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Login / Dashboard CTA */}
            {currentAppState === AppState.LANDING ? (
              <button 
                onClick={onSignUpClick}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:bg-green-600 dark:hover:bg-green-400 dark:hover:text-white transition-all duration-300 shadow-lg hover:shadow-green-500/20"
              >
                Sign Up
                <UserPlus className="w-3 h-3" />
              </button>
            ) : (
              <button 
                onClick={onNavigateHome}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-800 text-white font-bold text-sm"
              >
                Home
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
             <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-green-500"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 p-4">
             <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl p-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="h-px bg-gray-200 dark:bg-zinc-800 my-2"></div>
                <button 
                  onClick={() => {
                    onSignUpClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-500 text-white font-bold"
                >
                  Sign Up
                  <ArrowRight className="w-4 h-4" />
                </button>
             </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
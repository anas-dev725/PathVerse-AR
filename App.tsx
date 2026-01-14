import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { ProblemSection, SolutionSection } from './components/InfoSections';
import SystemOverview from './components/SystemOverview';
import FeaturesSection from './components/FeaturesSection';
import RoadmapSection from './components/RoadmapSection';
import TeamSection from './components/TeamSection';
import ImpactSection from './components/ImpactSection';
import CTABanner from './components/CTABanner';
import ARDemo from './components/ARDemo';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userName, setUserName] = useState<string>("Student");
  const [initialAuthMode, setInitialAuthMode] = useState<'login' | 'signup'>('signup');

  // Initialize Theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // State Transitions
  const handleAuthNavigation = (mode: 'login' | 'signup') => {
    setInitialAuthMode(mode);
    setAppState(AppState.AUTH);
  };

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    setAppState(AppState.DASHBOARD);
  };
  const handleStartAR = () => setAppState(AppState.DEMO);
  const handleBackToDashboard = () => setAppState(AppState.DASHBOARD);
  const handleLogout = () => {
    setUserName("Student");
    setAppState(AppState.LANDING);
  };
  const handleNavigateHome = () => setAppState(AppState.LANDING);

  // Render Logic based on State
  if (appState === AppState.DEMO) {
    return <ARDemo onBack={handleBackToDashboard} />;
  }

  if (appState === AppState.AUTH) {
    return <Auth onLogin={handleLoginSuccess} onBack={handleNavigateHome} initialMode={initialAuthMode} />;
  }

  if (appState === AppState.DASHBOARD) {
    return (
      <div className="min-h-screen selection:bg-green-500 selection:text-white dark:selection:text-black">
        <Navbar 
          onSignUpClick={() => handleAuthNavigation('signup')}
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
          currentAppState={AppState.DASHBOARD}
          onNavigateHome={handleNavigateHome}
        />
        <Dashboard userName={userName} onStartAR={handleStartAR} onLogout={handleLogout} />
      </div>
    );
  }

  // Default: Landing Page
  return (
    <div className="min-h-screen selection:bg-green-500 selection:text-white dark:selection:text-black">
      <Navbar 
        onSignUpClick={() => handleAuthNavigation('signup')}
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        currentAppState={AppState.LANDING}
        onNavigateHome={handleNavigateHome}
      />
      
      <main>
        <Hero onStartDemo={() => handleAuthNavigation('signup')} />
        <ProblemSection />
        <SolutionSection />
        <SystemOverview />
        <FeaturesSection />
        <RoadmapSection />
        <ImpactSection />
        <TeamSection />
        <CTABanner onStart={() => handleAuthNavigation('signup')} />
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-black py-12 border-t border-gray-200 dark:border-zinc-900 text-center transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-2xl font-bold mb-2 tracking-tight text-gray-900 dark:text-white">
            PathVerse <span className="text-green-500">AR</span>
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Made with ❤️ for the IOBM Community.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-500 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-green-500 transition-colors">Contact Support</a>
          </div>
          <p className="mt-8 text-gray-400 dark:text-zinc-800 text-xs font-mono">
            FYP 2024 © PROTOTYPE BUILD v1.0.5
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
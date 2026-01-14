import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTABannerProps {
  onStart: () => void;
}

const CTABanner: React.FC<CTABannerProps> = ({ onStart }) => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[3rem] overflow-hidden">
          {/* Backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-black"></div>
          <div className="absolute inset-0 tech-grid opacity-20"></div>
          
          {/* Decorative Blob */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/30 rounded-full blur-[100px] -mr-20 -mt-20 animate-pulse"></div>

          <div className="relative z-10 px-8 py-20 md:p-24 text-center">
            <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
              Ready to find your way?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-xl font-light">
              Join hundreds of students using PathVerse AR to navigate IOBM with ease. Create your account and start exploring today.
            </p>
            <button 
              onClick={onStart}
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black bg-white rounded-full hover:bg-green-400 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] group"
            >
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
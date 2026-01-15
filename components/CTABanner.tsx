import React from 'react';
import { ArrowRight, Navigation } from 'lucide-react';

interface CTABannerProps {
  onStart: () => void;
}

const CTABanner: React.FC<CTABannerProps> = ({ onStart }) => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[3rem] overflow-hidden group">
          {/* Backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-zinc-900 to-black"></div>
          <div className="absolute inset-0 tech-grid opacity-20"></div>
          
          {/* Decorative Blob */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px] -mr-40 -mt-40 transition-all duration-1000 group-hover:bg-green-400/30 group-hover:scale-110"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>

          <div className="relative z-10 px-8 py-20 md:p-32 text-center">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                <Navigation size={14} className="text-green-400 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Ready for Exploration</span>
             </div>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">find your way?</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-16 text-xl md:text-2xl font-medium leading-relaxed">
              Join hundreds of students using PathVerse AR to navigate IOBM with ease. Create your account and start exploring today.
            </p>
            <button 
              onClick={onStart}
              className="inline-flex items-center justify-center px-12 py-6 text-xl font-black text-black bg-white rounded-full hover:bg-green-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_30px_60px_rgba(255,255,255,0.1)] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">Let's Navigate</span>
              <ArrowRight className="ml-3 h-6 w-6 relative z-10 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
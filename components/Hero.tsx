import React from 'react';
import { Play, Sparkles, ArrowRight, Map, LocateFixed } from 'lucide-react';

interface HeroProps {
  onStartDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartDemo }) => {
  const scrollToOverview = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('system-overview');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-300">
      {/* Dynamic Background */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-100 dark:bg-green-500/10 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600 dark:bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-widest">Spatial Intelligence Initiative</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-gray-900 dark:text-white">
            Stop Guessing<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 animate-gradient">
              Start Navigating.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed font-medium">
            Finding your way shouldn't be a puzzle. PathVerse AR turns your phone into a campus sidekick that guides you straight to your classroom in the CBM and IT buildings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={onStartDemo}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white dark:text-black transition-all duration-300 bg-black dark:bg-white rounded-full hover:bg-green-600 dark:hover:bg-green-400 hover:text-white hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
            >
              Start Navigating
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a 
              href="#system-overview" 
              onClick={scrollToOverview}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 dark:text-white transition-all duration-200 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 backdrop-blur-sm"
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Vision System
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-white/10">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">99%</div>
              <div className="text-xs text-gray-500 font-mono uppercase">Recognition</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Low</div>
              <div className="text-xs text-gray-500 font-mono uppercase">Latency</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">AI</div>
              <div className="text-xs text-gray-500 font-mono uppercase">Edge Vision</div>
            </div>
          </div>
        </div>

        {/* Visual Content (Mock Phone) */}
        <div className="relative hidden lg:block perspective-1000">
          <div className="relative mx-auto w-[320px] h-[640px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl animate-float overflow-hidden z-20 ring-1 ring-white/20">
            {/* Phone Screen Content */}
            <div className="relative h-full w-full bg-zinc-900 overflow-hidden group">
               {/* Mock AR View */}
               <img src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Corridor" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
               
               {/* AR Path Overlay */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-80 opacity-90" style={{ transform: 'perspective(500px) rotateX(40deg)' }}>
                  <div className="w-full h-full bg-gradient-to-t from-green-500/60 to-transparent flex flex-col items-center justify-end space-y-12 pb-10">
                    <div className="w-16 h-16 border-l-[6px] border-t-[6px] border-green-400 rotate-45 animate-pulse shadow-[0_0_20px_#4ade80]"></div>
                    <div className="w-10 h-10 border-l-[4px] border-t-[4px] border-green-500/80 rotate-45 animate-pulse delay-75"></div>
                  </div>
               </div>

               {/* UI Elements */}
               <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-50"></div>
               <div className="absolute top-16 left-4 right-4 flex justify-between items-start">
                  <div className="bg-black/60 backdrop-blur p-2 rounded-lg border border-green-500/30">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-mono text-green-400">VISION ACTIVE</span>
                    </div>
                  </div>
               </div>
               
               <div className="absolute bottom-8 left-4 right-4 bg-zinc-900/90 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-lg transform transition-all hover:scale-105 cursor-default">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Spatial Target</p>
                      <p className="text-white font-bold text-lg">Lab 401</p>
                    </div>
                    <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-black font-bold shadow-lg shadow-green-500/30">
                      <LocateFixed size={24} />
                    </div>
                  </div>
               </div>
            </div>
          </div>
          
          {/* Floating Elements around phone */}
          <div className="absolute top-24 -right-8 p-4 bg-white dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl animate-float-delayed z-30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-100 dark:bg-green-500/20 rounded-xl">
                <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">Precision</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Spatial Aware</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-32 -left-12 p-4 bg-white dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl animate-float z-30">
             <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-500/20 rounded-xl">
                <LocateFixed className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">Context</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Live Mapping</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
import React, { useEffect, useRef, useState } from 'react';
import { Flag, Star, Globe, Smartphone, ChevronRight } from 'lucide-react';

const RoadmapSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const roadmap = [
    {
      quarter: "Phase 1 (Current)",
      title: "Prototype & Core AI",
      items: ["Basic Corridor Recognition", "CBM 401 & Lab Navigation", "Offline Database Setup"],
      icon: <Flag className="w-5 h-5" />,
      active: true,
      color: "green"
    },
    {
      quarter: "Phase 2",
      title: "Campus-Wide Beta",
      items: ["Mapping CBM, IT Building & SSK completely", "Voice Navigation Support", "Student Feedback Loop"],
      icon: <Smartphone className="w-5 h-5" />,
      active: false,
      color: "blue"
    },
    {
      quarter: "Phase 3",
      title: "Advanced Features",
      items: ["Find My Friend (Real-time sharing)", "Event Navigation (Auditorium)", "Accessibility Routes (Ramps/Lifts)"],
      icon: <Star className="w-5 h-5" />,
      active: false,
      color: "purple"
    },
    {
      quarter: "Phase 4",
      title: "Expansion",
      items: ["iOS Version", "Multi-Campus Support", "API for other Universities"],
      icon: <Globe className="w-5 h-5" />,
      active: false,
      color: "emerald"
    }
  ];

  return (
    <section 
      id="roadmap" 
      ref={sectionRef}
      className="py-24 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-green-600 dark:text-green-400 font-bold tracking-wider uppercase text-sm block mb-2">Future Scope</span>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl leading-tight">
              Visualizing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">Next Frontier</span>
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
              We are just getting started. Our vision extends beyond just finding a classroom. Watch how our system evolves from a single prototype to a global spatial intelligence platform.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Animated Path Line (Desktop) */}
          <div className="hidden lg:block absolute top-[40%] left-0 w-full h-1 z-0">
            <svg className="w-full h-12 overflow-visible">
              <path 
                d="M 50 20 C 300 20, 450 20, 1100 20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeDasharray="12 12"
                className={`text-gray-200 dark:text-zinc-800 transition-all duration-[2000ms] ${isVisible ? 'opacity-30' : 'opacity-0'}`}
              />
              <path 
                d="M 50 20 C 300 20, 450 20, 1100 20" 
                fill="none" 
                stroke="url(#pathGradient)" 
                strokeWidth="4"
                strokeDasharray="1200"
                strokeDashoffset={isVisible ? 0 : 1200}
                className={`transition-all duration-[3000ms] ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                  filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))',
                  transitionProperty: 'stroke-dashoffset, opacity'
                }}
              />
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Roadmap Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roadmap.map((phase, idx) => (
              <div 
                key={idx} 
                className={`relative group transition-all duration-1000 transform ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 translate-x-0' 
                    : `opacity-0 translate-y-8 ${idx > 0 ? '-translate-x-12' : ''}`
                }`}
                style={{ 
                    transitionDelay: `${idx * 500}ms`,
                    zIndex: 10 + idx 
                }}
              >
                {/* Visual Connector for Mobile */}
                {idx > 0 && (
                  <div className="lg:hidden flex justify-center py-4 text-green-500/30">
                    <ChevronRight size={32} className="rotate-90 animate-pulse" />
                  </div>
                )}

                <div className={`p-8 rounded-[2.5rem] border h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  phase.active 
                    ? 'border-green-500 bg-green-50/50 dark:bg-green-500/5 shadow-[0_0_40px_rgba(34,197,94,0.15)]' 
                    : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50'
                } backdrop-blur-sm relative overflow-hidden`}>
                  
                  {/* Phase Marker & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      phase.active 
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/40 scale-110' 
                        : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 group-hover:bg-green-500/10 group-hover:text-green-500'
                    }`}>
                      {phase.icon}
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                      phase.active 
                        ? 'border-green-500/50 text-green-600 dark:text-green-400' 
                        : 'border-gray-300 dark:border-zinc-700 text-gray-400'
                    }`}>
                      Stage {idx + 1}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className={`text-xs font-bold mb-1 uppercase tracking-wider ${
                      phase.active ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                    }`}>
                      {phase.quarter}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-green-500 transition-colors">
                      {phase.title}
                    </h3>
                    
                    <ul className="space-y-4">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group/item">
                          <div className={`mt-1.5 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            phase.active ? 'bg-green-500' : 'bg-gray-400 dark:bg-zinc-600'
                          } group-hover/item:scale-150 group-hover/item:bg-green-500 shadow-glow`}></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${phase.active ? 'bg-green-500 animate-pulse' : 'bg-gray-300 dark:bg-zinc-700'}`}></div>
                       <span className={`text-[10px] font-bold uppercase tracking-widest ${phase.active ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                         {phase.active ? 'Currently Active' : 'Future Milestone'}
                       </span>
                    </div>
                  </div>

                  {/* Shimmer overlay for active phase */}
                  {phase.active && (
                    <div className="shimmer-overlay opacity-5 animate-shimmer pointer-events-none"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
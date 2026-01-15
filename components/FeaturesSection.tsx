import React from 'react';
import { Navigation, Database, Mic, ShieldCheck, Zap, CloudLightning, Move3d, Box, Cpu } from 'lucide-react';

const features = [
  {
    icon: <Navigation className="w-6 h-6" />,
    title: "Precision Guidance",
    description: "Turn-by-turn navigation with 3D energy-shimmering arrows projected onto the IT Building and CBM Building floors.",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: <CloudLightning className="w-6 h-6" />,
    title: "IOBM Hybrid Cache",
    description: "Intelligent local data caching allows the vision model to function even in the basement labs of the IT Building complex.",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Campus Knowledge Base",
    description: "Deep-linked database for every lab, faculty room, and auditorium across CBM, IT Building, and SSK buildings.",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Voice Commands",
    description: "Just say 'Navigate to SSK Auditorium' to initialize the pathfinding system instantly.",
    gradient: "from-orange-500/20 to-yellow-500/20"
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Privacy Focused AI",
    description: "On-device processing ensures that no camera feed from the IOBM premises is ever transmitted to a server.",
    gradient: "from-teal-500/20 to-emerald-500/20"
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Gemini Vision",
    description: "Harnessing Gemini 3 Flash to recognize architectural landmarks with unmatched speed and accuracy.",
    gradient: "from-red-500/20 to-orange-500/20"
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white dark:bg-zinc-900 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-green-600 dark:text-green-400 font-bold tracking-widest uppercase text-sm block mb-2">Core Technology</span>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl leading-tight">
              A New Era of <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">Spatial Intelligence</span>
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-sm">
            Tailored for the unique layout of the IOBM campus, from the IT Building complex to the CBM Building auditoriums.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-1 rounded-[2rem] bg-gradient-to-br from-gray-100 to-white dark:from-zinc-800 dark:to-zinc-900 hover:from-green-500/50 hover:to-emerald-500/50 transition-all duration-500"
            >
              <div className="bg-white dark:bg-black rounded-[1.9rem] p-8 h-full relative overflow-hidden">
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${feature.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-zinc-900 flex items-center justify-center text-gray-900 dark:text-white mb-8 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white transition-all duration-300 shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-green-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    <span>Performance Metric</span>
                    <Box size={14} className="text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
import React from 'react';
import { Flag, Star, Globe, Smartphone } from 'lucide-react';

const RoadmapSection: React.FC = () => {
  const roadmap = [
    {
      quarter: "Phase 1 (Current)",
      title: "Prototype & Core AI",
      items: ["Basic Corridor Recognition", "Room 401 & Lab Navigation", "Offline Database Setup"],
      icon: <Flag className="w-5 h-5" />,
      active: true
    },
    {
      quarter: "Phase 2",
      title: "Campus-Wide Beta",
      items: ["Mapping Block A, B & C completely", "Voice Navigation Support", "Student Feedback Loop"],
      icon: <Smartphone className="w-5 h-5" />,
      active: false
    },
    {
      quarter: "Phase 3",
      title: "Advanced Features",
      items: ["Find My Friend (Real-time sharing)", "Event Navigation (Auditorium)", "Accessibility Routes (Ramps/Lifts)"],
      icon: <Star className="w-5 h-5" />,
      active: false
    },
    {
      quarter: "Phase 4",
      title: "Expansion",
      items: ["iOS Version", "Multi-Campus Support", "API for other Universities"],
      icon: <Globe className="w-5 h-5" />,
      active: false
    }
  ];

  return (
    <section id="roadmap" className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-green-600 dark:text-green-400 font-bold tracking-wider uppercase text-sm">Future Scope</span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">What's Next for PathSense?</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              We are just getting started. Our vision extends beyond just finding a classroom. Here is where we are heading.
            </p>
          </div>
          <button className="hidden md:block px-6 py-3 rounded-full border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors">
            View Full Documentation
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roadmap.map((phase, idx) => (
            <div key={idx} className={`relative p-6 rounded-2xl border ${phase.active ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:hover:border-green-500/30 dark:hover:bg-zinc-800/80 group`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${phase.active ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 group-hover:bg-green-500/20 group-hover:text-green-500 transition-colors'}`}>
                {phase.icon}
              </div>
              <div className="text-sm font-bold text-green-600 dark:text-green-400 mb-1 uppercase tracking-wide">{phase.quarter}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{phase.title}</h3>
              <ul className="space-y-3">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                    <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-gray-400 dark:bg-zinc-600 rounded-full group-hover:bg-green-500 transition-colors"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
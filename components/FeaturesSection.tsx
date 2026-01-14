import React from 'react';
import { Navigation, Wifi, Database, Mic, ShieldCheck, Zap, CloudLightning } from 'lucide-react';

const features = [
  {
    icon: <Navigation className="w-6 h-6" />,
    title: "Precision Guidance",
    description: "Turn-by-turn navigation with 3D arrows projected onto the floor using AR technology."
  },
  {
    icon: <CloudLightning className="w-6 h-6" />,
    title: "Hybrid Connectivity",
    description: "Intelligent caching allows navigation to continue even when campus Wi-Fi drops intermittently."
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "IOBM Room Database",
    description: "Search by room number (e.g., 401), lab name, or department instantly."
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Voice Commands",
    description: "Just say 'Take me to the Library' for hands-free operation while walking."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Privacy First",
    description: "Camera feed is processed locally on-device using Edge AI. No video is ever stored."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Loading",
    description: "Lightweight app architecture ensures the app launches and scans in under 2 seconds."
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-green-600 dark:text-green-400 font-bold tracking-wider uppercase text-sm">Key Features</span>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Everything You Need</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Packed with features designed specifically for the IOBM student experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-gray-50 dark:bg-black border border-gray-100 dark:border-zinc-800 hover:border-green-500/40 transition-all duration-300 group hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center text-gray-900 dark:text-white mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
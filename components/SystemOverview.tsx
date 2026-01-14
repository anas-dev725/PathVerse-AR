import React, { useState, useEffect } from 'react';
import { Camera, Cpu, Smartphone, Scan, Zap, ArrowRight, Video, Layers, Sparkles } from 'lucide-react';

const SystemOverview: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Optional: Auto-rotate through steps if user hasn't interacted
  useEffect(() => {
    let interval: number;
    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 3);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    setIsAutoPlaying(false);
  };

  const steps = [
    {
      id: 0,
      title: "1. Capture",
      icon: <Camera className="w-6 h-6" />,
      desc: "The app accesses your smartphone camera to get a live feed.",
      detail: "We capture high-resolution frames of the corridor surroundings, identifying the general environment of the campus.",
      visualIcon: <Video className="w-12 h-12 text-white" />,
      color: "blue",
      // Student holding phone capturing campus surroundings
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop" 
    },
    {
      id: 1,
      title: "2. Analyze",
      icon: <Cpu className="w-6 h-6" />,
      desc: "Our Gemini-powered Vision model processes the frame instantly.",
      detail: "The AI analyzes the surroundings to find key details and architectural landmarks, matching them against our campus database.",
      visualIcon: <Scan className="w-12 h-12 text-white animate-pulse" />,
      color: "purple",
      // Analysis/Wireframe overlay looking for details
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop" 
    },
    {
      id: 2,
      title: "3. Visualize",
      icon: <Smartphone className="w-6 h-6" />,
      desc: "PathVerse superimposes 3D navigation arrows directly onto the floor.",
      detail: "Visualizing the navigation path with generated green arrows and distance meters to guide you to your destination.",
      visualIcon: <Layers className="w-12 h-12 text-white" />,
      color: "green",
      // Futuristic AR overlay with arrows and meters
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop" 
    }
  ];

  return (
    <section id="system-overview" className="py-24 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-green-600 dark:text-green-400 font-bold tracking-wider uppercase text-sm">Under the Hood</span>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">How PathVerse Works</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">A seamless integration of Computer Vision and Augmented Reality.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch h-full">
          
          {/* Left Side: Step Selector */}
          <div className="lg:w-1/3 flex flex-col justify-center gap-4">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                  activeStep === idx 
                    ? `bg-white dark:bg-zinc-900 border-${step.color}-500 shadow-xl scale-105 z-10` 
                    : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-zinc-900/50'
                }`}
              >
                {activeStep === idx && <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-${step.color}-500`}></div>}
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full transition-colors ${activeStep === idx ? `bg-${step.color}-100 dark:bg-${step.color}-900/30 text-${step.color}-600 dark:text-${step.color}-400` : 'bg-gray-100 dark:bg-zinc-800 text-gray-500'}`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${activeStep === idx ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{step.title}</h3>
                    {activeStep === idx && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 animate-fade-in">{step.desc}</p>}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Side: Interactive Visual Display */}
          {/* Added min-h-[600px] to ensure image covers content without clipping and removed fixed height constraints that caused overflow */}
          <div className="lg:w-2/3 relative min-h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl group flex flex-col">
             
             {/* Background Images Layer */}
             <div className="absolute inset-0 z-0">
               {steps.map((step, idx) => (
                 <div 
                   key={idx}
                   className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeStep === idx ? 'opacity-100' : 'opacity-0'}`}
                 >
                   <img 
                     src={step.image} 
                     alt={step.title}
                     className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[20s]" 
                   />
                   {/* Gradient Overlay for Readability */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 opacity-90"></div>
                   <div className={`absolute inset-0 bg-${step.color}-900/20 mix-blend-overlay`}></div>
                 </div>
               ))}
             </div>

             {/* Content Layer */}
             <div className="relative z-20 flex-1 flex flex-col items-center justify-end p-8 md:p-16 text-center">
                 
                 {/* Floating Icon Badge */}
                 <div className="mb-8 p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] transform transition-all duration-500 hover:scale-110 hover:bg-white/20">
                    <div className="relative">
                       {steps[activeStep].visualIcon}
                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                 </div>

                 <div className="space-y-6 max-w-xl mx-auto animate-fade-in-up">
                    <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                      {steps[activeStep].title.split('. ')[1]}
                    </h3>
                    <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed">
                      {steps[activeStep].detail}
                    </p>
                 </div>

                 {/* Progress/Step Indicators */}
                 <div className="mt-12 flex gap-3">
                    {steps.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => { handleStepClick(i); }}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === activeStep ? `w-12 bg-white shadow-[0_0_10px_white]` : 'w-2 bg-white/20 hover:bg-white/40'}`}
                        aria-label={`Go to step ${i + 1}`}
                      />
                    ))}
                 </div>

                 {/* Next Navigation Arrow */}
                 <button 
                   onClick={() => {
                     setActiveStep((prev) => (prev + 1) % 3);
                     setIsAutoPlaying(false);
                   }}
                   className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 p-4 rounded-full bg-black/20 hover:bg-white/10 backdrop-blur-md text-white/50 hover:text-white transition-all border border-white/5 hover:border-white/20 hidden md:block"
                 >
                   <ArrowRight size={24} />
                 </button>
             </div>
             
             {/* Top Left decorative badge */}
             <div className="absolute top-8 left-8 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
               <Sparkles className="w-3 h-3 text-yellow-400" />
               <span className="text-xs font-mono text-white/80 uppercase tracking-widest">AI Powered Workflow</span>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SystemOverview;
import React from 'react';
import { WifiOff, Compass, Layers, Smartphone, UserCheck, Eye, Cpu } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="py-24 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-red-500 font-bold tracking-wider uppercase text-sm">The Struggle is Real</span>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-6">
            Why is navigating IOBM <br/>so <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Frustrating?</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We've all been there. You're late for class, the internet is down, and every corridor in the IT Building or CBM looks exactly the same.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Compass className="w-8 h-8 text-red-500" />,
              title: "Architectural Twins",
              desc: "The CBM and SSK wings feature repetitive architectural patterns. Without a guide, finding Room 402 vs 403 feels like a guessing game."
            },
            {
              icon: <WifiOff className="w-8 h-8 text-red-500" />,
              title: "Signal Dead Zones",
              desc: "The IT Building's thick structural concrete often blocks GPS and Wi-Fi. Traditional apps fail just when you need them most."
            },
            {
              icon: <UserCheck className="w-8 h-8 text-red-500" />,
              title: "Academic Independence",
              desc: "Nobody wants to spend their first semester constantly asking for directions. We empower you to navigate like a pro from Day 1."
            }
          ].map((item, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-red-500/30 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-red-100 dark:bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SolutionSection: React.FC = () => {
  return (
    <section id="solution" className="py-24 bg-white dark:bg-black relative transition-colors duration-300">
       {/* Background Glow */}
       <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex lg:items-start lg:gap-20">
          
          {/* Content */}
          <div className="lg:w-1/2">
            <div className="inline-block px-4 py-1.5 rounded-full border border-green-500/30 bg-green-100 dark:bg-green-500/10 mb-6">
              <span className="text-xs font-bold text-green-600 dark:text-green-400 tracking-wider uppercase">Spatial Vision Solution</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              A Camera that <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Knows Every Corner.</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              We ditched GPS. Instead, PathVerse AR identifies your exact position in the SSK or IT Building by recognizing unique architectural landmarks.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <Eye className="w-6 h-6" />,
                  title: "Multimodal Analysis",
                  desc: "Our AI recognizes specific signs, lab numbers, and hall geometry within the CBM Building, matching your camera feed to a pre-mapped spatial grid.",
                  color: "green"
                },
                {
                  icon: <Layers className="w-6 h-6" />,
                  title: "Persistent AR Markers",
                  desc: "Directions are anchored to the floor plane. Walk through corridors as arrows stay perfectly locked in place, regardless of signal strength.",
                  color: "blue"
                },
                {
                  icon: <Smartphone className="w-6 h-6" />,
                  title: "Low Latency Edge Processing",
                  desc: "No data centers required. The logic happens on your device, ensuring a 60FPS fluid navigation experience through IOBM.",
                  color: "purple"
                }
              ].map((feature, idx) => (
                <div key={idx} className="group flex gap-5 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 cursor-default">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-500/20 flex items-center justify-center text-${feature.color}-600 dark:text-${feature.color}-400 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-bold text-xl group-hover:text-green-500 transition-colors">{feature.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Graphic */}
          <div className="lg:w-1/2 mt-16 lg:mt-0 sticky top-24">
            <div className="relative rounded-3xl border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 p-2 shadow-2xl transition-transform duration-500">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black group">
                <img 
                  src="https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=1000&auto=format&fit=crop" 
                  alt="University Campus Building" 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                   <div className="flex justify-between items-start">
                      <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded text-green-400 text-xs font-mono border border-green-500/30 shadow-lg">
                        VPS: LOCKED • CBM FLOOR 1
                      </div>
                      <Cpu className="text-green-400 animate-pulse" />
                   </div>

                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-green-500/30 rounded-lg group-hover:scale-105 transition-transform shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-green-500"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-green-500"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-green-500"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-green-500"></div>
                      
                      <div className="absolute -bottom-10 left-0 text-[10px] font-mono text-green-400 bg-black/80 backdrop-blur px-3 py-2 rounded border-l-2 border-green-500">
                         &gt; DETECTING_LANDMARKS... <br/>
                         &gt; MATCH_FOUND: IT_BUILDING_LABS <br/>
                         &gt; PRECISION: 1.2CM
                      </div>
                   </div>

                   <div className="bg-black/80 backdrop-blur-xl p-4 rounded-xl border-t border-green-500/50 shadow-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                          <Compass className="text-black" size={20} />
                        </div>
                        <div>
                          <p className="text-green-400 text-xs font-bold uppercase tracking-wider">Vision Path</p>
                          <p className="text-white font-bold">Turn Right for SSK Cafe</p>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
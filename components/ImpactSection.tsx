import React from 'react';
import { Quote, TrendingUp, Users, Clock, Star, Heart } from 'lucide-react';

const ImpactSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-16">
          <div>
            <span className="text-green-600 dark:text-green-400 font-bold tracking-wider uppercase text-sm block mb-4">Real-world Outcomes</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-8">
              Changing the way <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">Students Move.</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-lg">
              Our pilot program across the CBM, IT Building, and SSK blocks has shown significant improvements in student punctuality.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Active Students", value: "850", suffix: "+", icon: <Users size={20} />, color: "blue" },
                { label: "Time Saved", value: "2.4k", suffix: "m", icon: <Clock size={20} />, color: "green" },
                { label: "Nav Accuracy", value: "99.2", suffix: "%", icon: <TrendingUp size={20} />, color: "purple" },
                { label: "Community Love", value: "4.9", suffix: "/5", icon: <Star size={20} />, color: "orange" },
              ].map((stat, i) => (
                <div key={i} className="group p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:border-green-500/30 transition-all duration-500 cursor-default hover:-translate-y-1">
                  <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-500 w-fit mb-4 group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white group-hover:text-green-500 transition-colors">
                    {stat.value}<span className="text-green-500 text-xl">{stat.suffix}</span>
                  </h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
             <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
             <div className="relative bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
                <Quote className="text-green-500 w-16 h-16 opacity-10 absolute top-12 left-12 group-hover:opacity-20 transition-opacity" />
                <div className="relative z-10">
                   <div className="flex gap-1 mb-8">
                     {[1,2,3,4,5].map(s => <Star key={s} size={20} className="fill-yellow-400 text-yellow-400" />)}
                   </div>
                   <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-10">
                     PathVerse is like a real campus companion. I used to get so stressed running late for labs in the IT Building, but now I just follow the arrows and it's a breeze.
                   </p>
                   <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-500/20">
                        SA
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">Sarah Ahmed</p>
                        <p className="text-gray-500 font-medium text-sm">BBA Student, IOBM Senior</p>
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

export default ImpactSection;
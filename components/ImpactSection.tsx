import React from 'react';
import { Quote, TrendingUp, Users, Clock } from 'lucide-react';

const ImpactSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Enhanced Stats Section */}
        <div className="text-center mb-16">
           <span className="text-green-600 dark:text-green-400 font-bold tracking-wider uppercase text-sm">Real-time Impact</span>
           <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Making Campus Life Easier</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
           {[
             { label: "Students Navigated", value: "542", suffix: "+", icon: <Users className="text-blue-500 w-6 h-6" />, color: "blue" },
             { label: "Time Saved", value: "1,205", suffix: " Hours", icon: <Clock className="text-green-500 w-6 h-6" />, color: "green" },
             { label: "Success Rate", value: "98.5", suffix: "%", icon: <TrendingUp className="text-purple-500 w-6 h-6" />, color: "purple" },
             { label: "User Rating", value: "4.9", suffix: "/5", icon: <Quote className="text-orange-500 w-6 h-6" />, color: "orange" },
           ].map((stat, i) => (
             <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:bg-${stat.color}-500/20 transition-colors`}></div>
                
                <div className="flex items-center justify-between mb-4">
                   <div className={`p-3 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-500/10`}>
                     {stat.icon}
                   </div>
                </div>
                
                <div className="relative">
                   <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1 tracking-tight">
                     {stat.value}<span className={`text-${stat.color}-500 text-2xl`}>{stat.suffix}</span>
                   </h3>
                   <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Testimonials */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-16">Don't just take our word for it</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "I used to get lost in the academic block every single day. PathVerse is a lifesaver, especially when I'm running late!",
              name: "Sarah Ahmed",
              role: "BBA Student",
              initials: "SA",
              color: "green"
            },
            {
              quote: "The AR arrows are so intuitive. It feels like having a personal guide walking you to your class. Finally, a project that works.",
              name: "Moiz Khan",
              role: "CS Department",
              initials: "MK",
              color: "blue"
            },
            {
              quote: "Honestly, I didn't think it would work this well without internet, but the hybrid caching saved me during exams.",
              name: "Fatima Ali",
              role: "Media Science",
              initials: "FA",
              color: "purple"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 relative shadow-sm hover:shadow-xl hover:border-green-500/30 dark:hover:border-green-500/30 dark:hover:bg-zinc-800/80 dark:hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] transition-all duration-300 hover:-translate-y-1">
               <div className="absolute -top-4 left-8 bg-black dark:bg-zinc-800 p-2 rounded-full border border-gray-700">
                 <Quote className="text-green-500 w-4 h-4" />
               </div>
               <p className="text-gray-600 dark:text-gray-300 italic mb-6 leading-relaxed text-sm">"{item.quote}"</p>
               <div className="flex items-center gap-4 mt-auto">
                 <div className={`w-10 h-10 rounded-full bg-${item.color}-100 dark:bg-${item.color}-500/20 flex items-center justify-center text-${item.color}-600 dark:text-${item.color}-400 font-bold text-sm`}>
                   {item.initials}
                 </div>
                 <div>
                   <p className="text-gray-900 dark:text-white font-bold text-sm">{item.name}</p>
                   <p className="text-xs text-gray-500 uppercase font-bold">{item.role}</p>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
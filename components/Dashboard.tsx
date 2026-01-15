import React, { useState, useEffect, useMemo } from 'react';
import { Play, Clock, MapPin, User, Activity, CalendarCheck, BarChart3, ArrowRight, History, Bookmark, Map, Footprints, Timer, MoveRight } from 'lucide-react';

interface DashboardProps {
  onStartAR: () => void;
  onLogout: () => void;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartAR, onLogout, userName }) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  const timetable = [
    { time: "09:00 AM", subject: "Calculus II", room: "CBM 401", status: "completed" },
    { time: "11:00 AM", subject: "Physics Lab", room: "IT Building Lab 2B", status: "upcoming" },
    { time: "01:00 PM", subject: "Intro to AI", room: "SSK Auditorium", status: "pending" },
    { time: "03:00 PM", subject: "Library Study", room: "Main Library", status: "pending" },
  ];

  const activityData = [
    { day: 'M', steps: 4231, height: 45 },
    { day: 'T', steps: 6102, height: 75 },
    { day: 'W', steps: 3890, height: 35 },
    { day: 'T', steps: 8432, height: 90 },
    { day: 'F', steps: 5211, height: 55 },
    { day: 'S', steps: 6800, height: 70 },
    { day: 'S', steps: 9120, height: 95 },
  ];

  const nextClass = useMemo(() => {
    return timetable.find(item => item.status === 'upcoming' || item.status === 'pending') || timetable[0];
  }, [timetable]);

  const recentLocations = [
    { name: "CBM 401", time: "2 hours ago", block: "CBM Building" },
    { name: "Physics Lab", time: "Yesterday", block: "IT Building" },
    { name: "SSK Cafe", time: "Monday", block: "SSK Building" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-28 pb-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="animate-fade-in-down">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Hello, <span className="text-green-500">{userName}.</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg font-medium">
              Your campus vision is ready. Where are we heading?
            </p>
          </div>
          <div className="flex items-center gap-4 animate-fade-in-up">
             <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Active Account</p>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">ID_IOBM_AUTH</p>
                </div>
             </div>
             <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-700 p-0.5 shadow-lg">
               <div className="w-full h-full rounded-2xl bg-white dark:bg-black flex items-center justify-center">
                 <User className="text-green-600 dark:text-green-400 w-7 h-7" />
               </div>
             </div>
             <button onClick={onLogout} className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors ml-2 uppercase tracking-widest">
               Log Out
             </button>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Hero Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] -mr-40 -mt-40 transition-all duration-700 group-hover:bg-green-500/10"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="space-y-6 max-w-lg text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-[0.2em] border border-green-500/20">
                      Vision Operational
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-[1.1]">
                      Ready to <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">Explore?</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-medium">
                      Your next class, <span className="text-green-500 font-bold">{nextClass.subject}</span>, is in <span className="dark:text-white font-bold">25 mins</span> at {nextClass.room}. Launch to find the route.
                    </p>
                    
                    <button 
                      onClick={onStartAR}
                      className="px-8 md:px-10 py-5 rounded-[2rem] bg-green-500 hover:bg-green-400 text-white font-bold text-lg md:text-xl shadow-[0_15px_30px_rgba(34,197,94,0.15)] hover:shadow-[0_20px_40px_rgba(34,197,94,0.25)] transition-all transform hover:scale-105 flex items-center gap-4 w-full md:w-auto justify-center group/btn"
                    >
                      <div className="p-2 bg-white/20 rounded-full">
                        <Play className="fill-current w-5 h-5" />
                      </div>
                      Initialize AR Path
                    </button>
                  </div>
                  
                  <div className="hidden md:flex relative w-40 h-40 items-center justify-center">
                    <div className="absolute inset-0 border-[8px] border-green-500/10 rounded-full animate-spin-slow"></div>
                    <Map className="w-12 h-12 text-green-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Timetable Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-6 md:p-10 border border-gray-200 dark:border-zinc-800 shadow-xl">
               <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-4">
                   <div className="p-4 bg-blue-100 dark:bg-blue-500/10 rounded-[1.5rem] text-blue-600 dark:text-blue-400">
                     <CalendarCheck className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-bold text-2xl text-gray-900 dark:text-white tracking-tight">Smart Timetable</h3>
                     <p className="text-sm text-gray-500 font-medium">Synced with building waypoints.</p>
                   </div>
                 </div>
               </div>

               <div className="grid gap-4">
                 {timetable.map((item, idx) => (
                   <div key={idx} className="group flex flex-col sm:flex-row items-start sm:items-center p-6 rounded-[2rem] bg-gray-50 dark:bg-zinc-800/40 hover:bg-white dark:hover:bg-zinc-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-zinc-700">
                      <div className="flex items-center w-full sm:w-20 sm:text-center mb-4 sm:mb-0">
                        <div className="sm:flex-1">
                          <p className="text-lg font-black text-gray-900 dark:text-white">{item.time.split(' ')[0]}</p>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">{item.time.split(' ')[1]}</p>
                        </div>
                      </div>
                      <div className="hidden sm:block w-px h-12 bg-gray-200 dark:bg-zinc-700 mx-6"></div>
                      <div className="flex-1">
                        <p className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-500 transition-colors">{item.subject}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2 font-bold uppercase tracking-wide">
                           <MapPin className="w-3.5 h-3.5 text-red-500" />
                           {item.room}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${
                          item.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                          item.status === 'upcoming' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse' : 
                          'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-8">
             
             {/* Weekly Activity Insights */}
             <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 border border-gray-200 dark:border-zinc-800 shadow-xl overflow-hidden relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-500/10 rounded-2xl text-purple-600 dark:text-purple-400">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">Activity</h3>
                  </div>
                </div>

                <div className="flex items-end justify-between h-48 gap-3 relative">
                  {activityData.map((data, i) => (
                    <div key={i} 
                         onMouseEnter={() => setHoveredBar(i)}
                         onMouseLeave={() => setHoveredBar(null)}
                         className="flex flex-col items-center gap-3 flex-1 h-full cursor-pointer group">
                       <div className="w-full bg-gray-50 dark:bg-zinc-800/50 rounded-[1rem] relative overflow-hidden h-full">
                         <div 
                          className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-[1rem] transition-all duration-300 ${hoveredBar === i ? 'brightness-125' : ''}`}
                          style={{ height: `${data.height}%` }}
                         ></div>
                       </div>
                       <span className="text-[10px] text-gray-500 font-bold uppercase">{data.day}</span>
                       
                       {hoveredBar === i && (
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-[10px] font-bold shadow-xl border border-white/10 z-20 whitespace-nowrap animate-fade-in">
                            {data.steps} steps covered
                          </div>
                       )}
                    </div>
                  ))}
                </div>
             </div>

             {/* Recent Locations */}
             <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-200 dark:border-zinc-800 shadow-xl">
               <div className="flex items-center gap-4 mb-8">
                 <div className="p-3 bg-orange-100 dark:bg-orange-500/10 rounded-2xl text-orange-600 dark:text-orange-400">
                   <History className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-xl text-gray-900 dark:text-white">History</h3>
               </div>
               
               <div className="space-y-6">
                 {recentLocations.map((loc, i) => (
                   <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800/50 p-2 rounded-xl transition-colors">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                         <Bookmark size={18} />
                       </div>
                       <div>
                         <p className="font-bold text-gray-900 dark:text-white text-sm">{loc.name}</p>
                         <p className="text-[10px] text-gray-500 font-bold uppercase">{loc.block}</p>
                       </div>
                     </div>
                     <span className="text-[10px] text-gray-400 font-bold">{loc.time}</span>
                   </div>
                 ))}
               </div>

               {/* Metrics Section below History */}
               <div className="mt-10 pt-8 border-t border-gray-100 dark:border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-500/5 rounded-2xl border border-green-500/10">
                    <div className="flex items-center gap-3">
                      <MoveRight size={18} className="text-green-500" />
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Distance</span>
                    </div>
                    <span className="text-sm font-black text-gray-900 dark:text-white">12.4 km</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-500/5 rounded-2xl border border-blue-500/10">
                    <div className="flex items-center gap-3">
                      <Timer size={18} className="text-blue-500" />
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Time Saved</span>
                    </div>
                    <span className="text-sm font-black text-gray-900 dark:text-white">184 mins</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-500/5 rounded-2xl border border-purple-500/10">
                    <div className="flex items-center gap-3">
                      <Footprints size={18} className="text-purple-500" />
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Steps</span>
                    </div>
                    <span className="text-sm font-black text-gray-900 dark:text-white">45,210</span>
                  </div>
               </div>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { Play, Clock, MapPin, User, Search, Footprints, Activity, CalendarCheck, BarChart3, ArrowRight, BookOpen, Coffee, HelpCircle, Utensils } from 'lucide-react';

interface DashboardProps {
  onStartAR: () => void;
  onLogout: () => void;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartAR, onLogout, userName }) => {
  
  // Mock Timetable Data - Generated "Automatically" based on behavior
  const timetable = [
    { time: "09:00 AM", subject: "Calculus II", room: "Room 401", status: "completed" },
    { time: "11:00 AM", subject: "Physics Lab", room: "Lab 2B", status: "upcoming" },
    { time: "01:00 PM", subject: "Intro to AI", room: "Auditorium", status: "pending" },
    { time: "03:00 PM", subject: "Library Study", room: "Main Library", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-28 pb-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              Hello, <span className="text-green-500">{userName}.</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
              Here is your navigation summary for today.
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Student Account</p>
                <p className="text-xs text-gray-500">ID: 249102</p>
             </div>
             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-500 to-emerald-700 p-0.5">
               <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center">
                 <User className="text-green-600 dark:text-green-400 w-6 h-6" />
               </div>
             </div>
             <button onClick={onLogout} className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors ml-2">
               Log Out
             </button>
          </div>
        </div>

        {/* Main AR Launcher */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 md:p-10 border border-gray-200 dark:border-zinc-800 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20 transition-all duration-700 group-hover:bg-green-500/20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                VPS System Operational
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Where to next?</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Your next class is <span className="text-green-600 dark:text-green-400 font-bold">Physics Lab</span> in 25 minutes. 
                Launch AR to find the quickest route.
              </p>
            </div>
            
            <button 
              onClick={onStartAR}
              className="px-10 py-6 rounded-2xl bg-green-500 hover:bg-green-400 text-white font-bold text-xl shadow-lg shadow-green-500/30 transition-all transform hover:scale-105 flex items-center gap-4 w-full md:w-auto justify-center group/btn"
            >
              <div className="p-2 bg-white/20 rounded-full">
                <Play className="fill-current w-5 h-5" />
              </div>
              Start Navigation
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { name: "Library", icon: <BookOpen className="w-5 h-5" /> },
             { name: "Cafeteria", icon: <Utensils className="w-5 h-5" /> },
             { name: "Student Affairs", icon: <HelpCircle className="w-5 h-5" /> },
             { name: "Search Lab", icon: <Search className="w-5 h-5" /> }
           ].map((action, idx) => (
             <button key={idx} onClick={onStartAR} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-green-500 transition-colors group">
                <div className="p-3 bg-gray-100 dark:bg-zinc-800 rounded-full text-gray-600 dark:text-gray-400 group-hover:bg-green-500 group-hover:text-white transition-all mb-3">
                  {action.icon}
                </div>
                <span className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-green-500 transition-colors">{action.name}</span>
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Smart Timetable Section */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border border-gray-200 dark:border-zinc-800 shadow-sm">
             <div className="flex items-center gap-3 mb-8">
               <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400">
                 <CalendarCheck className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-xl text-gray-900 dark:text-white">Smart Timetable</h3>
                 <p className="text-sm text-gray-500">Automatically generated from your Monday routine.</p>
               </div>
             </div>

             <div className="space-y-4">
               {timetable.map((item, idx) => (
                 <div key={idx} className="flex items-center p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-zinc-700">
                    <div className="w-16 text-center">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{item.time.split(' ')[0]}</p>
                      <p className="text-xs text-gray-500">{item.time.split(' ')[1]}</p>
                    </div>
                    
                    <div className="w-px h-10 bg-gray-200 dark:bg-zinc-700 mx-4"></div>
                    
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-white">{item.subject}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                         <MapPin className="w-3 h-3" />
                         {item.room}
                      </div>
                    </div>

                    <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                      style={{
                        backgroundColor: item.status === 'completed' ? 'rgba(34, 197, 94, 0.1)' : item.status === 'upcoming' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(113, 113, 122, 0.1)',
                        color: item.status === 'completed' ? '#22c55e' : item.status === 'upcoming' ? '#3b82f6' : '#a1a1aa'
                      }}
                    >
                      {item.status}
                    </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Activity Insights & Graphs */}
          <div className="space-y-8">
             
             {/* Weekly Activity Graph */}
             <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border border-gray-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Activity</h3>
                  </div>
                  <span className="text-xs font-bold text-green-500">+12% vs last week</span>
                </div>

                <div className="flex items-end justify-between h-40 gap-2">
                  {[40, 70, 30, 85, 50, 65, 90].map((h, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 w-full">
                       <div 
                        className="w-full bg-gray-100 dark:bg-zinc-800 rounded-t-lg relative group overflow-hidden"
                        style={{ height: '100%' }}
                       >
                         <div 
                          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg transition-all duration-1000 group-hover:opacity-80"
                          style={{ height: `${h}%` }}
                         ></div>
                       </div>
                       <span className="text-[10px] text-gray-400 font-bold">{['M','T','W','T','F','S','S'][i]}</span>
                    </div>
                  ))}
                </div>
             </div>

             {/* Health Metrics */}
             <div className="grid grid-cols-2 gap-4">
               <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border border-gray-200 dark:border-zinc-800 flex flex-col justify-center items-center text-center">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-full text-orange-500 mb-3">
                    <Footprints className="w-5 h-5" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-gray-900 dark:text-white">4,289</h4>
                  <p className="text-xs text-gray-500 font-bold uppercase mt-1">Steps Today</p>
               </div>
               <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border border-gray-200 dark:border-zinc-800 flex flex-col justify-center items-center text-center">
                  <div className="p-2 bg-pink-100 dark:bg-pink-500/20 rounded-full text-pink-500 mb-3">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-gray-900 dark:text-white">1.8km</h4>
                  <p className="text-xs text-gray-500 font-bold uppercase mt-1">Distance</p>
               </div>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
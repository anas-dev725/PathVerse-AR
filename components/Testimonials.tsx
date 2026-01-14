import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zinc-900 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold text-white text-center mb-16">What Students Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/50 p-8 rounded-2xl border border-zinc-800 relative">
            <Quote className="absolute top-8 right-8 text-zinc-800 w-10 h-10" />
            <p className="text-gray-300 text-lg italic mb-6">"I used to get lost in the academic block every single day. PathSense AR is a lifesaver, especially the offline mode!"</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">SA</div>
              <div>
                <p className="text-white font-semibold">Sarah Ahmed</p>
                <p className="text-xs text-gray-500">BBA Student, IOBM</p>
              </div>
            </div>
          </div>

          <div className="bg-black/50 p-8 rounded-2xl border border-zinc-800 relative">
            <Quote className="absolute top-8 right-8 text-zinc-800 w-10 h-10" />
            <p className="text-gray-300 text-lg italic mb-6">"The AR arrows are so intuitive. It feels like having a personal guide walking you to your class."</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">MK</div>
              <div>
                <p className="text-white font-semibold">Moiz Khan</p>
                <p className="text-xs text-gray-500">CS Department, IOBM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
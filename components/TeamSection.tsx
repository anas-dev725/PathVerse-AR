import React from 'react';
import { Github, Linkedin, Globe } from 'lucide-react';

const TeamSection: React.FC = () => {
  const team = [
    {
      name: "Muhammad Anas",
      role: "Lead Developer",
      specialty: "AI & AR Engineering",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      links: {
        github: "https://github.com/anas-dev725",
        linkedin: "https://www.linkedin.com/in/muhammad-anas804/",
        portfolio: "https://muhammad-anas-ai-engineer.vercel.app/"
      }
    },
    {
      name: "Muhammad Abrar",
      role: "UI/UX Designer",
      specialty: "Visual Strategy & Interaction",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      links: {
        github: "#",
        linkedin: "https://www.linkedin.com/in/muhammad-abrar-18253727a/",
        portfolio: "#"
      }
    },
    {
      name: "Muheb Khawer",
      role: "Backend Engineer",
      specialty: "Backend & Logic",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      links: {
        github: "#",
        linkedin: "https://www.linkedin.com/in/syed-muheb-khawer-3ba725264/",
        portfolio: "#"
      }
    }
  ];

  return (
    <section id="team" className="py-24 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-green-600 dark:text-green-400 font-bold text-sm tracking-widest uppercase mb-2 block">The Minds Behind PathSense</span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Meet the Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((member, idx) => (
            <div key={idx} className="group relative">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-gray-200 dark:bg-zinc-900 shadow-xl">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                  <p className="text-white/80 text-sm font-medium mb-1">{member.role}</p>
                  <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-4">{member.specialty}</p>
                  
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 translate-y-4 group-hover:translate-y-0">
                    {member.links.github && (
                      <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:bg-green-500/20 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm">
                        <Github size={18} />
                      </a>
                    )}
                    {member.links.linkedin && (
                      <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:bg-blue-500/20 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm">
                        <Linkedin size={18} />
                      </a>
                    )}
                    {member.links.portfolio && (
                      <a href={member.links.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:bg-purple-500/20 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm">
                        <Globe size={18} />
                      </a>
                    )}
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

export default TeamSection;
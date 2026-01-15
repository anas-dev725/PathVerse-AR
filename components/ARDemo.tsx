import React, { useState, useRef, useEffect } from 'react';
import { NavState, AIAnalysisResult } from '../types';
import { analyzeSurroundings } from '../services/geminiService';
import { Search, X, Navigation, ArrowUp, LocateFixed, ChevronUp, CornerUpRight, Mic, MicOff, Volume2, Map as MapIcon, Landmark, Coffee, UserCircle } from 'lucide-react';

interface ARDemoProps {
  onBack: () => void;
}

const ARArrow = ({ intensity, delay }: { color: string, intensity: boolean, delay: string }) => {
  const baseColor = intensity ? '#f59e0b' : '#22c55e'; // Amber for turn, Green for straight
  
  return (
    <div className="relative" style={{ animationDelay: delay }}>
      <div className="absolute inset-0 scale-[1.05] text-black blur-[3px] opacity-60">
        <ChevronUp size={140} strokeWidth={10} />
      </div>
      
      <div 
        className={`relative transition-colors duration-500`}
        style={{ color: baseColor }}
      >
        <div className="filter drop-shadow-[0_0_30px_currentColor]">
          <ChevronUp 
            size={140} 
            strokeWidth={4} 
            className="fill-current opacity-30"
          />
          <ChevronUp 
            size={140} 
            strokeWidth={4} 
            className="absolute top-0 left-0"
          />
        </div>

        <div className="absolute inset-0 animate-arrow-energy overflow-hidden">
          <ChevronUp 
            size={140} 
            strokeWidth={6} 
            className="text-white drop-shadow-[0_0_15px_#fff]"
          />
        </div>
      </div>
    </div>
  );
};

const MiniMap = ({ distance }: { distance: number, target: string }) => {
  const progress = Math.max(0, Math.min(100, ((30 - distance) / 30) * 100));
  
  return (
    <div className="absolute top-24 right-4 w-48 h-48 bg-black/90 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 overflow-hidden shadow-2xl animate-fade-in pointer-events-none ring-1 ring-white/10">
      <div className="absolute inset-0 tech-grid opacity-30"></div>
      
      <div className="absolute top-4 left-0 w-full flex justify-center items-center gap-1.5 z-10">
        <div className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/40 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[9px] font-black text-green-400 uppercase tracking-widest">Tracking Live</span>
        </div>
      </div>

      <div className="relative w-full h-full p-10 flex items-center justify-center">
        <div className="relative w-full h-full border border-white/10 rounded-full bg-zinc-900/80 overflow-hidden">
          <div className="absolute inset-0 border border-green-500/10 rounded-full"></div>
          <div className="absolute inset-[33%] border border-green-500/10 rounded-full"></div>
          <div className="absolute inset-[66%] border border-green-500/10 rounded-full"></div>
          
          {/* North Marker */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-black text-gray-500">N</div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none transform rotate-180">
            <path 
              d="M 15,85 L 85,85 L 85,15" 
              fill="none" 
              stroke="rgba(34, 197, 94, 0.15)" 
              strokeWidth="5" 
              strokeLinecap="round"
            />
            <path 
              d="M 15,85 L 85,85 L 85,15" 
              fill="none" 
              stroke="#22c55e" 
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset={200 - (progress * 2)}
              className="transition-all duration-300"
              style={{ filter: 'drop-shadow(0 0 8px #22c55e)' }}
            />
          </svg>

          <div 
            className="absolute w-6 h-6 bg-green-500 rounded-full border-[3px] border-white shadow-[0_0_30px_rgba(34,197,94,1)] transition-all duration-300 z-10"
            style={{ 
              left: progress < 50 ? `${15 + progress * 1.4}%` : '85%',
              top: progress < 50 ? '85%' : `${85 - (progress - 50) * 1.4}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-60"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ARDemo: React.FC<ARDemoProps> = ({ onBack }) => {
  const [navState, setNavState] = useState<NavState>(NavState.IDLE);
  const [searchQuery, setSearchQuery] = useState('');
  const [videoError, setVideoError] = useState('');
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);
  const [isUserMoving, setIsUserMoving] = useState(false);
  
  const [distanceToTurn, setDistanceToTurn] = useState(30); 
  const [isTurnApproaching, setIsTurnApproaching] = useState(false);
  const [velocity, setVelocity] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const suggestions = [
    { name: "CBM Lab 4", icon: <Landmark size={14} /> },
    { name: "SSK Cafe", icon: <Coffee size={14} /> },
    { name: "IT Building Lobby", icon: <UserCircle size={14} /> }
  ];

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        setVideoError("Camera access denied.");
      }
    };
    startCamera();
    return () => {
      stopCamera();
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();

    const simulateMovement = (time: number) => {
      if (navState === NavState.NAVIGATING && isUserMoving) {
        const delta = (time - lastTime) / 1000;
        lastTime = time;
        const currentV = 1.4 + (Math.random() - 0.5) * 0.2;
        setVelocity(currentV);
        setDistanceToTurn(prev => {
          const next = prev - (currentV * delta);
          return next <= 0 ? 30 : next;
        });
      } else {
        lastTime = time;
        setVelocity(0);
      }
      frameId = requestAnimationFrame(simulateMovement);
    };

    frameId = requestAnimationFrame(simulateMovement);
    return () => cancelAnimationFrame(frameId);
  }, [navState, isUserMoving]);

  useEffect(() => {
    setIsTurnApproaching(distanceToTurn < 10);
  }, [distanceToTurn]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSearch = async (e?: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const query = overrideQuery || searchQuery;
    if (!query.trim()) return;

    setSystemMessage(`Searching for ${query}.`);
    
    // Voice command on search
    speak(`Scanning the area, location detected and the destination will be 30 meters so follow the navigation arrows`);

    setTimeout(async () => {
        setSystemMessage(null);
        setNavState(NavState.SCANNING);
        await new Promise(r => setTimeout(r, 1500));
        setAnalysis({ locationContext: "IOBM Entrance Hall", confidence: 0.98, detectedFeatures: [] });
        setNavState(NavState.NAVIGATING);
        setIsUserMoving(true); 
    }, 1500);
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col font-mono selection:bg-green-500">
      <canvas ref={canvasRef} className="hidden" />

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {videoError ? (
          <div className="flex items-center justify-center h-full text-center p-4">
            <p className="text-red-500 bg-red-900/20 p-6 rounded-[2rem] border border-red-500/50">{videoError}</p>
          </div>
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover opacity-80" />
        )}
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none"></div>
      </div>

      {/* MiniMap Overlay */}
      {navState === NavState.NAVIGATING && (
        <MiniMap distance={distanceToTurn} target={searchQuery} />
      )}

      {/* AR Path Visualization Layer - Moved Lower for Visibility */}
      {navState === NavState.NAVIGATING && (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center perspective-[3000px] overflow-hidden">
          <div className="relative w-full h-[120%] origin-bottom transition-transform duration-700" style={{ transform: 'rotateX(82deg) translateY(35%)' }}>
             <div className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-96 h-full bg-gradient-to-t transition-colors duration-1000 blur-[100px] ${isTurnApproaching ? 'from-amber-500/40' : 'from-green-500/40'} via-transparent to-transparent opacity-70`}></div>
             <div className="absolute inset-0">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i} 
                    className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
                    style={{ 
                      bottom: `${8 + (i * 15)}%`,
                      transform: `translateX(${isTurnApproaching ? (i * 20) : 0}px) rotateZ(${isTurnApproaching ? (i * 8) : 0}deg) scale(${1.2 - (i * 0.12)})`,
                      zIndex: 30 - i,
                      opacity: 1 - (i * 0.12)
                    }}
                  >
                    <ARArrow color={isTurnApproaching ? 'amber' : 'green'} intensity={isTurnApproaching} delay={`${i * 0.2}s`} />
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* HUD UI Layer */}
      <div className="relative z-30 flex flex-col h-full justify-between p-6 pointer-events-none">
        <div className="pointer-events-auto flex justify-between items-start pt-4">
          <button onClick={() => { stopCamera(); onBack(); }} className="bg-black/90 backdrop-blur-2xl p-4 rounded-full border border-white/20 text-white hover:bg-red-500 transition-all shadow-2xl">
            <X size={24} />
          </button>
          
          <div className="bg-green-500/10 backdrop-blur-xl px-5 py-2 rounded-full border border-green-500/40 flex items-center gap-2 shadow-lg">
            <div className={`w-2 h-2 ${isUserMoving ? 'bg-green-500 animate-pulse' : 'bg-zinc-500'} rounded-full`}></div>
            <span className="text-green-400 text-[10px] font-black tracking-[0.2em] uppercase">
              {isUserMoving ? 'Movement Active' : 'User Stationed'}
            </span>
          </div>
        </div>

        <div className="pointer-events-auto w-full max-w-md mx-auto pb-6">
          {navState === NavState.NAVIGATING ? (
            <div className={`bg-black/95 backdrop-blur-3xl border-2 rounded-[2.5rem] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)] transition-all duration-700 ${isTurnApproaching ? 'border-amber-500 ring-8 ring-amber-500/10' : 'border-green-500/60'}`}>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${isTurnApproaching ? 'text-amber-400' : 'text-green-400'}`}>Target Destination</h3>
                  <h2 className="text-2xl md:text-3xl font-black text-white uppercase truncate max-w-[220px] tracking-tight">{searchQuery}</h2>
                </div>
                <div className={`p-4 rounded-2xl shadow-2xl transition-all duration-500 ${isTurnApproaching ? 'bg-amber-500' : 'bg-green-500'}`}>
                  {isTurnApproaching ? <CornerUpRight className="text-black w-8 h-8" /> : <ArrowUp className="text-black w-8 h-8" />}
                </div>
              </div>
              
              <div className="flex items-center gap-6 py-6 border-t border-white/10">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-6xl font-black ${isTurnApproaching ? 'text-amber-400' : 'text-white'}`}>
                      {distanceToTurn.toFixed(0)}
                    </span>
                    <span className="text-xs text-gray-500 font-black tracking-widest">METERS</span>
                  </div>
                </div>
                <div className="h-12 w-px bg-white/10"></div>
                <p className="text-gray-200 text-sm font-bold leading-relaxed flex-1">
                  {isTurnApproaching ? 'APPROACHING RIGHT TURN. FOLLOW THE AMBER PATH.' : 'PROCEED STRAIGHT. NAVIGATING THROUGH IOBM INTERIOR.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                 <button 
                  onClick={() => setIsUserMoving(!isUserMoving)}
                  className={`py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all border ${isUserMoving ? 'bg-zinc-900 text-gray-400 border-white/10' : 'bg-green-500 text-black border-transparent shadow-xl'}`}
                 >
                   {isUserMoving ? 'Pause Simulation' : 'Resume Walk'}
                 </button>
                 <button 
                  onClick={() => setNavState(NavState.IDLE)}
                  className="py-5 bg-red-600/20 text-red-500 rounded-2xl font-black text-[11px] uppercase tracking-widest border border-red-500/40 hover:bg-red-600 hover:text-white transition-all shadow-lg"
                >
                  Abort Mission
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-10 group-focus-within:opacity-50 transition duration-700 blur"></div>
                <div className="relative flex items-center bg-black/95 backdrop-blur-3xl rounded-full border border-white/15 overflow-hidden">
                   <Search className="w-6 h-6 text-gray-500 ml-6" />
                   <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Lab, Hall, or Office..."
                    className="w-full bg-transparent text-white px-4 py-5 focus:outline-none font-bold placeholder:text-zinc-700"
                  />
                  <button type="submit" className="mr-3 bg-green-500 hover:bg-green-400 text-black p-3.5 rounded-full transition-all shadow-xl active:scale-95">
                    <Navigation className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Quick Suggestions Chips */}
              <div className="flex gap-2.5 flex-wrap justify-center animate-fade-in">
                {suggestions.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => { setSearchQuery(s.name); handleSearch(undefined, s.name); }}
                    className="flex items-center gap-2.5 px-5 py-2.5 bg-zinc-900/90 backdrop-blur-2xl rounded-full border border-white/10 text-[10px] text-gray-400 font-bold uppercase hover:bg-zinc-800 hover:text-white hover:border-green-500/40 transition-all active:scale-95"
                  >
                    {s.icon}
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ARDemo;
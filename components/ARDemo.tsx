import React, { useState, useRef, useEffect } from 'react';
import { NavState, AIAnalysisResult } from '../types';
import { analyzeSurroundings } from '../services/geminiService';
import { Search, X, Navigation, Loader2, ArrowUp, LocateFixed, ChevronUp, ChevronRight, CornerUpRight, Mic, MicOff, MessageSquare, Volume2 } from 'lucide-react';

interface ARDemoProps {
  onBack: () => void;
}

const ARDemo: React.FC<ARDemoProps> = ({ onBack }) => {
  const [navState, setNavState] = useState<NavState>(NavState.IDLE);
  const [searchQuery, setSearchQuery] = useState('');
  const [videoError, setVideoError] = useState('');
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);
  
  // Simulated Navigation State
  const [distanceToTurn, setDistanceToTurn] = useState(30); // meters
  const [isTurnApproaching, setIsTurnApproaching] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Text-to-Speech Helper
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      // Select a preferred voice if available (usually Google US English or similar)
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => voice.name.includes('Google US English') || voice.name.includes('Samantha'));
      if (preferredVoice) utterance.voice = preferredVoice;
      
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setVideoError("Camera access denied. Please enable camera permissions.");
      }
    };
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  // Simulate movement when navigating
  useEffect(() => {
    let interval: number;
    if (navState === NavState.NAVIGATING) {
      interval = window.setInterval(() => {
        setDistanceToTurn(prev => {
          if (prev <= 0) return 30; // Reset for demo loop
          return prev - 0.5;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [navState]);

  useEffect(() => {
    setIsTurnApproaching(distanceToTurn < 10);
  }, [distanceToTurn]);

  // Haptic Feedback Effect
  useEffect(() => {
    if (isTurnApproaching) {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(200); 
      }
    }
  }, [isTurnApproaching]);

  const handleSearch = async (e?: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const query = overrideQuery || searchQuery;
    if (!query.trim()) return;

    // 1. Audio Feedback: Searching
    const searchMsg = `Searching for ${query}. Verifying spatial coordinates.`;
    setSystemMessage(searchMsg);
    speak(searchMsg);
    
    setTimeout(async () => {
        setSystemMessage(null);
        setNavState(NavState.SCANNING);
        setAnalysis(null);

        // Simulated scanning delay for effect
        await new Promise(r => setTimeout(r, 2000));

        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const base64Image = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
                try {
                    const result = await analyzeSurroundings(base64Image);
                    setAnalysis(result);
                    
                    // 2. Audio Feedback: Found
                    const foundMsg = `Destination found. It is 30 meters away. Please follow the green path.`;
                    speak(foundMsg);
                    
                    setNavState(NavState.NAVIGATING);
                } catch (error) {
                    console.error(error);
                    setNavState(NavState.IDLE);
                    speak("I'm sorry, I couldn't identify the location. Please try again.");
                }
            }
        }
    }, 2500); // Delay to sync with audio
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice listening delay
    setTimeout(() => {
        const spokenText = "Lab 401";
        setSearchQuery(spokenText);
        setIsListening(false);
        // Automatically submit after voice recognition
        handleSearch(undefined, spokenText);
    }, 2000);
  };

  const handleCancelNavigation = () => {
    setNavState(NavState.IDLE);
    setSearchQuery('');
    setAnalysis(null);
    setDistanceToTurn(30);
    window.speechSynthesis.cancel();
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col font-mono">
      <canvas ref={canvasRef} className="hidden" />

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {videoError ? (
          <div className="flex items-center justify-center h-full text-center p-4">
            <p className="text-red-500 bg-red-900/20 p-4 rounded-xl border border-red-500/50">{videoError}</p>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover opacity-90"
          />
        )}
        {/* HUD Grid Overlay */}
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none"></div>
        
        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/50"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/50"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/50"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/50"></div>
      </div>

      {/* AR Path Visualization Layer */}
      {navState === NavState.NAVIGATING && (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center perspective-[2000px] overflow-hidden">
          
          {/* 3D Ground Plane */}
          <div className="relative w-full h-[150%] origin-bottom will-change-transform" style={{ transform: 'rotateX(60deg) translateY(20%)' }}>
             
             {/* The Path "Runway" - Static Background */}
             <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-48 h-full bg-gradient-to-t from-green-500/20 via-green-500/5 to-transparent blur-xl animate-pulse"></div>
             
             {/* Center Guide Line */}
             <div 
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-full bg-green-400/50 shadow-[0_0_20px_#4ade80] transition-transform duration-1000 ease-out will-change-transform"
                style={{ 
                  transformOrigin: 'bottom center',
                  transform: isTurnApproaching ? 'rotateZ(20deg) translateX(60px)' : 'rotateZ(0deg)'
                }}
             ></div>

             {/* Dynamic Arrows (Waypoints) */}
             <div className="absolute inset-0">
                {/* 10 Waypoints for a dense path */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                  const dist = Math.max(2, distanceToTurn + (i * 3)); // Simulated dist
                  
                  // Calculate curve and position logic
                  const curveRotation = isTurnApproaching ? (i * 5) : 0; 
                  const xOffset = isTurnApproaching ? (i * 12) : 0;
                  const bottomPos = 5 + (i * 8); // Tighter spacing for continuous feel

                  return (
                    <div 
                      key={i} 
                      className="absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out will-change-transform"
                      style={{ 
                        bottom: `${bottomPos}%`,
                        transform: `translateX(${xOffset}px) rotateZ(${curveRotation}deg) scale(${1 - (i * 0.08)})`,
                        zIndex: 20 - i,
                        opacity: 1 - (i * 0.1)
                      }}
                    >
                      {/* Arrow Container with Flow Animation */}
                      <div 
                        className={`relative text-green-400 animate-runway`}
                        style={{ 
                          animationDelay: `${i * 0.1}s`, // Sequential animation for flow effect
                          animationDuration: '1.5s'
                        }}
                      >
                         <div className="relative p-2 flex flex-col items-center">
                            {/* The AR Arrow */}
                            <div className="filter drop-shadow-[0_0_15px_rgba(34,197,94,0.9)]">
                               <ChevronUp 
                                 size={80} 
                                 strokeWidth={4} 
                                 className="text-white fill-green-500/20 drop-shadow-[0_0_5px_#000]" 
                               />
                               {/* Double arrow effect for the closest ones */}
                               {i < 3 && (
                                 <ChevronUp 
                                   size={80} 
                                   strokeWidth={4} 
                                   className="text-green-300 absolute -top-8 left-0 opacity-50" 
                                 />
                               )}
                            </div>
                         </div>
                      </div>
                    </div>
                  );
                })}
             </div>

             {/* Destination Beacon (Far away) */}
             {!isTurnApproaching && (
               <div className="absolute top-[10%] left-1/2 -translate-x-1/2 transform -translate-y-1/2 w-48 h-48 transition-opacity duration-500 will-change-transform">
                  <div className="relative w-full h-full animate-beacon" style={{ transformStyle: 'preserve-3d' }}>
                     <div className="absolute inset-0 border-4 border-green-500/80 rounded-full shadow-[0_0_50px_rgba(34,197,94,1)]"></div>
                     <div className="absolute inset-0 border-2 border-white/30 rounded-full rotate-y-90"></div>
                     <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-2 h-[800px] bg-gradient-to-t from-green-400 via-green-500/50 to-transparent blur-md"></div>
                     
                     {/* Destination Label in AR Space */}
                     <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-green-500 text-black font-bold px-3 py-1 rounded text-lg whitespace-nowrap animate-bounce">
                        {searchQuery}
                     </div>
                  </div>
               </div>
             )}

          </div>
        </div>
      )}

      {/* System Response Overlay */}
      {systemMessage && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-none">
            <div className="max-w-xs w-full p-6 bg-zinc-900 border border-green-500/50 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.3)] animate-fade-in-up text-center">
                 <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                     <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-ping opacity-75"></div>
                     <Volume2 className="w-8 h-8 text-green-400" />
                 </div>
                 <p className="text-white font-mono text-sm leading-relaxed typing-effect">{systemMessage}</p>
                 <div className="mt-4 flex gap-1 justify-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-150"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-200"></div>
                 </div>
            </div>
        </div>
      )}

      {/* HUD UI Layer */}
      <div className="relative z-20 flex flex-col h-full justify-between p-4 pointer-events-none">
        
        {/* Top Header */}
        <div className="pointer-events-auto flex justify-between items-start pt-2">
          <button 
            onClick={onBack}
            className="bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/20 text-white hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-all shadow-lg"
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col items-end gap-2">
            <div className="bg-green-500/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-green-500/30 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-bold tracking-widest">PATH_SENSE v1.0</span>
            </div>
            
            {analysis && (
               <div className="bg-black/80 backdrop-blur-xl px-4 py-3 rounded-lg border border-white/10 text-right shadow-2xl animate-fade-in-up">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <LocateFixed className="w-3 h-3 text-green-400" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Current Location</span>
                  </div>
                  <p className="text-sm font-bold text-white uppercase">{analysis.locationContext}</p>
                  <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${analysis.confidence * 100}%` }}></div>
                  </div>
               </div>
            )}
          </div>
        </div>

        {/* Scanning Animation */}
        {navState === NavState.SCANNING && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <div className="relative">
                <div className="w-48 h-48 border border-green-500/30 rounded-full animate-ping absolute inset-0"></div>
                <div className="w-48 h-48 border-2 border-green-500/50 rounded-full animate-spin border-t-transparent"></div>
                <Loader2 className="w-12 h-12 text-green-400 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
             </div>
             <div className="mt-8 bg-black/80 backdrop-blur px-6 py-2 rounded-full border border-green-500/30">
                <p className="text-green-400 font-mono tracking-widest text-sm animate-pulse">ANALYZING SPATIAL DATA...</p>
             </div>
             <div className="scan-line top-1/2"></div>
          </div>
        )}

        {/* Bottom Control Panel */}
        <div className="pointer-events-auto w-full max-w-md mx-auto pb-4">
          {navState === NavState.NAVIGATING ? (
            <div className="bg-black/80 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-green-400 text-[10px] font-bold uppercase tracking-widest mb-1">Target Destination</h3>
                  <h2 className="text-2xl font-bold text-white uppercase">{searchQuery}</h2>
                </div>
                <div className={`p-3 rounded-xl shadow-[0_0_15px_#22c55e] transition-colors ${isTurnApproaching ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}>
                  {isTurnApproaching ? <CornerUpRight className="text-black w-6 h-6" /> : <ArrowUp className="text-black w-6 h-6" />}
                </div>
              </div>
              
              <div className="flex items-center gap-6 py-4 border-t border-white/10">
                <div>
                  <span className={`text-3xl font-bold ${isTurnApproaching ? 'text-yellow-400' : 'text-white'}`}>
                    {distanceToTurn.toFixed(0)}
                  </span>
                  <span className="text-sm text-gray-400 ml-1">METERS</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10"></div>
                <p className="text-gray-300 text-sm leading-tight">
                  {isTurnApproaching ? 'Prepare to turn right ahead.' : 'Proceed straight. Follow the AR path.'}
                </p>
              </div>

              <button 
                onClick={handleCancelNavigation}
                className="w-full py-3 mt-2 bg-zinc-800 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 border border-transparent rounded-lg font-mono text-sm transition-all"
              >
                ABORT NAVIGATION
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <form onSubmit={(e) => handleSearch(e)} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-30 group-hover:opacity-70 transition duration-500 blur"></div>
                <div className="relative flex items-center bg-black rounded-full border border-zinc-800">
                   <Search className="w-5 h-5 text-gray-400 ml-4" />
                   <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Search Room (e.g. Lab 401)..."}
                    className="w-full bg-transparent text-white px-4 py-4 focus:outline-none placeholder:text-gray-600 font-sans"
                  />
                  {/* Voice Button */}
                  <button 
                    type="button"
                    onClick={handleVoiceInput}
                    className={`p-2 mr-1 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-zinc-800 text-gray-400'}`}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>

                  <button 
                    type="submit"
                    disabled={!searchQuery}
                    className="mr-2 bg-zinc-800 hover:bg-green-500 text-white hover:text-black p-2.5 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                  >
                    <Navigation className="w-4 h-4" />
                  </button>
                </div>
              </form>
              
              {/* Added more suggestions */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center pb-2 px-1">
                {['Lab 401', 'Faculty Room', 'Auditorium', 'Library', 'Cafe', 'Physics Lab'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => {
                        setSearchQuery(item);
                        handleSearch(undefined, item);
                    }}
                    className="whitespace-nowrap px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-xs text-gray-300 border border-zinc-800 hover:border-green-500/50 hover:text-green-400 transition-colors"
                  >
                    {item}
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
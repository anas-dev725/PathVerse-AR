import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Lock, ArrowRight, X, User, Eye, EyeOff, Accessibility, CheckCircle2, Scan } from 'lucide-react';

interface AuthProps {
  onLogin: (name: string) => void;
  onBack: () => void;
  initialMode?: 'login' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ onLogin, onBack, initialMode = 'signup' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      // Use entered name or default "Student" if login mode (simulating fetching from DB)
      const nameToUse = isLogin ? "Student" : firstName;
      onLogin(nameToUse);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex relative overflow-hidden">
      
      {/* Left Side: Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-zinc-900 relative items-center justify-center p-12 overflow-hidden">
         <div className="absolute inset-0 tech-grid opacity-20"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px]"></div>
         
         <div className="relative z-10 max-w-lg">
            {/* Visual Character / Campus Context - Updated to Rendering/Navigation theme */}
            <div className="relative aspect-square mb-12 group">
               <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-emerald-800 rounded-[2.5rem] opacity-20 animate-pulse"></div>
               {/* 3D Model / Navigation rendering image */}
               <img 
                 src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop"
                 alt="Campus Navigation Rendering"
                 className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl border border-white/10 transform group-hover:scale-[1.02] transition-transform duration-700 opacity-90 grayscale-[20%]"
               />
               
               {/* Overlay Graphic - Scan Lines */}
               <div className="absolute inset-0 rounded-[2.5rem] bg-[linear-gradient(transparent_2px,_#000_2px)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>

               {/* Playful Floating Element / Accessibility CTA */}
               <div className="absolute bottom-8 right-8 animate-float">
                 <div className="bg-black/90 backdrop-blur-xl p-4 rounded-2xl border border-green-500/50 shadow-2xl max-w-[200px]">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-500/20 rounded-xl text-green-400">
                        <Scan className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Real-time Render</h4>
                        <p className="text-xs text-gray-400 mt-1">Lidar-enabled path generation.</p>
                      </div>
                    </div>
                 </div>
               </div>

               {/* Stats Overlay */}
               <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-green-400" />
                 <span className="text-xs font-bold text-white uppercase tracking-wider">Verified Campus Map</span>
               </div>
            </div>

            <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
              Visualizing Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                Path to Success.
              </span>
            </h2>
            <div className="pl-6 border-l-4 border-green-500">
              <p className="text-xl text-gray-400 italic">
                "Finding my classes used to be a daily struggle. Now I just follow the arrows and enjoy the walk."
              </p>
            </div>
         </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <button 
          onClick={onBack}
          className="absolute top-8 right-8 p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="w-full max-w-md animate-fade-in-up">
          <div className="mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 shadow-lg shadow-green-500/30 mb-6">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h1>
            <p className="text-gray-500">
              {isLogin ? 'Enter your credentials to access your dashboard.' : 'Sign up to start navigating IOBM.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* First Name Field - Sign Up Only */}
            {!isLogin && (
              <div className="animate-fade-in-down">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">First Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-medium"
                    placeholder="e.g. Ali"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-medium"
                  placeholder="student@iobm.edu.pk"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-4 pl-12 pr-12 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Log In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-green-500 font-bold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
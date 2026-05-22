'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Hand, 
  Smile, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Video, 
  LineChart, 
  Cpu, 
  Layers, 
  GraduationCap, 
  CheckCircle2, 
  Play, 
  Pause, 
  ChevronRight, 
  DollarSign, 
  Target, 
  TrendingUp, 
  FolderGit, 
  Code2, 
  HelpCircle,
  Eye,
  Settings,
  Flame,
  ArrowRight
} from 'lucide-react';

// Simulated log entry interface
interface LogEntry {
  id: string;
  time: string;
  student: string;
  event: string;
  type: 'attendance' | 'gesture' | 'emotion';
  value: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'teacher' | 'student' | 'admin'>('teacher');
  const [isAiActive, setIsAiActive] = useState<boolean>(true);
  const [simulatedGesture, setSimulatedGesture] = useState<string>('None');
  const [activePitchSlide, setActivePitchSlide] = useState<number>(0);
  
  // Auth sliding panel state (Humne login/signup modal ko direct landing page se link kar diya hai)
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [isSuccessfullyLoggedIn, setIsSuccessfullyLoggedIn] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<string>('');

  // Form input states
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [authNotification, setAuthNotification] = useState<string>('');

  // Simulated live stats state
  const [attendanceRate, setAttendanceRate] = useState<number>(94.8);
  const [engagementScore, setEngagementScore] = useState<number>(86.5);
  const [activeLogs, setActiveLogs] = useState<LogEntry[]>([
    { id: '1', time: '10:02 AM', student: 'Sarthak Tripathy', event: 'Marked Present via Face ID', type: 'attendance', value: 'Face Match 99.4%' },
    { id: '2', time: '10:04 AM', student: 'Aman Verma', event: 'Raised Gesture: Understood', type: 'gesture', value: '👍' },
    { id: '3', time: '10:08 AM', student: 'Sneha Rao', event: 'Detected Emotion', type: 'emotion', value: 'Confused 😕' },
  ]);

  const clearSkyVideoRef = useRef<HTMLVideoElement>(null);
  const studentOvercastVideoRef = useRef<HTMLVideoElement>(null);

  // Classroom live logs stream simulation loop (Yeh background telemetry simulate karta hai)
  useEffect(() => {
    if (!isAiActive) return;
    
    const interval = setInterval(() => {
      const students = ['Priya Das', 'Amit Raj', 'Vikram Seth', 'Neha Patel', 'Sarthak T.'];
      const gestures = ['👍 Understood', '✋ Raised Hand (Doubt)', '👌 Confirmed'];
      const emotions = ['Attentive 😄', 'Confused 😕', 'Sleepy 🥱', 'Distracted 🙄'];
      
      const randType = Math.floor(Math.random() * 3);
      let newLog: LogEntry;
      
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      if (randType === 0) {
        newLog = {
          id: String(Date.now()),
          time: timeStr,
          student: students[Math.floor(Math.random() * students.length)],
          event: 'Marked Present via Face Scan',
          type: 'attendance',
          value: 'Match 98.7%'
        };
        setAttendanceRate(prev => Math.min(100, +(prev + 0.1).toFixed(1)));
      } else if (randType === 1) {
        const gesture = gestures[Math.floor(Math.random() * gestures.length)];
        newLog = {
          id: String(Date.now()),
          time: timeStr,
          student: students[Math.floor(Math.random() * students.length)],
          event: `Gesture: ${gesture}`,
          type: 'gesture',
          value: gesture.split(' ')[0]
        };
        setSimulatedGesture(gesture);
        setEngagementScore(prev => Math.min(100, +(prev + 1.2).toFixed(1)));
      } else {
        const emotion = emotions[Math.floor(Math.random() * emotions.length)];
        newLog = {
          id: String(Date.now()),
          time: timeStr,
          student: students[Math.floor(Math.random() * students.length)],
          event: `Emotion Change: ${emotion.split(' ')[0]}`,
          type: 'emotion',
          value: emotion
        };
        if (emotion.includes('Confused') || emotion.includes('Sleepy')) {
          setEngagementScore(prev => Math.max(50, +(prev - 1.5).toFixed(1)));
        } else {
          setEngagementScore(prev => Math.min(100, +(prev + 0.8).toFixed(1)));
        }
      }

      setActiveLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAiActive]);

  const toggleState = () => {
    setIsAiActive(!isAiActive);
  };

  // Auth processing handlers
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setAuthNotification('Kripya sabhi details sahi tareeke se bharein!'); // Hindi Validation error
      return;
    }
    // Simulation success trigger
    setAuthNotification('');
    setIsSuccessfullyLoggedIn(true);
    setLoggedInUser(username);
    setAuthNotification(`Swagat hai, ${username}! Login safal raha.`); // Successful sign in in Hindi
    setTimeout(() => {
      setShowAuthModal(false);
    }, 1800);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setAuthNotification('Kripya registration ke liye sabhi fields bharein!'); // Complete setup Hindi alert
      return;
    }
    if (password !== confirmPassword) {
      setAuthNotification('Dono passwords aaps mein match nahi kar rahe!'); // Match error in Hindi
      return;
    }
    setAuthNotification('');
    setAuthMode('signin');
    setAuthNotification('Registration safal! Ab aap login kar sakte hain.'); // Registration complete in Hindi
  };

  const pitchSlides = [
    {
      title: "The Core Problem",
      description: "Traditional classroom environments burn 10% of lecture duration on roll-calls, suffer from silent/disengaged students, and leave school administrators completely blind to operational performance.",
      icon: Target,
      metrics: "Average 8.5 minutes wasted per class"
    },
    {
      title: "The Zero-Hardware Solution",
      description: "Our platform leverages standard, pre-installed classroom security cameras. MediaPipe and OpenCV process continuous face and gesture arrays on the edge, outputting real-time engagement telemetry.",
      icon: Cpu,
      metrics: "99.2% Accuracy in Face Verification"
    },
    {
      title: "Vast Market Potential (TAM)",
      description: "A total addressable market exceeding $20 Billion. Initial SOM targets high-end private universities and coaching networks in rapidly digitizing hubs across Southeast Asia & India.",
      icon: TrendingUp,
      metrics: "$20B+ TAM | $3B+ SAM globally"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-dm selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Background glow graphics */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[200px] left-1/3 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-slate-900 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-outfit font-black tracking-wider shadow-lg shadow-indigo-500/20">
              AI
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
            </div>
            <div>
              <span className="font-outfit font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                VERYA SMART
              </span>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">AI Interaction System</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#vision" className="hover:text-indigo-400 transition-colors">Core Vision</a>
            <a href="#interactive-sim" className="hover:text-indigo-400 transition-colors">Live Simulation</a>
            <a href="#architecture" className="hover:text-indigo-400 transition-colors">System Architecture</a>
            <a href="#vc-pitch" className="hover:text-indigo-400 transition-colors">VC Investor Pitch</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing model</a>
          </nav>

          <div className="flex items-center gap-4">
            {isSuccessfullyLoggedIn ? (
              <div className="flex items-center gap-2.5 px-4 py-2 bg-indigo-950/60 border border-indigo-500/30 rounded-xl text-xs text-indigo-300 font-bold">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Hi, {loggedInUser} ({selectedRole.toUpperCase()})
              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('signin'); setShowAuthModal(true); }}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all duration-300"
              >
                Sign In / Sign Up
              </button>
            )}
            
            <a 
              href="#interactive-sim"
              className="relative group px-5 py-2.5 rounded-lg overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-1.5">
                Try Live Simulator <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              A Sarthak Tripathy Initiative
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-extrabold tracking-tight leading-[1.1]">
              The Classroom of the{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                AI Revolution
              </span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-xl">
              Automated high-precision face recognition roll-calls coupled with instant passive hand gesture telemetry. Built to empower teachers, capture distraction markers, and optimize educational outcomes.
            </p>

            {/* Video State Toggle Controller */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest font-outfit">Visual Metaphor Mode</p>
                <h4 className="text-sm font-semibold text-white mt-1">
                  {isAiActive ? 'After AI: Clarity & Automated Serenity' : 'Before AI: Cloudy Manual Inefficiency'}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Toggle to compare the shift in classroom atmosphere</p>
              </div>

              <button
                onClick={toggleState}
                className={`relative inline-flex h-11 w-24 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                  isAiActive ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-10 w-10 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out flex items-center justify-center text-slate-950 font-bold ${
                    isAiActive ? 'translate-x-12' : 'translate-x-0'
                  }`}
                >
                  {isAiActive ? 'AI' : 'Off'}
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium text-slate-300">No Custom Hardware Needed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium text-slate-300">Privacy Anonymized Local Edge</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium text-slate-300">SaaS Scalable Ready</span>
              </div>
            </div>
          </div>

          {/* Video Showcase Stage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-indigo-500/20 bg-slate-950 shadow-2xl aspect-[16/10] group">
              <AnimatePresence mode="wait">
                {isAiActive ? (
                  <motion.div
                    key="clearSky"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <video
                      ref={clearSkyVideoRef}
                      src="/e_e_e_a_bc_ed_f_final_videomp_.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-indigo-950/80 backdrop-blur border border-indigo-500/30 px-3 py-1.5 rounded-xl">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                      <span className="text-xs font-semibold text-indigo-200 uppercase tracking-widest font-outfit">AI STATE: ACTIVE</span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 border border-indigo-500/20 backdrop-blur-md">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest font-outfit">
                        <Cpu className="w-4 h-4 text-indigo-400" />
                        Platform Telemetry
                      </div>
                      <p className="text-white text-sm font-medium mt-1">
                        Serene automation: Continuous background face tracking minimizes student friction.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="overcastSky"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <video
                      ref={studentOvercastVideoRef}
                      src="/_If_you_need_any_other_help_feel_free_to_ask_.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-rose-950/80 backdrop-blur border border-rose-500/30 px-3 py-1.5 rounded-xl">
                      <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                      <span className="text-xs font-semibold text-rose-200 uppercase tracking-widest font-outfit">AI STATE: DEACTIVATED</span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 border border-rose-500/20 backdrop-blur-md">
                      <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-widest font-outfit">
                        <HelpCircle className="w-4 h-4 text-rose-400" />
                        The traditional friction
                      </div>
                      <p className="text-white text-sm font-medium mt-1">
                        High drift risk: Without gesture check-ins, students remain quiet and disengaged when confused.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5 rounded-2xl shadow-xl shadow-indigo-500/10 hidden md:block">
              <div className="bg-slate-950 rounded-[14px] p-4 flex items-center gap-3">
                <Users className="w-8 h-8 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-white font-outfit">100% Contactless</h4>
                  <p className="text-slate-500 text-[11px] leading-none mt-0.5">Automates Roll-Call & Feedback</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SLIDING AUTHENTICATION MODAL (Beautiful sliding integration directly inside Next.js Canvas) */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl h-[560px] flex grid grid-cols-1 md:grid-cols-12"
            >
              
              {/* Close Button */}
              <button 
                onClick={() => { setShowAuthModal(false); setAuthNotification(''); }}
                className="absolute top-4 right-4 z-30 text-slate-400 hover:text-white bg-slate-950/60 p-2 rounded-full border border-slate-800 transition-all"
              >
                ✕
              </button>

              {/* SLIDING DUAL-FORM AREA */}
              <div className="col-span-12 md:col-span-7 p-8 sm:p-12 flex flex-col justify-center relative">
                
                {/* Simulated notifications alerts */}
                {authNotification && (
                  <div className="absolute top-6 left-6 right-6 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                    {authNotification}
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {authMode === 'signin' ? (
                    <motion.div
                      key="signin"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-bold font-outfit text-white">Verya Hub par login karein</h3> {/* Sign in title Hindi */}
                        <p className="text-slate-400 text-xs mt-1">Smart Interaction & Automated Attendance register</p>
                      </div>

                      {/* Role selection tab integration */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                        {['student', 'teacher', 'admin'].map((role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => setSelectedRole(role as any)}
                            className={`py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                              selectedRole === role 
                                ? 'bg-indigo-600 text-white shadow-md' 
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>

                      <form onSubmit={handleSignInSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs text-slate-400 font-semibold uppercase">Username</label>
                          <input 
                            type="text" 
                            placeholder="Enter username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-slate-400 font-semibold uppercase">Password</label>
                          <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none transition-all"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/30 transition-all"
                        >
                          Dashboard Access Unlocked
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="signup"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <div>
                        <h3 className="text-2xl font-bold font-outfit text-white">Naya Account Banayein</h3> {/* Sign up title Hindi */}
                        <p className="text-slate-400 text-xs mt-1">Apna account setup karke automatic face scan system register karein</p>
                      </div>

                      <form onSubmit={handleSignUpSubmit} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-semibold uppercase">Username</label>
                          <input 
                            type="text" 
                            placeholder="Choose unique username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-semibold uppercase">Email Address</label>
                          <input 
                            type="email" 
                            placeholder="name@institution.edu" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-semibold uppercase">Password</label>
                          <input 
                            type="password" 
                            placeholder="Minimum 8 characters" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-semibold uppercase">Confirm Password</label>
                          <input 
                            type="password" 
                            placeholder="Re-type password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none transition-all"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/30 transition-all"
                        >
                          Complete Registration Scan
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6 text-center text-xs text-slate-500">
                  {authMode === 'signin' ? (
                    <p>
                      Account nahi hai?{' '}
                      <button onClick={() => { setAuthMode('signup'); setAuthNotification(''); }} className="text-indigo-400 font-bold hover:underline">
                        Register karein yahan
                      </button>
                    </p>
                  ) : (
                    <p>
                      Pehle se account hai?{' '}
                      <button onClick={() => { setAuthMode('signin'); setAuthNotification(''); }} className="text-indigo-400 font-bold hover:underline">
                        Login karein yahan
                      </button>
                    </p>
                  )}
                </div>
              </div>

              {/* SLIDING DECORATION GRAPHICS SIDEBAR */}
              <div className="hidden md:col-span-5 bg-gradient-to-br from-indigo-950 to-slate-950 border-l border-slate-800 p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-slate-950 to-slate-950 pointer-events-none" />
                
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-outfit mt-4">AI BioID System Secure</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Sarthak's biometric hashing system local database embeddings map zero raw images on external cloud networks. Safe & COPPA compliant.
                  </p>
                </div>

                <div className="relative z-10 border-t border-slate-900 pt-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Biometric status</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">All servers processed under 40ms edge cycle latency.</p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-World Pain Points Grid */}
      <section id="vision" className="border-t border-slate-900 bg-slate-950/50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs uppercase font-bold tracking-widest text-indigo-400 font-outfit">Institutional Gaps</h2>
            <h3 className="text-3xl sm:text-4xl font-outfit font-extrabold tracking-tight">
              The Structural Friction We Eradicate
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Educators waste millions of hours on manual tracking while administrators remain entirely blind to attention drift. Our system converts raw room feeds into actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            
            <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl hover:border-indigo-500/25 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-outfit">Inefficient Manual Logs</h4>
              <p className="text-slate-400 text-sm leading-relaxed mt-3">
                Calling out hundreds of student names manual burns 8-10 minutes of active lecturing. Human logs are prone to proxy fraud and errors.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl hover:border-indigo-500/25 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                <Smile className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-outfit">Zero Engagement Visibility</h4>
              <p className="text-slate-400 text-sm leading-relaxed mt-3">
                Instructors fail to measure actual classroom fatigue, drowsiness, and confusion rates, resulting in unoptimized teaching cycles.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl hover:border-indigo-500/25 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                <Hand className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-outfit">Limited Interactive Outlets</h4>
              <p className="text-slate-400 text-sm leading-relaxed mt-3">
                Introverted or confused students rarely ask questions verbally. We build a simple, contactless visual gesture feedback mechanism.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl hover:border-indigo-500/25 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-outfit">Disconnected Datasets</h4>
              <p className="text-slate-400 text-sm leading-relaxed mt-3">
                Dean and admin offices lack central, quantitative analytics to detect underperforming courses, scheduling conflicts, or high retention risk.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Simulation Dashboard Segment */}
      <section id="interactive-sim" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest font-outfit">
              <Zap className="w-3.5 h-3.5" /> Interactive Lab Demo
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold tracking-tight">
              Test the AI Gesture & Telemetry Engine
            </h2>
            
            <p className="text-slate-400 leading-relaxed">
              Interact with the control pad below to simulate gesture events and view real-time feedback logging from our live-updated teacher interface. Watch how attention indices recalculate instantaneously.
            </p>

            {/* Interactive User Controller Buttons */}
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Trigger Simulated Student Gesture Check-In</p>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setSimulatedGesture('👍 Understood');
                    setEngagementScore(prev => Math.min(100, +(prev + 2.5).toFixed(1)));
                    setActiveLogs(prev => [
                      { id: String(Date.now()), time: 'Just Now', student: 'Amit Raj', event: 'Raised Gesture: Understood', type: 'gesture', value: '👍' },
                      ...prev.slice(0, 3)
                    ]);
                  }}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 active:bg-indigo-600 rounded-xl border border-slate-700 text-white text-sm font-semibold transition-all flex flex-col items-center gap-2 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">👍</span>
                  <span className="text-[11px] text-slate-300">Understood</span>
                </button>

                <button
                  onClick={() => {
                    setSimulatedGesture('✋ Ask Doubt');
                    setEngagementScore(prev => Math.max(50, +(prev - 1.2).toFixed(1)));
                    setActiveLogs(prev => [
                      { id: String(Date.now()), time: 'Just Now', student: 'Neha Patel', event: 'Raised Gesture: Doubt Raised', type: 'gesture', value: '✋' },
                      ...prev.slice(0, 3)
                    ]);
                  }}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 active:bg-indigo-600 rounded-xl border border-slate-700 text-white text-sm font-semibold transition-all flex flex-col items-center gap-2 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">✋</span>
                  <span className="text-[11px] text-slate-300">Ask Doubt</span>
                </button>

                <button
                  onClick={() => {
                    setSimulatedGesture('👌 Confirmed');
                    setEngagementScore(prev => Math.min(100, +(prev + 1.8).toFixed(1)));
                    setActiveLogs(prev => [
                      { id: String(Date.now()), time: 'Just Now', student: 'Sarthak T.', event: 'Raised Gesture: Confirmed Submit', type: 'gesture', value: '👌' },
                      ...prev.slice(0, 3)
                    ]);
                  }}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 active:bg-indigo-600 rounded-xl border border-slate-700 text-white text-sm font-semibold transition-all flex flex-col items-center gap-2 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">👌</span>
                  <span className="text-[11px] text-slate-300">Confirm</span>
                </button>
              </div>

              <div className="flex justify-between items-center pt-2 text-xs text-slate-500 border-t border-slate-800">
                <span>Active Simulator Mode:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Generating feeds
                </span>
              </div>
            </div>
          </div>

          {/* Simulated Teacher Dashboard Interface */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Advanced Computing Lab</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Teacher Console • Sarthak Tripathy</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                <span className="text-xs font-semibold text-slate-400">Classroom Live</span>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-3 gap-4 py-6">
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Attendance Rate</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 font-outfit">{attendanceRate}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${attendanceRate}%` }} />
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Attention Index</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl sm:text-2xl font-black text-indigo-400 font-outfit">{engagementScore}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-indigo-400 h-full transition-all duration-500" style={{ width: `${engagementScore}%` }} />
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Detected Gesture</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-lg sm:text-xl font-bold text-cyan-400 truncate max-w-full font-outfit">{simulatedGesture}</span>
                </div>
                <p className="text-[9px] text-slate-500 mt-2.5">Instant passive polling</p>
              </div>

            </div>

            {/* Feed Log Section */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                <span>Real-Time Events Stream</span>
                <span className="text-[10px] text-indigo-400 normal-case">Updated 1s ago</span>
              </h5>

              <div className="space-y-2 max-h-[220px] overflow-hidden">
                <AnimatePresence initial={false}>
                  {activeLogs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-lg w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                          {log.type === 'attendance' && '👤'}
                          {log.type === 'gesture' && log.value}
                          {log.type === 'emotion' && '😊'}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white">{log.student}</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">{log.event}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full font-medium font-outfit">
                          {log.time}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-0.5">{log.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Architecture pipeline section */}
      <section id="architecture" className="bg-slate-900/30 border-t border-b border-slate-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-indigo-400 font-outfit">Technical Architecture</h2>
            <h3 className="text-3xl sm:text-4xl font-outfit font-extrabold tracking-tight">
              Optimized Multi-Core Edge Pipeline
            </h3>
            <p className="text-slate-400">
              Low-latency video frame processing powered by deep learning arrays and efficient database tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            
            {/* Step 1 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-indigo-500/30 font-outfit">01</span>
                <h4 className="text-base font-bold text-white mt-4 font-outfit">1080p Camera Feed</h4>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Pulls frames from standard pre-installed IP cameras inside classroom grids. No specialist optical hardware needed.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 flex items-center gap-2 text-indigo-400 text-xs">
                <Video className="w-4 h-4" /> RTSP Protocol
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-indigo-500/30 font-outfit">02</span>
                <h4 className="text-base font-bold text-white mt-4 font-outfit">MediaPipe & OpenCV</h4>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Processes and normalizes vector points for hand gestures and multi-face coordinates under variable lighting conditions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 flex items-center gap-2 text-indigo-400 text-xs">
                <Cpu className="w-4 h-4" /> Edge Extraction
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-indigo-500/30 font-outfit">03</span>
                <h4 className="text-base font-bold text-white mt-4 font-outfit">FastAPI Processing</h4>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  High-speed Python microservice validates coordinates, matches face hashes, and calculates emotion scores.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 flex items-center gap-2 text-indigo-400 text-xs">
                <Zap className="w-4 h-4" /> Python Core
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-indigo-500/30 font-outfit">04</span>
                <h4 className="text-base font-bold text-white mt-4 font-outfit">PostgreSQL Base</h4>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Stores highly compressed numerical facial hashes (no raw images) and gesture tallies for institutional reporting.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 flex items-center gap-2 text-indigo-400 text-xs">
                <Layers className="w-4 h-4" /> Relational Storage
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-indigo-500/30 font-outfit">05</span>
                <h4 className="text-base font-bold text-white mt-4 font-outfit">React Dashboard</h4>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Provides beautiful, live, responsive insights on attendance, historical trends, and engagement trackers for teachers and deans.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 flex items-center gap-2 text-indigo-400 text-xs">
                <BarChart3 className="w-4 h-4" /> Interactive UI
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VC Investor Pitch Deck Compartment */}
      <section id="vc-pitch" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Investor Center
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold tracking-tight">
                Pitch Room: Interactive Investor Slide
              </h2>

              <p className="text-slate-400 text-sm leading-relaxed">
                Click through Sarthak's primary slide modules to analyze the TAM, SAM, SOM, and direct competitive advantages. Real VC valuation models are embedded for active evaluation.
              </p>

              {/* Slider Dots */}
              <div className="flex gap-2">
                {pitchSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePitchSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activePitchSlide === index ? 'w-8 bg-indigo-500' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Active Pitch Card view */}
            <div className="lg:col-span-6 bg-slate-950 border border-indigo-500/10 p-8 rounded-2xl relative shadow-xl">
              
              <div className="flex items-center justify-between pb-6 border-b border-slate-900">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Sarthak Tripathy • VC Deck</p>
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md">
                  Slide {activePitchSlide + 1} of 3
                </span>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-center gap-3 text-indigo-400">
                  {React.createElement(pitchSlides[activePitchSlide].icon, { className: 'w-6 h-6' })}
                  <h4 className="text-lg font-bold text-white font-outfit">{pitchSlides[activePitchSlide].title}</h4>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed">
                  {pitchSlides[activePitchSlide].description}
                </p>

                <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-slate-900">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Projected Milestone Index</p>
                  <p className="text-sm font-semibold text-white mt-1">
                    {pitchSlides[activePitchSlide].metrics}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-900">
                <button
                  onClick={() => setActivePitchSlide(prev => (prev === 0 ? 2 : prev - 1))}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Previous Slide
                </button>
                <button
                  onClick={() => setActivePitchSlide(prev => (prev === 2 ? 0 : prev + 1))}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                >
                  Next Slide <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Target Customers Section */}
      <section className="py-24 border-t border-slate-900 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-indigo-400 font-outfit">Perfect Market Fit</h2>
          <h3 className="text-3xl sm:text-4xl font-outfit font-extrabold tracking-tight">
            Target Customer Verticals
          </h3>
          <p className="text-slate-400">
            A frictionless platform built to scale across three primary educational sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
            <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest font-outfit block">01</span>
            <h4 className="text-lg font-bold text-white mt-4 font-outfit">Universities & Colleges</h4>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Provides real-time attendance compliance registers, instant lecture feedback, and deanship reports. Helps improve overall student performance and institutional accreditation.
            </p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
            <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest font-outfit block">02</span>
            <h4 className="text-lg font-bold text-white mt-4 font-outfit">Coaching & Training Centers</h4>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Enables interactive gesture polling and automated progress checks. Ideal for high-stakes test prep classrooms requiring real-time, lightweight student participation feedback.
            </p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
            <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest font-outfit block">03</span>
            <h4 className="text-lg font-bold text-white mt-4 font-outfit">Online LMS SDKs</h4>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Allows remote virtual platforms to monitor participant drowsiness, engagement, and passive gesture check-ins natively inside Zoom or custom WebRTC interfaces.
            </p>
          </div>

        </div>
      </section>

      {/* Pricing / Subscriptions Table */}
      <section id="pricing" className="border-t border-slate-900 bg-slate-950/80 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-indigo-400 font-outfit">SaaS Pricing Model</h2>
            <h3 className="text-3xl sm:text-4xl font-outfit font-extrabold tracking-tight">
              Flexible Tiers for Growing Institutions
            </h3>
            <p className="text-slate-400">
              Low-overhead, predictive software fees scaling exactly with student enrollments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Tier 1 */}
            <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-300 font-outfit">Basic (Attendance Only)</h4>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-3xl font-extrabold text-white font-outfit">$4</span>
                  <span className="text-xs text-slate-500 font-medium">/ student / semester</span>
                </div>
                <p className="text-slate-400 text-xs mt-4 leading-relaxed">
                  Perfect for standard colleges looking to completely replace manual roll calls and biometric fingerprint machines.
                </p>
                <div className="space-y-2 mt-6 pt-6 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">✓ Automated Face Roll Call</div>
                  <div className="flex items-center gap-2">✓ PDF/XLSX Record Export</div>
                  <div className="flex items-center gap-2">✓ Central Database Admin Portal</div>
                </div>
              </div>
              <button className="w-full mt-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all">
                Initiate Trial Pilot
              </button>
            </div>

            {/* Tier 2 */}
            <div className="bg-slate-900 border-2 border-indigo-500/40 p-8 rounded-2xl flex flex-col justify-between relative shadow-xl">
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Most Popular
              </span>
              <div>
                <h4 className="text-base font-bold text-white font-outfit">Pro (Full Telemetry Hub)</h4>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-3xl font-extrabold text-white font-outfit">$7</span>
                  <span className="text-xs text-slate-500 font-medium">/ student / semester</span>
                </div>
                <p className="text-slate-400 text-xs mt-4 leading-relaxed">
                  Adds MediaPipe interactive gestures and real-time fatigue analytics, unlocking full lecture optimization capabilities.
                </p>
                <div className="space-y-2 mt-6 pt-6 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-indigo-300">✓ All Features of Basic</div>
                  <div className="flex items-center gap-2">✓ Hand Gesture Telemetry (👍/✋/👌)</div>
                  <div className="flex items-center gap-2">✓ Live Attention & Drowsiness Alerts</div>
                  <div className="flex items-center gap-2">✓ Historical Student engagement insights</div>
                </div>
              </div>
              <button className="w-full mt-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/10">
                Deploy Pilot System
              </button>
            </div>

            {/* Tier 3 */}
            <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-300 font-outfit">Enterprise Deployment</h4>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-2xl font-extrabold text-white font-outfit">Custom Quote</span>
                </div>
                <p className="text-slate-400 text-xs mt-4 leading-relaxed">
                  Perfect for multi-campus university groups or national test prep networks demanding dedicated edge-hardware setups.
                </p>
                <div className="space-y-2 mt-6 pt-6 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">✓ Customized LMS Integrations</div>
                  <div className="flex items-center gap-2">✓ Dedicated Edge-Server Setup Support</div>
                  <div className="flex items-center gap-2">✓ 24/7 SLA Support Agreement</div>
                  <div className="flex items-center gap-2">✓ Unlimited Campus Registrations</div>
                </div>
              </div>
              <button className="w-full mt-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all">
                Contact Sales
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-outfit font-black">
              AI
            </div>
            <div>
              <span className="font-outfit font-bold text-sm tracking-tight text-white">VERYA SMART</span>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Interaction System</p>
            </div>
          </div>

          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Verya. Built and Optimized by **Sarthak Tripathy** (B.Tech CSE - AI & Data Science). All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="#vision" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#vc-pitch" className="hover:text-slate-300">Investor Relations</a>
            <a href="#architecture" className="hover:text-slate-300">Developer API</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
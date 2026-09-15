import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, X, Terminal as TerminalIcon, Download, 
  Palette, Briefcase, Minus,
  Eye, Mail, Gamepad2, CloudSun, Github, Linkedin, FileText, ExternalLink,
  Maximize2, Minimize2, Volume2, VolumeX, Monitor, Cpu, Music, Play, Square, FileEdit,
  Sparkles, Check, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Rocket, Wifi, Battery
} from 'lucide-react';
import { soundFx } from './utils/audio';
import ThreeDBackground from './components/ThreeDBackground';

const userInfo = {
  name: "ABHISHEK LOHAR",
  fullName: "Abhishek Lohar",
  location: "Jamshedpur, Jharkhand - 831004",
  phone: "+91 9341852194",
  emailCollege: "abhishek.23bce7356@vitapstudent.ac.in",
  emailPersonal: "abhisheklohar0509@gmail.com",
  bio: "Highly motivated Computer Science and Engineering student at VIT-AP with a strong focus on Artificial Intelligence and Deep Learning. Passionate about leveraging technology to build innovative solutions, with hands-on experience in full-stack development and hardware-software integration.",
  socials: {
    github: "https://github.com/AbhiLohar",
    linkedin: "https://linkedin.com/in/abhishek-lohar-216099350/"
  },
  education: [
    {
      institution: "Vellore Institute of Technology-AP",
      location: "Amaravati, AP",
      degree: "B.Tech in Computer Science and Engineering",
      period: "2023 – 2027",
      grade: "Current CGPA: 8.33 / 10.0"
    },
    {
      institution: "Vidya Bharati Chinmaya Vidyalaya (CBSE)",
      location: "Jamshedpur, JH",
      degree: "Higher Secondary Education (Class XII)",
      period: "2022",
      grade: "Aggregate: 79.8%"
    }
  ],
  skills: {
    languages: ["Java", "Python", "SQL", "C++", "HTML/CSS", "JavaScript"],
    aiMl: ["Ollama", "LangChain", "ChromaDB", "RAG", "Embeddings", "LLMs", "OpenCV", "Data Science"],
    toolsFrameworks: ["Raspberry Pi", "Chrome Extension API", "PyPI", "pytest", "Git", "OpenSource Development"],
    softSkills: ["Leadership", "Creative Thinking", "Problem Solving"]
  },
  projects: [
    { 
      title: "local-persona-memory — Published PyPI Package", 
      tech: "Python, Ollama, ChromaDB, LangChain, RAG", 
      badge: "pip install local-persona-memory",
      link: "https://pypi.org/project/local-persona-memory/",
      desc: "Published production-grade open-source Python package on PyPI — installable worldwide via pip install local-persona-memory — giving any local LLM permanent long-term memory with zero cloud dependency.",
      details: "Built full RAG pipeline with ChromaDB vector storage, PDF ingestion, semantic search, conversation history, export/import, and callback hooks. Shipped with 160 passing tests and GitHub Actions CI/CD."
    },
    { 
      title: "URL Shortener & Analytics Platform", 
      tech: "Python, FastAPI, PostgreSQL, Redis, Kafka", 
      badge: "Microservices Architecture",
      desc: "Built a microservices-based URL shortener with separate Shorten, Redirect, and Analytics services behind an API gateway to practice service decomposition.",
      details: "Used PostgreSQL for persistent URL mappings and Redis caching in front of the Redirect service; Kafka streams click events asynchronously to Analytics."
    },
    { 
      title: "Smart Attendance Face Recognition System", 
      tech: "Raspberry Pi, Python, OpenCV", 
      badge: "Edge Hardware + CV",
      desc: "Designed a hardware-software integrated biometric identification system using Raspberry Pi for real-time facial recognition and automated attendance logging.",
      details: "Utilized OpenCV libraries for facial detection and recognition. Engineered an end-to-end pipeline from image capture to database logging, ensuring 95%+ recognition accuracy."
    }
  ],
  certifications: [
    "Oracle Cloud Infrastructure (OCI) Certified AI Foundations Associate",
    "Coursera Full Stack Web Development",
    "Infosys Springboard — Introduction to Data Science (May 2026)",
    "Hashgraph Developer Course",
    "High-Performance Coding (HPC) Certification by IAMNEO",
    "Finalist in Engineering Clinics (2025)",
    "Hack2Skill GDG (Google Developer Groups) Hackathons at VIT-AP"
  ],
  languages: [
    { name: "Hindi", proficiency: "Native" },
    { name: "English", proficiency: "Professional" }
  ]
};

// --- TICKER & INSPIRING TECH QUOTES ---
const statusMessages = [
  "“The best way to predict the future is to invent it.” — Alan Kay",
  "SYSTEM: AB-OS v5.2 Sonoma • 60 FPS Spatial Engine Active",
  "“Simplicity is prerequisite for reliability.” — Edsger W. Dijkstra",
  "PYPI PACKAGE: pip install local-persona-memory (Published by Abhishek)",
  "“Make it work, make it right, make it fast.” — Kent Beck",
  "DOWNLOAD: Official Tech Resume & General CV Available as PDF",
  "“Code is like humor. When you have to explain it, it’s bad.” — Cory House",
  "VIT-AP CSE • Specializing in AI, Deep Learning & Microservices"
];

const themes = {
  deepSea: { bg: '#050510', border: '#22c55e', text: '#22c55e', accent: '#3b82f6', label: 'Deep Sea (Default)' },
  matrix: { bg: '#000000', border: '#00ff41', text: '#00ff41', accent: '#008f11', label: 'Matrix Terminal' },
  amber: { bg: '#0c0a08', border: '#f59e0b', text: '#f59e0b', accent: '#d97706', label: 'Cyberpunk Amber' },
  win95: { bg: '#008080', border: '#ffffff', text: '#ffffff', accent: '#000080', label: 'Windows 95 Classic' }
};

const handleDownloadResume = () => {
  soundFx.playClick();
  const resumeUrl = "/Abhishek_Resume.pdf"; 
  const link = document.createElement("a");
  link.href = resumeUrl;
  link.download = "Abhishek_Lohar_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleDownloadCV = () => {
  soundFx.playClick();
  const cvUrl = "/Abhishek_General_CV.pdf"; 
  const link = document.createElement("a");
  link.href = cvUrl;
  link.download = "Abhishek_Lohar_General_CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- AUTHENTIC MACOS GENIE LAMP SUCTION POLYGONS (10-VERTEX LIQUID WARP MESH) ---
const CLIP_RECT = "polygon(0% 0%, 50% 0%, 100% 0%, 100% 50%, 100% 100%, 75% 100%, 50% 100%, 25% 100%, 0% 100%, 0% 50%)";
const CLIP_GENIE_STAGE1 = "polygon(0% 0%, 50% 0%, 100% 0%, 96% 45%, 68% 90%, 58% 98%, 50% 100%, 42% 98%, 32% 90%, 4% 45%)";
const CLIP_GENIE_STAGE2 = "polygon(12% 16%, 50% 8%, 88% 16%, 68% 58%, 55% 94%, 53% 99%, 50% 100%, 47% 99%, 45% 94%, 32% 58%)";
const CLIP_GENIE_DOCK = "polygon(48% 100%, 50% 100%, 52% 100%, 52% 100%, 51% 100%, 50% 100%, 50% 100%, 49% 100%, 48% 100%, 48% 100%)";

// --- HACKER OS TERMINAL TYPEWRITER FOR FRONT PAGE ---
const hackerOsLines = [
  "root@AB-OS:~# initializing kernel v5.2 (Sonoma AI Edition)...",
  "> MEMORY: 64GB Unified Spatial Array • STATUS: OPTIMAL",
  "> KERNEL: Abhishek_Kernel.sys (64-Bit x86_64 Architecture)",
  "> GRAPHICS ENGINE: 3D Spatial Canvas + 60 FPS macOS Genie Suction",
  "> CORE SYSTEMS: Interactive Zsh CLI, System Monitor & 8-Bit Synth",
  "> PUBLISHED PACKAGE: pip install local-persona-memory (PyPI Core)",
  "> CREATOR: Abhishek Lohar (VIT-AP CSE • AI/ML & Full-Stack Engineer)",
  "> ACCESS CONTROL: Authentication Granted. Ready to launch AB-OS."
];

const HackerTerminalTypewriter = React.memo(() => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= hackerOsLines.length) return;

    const targetLine = hackerOsLines[currentLineIndex];
    if (currentCharIndex < targetLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = targetLine.substring(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex(c => c + 1);
      }, 16);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(l => l + 1);
        setCurrentCharIndex(0);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <div className="font-mono text-[11px] md:text-xs space-y-1.5 select-none">
      {displayedLines.map((line, idx) => {
        let colorClass = "text-green-400";
        if (line.startsWith("root")) colorClass = "text-cyan-400 font-bold";
        else if (line.startsWith("> CREATOR")) colorClass = "text-yellow-400 font-bold";
        else if (line.startsWith("> PUBLISHED")) colorClass = "text-pink-400 font-bold";
        else if (line.startsWith("> ACCESS")) colorClass = "text-emerald-300 font-bold";

        return (
          <div key={idx} className="flex items-center gap-1.5 leading-relaxed">
            <span className={colorClass}>{line}</span>
            {idx === currentLineIndex && (
              <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse shrink-0 ml-0.5" />
            )}
          </div>
        );
      })}
      {displayedLines.length === 0 && (
        <div className="flex items-center gap-1">
          <span className="text-cyan-400 font-bold">root@AB-OS:~#</span>
          <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse" />
        </div>
      )}
    </div>
  );
});

// --- TICKER & INSPIRING QUOTES COMPONENT ---
const StatusTicker = ({ messages }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4500); 
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="flex items-center gap-1.5 overflow-hidden">
      <Sparkles size={11} className="text-yellow-400 shrink-0 animate-pulse" />
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-[10px] md:text-[11px] font-semibold text-cyan-200 tracking-wide whitespace-nowrap truncate max-w-[280px] lg:max-w-[420px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
        >
          {messages[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// --- LIVE CLOCK COMPONENT (ISOLATED TO PREVENT GLOBAL RE-RENDERS) ---
const SystemClock = React.memo(() => {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span>
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  );
});

export default function App() {
  const [bootPhase, setBootPhase] = useState(0); 
  const [loadProgress, setLoadProgress] = useState(0);
  const [openWindows, setOpenWindows] = useState(['about']);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [maximizedWindows, setMaximizedWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState('about');
  const [activeTheme, setActiveTheme] = useState('deepSea');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [showTicker] = useState(true); 
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [threeDMode, setThreeDMode] = useState('neural');
  const [isMuted, setIsMuted] = useState(false);
  const [bouncingApp, setBouncingApp] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const constraintsRef = useRef(null);
  const startMenuRef = useRef(null);
  const dockItemRefs = useRef({});

  const getDockDeltaX = (id) => {
    try {
      const el = dockItemRefs.current[id];
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const screenCenterX = window.innerWidth / 2;
      const iconCenterX = rect.left + rect.width / 2;
      return Math.round(iconCenterX - screenCenterX);
    } catch {
      return 0;
    }
  };

  // Close Start / Launchpad Menu on outside click
  useEffect(() => {
    if (!startMenuOpen) return;

    const handleOutsideClick = (e) => {
      if (
        startMenuRef.current && 
        !startMenuRef.current.contains(e.target) &&
        !e.target.closest('[data-start-toggle]')
      ) {
        setStartMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [startMenuOpen]);

  // Smooth & Snappy BIOS loader
  useEffect(() => {
    if (bootPhase === 0) {
      let isCancelled = false;
      const skip = () => {
        if (isCancelled) return;
        isCancelled = true;
        soundFx.playBoot();
        setBootPhase(1);
      };

      const handleKeyDown = () => skip();
      window.addEventListener('keydown', handleKeyDown);

      const interval = setInterval(() => {
        setLoadProgress(prev => {
          if (prev >= 100) { 
            clearInterval(interval); 
            if (!isCancelled) {
              isCancelled = true;
              setTimeout(() => {
                soundFx.playBoot();
                setBootPhase(1);
              }, 250);
            }
            return 100; 
          }
          return Math.min(100, prev + 3);
        });
      }, 40);

      return () => {
        isCancelled = true;
        clearInterval(interval);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [bootPhase]);

  const toggleWindow = (id) => {
    soundFx.playOpen();
    // Auto-minimize previous active window so only one file/folder is open at a time
    if (activeWindow && activeWindow !== id && openWindows.includes(activeWindow) && !minimizedWindows.includes(activeWindow)) {
      setMinimizedWindows(prev => [...new Set([...prev, activeWindow])]);
    }
    if (!openWindows.includes(id)) setOpenWindows(prev => [...prev, id]);
    setMinimizedWindows(prev => prev.filter(w => w !== id));
    setActiveWindow(id);
    setStartMenuOpen(false);
  };

  const closeWindow = (id) => {
    soundFx.playClose();
    setBouncingApp(id);
    setTimeout(() => setBouncingApp(null), 500);
    setOpenWindows(prev => prev.filter(w => w !== id));
    setMinimizedWindows(prev => prev.filter(w => w !== id));
    setMaximizedWindows(prev => prev.filter(w => w !== id));
  };

  const minimizeWindow = (id) => {
    soundFx.playClose();
    setBouncingApp(id);
    setTimeout(() => setBouncingApp(null), 500);
    setMinimizedWindows(prev => [...prev, id]);
    setActiveWindow(null);
  };

  const toggleMaximizeWindow = (id) => {
    soundFx.playMaximize();
    setMaximizedWindows(prev => 
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  const hasMaximized = openWindows.some(id => !minimizedWindows.includes(id) && maximizedWindows.includes(id));

  const handleDockItemClick = (id) => {
    soundFx.playClick();
    setBouncingApp(id);
    setTimeout(() => setBouncingApp(null), 500);

    // If clicking the active visible window: toggle minimize to dock
    if (activeWindow === id && !minimizedWindows.includes(id)) {
      minimizeWindow(id);
      return;
    }

    // Auto-minimize previous active window so only one window is focused at a time (Stage Manager / single-app focus)
    if (activeWindow && activeWindow !== id && openWindows.includes(activeWindow) && !minimizedWindows.includes(activeWindow)) {
      setMinimizedWindows(prev => [...new Set([...prev, activeWindow])]);
    }

    if (!openWindows.includes(id)) {
      setOpenWindows(prev => [...prev, id]);
    }
    setMinimizedWindows(prev => prev.filter(w => w !== id));
    setActiveWindow(id);
  };

  const dockApps = [
    { id: 'about', label: 'About Abhishek', icon: <User className="text-white" />, gradient: 'from-blue-500 to-indigo-600' },
    { id: 'projects', label: 'Projects & PyPI', icon: <Briefcase className="text-white" />, gradient: 'from-emerald-500 to-teal-600' },
    { id: 'resume', label: 'Resume & CV', icon: <FileText className="text-white" />, gradient: 'from-violet-500 to-purple-600' },
    { id: 'terminal', label: 'Terminal (CLI)', icon: <TerminalIcon className="text-emerald-400" />, gradient: 'from-gray-900 to-black border border-white/20' },
    { id: 'sysinfo', label: 'Diagnostics', icon: <Cpu className="text-white" />, gradient: 'from-amber-500 to-orange-600' },
    { id: 'player', label: 'Retro Media', icon: <Music className="text-white" />, gradient: 'from-pink-500 to-rose-600' },
    { id: 'notepad', label: 'Scratchpad', icon: <FileEdit className="text-white" />, gradient: 'from-yellow-500 to-amber-600' },
    { id: 'snake', label: 'Snake Arcade', icon: <Gamepad2 className="text-white" />, gradient: 'from-green-500 to-emerald-700' },
    { id: 'contact', label: 'Contact Transmitter', icon: <Mail className="text-white" />, gradient: 'from-sky-400 to-blue-600' },
  ];

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const handleDesktopClick = () => {
    if (contextMenu.visible) setContextMenu({ visible: false, x: 0, y: 0 });
    if (startMenuOpen) setStartMenuOpen(false);
  };

  const cycleTheme = () => {
    soundFx.playClick();
    const keys = Object.keys(themes);
    const nextIndex = (keys.indexOf(activeTheme) + 1) % keys.length;
    setActiveTheme(keys[nextIndex]);
  };

  const toggleAudioMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFx.playClick();
  };

  if (bootPhase === 0) return (
    <div className={`h-screen w-screen bg-black font-mono flex items-center justify-center p-8 text-left ${crtEnabled ? 'crt-overlay' : ''}`}>
      <div className="max-w-xl w-full space-y-4">
        <h2 className="text-2xl md:text-3xl font-black text-yellow-500 uppercase tracking-tighter mb-6 border-b-2 border-yellow-500/30 pb-2">
          AB-OS BIOS v5.10 (ACPI x64)
        </h2>
        <div className="space-y-2 text-xs md:text-base">
          <p className="text-yellow-400">CPU: <span className="text-white">Neural Engine 12-Core 4.2GHz</span></p>
          {loadProgress > 15 && <p className="text-green-500">MEMORY TEST: <span className="text-white">65536MB OK</span></p>}
          {loadProgress > 35 && <p className="text-green-500">DISK: <span className="text-white">Primary Master 2TB NVMe ... FOUND</span></p>}
          {loadProgress > 55 && <p className="text-cyan-400 font-bold">BOOTING: <span className="text-white">Abhishek_Kernel.sys ... LOADED</span></p>}
          {loadProgress > 75 && <p className="text-cyan-400">AUDIO &amp; VIDEO: <span className="text-white">WebAudio DSP &amp; CRT Scanlines ... READY</span></p>}
          {loadProgress > 90 && <p className="text-white animate-pulse">STARTING GRAPHICAL INTERFACE...</p>}
        </div>
        <div className="w-full border-2 border-green-900 p-1 mt-8">
          <div className="h-3 bg-gray-900 overflow-hidden">
            <div 
              className="h-full bg-green-500 shadow-[0_0_15px_#22c55e] transition-all duration-75 ease-out" 
              style={{ width: `${loadProgress}%` }} 
            />
          </div>
        </div>
        <div className="flex justify-between items-center text-xs text-white/50 tracking-[0.3em] pt-2">
          <span>INITIALIZING: {loadProgress}%</span>
          <button 
            onClick={() => { soundFx.playBoot(); setBootPhase(1); }} 
            className="hover:text-green-400 underline cursor-pointer normal-case tracking-normal text-[11px]"
          >
            [Click or press any key to skip]
          </button>
        </div>
      </div>
    </div>
  );

  if (bootPhase === 1) return (
    <div 
      className={`h-screen w-screen relative flex items-center justify-center font-mono p-4 overflow-hidden select-none ${crtEnabled ? 'crt-overlay' : ''}`} 
      style={{ backgroundColor: themes[activeTheme].bg }}
    >
      {/* 3D SPATIAL CANVAS BACKGROUND */}
      <ThreeDBackground mode={threeDMode} accentColor={themes[activeTheme].border} />

      {/* 3D HOLOGRAPHIC FRONT CARD */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="bg-black/80 backdrop-blur-2xl border-2 border-cyan-500/40 shadow-[0_0_60px_rgba(34,211,238,0.3)] rounded-3xl p-6 md:p-8 max-w-2xl w-full text-center space-y-5 z-10 relative overflow-hidden"
      >
        {/* Top Cyber Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-[10px] font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          <Sparkles size={12} className="text-yellow-400 animate-pulse" />
          <span>AB-OS v5.2 Sonoma • Spatial Operating Environment</span>
        </div>

        {/* Main 3D Title */}
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent uppercase tracking-tight italic drop-shadow-[0_2px_10px_rgba(34,211,238,0.4)]">
            WELCOME TO ABHISHEK OS
          </h1>
          <p className="text-xs md:text-sm text-white/70 font-semibold tracking-wider uppercase">
            Interactive AI-Powered Web Operating System &amp; Developer Engine
          </p>
        </div>

        {/* Hacker Terminal OS Description Box */}
        <div className="bg-black/90 border border-green-500/40 rounded-xl p-4 text-left shadow-inner max-h-56 overflow-y-auto no-scrollbar border-l-4 border-l-green-500">
          <HackerTerminalTypewriter />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-1">
          <button 
            onClick={() => { soundFx.playOpen(); setBootPhase(2); }} 
            className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-black uppercase text-xs md:text-sm tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(34,211,238,0.5)] active:scale-98 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Rocket size={18} className="text-black group-hover:translate-x-1 transition-transform" />
            ENTER ABHISHEK OS WORKSPACE
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button 
              onClick={handleDownloadResume} 
              className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase text-[10px] md:text-xs rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Download size={14} className="text-cyan-400" /> Download Tech Resume (PDF)
            </button>
            <button 
              onClick={handleDownloadCV} 
              className="w-full py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/40 text-green-400 font-bold uppercase text-[10px] md:text-xs rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Download size={14} className="text-green-400" /> Download General CV (PDF)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div 
      ref={constraintsRef} 
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      className={`h-screen w-screen overflow-hidden relative font-mono select-none ${crtEnabled ? 'crt-overlay' : ''}`} 
      style={{ backgroundColor: themes[activeTheme].bg }}
    >
      {/* 3D SPATIAL BACKGROUND (MOTIONSITES AI ENGINE) */}
      <ThreeDBackground mode={threeDMode} accentColor={themes[activeTheme].border} />

      {/* MACOS TOP STATUS / MENU BAR */}
      <div className="fixed top-0 left-0 right-0 h-7 bg-black/60 backdrop-blur-xl border-b border-white/10 z-[260] flex items-center justify-between px-3 text-[11px] md:text-xs text-white/90 select-none shadow-sm">
        {/* Left: AB-OS Monogram & Menus */}
        <div className="flex items-center gap-3">
          <button 
            data-start-toggle="true"
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playClick();
              setStartMenuOpen(prev => !prev);
            }}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/15 transition-colors cursor-pointer font-black text-cyan-400"
            title="AB-OS System Menu"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
            <span className="tracking-wider">AB-OS</span>
          </button>
          
          <span className="font-bold text-white hidden sm:inline">
            {activeWindow ? activeWindow.toUpperCase() + ".app" : 'Finder'}
          </span>

          <div className="hidden md:flex items-center gap-3 text-white/70 text-[11px]">
            <span 
              onClick={() => toggleWindow('about')} 
              className="hover:text-white cursor-pointer transition-colors"
            >
              About
            </span>
            <span 
              onClick={() => toggleWindow('projects')} 
              className="hover:text-white cursor-pointer transition-colors"
            >
              Projects
            </span>
            <span 
              onClick={() => toggleWindow('terminal')} 
              className="hover:text-white cursor-pointer transition-colors"
            >
              Terminal
            </span>
            <span 
              onClick={cycleTheme} 
              className="hover:text-white cursor-pointer transition-colors"
            >
              Themes
            </span>
          </div>

          {/* Live System Quotes & Status Ticker in Menu Bar */}
          {showTicker && (
            <div className="hidden sm:flex items-center bg-black/75 border border-cyan-400/50 px-2.5 py-0.5 rounded-full shadow-[0_0_14px_rgba(34,211,238,0.35)] max-w-[200px] sm:max-w-[300px] lg:max-w-[460px] overflow-hidden">
              <StatusTicker messages={statusMessages} />
            </div>
          )}
        </div>

        {/* Right: Quick Toggles & System Tray */}
        <div className="flex items-center gap-2.5">
          {/* 3D Mode */}
          <button 
            onClick={() => {
              soundFx.playClick();
              const modes = ['neural', 'grid', 'matrix', 'off'];
              const nextIndex = (modes.indexOf(threeDMode) + 1) % modes.length;
              setThreeDMode(modes[nextIndex]);
            }}
            title="Switch 3D Spatial Canvas"
            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition-all bg-black/50 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/20 cursor-pointer"
          >
            3D: {threeDMode.toUpperCase()}
          </button>

          {/* CRT Scanlines Toggle */}
          <button 
            onClick={() => { soundFx.playClick(); setCrtEnabled(!crtEnabled); }}
            title="Toggle CRT Scanline Monitor Effect"
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition-all border cursor-pointer ${
              crtEnabled 
                ? 'bg-green-500/20 text-green-300 border-green-500/60' 
                : 'bg-white/10 text-white/60 border-white/20 hover:text-white'
            }`}
          >
            CRT
          </button>

          {/* Audio Volume */}
          <button 
            onClick={toggleAudioMute}
            title={isMuted ? "Unmute 8-Bit Audio" : "Mute Audio"}
            className="cursor-pointer hover:text-cyan-400 p-0.5 text-white/80 transition-colors"
          >
            {isMuted ? <VolumeX size={13} className="text-red-400" /> : <Volume2 size={13} className="text-cyan-400" />}
          </button>

          {/* Wi-Fi & Battery */}
          <div className="hidden sm:flex items-center gap-2 text-white/70">
            <Wifi size={12} className="text-cyan-400" title="Connected: 1 Gbps High-Speed" />
            <div className="flex items-center gap-1 text-[10px]">
              <Battery size={13} className="text-green-400" />
              <span className="hidden lg:inline">100%</span>
            </div>
          </div>

          {/* Weather */}
          <div className="hidden lg:flex items-center gap-1 text-white/70 text-[10px]">
            <CloudSun size={12} className="text-yellow-400" />
            <span>33°C</span>
          </div>

          {/* Isolated Clock */}
          <div className="pl-1 text-white font-medium text-[11px]">
            <SystemClock />
          </div>
        </div>
      </div>

      {/* DESKTOP ICONS GRID (BELOW WINDOWS, AUTO-HIDDEN WHEN MAXIMIZED) */}
      <div 
        className={`absolute left-4 top-10 md:left-6 md:top-12 grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-5 md:gap-y-6 z-[1] overflow-y-auto max-h-[calc(100vh-140px)] p-1 no-scrollbar transition-all duration-300 ${
          hasMaximized 
            ? 'opacity-0 pointer-events-none -translate-x-8 invisible' 
            : 'opacity-100 translate-x-0'
        }`}
      >
        <DesktopIcon theme={themes[activeTheme]} icon={<User />} label="About" onClick={() => toggleWindow('about')} />
        <DesktopIcon theme={themes[activeTheme]} icon={<Briefcase />} label="Projects" onClick={() => toggleWindow('projects')} />
        <DesktopIcon theme={themes[activeTheme]} icon={<Eye />} label="Resume" onClick={() => toggleWindow('resume')} />
        <DesktopIcon theme={themes[activeTheme]} icon={<Cpu />} label="SysInfo" onClick={() => toggleWindow('sysinfo')} />
        <DesktopIcon theme={themes[activeTheme]} icon={<Music />} label="Music" onClick={() => toggleWindow('player')} />
        <DesktopIcon theme={themes[activeTheme]} icon={<FileEdit />} label="Notepad" onClick={() => toggleWindow('notepad')} />
        <DesktopIcon theme={themes[activeTheme]} icon={<Gamepad2 />} label="Snake" onClick={() => toggleWindow('snake')} />
        <DesktopIcon theme={themes[activeTheme]} icon={<TerminalIcon />} label="Terminal" onClick={() => toggleWindow('terminal')} />
        <DesktopIcon theme={themes[activeTheme]} icon={<Palette />} label="Theme" onClick={cycleTheme} />
        <DesktopIcon theme={themes[activeTheme]} icon={<Mail />} label="Contact" onClick={() => toggleWindow('contact')} />
      </div>

      {/* WINDOW DISPLAY CONTAINER (MACOS 3D FOLDING GENIE ENGINE) */}
      <div 
        className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[30] transition-[padding] duration-200 ${
          hasMaximized 
            ? 'top-7 bottom-[76px] p-0' 
            : 'top-7 bottom-20 p-2 md:p-4'
        }`}
        style={{ perspective: 1200, perspectiveOrigin: "50% 100%" }}
      >
        <AnimatePresence mode="popLayout">
          {openWindows.filter(id => !minimizedWindows.includes(id)).map((id) => {
            const isMax = maximizedWindows.includes(id);
            const deltaX = getDockDeltaX(id);
            const skewMagnitude = Math.min(10, Math.max(2, Math.abs(deltaX) / 26));
            const skewDir = deltaX >= 0 ? 1 : -1;

            return (
              <motion.div 
                key={id} 
                initial={{ 
                  x: deltaX,
                  y: 320, 
                  scaleX: 0.08, 
                  scaleY: 0.04, 
                  rotateX: 50,
                  skewX: 0,
                  clipPath: CLIP_GENIE_DOCK,
                  opacity: 0 
                }} 
                animate={{ 
                  x: [deltaX, Math.round(deltaX * 0.5), Math.round(deltaX * 0.15), 0],
                  y: [320, 200, 60, 0], 
                  scaleX: [0.08, 0.35, 0.8, 1], 
                  scaleY: [0.04, 0.38, 0.85, 1], 
                  rotateX: [50, 30, 10, 0],
                  skewX: [0, -skewDir * skewMagnitude * 0.6, skewDir * skewMagnitude, 0],
                  clipPath: [CLIP_GENIE_DOCK, CLIP_GENIE_STAGE2, CLIP_GENIE_STAGE1, CLIP_RECT],
                  opacity: [0, 0.85, 0.98, 1],
                  transition: { 
                    duration: 0.44, 
                    times: [0, 0.3, 0.7, 1],
                    ease: [0.16, 1, 0.3, 1]
                  } 
                }} 
                exit={{ 
                  x: [0, Math.round(deltaX * 0.15), Math.round(deltaX * 0.5), deltaX],
                  y: [0, 60, 200, 320], 
                  scaleX: [1, 0.8, 0.35, 0.08], 
                  scaleY: [1, 0.85, 0.38, 0.04], 
                  rotateX: [0, 10, 30, 50],
                  skewX: [0, skewDir * skewMagnitude, -skewDir * skewMagnitude * 0.6, 0],
                  clipPath: [CLIP_RECT, CLIP_GENIE_STAGE1, CLIP_GENIE_STAGE2, CLIP_GENIE_DOCK],
                  opacity: [1, 0.95, 0.7, 0],
                  transition: { 
                    duration: 0.38, 
                    times: [0, 0.3, 0.7, 1],
                    ease: [0.4, 0, 0.2, 1]
                  } 
                }}
                onMouseDown={() => setActiveWindow(id)}
                style={{ 
                  zIndex: activeWindow === id ? 100 : (50 + openWindows.indexOf(id)), 
                  position: 'absolute',
                  top: isMax ? 0 : undefined,
                  left: isMax ? 0 : undefined,
                  right: isMax ? 0 : undefined,
                  bottom: isMax ? 0 : undefined,
                  width: isMax ? '100%' : undefined,
                  height: isMax ? '100%' : undefined,
                  transformOrigin: 'bottom center',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, clip-path, opacity',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                className={`pointer-events-auto ${
                  isMax 
                    ? 'w-full h-full max-w-none' 
                    : 'w-full max-w-[95%] md:max-w-[720px]'
                }`}
              >
              <motion.div 
                drag={!maximizedWindows.includes(id)}
                dragConstraints={constraintsRef}
                dragMomentum={false}
                className="w-full h-full"
              >
                <Window 
                  theme={themes[activeTheme]} 
                  title={id.toUpperCase() + ".app"} 
                  isMaximized={maximizedWindows.includes(id)}
                  onClose={() => closeWindow(id)}
                  onMinimize={() => minimizeWindow(id)}
                  onMaximize={() => toggleMaximizeWindow(id)}
                >
                  {id === 'about' && <AboutContent />}
                  {id === 'projects' && <ProjectList />}
                  {id === 'resume' && <ResumePreview />}
                  {id === 'sysinfo' && <SysInfoApp />}
                  {id === 'player' && <RetroPlayerApp />}
                  {id === 'notepad' && <NotepadApp />}
                  {id === 'snake' && <SnakeGame />}
                  {id === 'contact' && <ContactContent />}
                  {id === 'terminal' && <Terminal onOpen={toggleWindow} onSet3DMode={setThreeDMode} />}
                </Window>
              </motion.div>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>

      {/* DESKTOP CONTEXT MENU (RIGHT CLICK) */}
      <AnimatePresence>
        {contextMenu.visible && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{ top: Math.min(contextMenu.y, window.innerHeight - 260), left: Math.min(contextMenu.x, window.innerWidth - 220) }}
            className="fixed w-52 bg-white/95 backdrop-blur-md border-2 border-white/90 shadow-2xl rounded-sm p-1 z-[500] text-slate-900 font-mono text-[11px]"
          >
            <div className="py-1">
              <ContextMenuItem icon={<Sparkles size={14}/>} label={`3D Canvas: ${threeDMode.toUpperCase()}`} onClick={() => {
                soundFx.playClick();
                const modes = ['neural', 'grid', 'matrix', 'off'];
                const nextIndex = (modes.indexOf(threeDMode) + 1) % modes.length;
                setThreeDMode(modes[nextIndex]);
              }} />
              <ContextMenuItem icon={<Palette size={14}/>} label={`Theme: ${themes[activeTheme].label.split(' ')[0]}`} onClick={cycleTheme} />
              <ContextMenuItem icon={<Monitor size={14}/>} label={`CRT Filter: ${crtEnabled ? 'ON' : 'OFF'}`} onClick={() => setCrtEnabled(!crtEnabled)} />
              <ContextMenuItem icon={isMuted ? <VolumeX size={14}/> : <Volume2 size={14}/>} label={`Sound FX: ${isMuted ? 'OFF' : 'ON'}`} onClick={toggleAudioMute} />
              <div className="h-[1px] bg-slate-200 my-1 mx-1" />
              <ContextMenuItem icon={<Cpu size={14}/>} label="System Info" onClick={() => toggleWindow('sysinfo')} />
              <ContextMenuItem icon={<TerminalIcon size={14}/>} label="Terminal Prompt" onClick={() => toggleWindow('terminal')} />
              <div className="h-[1px] bg-slate-200 my-1 mx-1" />
              <ContextMenuItem icon={<Download size={14}/>} label="Download Tech Resume" onClick={handleDownloadResume} />
              <ContextMenuItem icon={<FileText size={14}/>} label="Download General CV" onClick={handleDownloadCV} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MACOS SYSTEM / LAUNCHPAD MENU */}
      <AnimatePresence>
        {startMenuOpen && (
          <motion.div 
            ref={startMenuRef}
            initial={{ y: -10, opacity: 0, scale: 0.96 }} 
            animate={{ y: 0, opacity: 1, scale: 1 }} 
            exit={{ y: -10, opacity: 0, scale: 0.96 }} 
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed top-8 left-3 w-80 bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-2 z-[300] text-slate-900 rounded-2xl overflow-hidden"
          >
            {/* Header branding */}
            <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-xl text-white shadow-sm mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center font-black text-sm">
                AL
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="font-black text-xs tracking-wider">ABHISHEK LOHAR</div>
                <div className="text-[10px] text-white/80 truncate">AB-OS Sonoma 14.5 &bull; VIT-AP</div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-0.5">
              <StartItem icon={<User size={15} className="text-blue-600" />} label="About Abhishek" onClick={() => toggleWindow('about')} />
              <StartItem icon={<Briefcase size={15} className="text-emerald-600" />} label="Projects & PyPI Package" onClick={() => toggleWindow('projects')} />
              <StartItem icon={<Eye size={15} className="text-indigo-600" />} label="Interactive Resume" onClick={() => toggleWindow('resume')} />
              <StartItem icon={<Cpu size={15} className="text-purple-600" />} label="System Diagnostics" onClick={() => toggleWindow('sysinfo')} />
              <StartItem icon={<Music size={15} className="text-pink-600" />} label="8-Bit Media Player" onClick={() => toggleWindow('player')} />
              <StartItem icon={<FileEdit size={15} className="text-amber-600" />} label="Scratchpad Notes" onClick={() => toggleWindow('notepad')} />
              <StartItem icon={<Gamepad2 size={15} className="text-green-600" />} label="Arcade: Snake.app" onClick={() => toggleWindow('snake')} />
              <StartItem icon={<Mail size={15} className="text-sky-600" />} label="Contact Transmitter" onClick={() => toggleWindow('contact')} />
              <div className="h-[1px] bg-slate-200 my-1.5 mx-1" />
              <StartItem icon={<FileText size={15} className="text-teal-600" />} label="Download Tech Resume (PDF)" onClick={() => { handleDownloadResume(); setStartMenuOpen(false); }} />
              <StartItem icon={<Download size={15} className="text-blue-600" />} label="Download General CV (PDF)" onClick={() => { handleDownloadCV(); setStartMenuOpen(false); }} />
              <div className="h-[1px] bg-slate-200 my-1.5 mx-1" />
              <StartItem icon={<TerminalIcon size={15} className="text-slate-800" />} label="Zsh / Terminal.app" onClick={() => toggleWindow('terminal')} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MACOS FLOATING GLASS DOCK */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[250] flex items-end justify-center pointer-events-auto">
        <div className="mac-dock-glass rounded-2xl px-2.5 py-1.5 md:px-3.5 md:py-2 flex items-center gap-1.5 md:gap-2.5 max-w-[96vw] overflow-x-auto no-scrollbar shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          {/* Launchpad / System Menu Icon */}
          <motion.div 
            whileHover={{ scale: 1.25, y: -6 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative group flex flex-col items-center cursor-pointer shrink-0"
            data-start-toggle="true"
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playClick();
              setStartMenuOpen(prev => !prev);
            }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md border border-white/25">
              <Rocket size={20} className="text-white drop-shadow-sm" />
            </div>
            <div className="absolute -top-9 px-2.5 py-0.5 bg-black/85 backdrop-blur-md text-white text-[10px] font-bold rounded-md shadow-xl border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
              Launchpad
            </div>
            <div className={`w-1.5 h-1.5 rounded-full mt-1 transition-all ${
              startMenuOpen ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-transparent'
            }`} />
          </motion.div>

          <div className="w-[1px] h-7 bg-white/15 mx-0.5 shrink-0" />

          {/* DOCK APP ICONS */}
          {dockApps.map(app => {
            const isOpen = openWindows.includes(app.id);
            const isMin = minimizedWindows.includes(app.id);
            const isActive = activeWindow === app.id && !isMin;

            return (
              <motion.div
                key={app.id}
                ref={el => { dockItemRefs.current[app.id] = el; }}
                animate={bouncingApp === app.id ? { y: [0, -14, 0, -7, 0] } : { y: 0 }}
                whileHover={{ scale: 1.22, y: -6 }}
                whileTap={{ scale: 0.88 }}
                transition={bouncingApp === app.id 
                  ? { duration: 0.48, ease: "easeInOut" }
                  : { type: "spring", stiffness: 450, damping: 20 }
                }
                className="relative group flex flex-col items-center cursor-pointer shrink-0"
                onClick={() => handleDockItemClick(app.id)}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center shadow-md border border-white/25`}>
                  {React.cloneElement(app.icon, { size: 20 })}
                </div>

                <div className="absolute -top-9 px-2.5 py-0.5 bg-black/85 backdrop-blur-md text-white text-[10px] font-bold rounded-md shadow-xl border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                  {app.label}
                </div>

                <div className={`w-1.5 h-1.5 rounded-full mt-1 transition-all ${
                  isActive 
                    ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee] scale-110' 
                    : isOpen 
                    ? 'bg-white/80 shadow-[0_0_4px_rgba(255,255,255,0.6)]' 
                    : 'bg-transparent'
                }`} />
              </motion.div>
            );
          })}

          <div className="w-[1px] h-7 bg-white/15 mx-0.5 shrink-0" />

          {/* Theme Quick Switcher */}
          <motion.div
            whileHover={{ scale: 1.25, y: -6 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative group flex flex-col items-center cursor-pointer shrink-0"
            onClick={cycleTheme}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center shadow-md border border-white/25">
              <Palette size={20} className="text-white drop-shadow-sm" />
            </div>
            <div className="absolute -top-9 px-2.5 py-0.5 bg-black/85 backdrop-blur-md text-white text-[10px] font-bold rounded-md shadow-xl border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
              Theme: {themes[activeTheme].name}
            </div>
            <div className="w-1.5 h-1.5 rounded-full mt-1 bg-transparent" />
          </motion.div>

          {/* Quick Resume Download */}
          <motion.div
            whileHover={{ scale: 1.25, y: -6 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative group flex flex-col items-center cursor-pointer shrink-0"
            onClick={() => {
              soundFx.playClick();
              handleDownloadResume();
            }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-md border border-white/25">
              <Download size={20} className="text-white drop-shadow-sm" />
            </div>
            <div className="absolute -top-9 px-2.5 py-0.5 bg-black/85 backdrop-blur-md text-white text-[10px] font-bold rounded-md shadow-xl border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
              Download Tech Resume
            </div>
            <div className="w-1.5 h-1.5 rounded-full mt-1 bg-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// --- DESKTOP ICON COMPONENT ---
const DesktopIcon = React.memo(function DesktopIcon({ icon, label, onClick, theme }) {
  return (
    <div 
      onClick={() => { soundFx.playClick(); onClick(); }} 
      className="flex flex-col items-center cursor-pointer group w-16 md:w-20 active:scale-95 transition-transform"
    >
      <div 
        className="p-2.5 md:p-3.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/60 transition-all shadow-lg group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]" 
        style={{ color: theme.text }}
      >
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <span className="text-[8px] md:text-[9px] text-white/80 mt-1.5 font-bold uppercase text-center group-hover:text-white tracking-wider truncate max-w-full drop-shadow">
        {label}
      </span>
    </div>
  );
});

// --- CONTEXT MENU ITEM ---
const ContextMenuItem = ({ icon, label, onClick }) => (
  <div 
    onClick={onClick} 
    className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white cursor-pointer group transition-all text-slate-800 font-bold"
  >
    <span className="text-blue-600 group-hover:text-white transition-colors shrink-0">{icon}</span>
    <span className="truncate group-hover:text-white">{label}</span>
  </div>
);

// --- START / LAUNCHPAD MENU ITEM ---
const StartItem = ({ icon, label, onClick }) => (
  <div 
    onClick={() => { soundFx.playClick(); onClick(); }} 
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white cursor-pointer group transition-all text-slate-900 font-semibold"
  >
    <span className="group-hover:text-white transition-colors shrink-0">{icon}</span>
    <span className="text-[11px] tracking-tight group-hover:text-white truncate">{label}</span>
  </div>
);

// --- MACOS WINDOW COMPONENT ---
const Window = React.memo(function Window({ title, children, onClose, onMinimize, onMaximize, isMaximized, theme }) {
  return (
    <div 
      className={`glass-window border flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-[border-radius] duration-200 ${
        isMaximized 
          ? 'h-full w-full rounded-none border-0 bg-[#080911] text-slate-100' 
          : 'h-[75vh] md:h-[540px] rounded-2xl bg-[#0c0d16]/96'
      }`} 
      style={{ 
        borderColor: isMaximized ? 'transparent' : 'rgba(255, 255, 255, 0.18)', 
        minWidth: isMaximized ? 'auto' : '300px', 
        minHeight: isMaximized ? 'auto' : '220px',
        resize: isMaximized ? 'none' : 'both',
        boxShadow: isMaximized ? 'none' : '0 25px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      }}
    >
      {/* MACOS WINDOW HEADER / TITLEBAR */}
      <div 
        onDoubleClick={onMaximize}
        className={`bg-black/60 backdrop-blur-xl px-4 py-2.5 flex items-center justify-between border-b border-white/10 shrink-0 select-none relative ${
          isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        {/* MACOS TRAFFIC LIGHTS */}
        <div className="flex items-center gap-2 z-10">
          {/* Close (Red) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            title="Close"
            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 border border-[#e0443e] flex items-center justify-center group cursor-pointer shadow-sm transition-transform hover:scale-110"
          >
            <X size={8} className="text-black/80 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
          </button>
          {/* Minimize to Dock (Yellow) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }} 
            title="Minimize to Dock"
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 border border-[#dea123] flex items-center justify-center group cursor-pointer shadow-sm transition-transform hover:scale-110"
          >
            <Minus size={8} className="text-black/80 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
          </button>
          {/* Fullscreen / Zoom (Green) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(); }} 
            title={isMaximized ? "Restore Window" : "Full Screen"}
            className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 border border-[#1aab29] flex items-center justify-center group cursor-pointer shadow-sm transition-transform hover:scale-110"
          >
            {isMaximized ? (
              <Minimize2 size={7} className="text-black/80 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
            ) : (
              <Maximize2 size={7} className="text-black/80 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
            )}
          </button>
        </div>

        {/* CENTERED TITLE */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-16">
          <span className="text-[11px] md:text-xs font-semibold text-white/90 tracking-wide truncate">
            {title}
          </span>
        </div>

        {/* RIGHT CORNER BADGE */}
        <div className="flex items-center gap-1 text-[10px] text-white/40 font-mono">
          <span className="hidden sm:inline">macOS &bull; Ventura</span>
        </div>
      </div>

      {/* WINDOW CONTENT */}
      <div className={`p-4 md:p-8 flex-1 overflow-y-auto ${isMaximized ? 'max-w-6xl mx-auto w-full' : ''}`}>{children}</div>
    </div>
  );
});

// --- APP: SYSTEM MONITOR / NEOFETCH ---
const SysInfoApp = React.memo(() => {
  const [cpuUsage, setCpuUsage] = useState(24);
  const [ramUsage, setRamUsage] = useState(384);
  const [uptimeSeconds, setUptimeSeconds] = useState(42);

  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(Math.floor(18 + Math.random() * 25));
      setRamUsage(prev => Math.min(840, Math.max(320, prev + Math.floor(Math.random() * 10 - 4))));
      setUptimeSeconds(s => s + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (secs) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="space-y-5 text-white font-mono">
      <div className="border-b border-green-500/30 pb-2">
        <h2 className="text-xl font-black text-green-400 uppercase tracking-tighter">SYSTEM DIAGNOSTICS &amp; MONITOR</h2>
        <p className="text-[10px] text-white/50">AB-OS Kernel v5.10 &bull; Architecture: x86_64-AI</p>
      </div>

      {/* ASCII LOGO & OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-4 border border-white/10">
        <pre className="text-green-400 text-[9px] leading-tight font-black select-none hidden sm:block">
{`   _____    ____   ____    _____ 
  /  _  \\  |  _ \\ /  _ \\  /  ___/
 /  /_\\  \\ | |_| |  /_\\ \\ \\___  \\ 
/    |    \\|  _ <|    |    \\____ \\
\\____|__  /|_| \\_\\____|__  /____  >
        \\/               \\/     \\/ 
      [ ABHISHEK LOHAR ]`}
        </pre>
        <div className="space-y-1.5 text-[10px]">
          <p><span className="text-green-400 font-bold">OS:</span> AB-OS v5.1.0 64-Bit</p>
          <p><span className="text-green-400 font-bold">KERNEL:</span> 5.10.14-abhishek-ai</p>
          <p><span className="text-green-400 font-bold">UPTIME:</span> {formatUptime(uptimeSeconds)}</p>
          <p><span className="text-green-400 font-bold">HOST:</span> Vellore Institute of Technology-AP</p>
          <p><span className="text-green-400 font-bold">PACKAGES:</span> local-persona-memory (PyPI)</p>
          <p><span className="text-green-400 font-bold">SHELL:</span> MS-DOS / Bash 5.2</p>
        </div>
      </div>

      {/* REAL-TIME GAUGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CPU */}
        <div className="bg-black/60 border border-green-500/30 p-3 space-y-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-green-400 font-bold uppercase">CPU Load (Neural Core)</span>
            <span className="font-bold">{cpuUsage}%</span>
          </div>
          <div className="h-3 bg-gray-900 border border-green-900 p-0.5">
            <div className="h-full bg-green-500 transition-all duration-700" style={{ width: `${cpuUsage}%` }} />
          </div>
          <p className="text-[8px] text-white/40">12-Cores Active &bull; AI Pipeline Dispatcher Running</p>
        </div>

        {/* RAM */}
        <div className="bg-black/60 border border-cyan-500/30 p-3 space-y-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-cyan-400 font-bold uppercase">RAM Consumption</span>
            <span className="font-bold">{ramUsage} MB / 64 GB</span>
          </div>
          <div className="h-3 bg-gray-900 border border-cyan-900 p-0.5">
            <div className="h-full bg-cyan-400 transition-all duration-700" style={{ width: `${(ramUsage / 1024) * 100}%` }} />
          </div>
          <p className="text-[8px] text-white/40">Vector Cache &bull; ChromaDB InMemory Partition</p>
        </div>
      </div>

      {/* QUICK STATUS */}
      <div className="text-[10px] text-white/70 bg-white/5 p-3 border border-white/10 space-y-1">
        <div className="flex items-center gap-2">
          <Check size={13} className="text-green-400" />
          <span>Local LLM Vector Memory: <b>ONLINE</b></span>
        </div>
        <div className="flex items-center gap-2">
          <Check size={13} className="text-green-400" />
          <span>PostgreSQL + Redis Caching Microservice: <b>CONNECTED</b></span>
        </div>
        <div className="flex items-center gap-2">
          <Check size={13} className="text-green-400" />
          <span>Raspberry Pi Biometric CV Stream: <b>READY</b></span>
        </div>
      </div>
    </div>
  );
});

// --- APP: RETRO MEDIA PLAYER (WINAMP STYLE) ---
const RetroPlayerApp = React.memo(() => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(1);
  const [volume, setVolume] = useState(80);

  const togglePlay = () => {
    soundFx.playClick();
    const playing = soundFx.toggleMusic((b) => setBeat(b));
    setIsPlaying(playing);
  };

  useEffect(() => {
    return () => {
      soundFx.stopMusic();
    };
  }, []);

  return (
    <div className="space-y-4 font-mono text-white">
      {/* RETRO PLAYER CHASSIS */}
      <div className="bg-[#1a1a1a] border-2 border-white/20 p-4 shadow-2xl space-y-3">
        {/* LCD DISPLAY */}
        <div className="bg-[#002200] border-2 border-[#00ff41]/40 p-3 text-green-400 font-mono shadow-inner">
          <div className="flex justify-between items-center text-[10px] border-b border-green-500/20 pb-1 mb-2">
            <span className="font-bold tracking-widest">{isPlaying ? `PLAYING [BEAT ${beat}]` : "STOPPED"}</span>
            <span>128 KBPS / 44.1 KHZ</span>
          </div>
          <p className="text-xs font-black uppercase tracking-wider truncate mb-2">
            Track 01: 8-Bit Cyberpunk Theme (Abhishek's Code)
          </p>
          
          {/* EQUALIZER BARS */}
          <div className="h-12 flex items-end gap-1.5 pt-2 border-t border-green-500/20">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
              <div 
                key={bar} 
                className={`flex-1 bg-green-500/90 transition-all ${
                  isPlaying ? `animate-eq-${bar}` : 'h-2 bg-green-900'
                }`}
              />
            ))}
          </div>
        </div>

        {/* PLAYER CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex gap-2">
            <button 
              onClick={togglePlay} 
              className="flex items-center gap-1.5 bg-green-600 hover:bg-green-400 text-black px-4 py-2 text-[10px] font-black uppercase transition-all shadow-md active:scale-95"
            >
              {isPlaying ? <Square size={12} fill="currentColor"/> : <Play size={12} fill="currentColor"/>}
              {isPlaying ? "Stop" : "Play Theme"}
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] text-white/60">
            <span>VOL:</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume} 
              onChange={(e) => setVolume(Number(e.target.value))} 
              className="w-20 accent-green-500" 
            />
            <span>{volume}%</span>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-3 text-[10px] text-white/70 space-y-1">
        <p className="text-green-400 font-bold uppercase">Synthesizer Info:</p>
        <p>Real-time algorithmic 8-bit melody running via Web Audio API. Zero streaming bandwidth required.</p>
      </div>
    </div>
  );
});

// --- APP: NOTEPAD (INTERACTIVE TEXT EDITOR) ---
const NotepadApp = React.memo(() => {
  const [activeTab, setActiveTab] = useState('readme');
  const [scratchContent, setScratchContent] = useState(() => {
    return localStorage.getItem('abos_notes') || "Type your thoughts, feedback, or interview questions here...\n(Saved in your browser localStorage automatically)";
  });
  const [savedStatus, setSavedStatus] = useState(false);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setScratchContent(val);
    localStorage.setItem('abos_notes', val);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const readmeText = `=========================================
WELCOME TO AB-OS v5.1 (PORTFOLIO EDITION)
Created by: Abhishek Lohar
Institution: VIT-AP University (B.Tech CSE)
CGPA: 8.33 / 10.0
=========================================

Hi! I am Abhishek, a software engineer passionate 
about AI/Deep Learning, distributed backend systems, 
and full-stack development.

HIGHLIGHTS:
- Published PyPI package: local-persona-memory (160 tests, CI/CD)
- Microservices URL Shortener (FastAPI, Redis, Kafka, PostgreSQL)
- Smart Attendance Face Recognition (Raspberry Pi, OpenCV)

Feel free to switch to the "SCRATCHPAD.TXT" tab to write
notes, or use the Contact app to send me a message!
`;

  return (
    <div className="h-full flex flex-col font-mono text-xs">
      {/* MENU BAR */}
      <div className="flex items-center gap-4 bg-white/10 px-3 py-1.5 border-b border-white/10 text-[10px] text-white/70">
        <span className="hover:text-white cursor-pointer">File</span>
        <span className="hover:text-white cursor-pointer">Edit</span>
        <span className="hover:text-white cursor-pointer">View</span>
        <span className="hover:text-white cursor-pointer">Help</span>
        {savedStatus && <span className="text-green-400 ml-auto font-bold animate-pulse">SAVED</span>}
      </div>

      {/* TABS */}
      <div className="flex gap-1 border-b border-white/10 pt-2 px-2 bg-black/40">
        <button 
          onClick={() => { soundFx.playClick(); setActiveTab('readme'); }}
          className={`px-3 py-1 text-[10px] font-bold uppercase border-t-2 ${
            activeTab === 'readme' ? 'border-green-500 bg-white/10 text-white' : 'border-transparent text-white/40 hover:text-white'
          }`}
        >
          README.TXT
        </button>
        <button 
          onClick={() => { soundFx.playClick(); setActiveTab('scratch'); }}
          className={`px-3 py-1 text-[10px] font-bold uppercase border-t-2 ${
            activeTab === 'scratch' ? 'border-green-500 bg-white/10 text-white' : 'border-transparent text-white/40 hover:text-white'
          }`}
        >
          SCRATCHPAD.TXT
        </button>
      </div>

      {/* TEXT AREA */}
      <div className="flex-1 p-2 bg-black/80">
        {activeTab === 'readme' ? (
          <textarea 
            readOnly 
            value={readmeText} 
            className="w-full h-full bg-transparent text-green-400 font-mono text-xs resize-none outline-none leading-relaxed p-2"
          />
        ) : (
          <textarea 
            value={scratchContent} 
            onChange={handleTextChange}
            placeholder="Type notes here..." 
            className="w-full h-full bg-transparent text-white font-mono text-xs resize-none outline-none leading-relaxed p-2 border border-white/10 focus:border-green-500"
          />
        )}
      </div>
    </div>
  );
});

// --- ABOUT APP ---
const AboutContent = React.memo(() => {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0;
    const step = 2;
    const interval = setInterval(() => {
      i += step;
      setText(userInfo.bio.substring(0, i));
      if (i >= userInfo.bio.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-black italic text-green-500 uppercase tracking-tighter">ABHISHEK LOHAR</h2>
        <div className="text-[10px] md:text-xs text-white/50 font-bold uppercase tracking-wider mt-1">
          VIT-AP UNIVERSITY &bull; B.TECH CSE (CGPA: 8.33) &bull; AI/ML & FULL-STACK
        </div>
      </div>

      <p className="text-xs md:text-sm text-white/80 leading-relaxed border-l-2 border-green-500/30 pl-4 italic min-h-[70px]">{text}</p>
      
      {/* CONTACT CARDS */}
      <div className="bg-white/5 border border-white/10 p-3 space-y-1.5 text-[10px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-green-400 font-bold uppercase">Personal Email:</span>
          <a href={`mailto:${userInfo.emailPersonal}`} className="text-white/80 hover:text-green-300 underline">{userInfo.emailPersonal}</a>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-green-400 font-bold uppercase">Campus Email:</span>
          <a href={`mailto:${userInfo.emailCollege}`} className="text-white/80 hover:text-green-300 underline">{userInfo.emailCollege}</a>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-white/60 pt-1 border-t border-white/5">
          <span><b>Phone:</b> {userInfo.phone}</span>
          <span><b>Location:</b> {userInfo.location}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-1">
        {/* DUAL DOWNLOAD BUTTONS */}
        <div className="flex flex-wrap gap-2.5">
          <button onClick={handleDownloadResume} className="flex items-center justify-center gap-2 bg-green-600 text-black px-4 py-2.5 text-[10px] font-black uppercase hover:bg-green-400 active:scale-95 transition-all">
            <Download size={13}/> Download Tech Resume (PDF)
          </button>
          <button onClick={handleDownloadCV} className="flex items-center justify-center gap-2 border border-green-500 text-green-400 px-4 py-2.5 text-[10px] font-black uppercase hover:bg-green-500 hover:text-black active:scale-95 transition-all">
            <Download size={13}/> Download General CV (PDF)
          </button>
        </div>

        {/* SOCIAL LINKS SECTION */}
        <div className="flex flex-wrap gap-4 border-t border-white/10 pt-4">
          <a href={userInfo.socials.github} target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-2 text-[10px] text-white/60 hover:text-green-400 transition-colors uppercase font-bold">
            <Github size={14}/> GitHub.lnk
          </a>
          <a href={userInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-2 text-[10px] text-white/60 hover:text-green-400 transition-colors uppercase font-bold">
            <Linkedin size={14}/> LinkedIn.lnk
          </a>
          <a href="https://pypi.org/project/local-persona-memory/" target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-2 text-[10px] text-white/60 hover:text-cyan-400 transition-colors uppercase font-bold">
            <ExternalLink size={14}/> PyPI Package.lnk
          </a>
        </div>
      </div>
    </div>
  );
});

// --- ARCADE: SNAKE GAME WITH TOUCH CONTROLS & SFX ---
const SnakeGame = React.memo(() => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('snake_hiscore') || 0));
  const [gameOver, setGameOver] = useState(false);
  const directionRef = useRef({ x: 0, y: -1 });

  const setDir = (x, y) => {
    const d = directionRef.current;
    if (x !== 0 && d.x === 0) directionRef.current = { x, y: 0 };
    if (y !== 0 && d.y === 0) directionRef.current = { x: 0, y };
  };

  useEffect(() => {
    if (gameOver) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let s = [{x: 10, y: 10}]; 
    let f = {x: 5, y: 5};
    directionRef.current = { x: 0, y: -1 };

    const loop = setInterval(() => {
      const d = directionRef.current;
      const h = { x: s[0].x + d.x, y: s[0].y + d.y };

      // Wall collision
      if (h.x < 0 || h.x >= 20 || h.y < 0 || h.y >= 20) {
        soundFx.playGameOver();
        setGameOver(true);
        return;
      }
      
      // Self collision
      if (s.slice(1).some(seg => seg.x === h.x && seg.y === h.y)) {
        soundFx.playGameOver();
        setGameOver(true);
        return;
      }

      s.unshift(h);
      if (h.x === f.x && h.y === f.y) { 
        soundFx.playSnakeEat();
        setScore(v => {
          const newScore = v + 10;
          setHighScore(prev => {
            const best = Math.max(prev, newScore);
            localStorage.setItem('snake_hiscore', best);
            return best;
          });
          return newScore;
        }); 
        f = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) }; 
      } else {
        s.pop();
      }

      ctx.fillStyle = 'black'; 
      ctx.fillRect(0, 0, 400, 400); 
      
      // Draw grid lines
      ctx.strokeStyle = '#112211';
      for (let i = 0; i < 400; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 400); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(400, i); ctx.stroke();
      }

      // Draw Snake
      ctx.fillStyle = '#22c55e'; 
      s.forEach((p, idx) => {
        ctx.fillStyle = idx === 0 ? '#4ade80' : '#22c55e';
        ctx.fillRect(p.x * 20 + 1, p.y * 20 + 1, 18, 18);
      });

      // Draw Food
      ctx.fillStyle = '#ef4444'; 
      ctx.fillRect(f.x * 20 + 1, f.y * 20 + 1, 18, 18);
    }, 170);

    const k = (e) => {
      if (e.key === 'ArrowUp') setDir(0, -1);
      if (e.key === 'ArrowDown') setDir(0, 1);
      if (e.key === 'ArrowLeft') setDir(-1, 0);
      if (e.key === 'ArrowRight') setDir(1, 0);
    };

    window.addEventListener('keydown', k);
    return () => { 
      clearInterval(loop); 
      window.removeEventListener('keydown', k); 
    };
  }, [gameOver]);

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex justify-between w-full max-w-[340px] text-[10px] font-bold uppercase mb-2">
        <span className="text-green-400">Score: {score}</span>
        <span className="text-yellow-400">High Score: {highScore}</span>
      </div>

      <canvas 
        ref={canvasRef} 
        width={400} 
        height={400} 
        className="bg-black border-2 border-green-500/40 w-full max-w-[340px] aspect-square shadow-[0_0_15px_rgba(34,197,94,0.2)]" 
      />

      {gameOver && (
        <button 
          onClick={() => { soundFx.playClick(); setGameOver(false); setScore(0); }} 
          className="mt-3 bg-green-600 hover:bg-green-400 text-black px-6 py-2 text-xs font-black uppercase shadow-lg active:scale-95"
        >
          Restart Game
        </button>
      )}

      {/* MOBILE / TOUCH CONTROLS (D-PAD) */}
      <div className="mt-4 flex flex-col items-center gap-1.5 md:hidden">
        <p className="text-[9px] text-white/50 uppercase tracking-widest mb-1">Touch Controls</p>
        <button onClick={() => setDir(0, -1)} className="w-12 h-10 bg-white/10 border border-white/20 active:bg-green-500 active:text-black flex items-center justify-center">
          <ArrowUp size={16} />
        </button>
        <div className="flex gap-2">
          <button onClick={() => setDir(-1, 0)} className="w-12 h-10 bg-white/10 border border-white/20 active:bg-green-500 active:text-black flex items-center justify-center">
            <ArrowLeft size={16} />
          </button>
          <button onClick={() => setDir(0, 1)} className="w-12 h-10 bg-white/10 border border-white/20 active:bg-green-500 active:text-black flex items-center justify-center">
            <ArrowDown size={16} />
          </button>
          <button onClick={() => setDir(1, 0)} className="w-12 h-10 bg-white/10 border border-white/20 active:bg-green-500 active:text-black flex items-center justify-center">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
});

// --- PROJECTS APP ---
const ProjectList = React.memo(() => (
  <div className="space-y-4">
    {userInfo.projects.map((p, i) => (
      <div key={i} className="border border-white/10 bg-white/5 p-4 hover:border-green-500 transition-all">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-1.5">
          <h3 className="text-green-400 font-bold uppercase text-xs md:text-sm">{p.title}</h3>
          {p.badge && (
            <span className="text-[9px] bg-green-500/10 text-green-300 px-2 py-0.5 border border-green-500/30 font-mono tracking-wider">
              {p.badge}
            </span>
          )}
        </div>
        <p className="text-[10px] md:text-xs text-white/80 leading-relaxed mb-2">{p.desc}</p>
        {p.details && (
          <p className="text-[9px] md:text-[10px] text-green-400/80 italic mb-2 border-l border-green-500/30 pl-2">
            {p.details}
          </p>
        )}
        <div className="flex flex-wrap justify-between items-center gap-2 pt-2 border-t border-white/10">
          <div className="text-[8px] md:text-[9px] text-green-300/60 font-bold uppercase tracking-widest">
            [{p.tech}]
          </div>
          {p.link && (
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[9px] text-cyan-400 hover:text-cyan-300 uppercase font-bold">
              <ExternalLink size={10} /> View on PyPI
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
));

// --- RESUME APP ---
const ResumePreview = React.memo(() => (
  <div className="text-white space-y-6">
    {/* Quick Download Header */}
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/5 border border-green-500/30">
      <div>
        <div className="text-xs font-black text-green-400 uppercase tracking-wider">Download Verified Documents</div>
        <div className="text-[9px] text-white/50">ATS-compliant PDF formats matching updated resume &amp; industry CV</div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={handleDownloadResume} className="flex items-center gap-1.5 bg-green-600 text-black px-3 py-1.5 text-[9px] font-black uppercase hover:bg-green-400 active:scale-95 transition-all">
          <Download size={12} /> Tech Resume
        </button>
        <button onClick={handleDownloadCV} className="flex items-center gap-1.5 border border-green-500 text-green-400 px-3 py-1.5 text-[9px] font-black uppercase hover:bg-green-500 hover:text-black active:scale-95 transition-all">
          <Download size={12} /> General CV
        </button>
      </div>
    </div>

    {/* Education */}
    <section>
      <h2 className="text-green-500 font-black text-lg border-b border-white/20 mb-3 flex items-center justify-between">
        <span>EDUCATION</span>
        <span className="text-[10px] text-white/40 font-normal">VIT-AP UNIVERSITY</span>
      </h2>
      <div className="space-y-3">
        {userInfo.education.map((edu, i) => (
          <div key={i} className="border-l-2 border-green-500/40 pl-3">
            <div className="flex justify-between items-baseline">
              <p className="font-bold text-xs text-white">{edu.institution}</p>
              <span className="text-[9px] text-white/50">{edu.period}</span>
            </div>
            <p className="text-[10px] text-white/70 italic">{edu.degree} &bull; {edu.location}</p>
            <p className="text-[10px] text-green-400 font-bold mt-0.5">{edu.grade}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Technical Skills */}
    <section>
      <h2 className="text-green-500 font-black text-lg border-b border-white/20 mb-3">TECHNICAL SKILLS</h2>
      <div className="space-y-2.5 text-[10px]">
        <div>
          <span className="text-green-400 font-bold uppercase">Languages: </span>
          <span className="text-white/90">{userInfo.skills.languages.join(", ")}</span>
        </div>
        <div>
          <span className="text-green-400 font-bold uppercase">AI/ML Stack: </span>
          <span className="text-white/90">{userInfo.skills.aiMl.join(", ")}</span>
        </div>
        <div>
          <span className="text-green-400 font-bold uppercase">Tools &amp; Frameworks: </span>
          <span className="text-white/90">{userInfo.skills.toolsFrameworks.join(", ")}</span>
        </div>
        <div>
          <span className="text-green-400 font-bold uppercase">Soft Skills: </span>
          <span className="text-white/90">{userInfo.skills.softSkills.join(", ")}</span>
        </div>
      </div>
    </section>

    {/* Key Projects */}
    <section>
      <h2 className="text-green-500 font-black text-lg border-b border-white/20 mb-3">FEATURED PROJECTS</h2>
      <div className="space-y-2.5">
        {userInfo.projects.map((p, i) => (
          <div key={i} className="text-[10px] bg-white/5 p-3 border border-white/10">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-green-300 uppercase text-xs">{p.title}</span>
              <span className="text-[8px] text-white/40 uppercase">[{p.tech}]</span>
            </div>
            <p className="text-white/70 text-[9px] leading-relaxed mb-1">{p.desc}</p>
            {p.details && <p className="text-green-400/80 text-[8px] italic">{p.details}</p>}
          </div>
        ))}
      </div>
    </section>

    {/* Certifications */}
    <section>
      <h2 className="text-green-500 font-black text-lg border-b border-white/20 mb-3">CERTIFICATIONS &amp; ACHIEVEMENTS</h2>
      <ul className="text-[10px] list-disc pl-4 space-y-1.5 opacity-85">
        {userInfo.certifications.map((c, i) => (
          <li key={i} className="leading-relaxed">{c}</li>
        ))}
      </ul>
    </section>

    {/* Languages */}
    <section>
      <h2 className="text-green-500 font-black text-lg border-b border-white/20 mb-3">LANGUAGES</h2>
      <div className="flex gap-4 text-[10px]">
        {userInfo.languages.map((l, i) => (
          <span key={i} className="px-3 py-1 bg-white/10 border border-white/20 text-white/90">
            <b className="text-green-400">{l.name}</b> ({l.proficiency})
          </span>
        ))}
      </div>
    </section>

    {/* Bottom Download Bar */}
    <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-white/10">
      <span className="text-[9px] text-white/40">Abhishek Lohar &bull; Updated Curriculum Vitae</span>
      <div className="flex gap-2">
        <button onClick={handleDownloadResume} className="bg-green-600 text-black px-3 py-1.5 text-[9px] font-black uppercase hover:bg-green-400 transition-all flex items-center gap-1">
          <Download size={11} /> Tech Resume
        </button>
        <button onClick={handleDownloadCV} className="border border-green-500 text-green-400 px-3 py-1.5 text-[9px] font-black uppercase hover:bg-green-500 hover:text-black transition-all flex items-center gap-1">
          <Download size={11} /> General CV
        </button>
      </div>
    </div>
  </div>
));

// --- CONTACT APP ---
const ContactContent = React.memo(() => {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const validateContact = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!validateContact(formData.contact)) {
      alert("SYSTEM ERROR: Invalid Contact Method.");
      return;
    }

    setIsSending(true);

    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const adminTemplateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userTemplateID = process.env.REACT_APP_EMAILJS_CONFIRMATION_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      name: formData.name,
      phone: formData.contact,
      message: formData.message,
    };

    try {
      await Promise.all([
        emailjs.send(serviceID, adminTemplateID, templateParams, publicKey),
        formData.contact.includes('@') 
          ? emailjs.send(serviceID, userTemplateID, templateParams, publicKey)
          : Promise.resolve() 
      ]);

      setIsSent(true);
      setFormData({ name: '', contact: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error("FULL ERROR LOG:", error);
      alert("TRANSMISSION ERROR: " + (error.text || error.message || "Unknown Failure"));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 relative h-full">
      <h2 className="text-2xl md:text-3xl font-black italic text-green-500 uppercase tracking-tighter border-b border-green-500/20 pb-2">
        Secure Transmission
      </h2>

      <AnimatePresence>
        {isSent && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0 }}
            className="bg-green-600 text-black p-3 text-[10px] font-black uppercase text-center mb-4 border border-white shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          >
            NOTIFY: Message transmitted successfully.
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSend} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] text-green-500/70 uppercase font-bold">Identity Name</label>
          <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/20 p-3 text-xs text-white outline-none focus:border-green-500 transition-colors" placeholder="ENTER NAME..." />
        </div>
        
        <div className="space-y-1">
          <label className="text-[10px] text-green-500/70 uppercase font-bold">Contact Method (Email / Phone)</label>
          <input required type="text" value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} className="w-full bg-black border border-white/20 p-3 text-xs text-white outline-none focus:border-green-500 transition-colors" placeholder="GMAIL OR PHONE NUMBER..." />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] text-green-500/70 uppercase font-bold">Encrypted Message</label>
          <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-black border border-white/20 p-3 text-xs text-white outline-none focus:border-green-500 transition-colors h-24 resize-none" placeholder="TYPE MESSAGE HERE..." />
        </div>
        
        <button type="submit" disabled={isSending} className={`w-full py-3.5 text-[11px] font-black uppercase transition-all flex items-center justify-center gap-2 ${isSending ? 'bg-gray-600 cursor-wait' : 'bg-green-600 hover:bg-green-400 text-black'}`}>
          <Mail size={14} className={isSending ? "animate-spin" : ""} /> 
          {isSending ? "Processing..." : "Send Transmission"}
        </button>
      </form>
    </div>
  );
});

// --- MS-DOS TERMINAL APP ---
const Terminal = React.memo(({ onOpen, onSet3DMode }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { text: "AB-OS [Version 5.1.028] (C) 2026 Abhishek Lohar", type: "info" },
    { text: "Type 'help' to inspect all available system commands.", type: "info" }
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      soundFx.playClick();
      const rawCmd = input.trim();
      const cmd = rawCmd.toLowerCase();
      const newHistory = [...history, { text: `C:\\USERS\\ABHISHEK> ${input}`, type: "user" }];

      if (cmd === '3d' || cmd.startsWith('3d ')) {
        const parts = cmd.split(/\s+/);
        if (parts.length > 1 && ['neural', 'grid', 'matrix', 'off'].includes(parts[1])) {
          if (onSet3DMode) onSet3DMode(parts[1]);
          newHistory.push({ text: `3D SPATIAL BACKGROUND SET TO: [${parts[1].toUpperCase()}]`, type: "success" });
        } else {
          newHistory.push({ text: "USAGE: 3D [neural | grid | matrix | off]", type: "info" });
          newHistory.push({ text: "CURRENT MODES: neural (AI Synapse), grid (Cyber Horizon), matrix (Volumetric Rain), off", type: "info" });
        }
        setHistory(newHistory);
        setInput("");
        return;
      }

      switch (cmd) {
        case 'help':
          newHistory.push({ text: "=== AB-OS CLI COMMANDS ===", type: "info" });
          newHistory.push({ text: "> ABOUT      : Open About Me profile", type: "cmd" });
          newHistory.push({ text: "> PROJECTS   : Explore featured software projects", type: "cmd" });
          newHistory.push({ text: "> RESUME     : View curriculum vitae preview", type: "cmd" });
          newHistory.push({ text: "> SYSINFO    : Live CPU/RAM/Uptime diagnostics", type: "cmd" });
          newHistory.push({ text: "> MUSIC      : Open 8-bit RetroPlayer", type: "cmd" });
          newHistory.push({ text: "> NOTEPAD    : Launch text editor / scratchpad", type: "cmd" });
          newHistory.push({ text: "> SNAKE      : Play Arcade Snake Game", type: "cmd" });
          newHistory.push({ text: "> CONTACT    : Transmit encrypted message", type: "cmd" });
          newHistory.push({ text: "> 3D [MODE]  : Set 3D background (neural/grid/matrix/off)", type: "cmd" });
          newHistory.push({ text: "> NEOFTECH   : Display ASCII system badge", type: "cmd" });
          newHistory.push({ text: "> CV         : Download General Company CV (PDF)", type: "cmd" });
          newHistory.push({ text: "> DOWNLOAD   : Download Technical Resume (PDF)", type: "cmd" });
          newHistory.push({ text: "> BEEP       : Play audio test beep", type: "cmd" });
          newHistory.push({ text: "> WHOAMI     : Current session privileges", type: "cmd" });
          newHistory.push({ text: "> DATE       : Display local system time", type: "cmd" });
          newHistory.push({ text: "> CLS / CLEAR: Clear terminal screen", type: "cmd" });
          break;
        case 'cls':
        case 'clear': 
          setHistory([]); 
          setInput(""); 
          return;
        case 'neofetch':
          newHistory.push({ text: "  ___  ___        User: Abhishek Lohar", type: "info" });
          newHistory.push({ text: " / _ \\/ _ \\       Host: Vellore Institute of Technology-AP", type: "info" });
          newHistory.push({ text: "| (_) | (_) |     OS: AB-OS 5.1 (React 19, Tailwind, Framer)", type: "info" });
          newHistory.push({ text: " \\___/\\___/      Kernel: 5.10-ai-dl-core", type: "info" });
          newHistory.push({ text: "                 PyPI: local-persona-memory", type: "info" });
          newHistory.push({ text: "                 CGPA: 8.33 / 10.0", type: "info" });
          break;
        case 'beep':
          soundFx.playBeep();
          newHistory.push({ text: "AUDIO BEEP GENERATED (440Hz Square Wave)", type: "success" });
          break;
        case 'whoami':
          newHistory.push({ text: "abhishek@ab-os (root / administrative privileges granted)", type: "info" });
          break;
        case 'date':
          newHistory.push({ text: new Date().toString(), type: "info" });
          break;
        case 'about':
        case 'projects':
        case 'resume':
        case 'snake':
        case 'contact':
        case 'sysinfo':
        case 'player':
        case 'notepad':
          if (onOpen) onOpen(cmd);
          newHistory.push({ text: `EXECUTING ${cmd.toUpperCase()}.EXE...`, type: "success" });
          break;
        case 'cv':
          handleDownloadCV();
          newHistory.push({ text: "DOWNLOADING GENERAL CV (PDF)... OK", type: "success" });
          break;
        case 'download':
          handleDownloadResume();
          newHistory.push({ text: "DOWNLOADING TECHNICAL RESUME (PDF)... OK", type: "success" });
          break;
        default:
          newHistory.push({ text: `'${cmd}' is not recognized. Type 'help' for command list.`, type: "error" });
      }
      setHistory(newHistory); 
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full font-mono text-xs md:text-sm bg-black/70 p-2">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 mb-2">
        {history.map((line, i) => (
          <div key={i} className={`${
            line.type === 'error' ? 'text-red-400' : 
            line.type === 'success' ? 'text-cyan-300' : 
            line.type === 'info' ? 'text-green-400/90' : 
            line.type === 'cmd' ? 'text-yellow-400/90' : 'text-white'
          }`}>
            {line.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-green-500 border-t border-green-500/20 pt-2">
        <span>C:\&gt;</span>
        <input 
          autoFocus 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={handleCommand} 
          className="bg-transparent border-none outline-none flex-1 text-white uppercase font-bold" 
        />
      </div>
    </div>
  );
});
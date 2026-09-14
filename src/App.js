import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, X, Terminal as TerminalIcon, Download, 
  Palette, Briefcase, Minus,
  Eye, Mail, Gamepad2, CloudSun, Github, Linkedin, FileText, ExternalLink,
  Maximize2, Minimize2, Volume2, VolumeX, Monitor, Cpu, Music, Play, Square, FileEdit,
  Sparkles, Check, ArrowUp, ArrowDown, ArrowLeft, ArrowRight
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

// --- TICKER DATA ---
const statusMessages = [
  "SYSTEM: AB-OS v5.1 ONLINE &bull; RETRO AUDIO & CRT ACTIVE",
  "DOWNLOAD: NEW TECH RESUME & GENERAL CV AVAILABLE AS PDF",
  "PYPI: TRY 'pip install local-persona-memory' FOR LOCAL LLM MEMORY",
  "AESTHETIC: RIGHT-CLICK DESKTOP FOR QUICK SETTINGS & THEMES",
  "SOUND: CLICK THE SPEAKER ICON IN TRAY TO TOGGLE RETRO SFX",
  "CRT: CLICK [CRT] IN TRAY TO TOGGLE VINTAGE SCANLINE MONITOR",
  "ARCADE: SNAKE NOW SUPPORTS KEYBOARD & TOUCH D-PAD CONTROLS",
  "MUSIC: LAUNCH 'RETROPLAYER.EXE' FOR AMBIENT 8-BIT MELODIES"
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

// --- TICKER COMPONENT ---
const StatusTicker = ({ messages }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4500); 
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
        className="text-[9px] text-gray-800 font-bold uppercase italic whitespace-nowrap"
      >
        <span className="text-blue-700 mr-1.5">▶</span> {messages[index]}
      </motion.span>
    </AnimatePresence>
  );
};

export default function App() {
  const [bootPhase, setBootPhase] = useState(0); 
  const [loadProgress, setLoadProgress] = useState(0);
  const [openWindows, setOpenWindows] = useState(['about']);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [maximizedWindows, setMaximizedWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState('about');
  const [activeTheme, setActiveTheme] = useState('deepSea');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [showTicker, setShowTicker] = useState(true); 
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [threeDMode, setThreeDMode] = useState('neural');
  const [isMuted, setIsMuted] = useState(false);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const constraintsRef = useRef(null);
  const startMenuRef = useRef(null);
  const startButtonRef = useRef(null);

  // Close Start Menu on outside click
  useEffect(() => {
    if (!startMenuOpen) return;

    const handleOutsideClick = (e) => {
      if (
        startMenuRef.current && 
        !startMenuRef.current.contains(e.target) &&
        startButtonRef.current && 
        !startButtonRef.current.contains(e.target)
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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (bootPhase === 0) {
      const handleKeyDown = () => {
        soundFx.playBoot();
        setBootPhase(1);
      };
      window.addEventListener('keydown', handleKeyDown);
      const interval = setInterval(() => {
        setLoadProgress(prev => {
          if (prev >= 100) { 
            clearInterval(interval); 
            setTimeout(() => {
              soundFx.playBoot();
              setBootPhase(1);
            }, 1000); 
            return 100; 
          }
          return prev + 1;
        });
      }, 35);
      return () => {
        clearInterval(interval);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [bootPhase]);

  const toggleWindow = (id) => {
    soundFx.playOpen();
    if (!openWindows.includes(id)) setOpenWindows(prev => [...prev, id]);
    setMinimizedWindows(prev => prev.filter(w => w !== id));
    setActiveWindow(id);
    setStartMenuOpen(false);
  };

  const closeWindow = (id) => {
    soundFx.playClose();
    setOpenWindows(prev => prev.filter(w => w !== id));
    setMinimizedWindows(prev => prev.filter(w => w !== id));
    setMaximizedWindows(prev => prev.filter(w => w !== id));
  };

  const minimizeWindow = (id) => {
    soundFx.playClose();
    setMinimizedWindows(prev => [...prev, id]);
    setActiveWindow(null);
  };

  const toggleMaximizeWindow = (id) => {
    soundFx.playMaximize();
    setMaximizedWindows(prev => 
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

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
            <motion.div className="h-full bg-green-500 shadow-[0_0_15px_#22c55e]" style={{ width: `${loadProgress}%` }} />
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
    <div className={`h-screen w-screen flex items-center justify-center font-mono p-4 ${crtEnabled ? 'crt-overlay' : ''}`} style={{ backgroundColor: themes[activeTheme].bg }}>
      <div className="bg-black border-2 border-white/20 p-6 md:p-10 text-center shadow-[0_0_40px_rgba(0,0,0,0.8)] max-w-sm w-full">
        <h1 className="text-3xl md:text-4xl font-black text-green-500 mb-1 italic">{userInfo.name}</h1>
        <p className="text-white/70 text-[10px] tracking-[0.2em] mb-1 uppercase font-bold">VIT-AP &bull; AI & Full-Stack</p>
        <p className="text-white/40 text-[9px] tracking-[0.4em] mb-8 uppercase">Authorized Access Only</p>
        <div className="space-y-3">
          <button 
            onClick={() => { soundFx.playOpen(); setBootPhase(2); }} 
            className="w-full py-3.5 bg-green-600 text-black font-black uppercase text-xs hover:bg-green-400 active:scale-95 transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
          >
            Explore Portfolio &rarr;
          </button>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button onClick={handleDownloadResume} className="w-full py-2.5 border border-white/20 text-white font-bold uppercase text-[9px] hover:bg-white hover:text-black active:scale-95 transition-all flex items-center justify-center gap-1.5">
              <Download size={12} /> Tech Resume
            </button>
            <button onClick={handleDownloadCV} className="w-full py-2.5 border border-green-500/50 text-green-400 font-bold uppercase text-[9px] hover:bg-green-500 hover:text-black active:scale-95 transition-all flex items-center justify-center gap-1.5">
              <Download size={12} /> General CV
            </button>
          </div>
        </div>
      </div>
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

      {/* DESKTOP ICONS GRID */}
      <div className="absolute left-4 top-4 md:left-6 md:top-6 grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-5 md:gap-y-7 z-10 overflow-y-auto max-h-[85vh] p-1">
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

      {/* WINDOW DISPLAY CONTAINER */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2 md:p-4 overflow-hidden bottom-10">
        <AnimatePresence>
          {openWindows.map((id) => !minimizedWindows.includes(id) && (
            <motion.div 
              key={id} 
              drag={!maximizedWindows.includes(id)}
              dragConstraints={constraintsRef}
              dragMomentum={false}
              initial={{ scale: 0.85, opacity: 0, y: 40 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onMouseDown={() => setActiveWindow(id)}
              style={{ 
                zIndex: activeWindow === id ? 100 : 50, 
                position: maximizedWindows.includes(id) ? 'fixed' : 'absolute',
                top: maximizedWindows.includes(id) ? 0 : undefined,
                left: maximizedWindows.includes(id) ? 0 : undefined,
                right: maximizedWindows.includes(id) ? 0 : undefined,
                bottom: maximizedWindows.includes(id) ? '40px' : undefined,
              }}
              className={`pointer-events-auto transition-all ${
                maximizedWindows.includes(id) 
                  ? 'w-full h-[calc(100vh-40px)] max-w-none' 
                  : 'w-full max-w-[95%] md:max-w-[700px]'
              }`}
            >
              <Window 
                theme={themes[activeTheme]} 
                title={id.toUpperCase() + ".EXE"} 
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
          ))}
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
              <ContextMenuItem icon={<TerminalIcon size={14}/>} label="MS-DOS Prompt" onClick={() => toggleWindow('terminal')} />
              <div className="h-[1px] bg-slate-200 my-1 mx-1" />
              <ContextMenuItem icon={<Download size={14}/>} label="Download Tech Resume" onClick={handleDownloadResume} />
              <ContextMenuItem icon={<FileText size={14}/>} label="Download General CV" onClick={handleDownloadCV} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* START MENU */}
      <AnimatePresence>
        {startMenuOpen && (
          <motion.div 
            ref={startMenuRef}
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 50, opacity: 0 }} 
            className="absolute bottom-11 left-1 w-76 bg-white/95 backdrop-blur-md border-2 border-white shadow-[0_15px_50px_rgba(0,0,0,0.5)] p-1 z-[300] text-slate-900 rounded-sm overflow-hidden"
          >
            <div className="flex">
              <div className="bg-gradient-to-t from-blue-600 via-indigo-600 to-cyan-400 w-9 flex items-center justify-center [writing-mode:vertical-lr] rotate-180 text-white font-black py-6 text-xs uppercase tracking-widest shadow-inner select-none">
                AB-OS 5.2
              </div>
              <div className="flex-1 py-1 px-1 bg-white">
                <StartItem icon={<User size={15} className="text-blue-600" />} label="About Me" onClick={() => toggleWindow('about')} />
                <StartItem icon={<Briefcase size={15} className="text-emerald-600" />} label="My Projects" onClick={() => toggleWindow('projects')} />
                <StartItem icon={<Eye size={15} className="text-indigo-600" />} label="Resume Preview" onClick={() => toggleWindow('resume')} />
                <StartItem icon={<Cpu size={15} className="text-purple-600" />} label="System Diagnostics" onClick={() => toggleWindow('sysinfo')} />
                <StartItem icon={<Music size={15} className="text-pink-600" />} label="Retro Media Player" onClick={() => toggleWindow('player')} />
                <StartItem icon={<FileEdit size={15} className="text-amber-600" />} label="Notepad (Scratchpad)" onClick={() => toggleWindow('notepad')} />
                <StartItem icon={<Gamepad2 size={15} className="text-green-600" />} label="Arcade: Snake.exe" onClick={() => toggleWindow('snake')} />
                <StartItem icon={<Mail size={15} className="text-sky-600" />} label="Contact Transmitter" onClick={() => toggleWindow('contact')} />
                <div className="h-[1px] bg-slate-200 my-1.5 mx-1" />
                <StartItem icon={<FileText size={15} className="text-teal-600" />} label="Download Tech Resume" onClick={() => { handleDownloadResume(); setStartMenuOpen(false); }} />
                <StartItem icon={<Download size={15} className="text-blue-600" />} label="Download General CV" onClick={() => { handleDownloadCV(); setStartMenuOpen(false); }} />
                <div className="h-[1px] bg-slate-200 my-1.5 mx-1" />
                <StartItem icon={<TerminalIcon size={15} className="text-slate-800" />} label="MS-DOS Terminal" onClick={() => toggleWindow('terminal')} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TASKBAR */}
      <div className="absolute bottom-0 w-full h-10 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 border-t-2 border-white/80 flex items-center px-1 z-[250] shadow-md">
        <button 
          ref={startButtonRef}
          onClick={(e) => { 
            e.stopPropagation();
            soundFx.playClick(); 
            setStartMenuOpen(!startMenuOpen); 
          }} 
          className={`border-2 px-2 md:px-4 py-1 font-black text-[10px] md:text-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
            startMenuOpen 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-inner' 
              : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300 shadow-sm active:translate-y-0.5'
          }`}
        >
          <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-green-500 border border-black/20 shadow-sm" /> START
        </button>
        
        {/* TASKBAR WINDOW BUTTONS & TICKER */}
        <div className="flex-1 flex items-center gap-1 px-1 md:px-2 overflow-hidden h-full">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide max-w-full">
            {openWindows.map(id => (
              <div 
                key={id} 
                onClick={() => {
                  soundFx.playClick();
                  if (minimizedWindows.includes(id)) {
                    setMinimizedWindows(prev => prev.filter(w => w !== id));
                    setActiveWindow(id);
                  } else if (activeWindow === id) {
                    minimizeWindow(id);
                  } else {
                    setActiveWindow(id);
                  }
                }} 
                className={`px-2 md:px-3 py-1 border text-[9px] md:text-[10px] font-bold uppercase cursor-pointer min-w-[70px] md:min-w-[95px] text-center truncate flex items-center justify-center gap-1 transition-all rounded-sm ${
                  activeWindow === id && !minimizedWindows.includes(id) 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 font-black shadow-inner' 
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
                }`}
              >
                <span className="truncate">{id}</span>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {showTicker && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="hidden xl:flex flex-1 items-center bg-black/5 h-7 px-3 border-2 border-white/30 border-t-gray-700 border-l-gray-700 overflow-hidden mx-2 relative group min-w-[220px]"
              >
                <StatusTicker messages={statusMessages} />
                <button 
                  onClick={() => setShowTicker(false)}
                  className="absolute right-1 text-gray-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity bg-[#C0C0C0] p-0.5 border border-gray-400"
                >
                  <X size={10} strokeWidth={4} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SYSTEM TRAY (3D, CRT, AUDIO, WEATHER, CLOCK) */}
        <div className="bg-[#C0C0C0] border-2 border-gray-600 border-r-white border-b-white px-2 md:px-3 py-1 text-black text-[9px] md:text-[10px] font-bold flex items-center gap-2 whitespace-nowrap shrink-0 shadow-inner">
          {/* 3D MODE BUTTON (MOTIONSITES STYLE) */}
          <button 
            onClick={() => {
              soundFx.playClick();
              const modes = ['neural', 'grid', 'matrix', 'off'];
              const nextIndex = (modes.indexOf(threeDMode) + 1) % modes.length;
              setThreeDMode(modes[nextIndex]);
            }}
            title="Switch 3D Spatial Canvas (Neural Mesh / Cyber Horizon / Matrix / Off)"
            className="px-1.5 py-0.5 border text-[8px] font-bold uppercase cursor-pointer transition-all bg-black/80 text-green-400 border-green-500/50 hover:bg-green-600 hover:text-black shadow-sm"
          >
            3D: {threeDMode.toUpperCase()}
          </button>

          {/* CRT TOGGLE BUTTON */}
          <button 
            onClick={() => { soundFx.playClick(); setCrtEnabled(!crtEnabled); }}
            title="Toggle CRT Scanline Monitor Effect"
            className={`px-1.5 py-0.5 border text-[8px] font-bold uppercase cursor-pointer transition-all ${
              crtEnabled ? 'bg-green-700 text-white border-black' : 'bg-gray-300 text-gray-700 border-gray-400'
            }`}
          >
            CRT
          </button>

          {/* SOUND TOGGLE BUTTON */}
          <button 
            onClick={toggleAudioMute}
            title={isMuted ? "Unmute 8-Bit Audio" : "Mute Audio"}
            className="cursor-pointer hover:text-blue-700 p-0.5"
          >
            {isMuted ? <VolumeX size={13} className="text-red-600" /> : <Volume2 size={13} className="text-green-700" />}
          </button>

          <span className="opacity-30">|</span>

          {/* WEATHER */}
          <div className="hidden sm:flex items-center gap-1 text-blue-800 font-bold">
            <CloudSun size={13} /> <span>33°C</span>
          </div>

          <span className="opacity-30 hidden sm:inline">|</span>

          {/* LIVE CLOCK */}
          <span>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
}

// --- DESKTOP ICON COMPONENT ---
function DesktopIcon({ icon, label, onClick, theme }) {
  return (
    <div 
      onClick={() => { soundFx.playClick(); onClick(); }} 
      className="flex flex-col items-center cursor-pointer group w-16 md:w-20 active:scale-95 transition-transform"
    >
      <div 
        className="p-2 md:p-3.5 bg-black/40 border border-white/20 group-hover:bg-green-500/20 group-hover:border-green-400 transition-all shadow-lg" 
        style={{ color: theme.text }}
      >
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <span className="text-[7px] md:text-[9px] text-white/70 mt-1 font-bold uppercase text-center group-hover:text-white tracking-wider truncate max-w-full">
        {label}
      </span>
    </div>
  );
}

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

// --- START MENU ITEM ---
const StartItem = ({ icon, label, onClick }) => (
  <div 
    onClick={() => { soundFx.playClick(); onClick(); }} 
    className="flex items-center gap-3 px-3 py-1.5 rounded-sm hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white cursor-pointer group transition-all text-slate-900 font-bold"
  >
    <span className="group-hover:text-white transition-colors shrink-0">{icon}</span>
    <span className="text-[11px] tracking-tight group-hover:text-white truncate">{label}</span>
  </div>
);

// --- RETRO WINDOW COMPONENT ---
function Window({ title, children, onClose, onMinimize, onMaximize, isMaximized, theme }) {
  return (
    <div 
      className={`glass-window border-2 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.85)] overflow-hidden ${
        isMaximized ? 'h-full w-full' : 'h-[75vh] md:h-[530px]'
      }`} 
      style={{ 
        borderColor: theme.border, 
        minWidth: isMaximized ? 'auto' : '300px', 
        minHeight: isMaximized ? 'auto' : '220px',
        resize: isMaximized ? 'none' : 'both' 
      }}
    >
      {/* WINDOW TITLEBAR */}
      <div 
        onDoubleClick={onMaximize}
        className="bg-white/10 p-2 flex justify-between items-center border-b border-white/10 shrink-0 cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-center gap-1.5 overflow-hidden">
          <div className="w-2.5 h-2.5 bg-green-500 border border-black/30 shrink-0" />
          <span className="text-[9px] md:text-[10px] font-black px-1 text-white/90 uppercase truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button 
            onClick={onMinimize} 
            title="Minimize"
            className="p-1 hover:bg-white/20 text-white/60 hover:text-white cursor-pointer"
          >
            <Minus size={14} />
          </button>
          <button 
            onClick={onMaximize} 
            title={isMaximized ? "Restore Window" : "Maximize Window"}
            className="p-1 hover:bg-white/20 text-white/60 hover:text-white cursor-pointer"
          >
            {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button 
            onClick={onClose} 
            title="Close"
            className="p-1 hover:bg-red-600 text-white/60 hover:text-white cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* WINDOW CONTENT */}
      <div className="p-4 md:p-8 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

// --- APP: SYSTEM MONITOR / NEOFETCH ---
const SysInfoApp = () => {
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
};

// --- APP: RETRO MEDIA PLAYER (WINAMP STYLE) ---
const RetroPlayerApp = () => {
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
};

// --- APP: NOTEPAD (INTERACTIVE TEXT EDITOR) ---
const NotepadApp = () => {
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
};

// --- ABOUT APP ---
const AboutContent = () => {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(userInfo.bio.substring(0, i));
      i++; 
      if (i > userInfo.bio.length) clearInterval(interval);
    }, 12);
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
};

// --- ARCADE: SNAKE GAME WITH TOUCH CONTROLS & SFX ---
const SnakeGame = () => {
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
};

// --- PROJECTS APP ---
const ProjectList = () => (
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
);

// --- RESUME APP ---
const ResumePreview = () => (
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
);

// --- CONTACT APP ---
const ContactContent = () => {
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
};

// --- MS-DOS TERMINAL APP ---
const Terminal = ({ onOpen, onSet3DMode }) => {
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
};
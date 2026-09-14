import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, X, Terminal as TerminalIcon, Download, 
  Palette, Briefcase, Minus,
  Eye, Mail, Gamepad2, CloudSun, Github, Linkedin, FileText, ExternalLink
} from 'lucide-react';

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
  "RESUME: NEW UPDATED TECH RESUME & GENERAL CV AVAILABLE FOR DOWNLOAD",
  "HINT: CLICK 'START' TO EXPLORE ALL SYSTEM APPS",
  "PYPI: CHECK OUT 'local-persona-memory' PUBLISHED PACKAGE",
  "GUIDE: DRAG WINDOW TITLEBARS TO REARRANGE YOUR DESKTOP",
  "PRO TIP: USE THE MS-DOS TERMINAL OR TYPE 'CV' / 'DOWNLOAD'",
  "INFO: CLICK THE PALETTE ICON TO TOGGLE SYSTEM THEMES",
  "CONNECT: OPEN 'CONTACT.EXE' TO SEND AN ENCRYPTED MESSAGE"
];

const themes = {
  deepSea: { bg: '#050510', border: '#22c55e', text: '#22c55e', accent: '#3b82f6', label: 'Deep Sea' },
  matrix: { bg: '#000000', border: '#00ff41', text: '#00ff41', accent: '#008f11', label: 'Matrix' }
};

const handleDownloadResume = () => {
  const resumeUrl = "/Abhishek_Resume.pdf"; 
  const link = document.createElement("a");
  link.href = resumeUrl;
  link.download = "Abhishek_Lohar_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleDownloadCV = () => {
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
    }, 5000); 
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="text-[9px] text-gray-700 font-bold uppercase italic whitespace-nowrap"
      >
        <span className="text-blue-700 mr-2">▶</span> {messages[index]}
      </motion.span>
    </AnimatePresence>
  );
};

export default function App() {
  const [bootPhase, setBootPhase] = useState(0); 
  const [loadProgress, setLoadProgress] = useState(0);
  const [openWindows, setOpenWindows] = useState(['about']);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState('about');
  const [activeTheme, setActiveTheme] = useState('deepSea');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [showTicker, setShowTicker] = useState(true); 
  const constraintsRef = useRef(null);

  useEffect(() => {
    if (bootPhase === 0) {
      const handleKeyDown = () => setBootPhase(1);
      window.addEventListener('keydown', handleKeyDown);
      const interval = setInterval(() => {
        setLoadProgress(prev => {
          if (prev >= 100) { clearInterval(interval); setTimeout(() => setBootPhase(1), 1200); return 100; }
          return prev + 1;
        });
      }, 40);
      return () => {
        clearInterval(interval);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [bootPhase]);

  const toggleWindow = (id) => {
    if (!openWindows.includes(id)) setOpenWindows(prev => [...prev, id]);
    setMinimizedWindows(prev => prev.filter(w => w !== id));
    setActiveWindow(id);
    setStartMenuOpen(false);
  };

  const closeWindow = (id) => {
    setOpenWindows(prev => prev.filter(w => w !== id));
    setMinimizedWindows(prev => prev.filter(w => w !== id));
  };

  const minimizeWindow = (id) => {
    setMinimizedWindows(prev => [...prev, id]);
    setActiveWindow(null);
  };

  if (bootPhase === 0) return (
    <div className="h-screen w-screen bg-black font-mono flex items-center justify-center p-8 text-left">
      <div className="max-w-xl w-full space-y-4">
        <h2 className="text-2xl md:text-3xl font-black text-yellow-500 uppercase tracking-tighter mb-8 border-b-2 border-yellow-500/30 pb-2">
          AB-OS BIOS v5.01
        </h2>
        <div className="space-y-2 text-sm md:text-lg">
          <p className="text-yellow-400">CPU: <span className="text-white">Neural Engine 12-Core 4.2GHz</span></p>
          {loadProgress > 15 && <p className="text-green-500">MEMORY TEST: <span className="text-white">65536MB OK</span></p>}
          {loadProgress > 35 && <p className="text-green-500">DISK: <span className="text-white">Primary Master 2TB NVMe ... FOUND</span></p>}
          {loadProgress > 55 && <p className="text-cyan-400 font-bold">BOOTING: <span className="text-white">Abhishek_Kernel.sys ... LOADED</span></p>}
          {loadProgress > 75 && <p className="text-cyan-400">DRIVER: <span className="text-white">NVIDIA AI-Compute-Core ... OK</span></p>}
          {loadProgress > 90 && <p className="text-white animate-pulse">STARTING GRAPHICAL INTERFACE...</p>}
        </div>
        <div className="w-full border-2 border-green-900 p-1 mt-10">
          <div className="h-3 bg-gray-900 overflow-hidden">
            <motion.div className="h-full bg-green-500 shadow-[0_0_15px_#22c55e]" style={{ width: `${loadProgress}%` }} />
          </div>
        </div>
        <div className="flex justify-between items-center text-xs text-white/50 tracking-[0.3em] pt-2">
          <span>INITIALIZING: {loadProgress}%</span>
          <button onClick={() => setBootPhase(1)} className="hover:text-green-400 underline cursor-pointer normal-case tracking-normal text-[11px]">
            [Click to skip]
          </button>
        </div>
      </div>
    </div>
  );

  if (bootPhase === 1) return (
    <div className="h-screen w-screen flex items-center justify-center font-mono p-4" style={{ backgroundColor: themes[activeTheme].bg }}>
      <div className="bg-black border-2 border-white/20 p-6 md:p-10 text-center shadow-[0_0_40px_rgba(0,0,0,0.8)] max-w-sm w-full">
        <h1 className="text-3xl md:text-4xl font-black text-green-500 mb-1 italic">{userInfo.name}</h1>
        <p className="text-white/60 text-[10px] tracking-[0.2em] mb-1 uppercase">VIT-AP &bull; AI & Full-Stack</p>
        <p className="text-white/40 text-[9px] tracking-[0.4em] mb-8 uppercase">Authorized Access Only</p>
        <div className="space-y-3">
          <button onClick={() => setBootPhase(2)} className="w-full py-3.5 bg-green-600 text-black font-black uppercase text-xs hover:bg-green-400 active:scale-95 transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            Explore Portfolio &rarr;
          </button>
          <div className="grid grid-cols-2 gap-2 pt-2">
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
    <div ref={constraintsRef} className="h-screen w-screen overflow-hidden relative font-mono select-none" style={{ backgroundColor: themes[activeTheme].bg }}>
      <div className="absolute left-4 top-4 md:left-6 md:top-6 grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-6 md:gap-y-10 z-10 overflow-y-auto max-h-[80vh]">
        <DesktopIcon theme={themes[activeTheme]} icon={<User />} label="About" onClick={() => toggleWindow('about')} />
        <DesktopIcon theme={themes[activeTheme]} icon={<Briefcase />} label="Projects" onClick={() => toggleWindow('projects')} />
        <DesktopIcon theme={themes[activeTheme]} icon={<Eye />} label="Resume" onClick={() => toggleWindow('resume')} />
        <DesktopIcon theme={themes[activeTheme]} icon={<Gamepad2 />} label="Snake" onClick={() => toggleWindow('snake')} />
        <DesktopIcon theme={themes[activeTheme]} icon={<Palette />} label="Theme" onClick={() => {
            const keys = Object.keys(themes);
            const nextIndex = (keys.indexOf(activeTheme) + 1) % keys.length;
            setActiveTheme(keys[nextIndex]);
        }} />
        <DesktopIcon theme={themes[activeTheme]} icon={<Mail />} label="Contact" onClick={() => toggleWindow('contact')} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2 md:p-4 overflow-hidden">
        <AnimatePresence>
          {openWindows.map((id) => !minimizedWindows.includes(id) && (
            <motion.div key={id} 
              drag 
              dragConstraints={constraintsRef}
              dragMomentum={false}
              initial={{ scale: 0.8, opacity: 0, y: 50 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onMouseDown={() => setActiveWindow(id)}
              style={{ zIndex: activeWindow === id ? 100 : 50, position: 'absolute' }}
              className="pointer-events-auto w-full max-w-[95%] md:max-w-[650px]">
              <Window 
                theme={themes[activeTheme]} 
                title={id.toUpperCase() + ".EXE"} 
                onClose={() => closeWindow(id)}
                onMinimize={() => minimizeWindow(id)}
              >
                {id === 'about' && <AboutContent />}
                {id === 'projects' && <ProjectList />}
                {id === 'resume' && <ResumePreview />}
                {id === 'snake' && <SnakeGame />}
                {id === 'contact' && <ContactContent />}
                {id === 'terminal' && <Terminal onOpen={toggleWindow} />}
              </Window>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {startMenuOpen && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} 
            className="absolute bottom-11 left-1 w-64 bg-[#C0C0C0] border-2 border-white border-r-gray-800 border-b-gray-800 p-1 z-[200] text-black shadow-2xl">
            <div className="flex">
              <div className="bg-[#808080] w-10 flex items-center justify-center [writing-mode:vertical-lr] rotate-180 text-white font-bold py-6 text-xs uppercase tracking-widest">AB-OS 5.0</div>
              <div className="flex-1 py-1">
                <StartItem icon={<User size={16}/>} label="About Me" onClick={() => toggleWindow('about')} />
                <StartItem icon={<Briefcase size={16}/>} label="My Projects" onClick={() => toggleWindow('projects')} />
                <StartItem icon={<Eye size={16}/>} label="Resume Preview" onClick={() => toggleWindow('resume')} />
                <StartItem icon={<Gamepad2 size={16}/>} label="Entertainment" onClick={() => toggleWindow('snake')} />
                <StartItem icon={<Mail size={16}/>} label="Contact" onClick={() => toggleWindow('contact')} />
                <div className="h-[1px] bg-gray-500 my-2 mx-1 shadow-sm" />
                <StartItem icon={<FileText size={16}/>} label="Download Tech Resume" onClick={handleDownloadResume} />
                <StartItem icon={<Download size={16}/>} label="Download General CV" onClick={handleDownloadCV} />
                <div className="h-[1px] bg-gray-500 my-2 mx-1 shadow-sm" />
                <StartItem icon={<TerminalIcon size={16}/>} label="MS-DOS Terminal" onClick={() => toggleWindow('terminal')} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 w-full h-10 bg-[#C0C0C0] border-t-2 border-white flex items-center px-1 z-[250]">
        <button onClick={() => setStartMenuOpen(!startMenuOpen)} 
          className="bg-[#C0C0C0] border-2 border-white border-r-gray-800 border-b-gray-800 px-2 md:px-4 py-1 font-black text-black text-[10px] md:text-xs flex items-center gap-2 hover:bg-[#d0d0d0] active:border-gray-800 shrink-0">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-green-600 border border-black/20" /> START
        </button>
        
        <div className="flex-1 flex items-center gap-1 px-1 md:px-3 overflow-hidden h-full">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide max-w-full">
            {openWindows.map(id => (
              <div key={id} onClick={() => toggleWindow(id)} 
                className={`px-2 md:px-3 py-1 border-2 text-black text-[9px] md:text-[10px] font-bold uppercase cursor-pointer min-w-[70px] md:min-w-[90px] text-center truncate ${activeWindow === id ? 'bg-white/30 border-gray-800 border-r-white border-b-white' : 'bg-[#C0C0C0] border-white border-r-gray-800 border-b-gray-800'}`}>
                {id}
              </div>
            ))}
          </div>

          <AnimatePresence>
            {showTicker && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="hidden lg:flex flex-1 items-center bg-black/5 h-7 px-3 border-2 border-white/30 border-t-gray-700 border-l-gray-700 overflow-hidden mx-2 shadow-inner relative group min-w-[200px]"
              >
                <StatusTicker messages={statusMessages} />
                <button 
                  onClick={() => setShowTicker(false)}
                  className="absolute right-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity bg-[#C0C0C0] p-0.5 border border-gray-400"
                >
                  <X size={10} strokeWidth={4} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-[#C0C0C0] border-2 border-gray-500 border-r-white border-b-white px-2 md:px-4 py-1 text-black text-[9px] md:text-[10px] font-bold flex items-center gap-2 whitespace-nowrap shrink-0">
          <div className="hidden sm:flex items-center gap-1 text-blue-700">
            <CloudSun size={14} /> <span>33°C</span>
          </div>
          <span className="opacity-40 hidden sm:inline">|</span>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

// --- UPDATED ABOUT CONTENT ---
const AboutContent = () => {
    const [text, setText] = useState("");
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(userInfo.bio.substring(0, i));
            i++; if (i > userInfo.bio.length) clearInterval(interval);
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
                  <button onClick={handleDownloadResume} className="flex items-center justify-center gap-2 bg-green-600 text-black px-4 py-2.5 text-[10px] font-black uppercase hover:bg-green-400 transition-all">
                      <Download size={13}/> Download Tech Resume (PDF)
                  </button>
                  <button onClick={handleDownloadCV} className="flex items-center justify-center gap-2 border border-green-500 text-green-400 px-4 py-2.5 text-[10px] font-black uppercase hover:bg-green-500 hover:text-black transition-all">
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

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    useEffect(() => {
        if (gameOver) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let s = [{x:10,y:10}]; let d = {x:0,y:-1}; let f = {x:5,y:5};
        const loop = setInterval(() => {
            const h = {x:s[0].x+d.x, y:s[0].y+d.y};
            if(h.x<0||h.x>=20||h.y<0||h.y>=20) return setGameOver(true);
            s.unshift(h);
            if(h.x===f.x && h.y===f.y) { setScore(v=>v+10); f={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)}; } else s.pop();
            ctx.fillStyle='black'; ctx.fillRect(0,0,400,400); 
            ctx.fillStyle='#22c55e'; s.forEach(p=>ctx.fillRect(p.x*20,p.y*20,18,18));
            ctx.fillStyle='red'; ctx.fillRect(f.x*20,f.y*20,18,18);
        }, 200);
        const k = (e) => {
            if(e.key==='ArrowUp'&&d.y===0) d={x:0,y:-1}; if(e.key==='ArrowDown'&&d.y===0) d={x:0,y:1};
            if(e.key==='ArrowLeft'&&d.x===0) d={x:-1,y:0}; if(e.key==='ArrowRight'&&d.x===0) d={x:1,y:0};
        };
        window.addEventListener('keydown', k);
        return () => { clearInterval(loop); window.removeEventListener('keydown', k); };
    }, [gameOver]);
    return (
        <div className="flex flex-col items-center scale-90 md:scale-100">
            <div className="text-green-500 mb-2 font-bold uppercase text-[10px]">Score: {score}</div>
            <canvas ref={canvasRef} width={400} height={400} className="bg-black border border-white/10 max-w-full h-auto" />
            {gameOver && <button onClick={()=>setGameOver(false)} className="mt-4 border border-green-500 text-green-500 px-4 py-2 text-[10px]">Restart</button>}
        </div>
    );
};

function Window({ title, children, onClose, onMinimize, theme }) {
    return (
      <div className="h-[75vh] md:h-[520px] bg-[#0a0a0a] border-2 flex flex-col shadow-2xl overflow-hidden" 
        style={{ borderColor: theme.border, resize: 'both', minWidth: '300px', minHeight: '200px' }}>
        <div className="bg-white/10 p-2 flex justify-between items-center border-b border-white/10 shrink-0 cursor-grab active:cursor-grabbing">
          <span className="text-[9px] md:text-[10px] font-black px-2 text-white/80 uppercase">{title}</span>
          <div className="flex items-center gap-2">
            <Minus size={18} className="cursor-pointer text-white/40 hover:text-white" onClick={onMinimize} />
            <X size={18} className="cursor-pointer text-white/40 hover:text-white" onClick={onClose} />
          </div>
        </div>
        <div className="p-4 md:p-10 flex-1 overflow-y-auto scrollbar-hide">{children}</div>
      </div>
    );
}

function DesktopIcon({ icon, label, onClick, theme }) {
    return (
      <div onClick={onClick} className="flex flex-col items-center cursor-pointer group w-16 md:w-20">
        <div className="p-2 md:p-4 bg-white/5 border border-white/10 group-hover:bg-green-500/10 group-hover:border-green-500 transition-all" style={{ color: theme.text }}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <span className="text-[7px] md:text-[9px] text-white/40 mt-1 font-bold uppercase text-center group-hover:text-white tracking-widest">{label}</span>
      </div>
    );
}

const StartItem = ({ icon, label, onClick }) => (
    <div onClick={onClick} className="flex items-center gap-3 px-4 py-3 hover:bg-[#000080] hover:text-white cursor-pointer group">
        <span className="text-gray-600 group-hover:text-white">{icon}</span>
        <span className="text-xs font-bold tracking-tight">{label}</span>
    </div>
);

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
            <h2 className="text-3xl font-black italic text-green-500 uppercase tracking-tighter border-b border-green-500/20 pb-2">
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
                
                <button type="submit" disabled={isSending} className={`w-full py-4 text-[11px] font-black uppercase transition-all flex items-center justify-center gap-2 ${isSending ? 'bg-gray-600 cursor-wait' : 'bg-green-600 hover:bg-green-400'}`}>
                    <Mail size={14} className={isSending ? "animate-spin" : ""} /> 
                    {isSending ? "Processing..." : "Send Transmission"}
                </button>
            </form>
        </div>
    );
};

const Terminal = ({ onOpen }) => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        { text: "AB-OS [Version 5.0.112]", type: "info" },
        { text: "Type 'help' for a list of available commands.", type: "info" }
    ]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.toLowerCase().trim();
            const newHistory = [...history, { text: `C:\\USERS\\ABHISHEK> ${input}`, type: "user" }];
            switch (cmd) {
                case 'help':
                    newHistory.push({ text: "AVAILABLE COMMANDS:", type: "info" });
                    newHistory.push({ text: "> ABOUT, PROJECTS, RESUME, CV, DOWNLOAD, SNAKE, CONTACT, CLS", type: "cmd" });
                    newHistory.push({ text: "> TIP: Type 'CV' or 'DOWNLOAD' to download PDF documents directly.", type: "info" });
                    break;
                case 'cls': setHistory([]); setInput(""); return;
                case 'about': case 'projects': case 'resume': case 'snake': case 'contact':
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
                    newHistory.push({ text: `'${cmd}' is not recognized. Type 'help' for commands.`, type: "error" });
            }
            setHistory(newHistory); setInput("");
        }
    };

    return (
        <div className="flex flex-col h-full font-mono text-xs md:text-sm bg-black/50 p-2">
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 mb-2">
                {history.map((line, i) => (
                    <div key={i} className={`${line.type === 'error' ? 'text-red-500' : line.type === 'success' ? 'text-cyan-400' : line.type === 'info' ? 'text-green-500/80' : 'text-white'}`}>{line.text}</div>
                ))}
            </div>
            <div className="flex items-center gap-2 text-green-500 border-t border-green-500/20 pt-2">
                <span>C:\&gt;</span>
                <input autoFocus type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} className="bg-transparent border-none outline-none flex-1 text-white uppercase" />
            </div>
        </div>
    );
};

const ResumePreview = () => (
    <div className="text-white space-y-6">
        {/* Quick Download Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/5 border border-green-500/30">
          <div>
            <div className="text-xs font-black text-green-400 uppercase tracking-wider">Download Verified Documents</div>
            <div className="text-[9px] text-white/50">ATS-compliant PDF formats matching updated resume & industry CV</div>
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
                <span className="text-green-400 font-bold uppercase">Tools & Frameworks: </span>
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

        {/* Certifications & Achievements */}
        <section>
            <h2 className="text-green-500 font-black text-lg border-b border-white/20 mb-3">CERTIFICATIONS & ACHIEVEMENTS</h2>
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
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, X, Terminal as TerminalIcon, Download, 
  Palette, Briefcase, Minus,
  Eye, Mail, Gamepad2, CloudSun
} from 'lucide-react';

const userInfo = {
  name: "ABHISHEK LOHAR",
  fullName: "Abhishek Lohar",
  bio: "HI, I am Abhishek.I am highly motivated Computer Science and Engineering student at VIT-AP with a strong focus on Artificial Intelligence and Deep Learning. Passionate about leveraging technology to build innovative solutions, with hands-on experience in full-stack development and hardware-software integration.",
  projects: [
    { 
        title: "Real-Time Web Data Reader Extension", 
        tech: "JavaScript, Chrome API, HTML/CSS", 
        desc: "Developed a Chrome extension to parse and extract real-time data from active web pages. Optimized DOM manipulation for low-latency performance." 
    },
    { 
        title: "Autonomous AI Research Assistant", 
        tech: "Python, Generative AI, NLP", 
        desc: "Built a specialized AI agent capable of synthesizing complex research papers into structured summaries using LLMs." 
    },
    { 
        title: "Smart Attendance Face Recognition", 
        tech: "Raspberry Pi, Python, OpenCV", 
        desc: "Designed a hardware-integrated system for real-time biometric identification, achieving 95%+ recognition accuracy." 
    }
  ]
};

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

export default function App() {
  const [bootPhase, setBootPhase] = useState(0); 
  const [loadProgress, setLoadProgress] = useState(0);
  const [openWindows, setOpenWindows] = useState(['about']);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState('about');
  const [activeTheme, setActiveTheme] = useState('deepSea');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const constraintsRef = useRef(null);

  useEffect(() => {
    if (bootPhase === 0) {
      const interval = setInterval(() => {
        setLoadProgress(prev => {
          if (prev >= 100) { clearInterval(interval); setTimeout(() => setBootPhase(1), 1200); return 100; }
          return prev + 1;
        });
      }, 40);
      return () => clearInterval(interval);
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
        <p className="text-xs text-white/50 tracking-[0.8em] text-center">INITIALIZING: {loadProgress}%</p>
      </div>
    </div>
  );

  if (bootPhase === 1) return (
    <div className="h-screen w-screen flex items-center justify-center font-mono p-4" style={{ backgroundColor: themes[activeTheme].bg }}>
      <div className="bg-black border-2 border-white/20 p-6 md:p-10 text-center shadow-[0_0_40px_rgba(0,0,0,0.8)] max-w-sm w-full">
        <h1 className="text-3xl md:text-4xl font-black text-green-500 mb-2 italic">{userInfo.name}</h1>
        <p className="text-white/40 text-[10px] tracking-[0.4em] mb-12 uppercase">Authorized Access Only</p>
        <div className="space-y-4">
          <button onClick={() => setBootPhase(2)} className="w-full py-4 bg-green-600 text-black font-black uppercase text-xs hover:bg-green-400 active:scale-95 transition-all">Explore Portfolio</button>
          <button onClick={handleDownloadResume} className="w-full py-4 border border-white/20 text-white font-bold uppercase text-xs hover:bg-white hover:text-black active:scale-95 transition-all">Download CV</button>
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
                <StartItem icon={<Gamepad2 size={16}/>} label="Entertainment" onClick={() => toggleWindow('snake')} />
                <StartItem icon={<Mail size={16}/>} label="Contact" onClick={() => toggleWindow('contact')} />
                <div className="h-[1px] bg-gray-500 my-2 mx-1 shadow-sm" />
                <StartItem icon={<TerminalIcon size={16}/>} label="MS-DOS Terminal" onClick={() => toggleWindow('terminal')} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 w-full h-10 bg-[#C0C0C0] border-t-2 border-white flex items-center px-1 z-[250]">
        <button onClick={() => setStartMenuOpen(!startMenuOpen)} 
          className="bg-[#C0C0C0] border-2 border-white border-r-gray-800 border-b-gray-800 px-2 md:px-4 py-1 font-black text-black text-[10px] md:text-xs flex items-center gap-2 hover:bg-[#d0d0d0] active:border-gray-800">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-green-600 border border-black/20" /> START
        </button>
        <div className="flex-1 flex gap-1 px-1 md:px-3 overflow-x-auto scrollbar-hide">
          {openWindows.map(id => (
            <div key={id} onClick={() => toggleWindow(id)} 
              className={`px-2 md:px-3 py-1 border-2 text-black text-[9px] md:text-[10px] font-bold uppercase cursor-pointer min-w-[70px] md:min-w-[90px] text-center truncate ${activeWindow === id ? 'bg-white/30 border-gray-800 border-r-white border-b-white' : 'bg-[#C0C0C0] border-white border-r-gray-800 border-b-gray-800'}`}>
              {id}
            </div>
          ))}
        </div>
        <div className="bg-[#C0C0C0] border-2 border-gray-500 border-r-white border-b-white px-2 md:px-4 py-1 text-black text-[9px] md:text-[10px] font-bold flex items-center gap-2 whitespace-nowrap">
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

const AboutContent = () => {
    const [text, setText] = useState("");
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(userInfo.bio.substring(0, i));
            i++; if (i > userInfo.bio.length) clearInterval(interval);
        }, 15);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-5xl font-black italic text-green-500 uppercase tracking-tighter">ABHISHEK LOHAR</h2>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed border-l-2 border-green-500/30 pl-4 italic min-h-[80px]">{text}</p>
            <div className="pt-4">
                <button onClick={handleDownloadResume} className="flex items-center gap-2 bg-green-600 text-black px-6 py-3 text-[10px] font-black uppercase hover:bg-green-400 transition-all">
                    <Download size={14}/> Download Resume
                </button>
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
            <div key={i} className="border border-white/10 bg-white/5 p-4 hover:border-green-500 transition-all cursor-pointer">
                <h3 className="text-green-400 font-bold uppercase text-xs mb-1">{p.title}</h3>
                <p className="text-[10px] text-white/60">{p.desc}</p>
                <div className="text-[8px] text-green-300/50 font-bold mt-2 uppercase tracking-widest">[{p.tech}]</div>
            </div>
        ))}
    </div>
);

const ContactContent = () => {
    const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
    const [isSent, setIsSent] = useState(false);
    const [isSending, setIsSending] = useState(false);
    
    const validateContact = (value) => {
        // Regex for basic Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Regex for Phone (accepts digits, spaces, and '+' prefix, 10-15 digits)
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

    // Data package to send
    const templateParams = {
        name: formData.name,
        phone: formData.contact,
        message: formData.message,
    };

    try {
        // This sends BOTH emails simultaneously
        await Promise.all([
            // 1. Email to YOU
            emailjs.send(serviceID, adminTemplateID, templateParams, publicKey),
            
            // 2. Confirmation email to the USER (only works if they provided an email)
            // We check if it looks like an email before trying to send
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
                        NOTIFY: Message transmitted successfully to Abhishek's uplink.
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSend} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[10px] text-green-500/70 uppercase font-bold">Identity Name</label>
                    <input 
                        required 
                        type="text" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        className="w-full bg-black border border-white/20 p-3 text-xs text-white outline-none focus:border-green-500 transition-colors" 
                        placeholder="ENTER NAME..." 
                    />
                </div>
                
                <div className="space-y-1">
                    <label className="text-[10px] text-green-500/70 uppercase font-bold">Contact Method (Email / Phone)</label>
                    <input 
                        required 
                        type="text" 
                        value={formData.contact} 
                        onChange={(e) => setFormData({...formData, contact: e.target.value})} 
                        className="w-full bg-black border border-white/20 p-3 text-xs text-white outline-none focus:border-green-500 transition-colors" 
                        placeholder="GMAIL OR PHONE NUMBER..." 
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] text-green-500/70 uppercase font-bold">Encrypted Message</label>
                    <textarea 
                        required 
                        value={formData.message} 
                        onChange={(e) => setFormData({...formData, message: e.target.value})} 
                        className="w-full bg-black border border-white/20 p-3 text-xs text-white outline-none focus:border-green-500 transition-colors h-24 resize-none" 
                        placeholder="TYPE MESSAGE HERE..." 
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isSending}
                    className={`w-full py-4 text-[11px] font-black uppercase transition-all flex items-center justify-center gap-2 ${isSending ? 'bg-gray-600 cursor-wait' : 'bg-green-600 hover:bg-green-400 active:scale-[0.98]'}`}
                >
                    <Mail size={14} className={isSending ? "animate-spin" : ""} /> 
                    {isSending ? "Processing..." : "Send Transmission"}
                </button>
            </form>
            <div className="pt-4 border-t border-white/10 opacity-40 text-[9px] uppercase tracking-[0.2em]">Status: Encrypted Peer-to-Peer Protocol Active</div>
        </div>
    );
};

const Terminal = ({ onOpen }) => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        { text: "AB-OS [Version 5.0.112]", type: "info" },
        { text: "Type 'help' for a list of available commands.", type: "info" },
        { text: "", type: "info" }
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
                    newHistory.push({ text: "> ABOUT - Open biography", type: "cmd" });
                    newHistory.push({ text: "> PROJECTS - Open portfolio", type: "cmd" });
                    newHistory.push({ text: "> RESUME - View CV", type: "cmd" });
                    newHistory.push({ text: "> SNAKE - Launch entertainment", type: "cmd" });
                    newHistory.push({ text: "> CONTACT - Open transmission form", type: "cmd" });
                    newHistory.push({ text: "> THEMES - Cycle system colors", type: "cmd" });
                    newHistory.push({ text: "> CLS - Clear terminal screen", type: "cmd" });
                    break;
                case 'about':
                case 'projects':
                case 'resume':
                case 'snake':
                case 'contact':
                    // Safe check for onOpen prop
                    if (typeof onOpen === 'function') {
                      onOpen(cmd); 
                      newHistory.push({ text: `EXECUTING ${cmd.toUpperCase()}.EXE...`, type: "success" });
                    } else {
                      newHistory.push({ text: `SYSTEM ERROR: Unable to launch ${cmd}.EXE`, type: "error" });
                    }
                    break;
                case 'themes':
                    newHistory.push({ text: "THEME CYCLE INITIATED. CLICK THEME ICON ON DESKTOP.", type: "info" });
                    break;
                case 'cls':
                    setHistory([]); setInput(""); return;
                case '': break;
                default:
                    newHistory.push({ text: `'${cmd}' is not recognized as an internal or external command.`, type: "error" });
            }
            setHistory(newHistory); setInput("");
        }
    };

    return (
        <div className="flex flex-col h-full font-mono text-xs md:text-sm bg-black/50 p-2 rounded">
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 mb-2 scrollbar-hide">
                {history.map((line, i) => (
                    <div key={i} className={`
                        ${line.type === 'error' ? 'text-red-500' : ''}
                        ${line.type === 'success' ? 'text-cyan-400' : ''}
                        ${line.type === 'cmd' ? 'text-yellow-500 ml-2' : ''}
                        ${line.type === 'info' ? 'text-green-500/80' : 'text-white'}
                    `}>{line.text}</div>
                ))}
            </div>
            <div className="flex items-center gap-2 text-green-500 border-t border-green-500/20 pt-2">
                <span className="shrink-0">C:\&gt;</span>
                <input autoFocus type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} className="bg-transparent border-none outline-none flex-1 text-white uppercase" spellCheck="false" />
            </div>
        </div>
    );
};

const ResumePreview = () => (
    <div className="text-white space-y-6">
        <section>
            <h2 className="text-green-500 font-black text-xl border-b border-white/20 mb-2">EDUCATION</h2>
            <div className="mb-2">
                <p className="font-bold">Vellore Institute of Technology-AP</p>
                <p className="text-xs text-white/60 italic">B.Tech in Computer Science and Engineering | 2023 - Present</p>
                <p className="text-xs text-green-400">CGPA: 8.44 (Present)</p>
            </div>
            <div>
                <p className="font-bold text-xs">Vidya Bharati Chinmaya Vidyalaya - CBSE</p>
                <p className="text-[10px] text-white/40 italic">Higher Secondary (2022) | Secondary (2020)</p>
            </div>
        </section>

        <section>
            <h2 className="text-green-500 font-black text-xl border-b border-white/20 mb-2">SKILLS</h2>
            <div className="flex flex-wrap gap-2 text-[10px]">
                {["Java", "Python", "Development", "MathLab", "AI/DL", "Leadership", "OpenSource"].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-white/10 border border-white/20">{skill}</span>
                ))}
            </div>
        </section>

        <section>
            <h2 className="text-green-500 font-black text-xl border-b border-white/20 mb-2">CERTIFICATIONS</h2>
            <ul className="text-xs list-disc pl-4 space-y-1 opacity-80">
                <li>Coursera Web Development</li>
                <li>Oracle Generative AI Professional</li>
                <li>HPC by IANEO</li>
                <li>Engineer Clinics 2025 Finalist</li>
            </ul>
        </section>
    </div>
);
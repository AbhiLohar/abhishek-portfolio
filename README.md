# 💾 AB-OS v5.1 — Abhishek Lohar's Portfolio

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-EA4C89?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Web Audio API](https://img.shields.io/badge/Audio-8--Bit_WebAudio-orange?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![PyPI Package](https://img.shields.io/badge/PyPI-local--persona--memory-blue?style=flat-square&logo=pypi&logoColor=white)](https://pypi.org/project/local-persona-memory/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> An interactive, retro desktop operating system simulator built with React, Framer Motion, Tailwind CSS, and Web Audio API. Showcasing software engineering projects, AI/ML research, technical skills, and credentials in an authentic retro terminal and Windows 95/DOS aesthetic.

---

## 🌟 Features

- **⚡ BIOS Boot Diagnostics & Instant Skip**: Authentic memory tests, NVMe drive detection, and authorization screen with a 1-click `[Click to skip]` option.
- **🔊 8-Bit Web Audio Synthesizer**: Native in-browser synthesized sound effects (boot chime, window open/close whooshes, click blips, arcade snake chimes) with a quick mute toggle `[🔊/🔇]` in the taskbar.
- **📺 CRT Monitor & Scanline Overlay**: Toggleable vintage cathode-ray tube screen curvature, phosphor scanlines, and bloom effects `[CRT ON/OFF]`.
- **🗖 Window Manager with Maximize/Restore**: Draggable, minimizable, and maximizable windows. Double-clicking any window titlebar toggles fullscreen maximize!
- **🖱️ Desktop Right-Click Context Menu**: Right-clicking the desktop opens a retro OS menu to switch themes, toggle CRT, toggle audio, or quickly launch tools.
- **🖥️ System Diagnostics & Neofetch (`SysInfo.exe`)**: Live animated CPU load and RAM gauges, real-time session uptime counter, system architecture specs, and ASCII logo.
- **🎵 Retro Media Player (`RetroPlayer.exe`)**: WinAmp-inspired media player featuring an 8-column animated audio equalizer and ambient 8-bit chip-tune melodies.
- **📝 Notepad (`Notepad.exe`)**: Classic text editor with menu bar, preloaded with `README.TXT` and a persistent `SCRATCHPAD.TXT` that saves notes to `localStorage`.
- **🎮 Arcade Snake with Mobile Touch D-Pad**: Playable with arrow keys on desktop or virtual on-screen D-Pad buttons on smartphones/tablets, complete with persistent high scores.
- **📄 Dual Downloadable Documents (ATS-Ready PDFs)**:
  - **Technical Resume (`Abhishek_Resume.pdf`)**: Specialized engineering resume with academic performance (VIT-AP, CGPA 8.33), published packages, and AI/ML stack.
  - **General Company CV (`Abhishek_General_CV.pdf`)**: Universal, ATS-optimized curriculum vitae targeted for Software Engineering, Backend, Distributed Systems, and Full-Stack roles.
- **🚀 Featured Engineering Projects**:
  - **`local-persona-memory`** — Published open-source Python package on PyPI (`pip install local-persona-memory`) giving local LLMs long-term memory with ChromaDB, RAG, and 160 passing tests.
  - **`URL Shortener & Analytics Platform`** — Microservices backend built with FastAPI, Redis caching, Apache Kafka event streaming, and PostgreSQL.
  - **`Smart Attendance Face Recognition System`** — Edge biometric attendance appliance utilizing Raspberry Pi and OpenCV computer vision.
- **💻 MS-DOS Command-Line Terminal**: Expanded simulated shell supporting `help`, `neofetch`, `matrix`, `date`, `whoami`, `beep`, `about`, `projects`, `resume`, `cv`, `download`, `snake`, `contact`, and `cls`.
- **🎨 4 Retro Themes**: Instant palette toggling between **Deep Sea**, **Matrix Terminal**, **Cyberpunk Amber**, and **Windows 95 Classic Silver/Teal**.
- **📬 Secure Transmission Contact Form**: Integrated with EmailJS for automated messaging and sender confirmations.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, JavaScript (ES6+), HTML5 Canvas |
| **Styling & UI** | Tailwind CSS, Lucide React Icons, CRT Shaders |
| **Audio Engine** | Web Audio API (Native 8-bit synthesizer, zero external assets) |
| **Motion & Physics** | Framer Motion (Draggable windows, transitions, ticker animations) |
| **Email Service** | EmailJS Browser SDK |
| **Document Generation** | Python 3, ReportLab (Vector-crisp, ATS-compliant PDF generation) |

---

## 📁 Project Structure

```text
abhishek-portfolio/
├── public/
│   ├── Abhishek_Resume.pdf       # Downloadable Technical Resume
│   ├── Abhishek_General_CV.pdf   # Downloadable General Company CV
│   ├── favicon.ico
│   ├── index.html                # Custom SEO & branding meta tags
│   └── manifest.json
├── scripts/
│   └── generate_resumes.py       # Python script using ReportLab to build both PDFs
├── src/
│   ├── utils/
│   │   └── audio.js              # Web Audio API 8-bit sound effects & chip-tune synth
│   ├── App.css
│   ├── App.js                   # Main AB-OS Desktop Shell, Apps & Window System
│   ├── App.test.js              # Test suite
│   ├── index.css                # Global styles, CRT scanlines & retro scrollbars
│   └── index.js
├── .env.example                 # Template for environment variables
├── .gitignore                   # Ignores sensitive keys & build artifacts
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Python 3.10+ (optional, for regenerating resume PDFs)

### 1. Clone the repository
```bash
git clone https://github.com/AbhiLohar/abhishek-portfolio.git
cd abhishek-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_admin_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
REACT_APP_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_user_template_id
```

### 4. Run the development server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio in your browser.

### 5. (Optional) Regenerate Resume PDFs
If you update your credentials or projects, compile fresh PDFs using:
```bash
python scripts/generate_resumes.py
```

---

## 👨‍💻 Author

**Abhishek Lohar**  
*Computer Science and Engineering Student, Vellore Institute of Technology-AP*  
*Specialization:* AI & Deep Learning, Distributed Systems, Full-Stack Development

- **GitHub:** [@AbhiLohar](https://github.com/AbhiLohar)
- **LinkedIn:** [Abhishek Lohar](https://linkedin.com/in/abhishek-lohar-216099350/)
- **PyPI Package:** [local-persona-memory](https://pypi.org/project/local-persona-memory/)
- **Email:** [abhisheklohar0509@gmail.com](mailto:abhisheklohar0509@gmail.com) | [abhishek.23bce7356@vitapstudent.ac.in](mailto:abhishek.23bce7356@vitapstudent.ac.in)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

# 💾 AB-OS v5.0 — Abhishek Lohar's Portfolio

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-EA4C89?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![PyPI Package](https://img.shields.io/badge/PyPI-local--persona--memory-blue?style=flat-square&logo=pypi&logoColor=white)](https://pypi.org/project/local-persona-memory/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> An interactive, retro desktop operating system simulator built with React, Framer Motion, and Tailwind CSS. Showcasing software engineering projects, AI/ML research, technical skills, and credentials in an authentic retro terminal and Windows 95/DOS aesthetic.

---

## 🌟 Features

- **⚡ BIOS Boot Sequence & Lock Screen**: Authentic retro memory testing, disk mounting diagnostics, and authorization gate with an instant `[Click to skip]` option.
- **🗂️ Interactive Window Manager**: Physics-based draggable windows with minimize, close, active window focus, and responsive viewport bounding.
- **📄 Dual Downloadable Documents (ATS-Ready PDFs)**:
  - **Technical Resume (`Abhishek_Resume.pdf`)**: Specialized engineering resume highlighting academic performance (VIT-AP, CGPA 8.33), published packages, and AI/ML stack.
  - **General Company CV (`Abhishek_General_CV.pdf`)**: Universal, ATS-optimized curriculum vitae targeted for Software Engineering, Backend, Distributed Systems, and Full-Stack roles.
- **🚀 Featured Engineering Projects**:
  - **`local-persona-memory`** — Published open-source Python package on PyPI (`pip install local-persona-memory`) giving local LLMs long-term memory with ChromaDB, RAG, and 160 passing tests.
  - **`URL Shortener & Analytics Platform`** — Microservices backend built with FastAPI, Redis caching, Apache Kafka event streaming, and PostgreSQL.
  - **`Smart Attendance Face Recognition System`** — Edge biometric attendance appliance utilizing Raspberry Pi and OpenCV computer vision.
- **💻 MS-DOS Command-Line Terminal**: Simulated command prompt accepting commands like `help`, `about`, `projects`, `resume`, `cv`, `download`, `snake`, `contact`, and `cls`.
- **🎮 Built-In Arcade (Snake Game)**: Interactive Canvas-based Snake game with live scoring and restart capabilities.
- **🎨 Theme Engine**: Instant palette toggling between **Deep Sea** (cyberpunk blue/emerald) and **Matrix** (classic terminal monochrome green).
- **📬 Secure Transmission Contact Form**: Integrated with EmailJS for automated messaging and sender confirmations.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, JavaScript (ES6+), HTML5 Canvas |
| **Styling & UI** | Tailwind CSS, Lucide React Icons |
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
│   ├── App.css
│   ├── App.js                   # Main AB-OS Desktop Shell, Apps & Window System
│   ├── App.test.js              # Test suite
│   ├── index.css                # Global styles & Tailwind directives
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

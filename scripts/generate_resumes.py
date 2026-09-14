import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public")

def build_technical_resume():
    """Builds Abhishek_Resume.pdf matching the exact layout and content of the user's updated resume."""
    pdf_path = os.path.join(PUBLIC_DIR, "Abhishek_Resume.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=30,
        bottomMargin=28
    )

    styles = getSampleStyleSheet()
    
    NAVY = colors.HexColor("#111827")
    DARK_GRAY = colors.HexColor("#374151")
    LINE_COLOR = colors.HexColor("#1F2937")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        alignment=1,
        textColor=NAVY
    )

    contact_style = ParagraphStyle(
        'ContactLine',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        alignment=1,
        textColor=DARK_GRAY
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=11.5,
        textColor=NAVY,
        textTransform='uppercase'
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.3,
        leading=11.2,
        textColor=DARK_GRAY
    )

    bold_label_style = ParagraphStyle(
        'BoldLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.3,
        leading=11.2,
        textColor=NAVY
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.3,
        leading=11.0,
        textColor=DARK_GRAY,
        leftIndent=12,
        firstLineIndent=-8
    )

    def section_header(title):
        return [
            Spacer(1, 4),
            Paragraph(title, section_heading_style),
            HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceBefore=1.5, spaceAfter=3),
        ]

    story = []

    # --- HEADER ---
    story.append(Paragraph("<b>Abhishek Lohar</b>", title_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "+91 9341852194 &nbsp;|&nbsp; "
        '<a href="mailto:abhishek.23bce7356@vitapstudent.ac.in" color="#1d4ed8">abhishek.23bce7356@vitapstudent.ac.in</a> &nbsp;|&nbsp; '
        '<a href="mailto:abhisheklohar0509@gmail.com" color="#1d4ed8">abhisheklohar0509@gmail.com</a>',
        contact_style
    ))
    story.append(Paragraph(
        'Jamshedpur, Jharkhand-831004 &nbsp;|&nbsp; '
        '<a href="https://github.com/AbhiLohar" color="#1d4ed8"><b>GitHub:</b> github.com/AbhiLohar</a> &nbsp;|&nbsp; '
        '<a href="https://linkedin.com/in/abhishek-lohar-216099350/" color="#1d4ed8"><b>LinkedIn:</b> linkedin.com/in/abhishek-lohar-216099350</a>',
        contact_style
    ))
    story.append(Spacer(1, 3))

    # --- PROFILE ---
    story.extend(section_header("PROFILE"))
    story.append(Paragraph(
        "Highly motivated Computer Science and Engineering student at VIT-AP with a strong focus on Artificial Intelligence "
        "and Deep Learning. Passionate about leveraging technology to build innovative solutions, with hands-on experience "
        "in full-stack development and hardware-software integration.",
        body_style
    ))
    story.append(Spacer(1, 1))

    # --- EDUCATION ---
    story.extend(section_header("EDUCATION"))
    edu_table_data = [
        [
            Paragraph("<b>Vellore Institute of Technology-AP</b>", bold_label_style),
            Paragraph("<font color='#374151'>Amaravati, AP</font>", ParagraphStyle('R1', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<i>B.Tech in Computer Science and Engineering</i>", body_style),
            Paragraph("<font color='#374151'>2023 &ndash; 2027</font>", ParagraphStyle('R2', parent=body_style, alignment=2))
        ],
        [
            Paragraph("&bull; Current CGPA: <b>8.33</b>", bullet_style),
            Paragraph("", body_style)
        ],
        [
            Paragraph("<b>Vidya Bharati Chinmaya Vidyalaya (CBSE)</b>", bold_label_style),
            Paragraph("<font color='#374151'>Jamshedpur, JH</font>", ParagraphStyle('R3', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<i>Higher Secondary Education (Class XII)</i>", body_style),
            Paragraph("<font color='#374151'>2022</font>", ParagraphStyle('R4', parent=body_style, alignment=2))
        ],
        [
            Paragraph("&bull; Percentage: <b>79.8%</b>", bullet_style),
            Paragraph("", body_style)
        ]
    ]
    t_edu = Table(edu_table_data, colWidths=[380, 160])
    t_edu.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu)
    story.append(Spacer(1, 1))

    # --- TECHNICAL SKILLS ---
    story.extend(section_header("TECHNICAL SKILLS"))
    skills_data = [
        [Paragraph("<b>Languages:</b>", bold_label_style), Paragraph("Java, Python, SQL, C++, HTML/CSS, JavaScript", body_style)],
        [Paragraph("<b>AI/ML Stack:</b>", bold_label_style), Paragraph("Ollama, LangChain, ChromaDB, RAG, Embeddings, LLMs, OpenCV, Data Science", body_style)],
        [Paragraph("<b>Tools & Frameworks:</b>", bold_label_style), Paragraph("Raspberry Pi, Chrome Extension API, PyPI, pytest, Git, OpenSource Development", body_style)],
        [Paragraph("<b>Soft Skills:</b>", bold_label_style), Paragraph("Leadership, Creative Thinking, Problem Solving", body_style)],
    ]
    t_skills = Table(skills_data, colWidths=[120, 420])
    t_skills.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 1))

    # --- PROJECTS ---
    story.extend(section_header("PROJECTS"))
    
    # Project 1
    p1_title = "<b>local-persona-memory &mdash; Published PyPI Package</b> | <i>Python, Ollama, ChromaDB, LangChain, RAG</i>"
    story.append(Paragraph(p1_title, bold_label_style))
    story.append(Paragraph(
        "&bull; Published production-grade open-source Python package on PyPI &mdash; installable worldwide via "
        "<code>pip install local-persona-memory</code> &mdash; giving any local LLM permanent long-term memory with zero cloud dependency.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Built full RAG pipeline with ChromaDB vector storage, PDF ingestion, semantic search, conversation history, "
        "export/import, and callback hooks. Shipped with 160 passing tests and GitHub Actions CI/CD.",
        bullet_style
    ))
    story.append(Spacer(1, 2.5))

    # Project 2
    p2_title = "<b>URL Shortener & Analytics Platform</b> | <i>Python, FastAPI, PostgreSQL, Redis, Kafka</i>"
    story.append(Paragraph(p2_title, bold_label_style))
    story.append(Paragraph(
        "&bull; Built a microservices-based URL shortener with separate Shorten, Redirect, and Analytics services behind an API "
        "gateway to practice service decomposition.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Used PostgreSQL for persistent URL mappings and Redis caching in front of the Redirect service; Kafka streams "
        "click events asynchronously to Analytics.",
        bullet_style
    ))
    story.append(Spacer(1, 2.5))

    # Project 3
    p3_title = "<b>Smart Attendance Face Recognition System</b> | <i>Raspberry Pi, Python, OpenCV</i>"
    story.append(Paragraph(p3_title, bold_label_style))
    story.append(Paragraph(
        "&bull; Designed a hardware-software integrated project using Raspberry Pi for real-time biometric identification.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Utilized OpenCV libraries for facial detection and recognition to automate attendance tracking logs.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Engineered an end-to-end pipeline from image capture to database logging, ensuring 95%+ recognition accuracy.",
        bullet_style
    ))
    story.append(Spacer(1, 1))

    # --- CERTIFICATIONS & ACHIEVEMENTS ---
    story.extend(section_header("CERTIFICATIONS & ACHIEVEMENTS"))
    certs = [
        "&bull; <b>Oracle Cloud Infrastructure (OCI) Certified AI Foundations Associate</b>",
        "&bull; <b>Coursera Full Stack Web Development</b>",
        "&bull; <b>Infosys Springboard &mdash; Introduction to Data Science</b> (May 2026)",
        "&bull; <b>Hashgraph Developer Course</b>",
        "&bull; <b>High-Performance Coding (HPC) Certification</b> by IAMNEO",
        "&bull; <b>Finalist in Engineering Clinics (2025)</b>",
        "&bull; <b>Hack2Skill GDG (Google Developer Groups) Hackathons</b> at VIT-AP"
    ]
    for c in certs:
        story.append(Paragraph(c, bullet_style))
    story.append(Spacer(1, 1))

    # --- LANGUAGES ---
    story.extend(section_header("LANGUAGES"))
    story.append(Paragraph("<b>Hindi</b> (Native), <b>English</b> (Professional)", body_style))

    doc.build(story)
    print(f"Generated {pdf_path}")


def build_general_cv():
    """Builds Abhishek_General_CV.pdf: an ATS-optimized, high-impact CV applicable for all tech companies."""
    pdf_path = os.path.join(PUBLIC_DIR, "Abhishek_General_CV.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=28,
        bottomMargin=26
    )

    styles = getSampleStyleSheet()
    PRIMARY = colors.HexColor("#0F172A")
    ACCENT = colors.HexColor("#1E40AF")
    TEXT_COLOR = colors.HexColor("#334155")

    title_style = ParagraphStyle(
        'CVTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        alignment=1,
        textColor=PRIMARY
    )

    subtitle_style = ParagraphStyle(
        'CVSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        alignment=1,
        textColor=ACCENT
    )

    contact_style = ParagraphStyle(
        'CVContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.3,
        leading=11,
        alignment=1,
        textColor=TEXT_COLOR
    )

    section_heading_style = ParagraphStyle(
        'CVSectionHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=11.5,
        textColor=PRIMARY,
        textTransform='uppercase'
    )

    body_style = ParagraphStyle(
        'CVBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.0,
        textColor=TEXT_COLOR
    )

    bold_label = ParagraphStyle(
        'CVBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=11.0,
        textColor=PRIMARY
    )

    bullet_style = ParagraphStyle(
        'CVBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.0,
        textColor=TEXT_COLOR,
        leftIndent=12,
        firstLineIndent=-8
    )

    def section_header(title):
        return [
            Spacer(1, 3.5),
            Paragraph(f"<b>{title}</b>", section_heading_style),
            HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#94A3B8"), spaceBefore=1.5, spaceAfter=3),
        ]

    story = []

    # Header
    story.append(Paragraph("<b>ABHISHEK LOHAR</b>", title_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph("SOFTWARE DEVELOPMENT &bull; AI/ML SYSTEMS &bull; FULL-STACK &bull; BACKEND ARCHITECTURE", subtitle_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "+91 9341852194 &nbsp;|&nbsp; "
        '<a href="mailto:abhishek.23bce7356@vitapstudent.ac.in" color="#1e40af">abhishek.23bce7356@vitapstudent.ac.in</a> &nbsp;|&nbsp; '
        '<a href="mailto:abhisheklohar0509@gmail.com" color="#1e40af">abhisheklohar0509@gmail.com</a>',
        contact_style
    ))
    story.append(Paragraph(
        'Jamshedpur, Jharkhand &nbsp;|&nbsp; '
        '<a href="https://github.com/AbhiLohar" color="#1e40af"><b>GitHub:</b> github.com/AbhiLohar</a> &nbsp;|&nbsp; '
        '<a href="https://linkedin.com/in/abhishek-lohar-216099350/" color="#1e40af"><b>LinkedIn:</b> linkedin.com/in/abhishek-lohar-216099350</a>',
        contact_style
    ))
    story.append(Spacer(1, 2))

    # Executive Summary
    story.extend(section_header("PROFESSIONAL SUMMARY"))
    story.append(Paragraph(
        "Innovative and results-driven Computer Science student at VIT-AP (CGPA: 8.33) with comprehensive expertise spanning "
        "<b>production software engineering, distributed backend systems, AI/ML pipelines, and full-stack development</b>. "
        "Author of a published open-source PyPI package with 160 unit/integration tests and automated CI/CD pipelines. Demonstrated ability to "
        "engineer low-latency architectures with Redis, Kafka, and FastAPI, alongside edge computer vision with OpenCV and Raspberry Pi. "
        "Adept in algorithmic problem-solving, clean code design, and cross-functional team delivery.",
        body_style
    ))
    story.append(Spacer(1, 1))

    # Technical Skills
    story.extend(section_header("CORE TECHNICAL COMPETENCIES"))
    skills_data = [
        [Paragraph("<b>Programming Languages:</b>", bold_label), Paragraph("Java, Python, C++, SQL (PostgreSQL), JavaScript, HTML5/CSS3", body_style)],
        [Paragraph("<b>Backend & Distributed Systems:</b>", bold_label), Paragraph("FastAPI, RESTful APIs, Microservices, Redis (Caching), Apache Kafka, API Gateway", body_style)],
        [Paragraph("<b>AI, ML & Vector Search:</b>", bold_label), Paragraph("Ollama, LangChain, ChromaDB, RAG Pipelines, Semantic Search, LLMs, OpenCV, Embeddings", body_style)],
        [Paragraph("<b>DevOps, Testing & Tools:</b>", bold_label), Paragraph("Git, GitHub Actions CI/CD, PyPI Package Deployment, pytest (160+ tests), Linux/Bash, Raspberry Pi", body_style)],
        [Paragraph("<b>Core CS Fundamentals:</b>", bold_label), Paragraph("Data Structures & Algorithms, Object-Oriented Design (OOD), DBMS, Operating Systems, Computer Networks", body_style)],
    ]
    t_skills = Table(skills_data, colWidths=[140, 400])
    t_skills.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 1))

    # Education
    story.extend(section_header("EDUCATION"))
    edu_table_data = [
        [
            Paragraph("<b>Vellore Institute of Technology-AP (VIT-AP)</b> &mdash; Amaravati, India", bold_label),
            Paragraph("<b>2023 &ndash; 2027</b>", ParagraphStyle('R1', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<i>Bachelor of Technology in Computer Science and Engineering &mdash; <b>CGPA: 8.33 / 10.0</b></i>", body_style),
            Paragraph("", body_style)
        ],
        [
            Paragraph("&bull; <i>Relevant Coursework:</i> Data Structures & Algorithms, Database Systems, Object-Oriented Programming, AI Foundations.", bullet_style),
            Paragraph("", body_style)
        ],
        [
            Paragraph("<b>Vidya Bharati Chinmaya Vidyalaya (CBSE)</b> &mdash; Jamshedpur, India", bold_label),
            Paragraph("<b>2022</b>", ParagraphStyle('R2', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<i>Higher Secondary Education (Class XII) &mdash; <b>Aggregate: 79.8%</b></i>", body_style),
            Paragraph("", body_style)
        ],
    ]
    t_edu = Table(edu_table_data, colWidths=[430, 110])
    t_edu.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu)
    story.append(Spacer(1, 1))

    # Key Projects
    story.extend(section_header("FEATURED ENGINEERING PROJECTS"))

    # Project 1
    story.append(Paragraph(
        "<b>local-persona-memory</b> &mdash; Production Open-Source Python Package (PyPI) &nbsp;|&nbsp; "
        "<i>Python, LangChain, ChromaDB, Ollama, RAG, pytest, GitHub Actions</i>",
        bold_label
    ))
    story.append(Paragraph(
        "&bull; Architected and published a production-grade Python package on <b>PyPI</b> (<code>pip install local-persona-memory</code>), "
        "giving local LLMs autonomous long-term persistent memory with 100% data privacy and zero cloud dependence.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Designed a resilient RAG pipeline incorporating ChromaDB vector embeddings, chunked PDF/document ingestion, sub-second semantic search, "
        "and dynamic conversation recall hooks.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Implemented <b>160 passing automated unit/integration tests</b> with <code>pytest</code> and established end-to-end automated "
        "CI/CD workflows with GitHub Actions for release quality assurance.",
        bullet_style
    ))
    story.append(Spacer(1, 2))

    # Project 2
    story.append(Paragraph(
        "<b>Distributed URL Shortener & Analytics Engine</b> &nbsp;|&nbsp; "
        "<i>FastAPI, PostgreSQL, Redis, Apache Kafka, Microservices Architecture</i>",
        bold_label
    ))
    story.append(Paragraph(
        "&bull; Developed a decoupled, scalable microservices backend featuring isolated Shorten, Redirect, and Analytics services "
        "coordinated behind a unified API Gateway.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Configured <b>Redis in-memory caching</b> for sub-5ms URL redirects, paired with <b>PostgreSQL</b> for ACID-compliant persistence "
        "and transactional durability.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Integrated <b>Apache Kafka</b> event streaming to asynchronously decouple incoming click metrics from the critical redirect path, "
        "guaranteeing zero latency penalty for end-users.",
        bullet_style
    ))
    story.append(Spacer(1, 2))

    # Project 3
    story.append(Paragraph(
        "<b>Smart Attendance Face Recognition System</b> &nbsp;|&nbsp; "
        "<i>Raspberry Pi, OpenCV, Python, Computer Vision, SQLite/MySQL</i>",
        bold_label
    ))
    story.append(Paragraph(
        "&bull; Built an end-to-end embedded biometric attendance device integrating Raspberry Pi hardware cameras with real-time OpenCV detection.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Trained facial landmark classification models to automate contactless attendance logging with <b>95%+ recognition accuracy</b>.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Optimized frame-processing throughput for resource-constrained edge hardware, preventing frame drops during concurrent verification.",
        bullet_style
    ))
    story.append(Spacer(1, 1))

    # Certifications & Achievements
    story.extend(section_header("CERTIFICATIONS, HONORS & AWARDS"))
    honors = [
        "&bull; <b>Oracle Cloud Infrastructure (OCI) Certified AI Foundations Associate:</b> Validated enterprise AI and cloud paradigms.",
        "&bull; <b>Coursera Full Stack Web Development Specialization:</b> Hands-on modern responsive web systems and REST architecture.",
        "&bull; <b>Infosys Springboard &mdash; Introduction to Data Science:</b> Advanced data wrangling, analytics, and statistical modeling.",
        "&bull; <b>High-Performance Coding (HPC) Certification (IAMNEO):</b> Algorithmic problem solving and runtime execution optimization.",
        "&bull; <b>Hashgraph Developer Course:</b> Distributed ledger technology, consensus algorithms, and decentralized applications.",
        "&bull; <b>Finalist, Engineering Clinics 2025:</b> Recognized among top engineering innovators for practical hardware-software solutions.",
        "&bull; <b>Active Competitor, Hack2Skill GDG Hackathons:</b> Accelerated collaborative prototyping under competitive time constraints."
    ]
    for h in honors:
        story.append(Paragraph(h, bullet_style))
    story.append(Spacer(1, 1))

    # Languages
    story.extend(section_header("LANGUAGES & INTERESTS"))
    story.append(Paragraph(
        "<b>Languages:</b> English (Professional Working Proficiency), Hindi (Native) &nbsp;|&nbsp; "
        "<b>Interests:</b> Open Source Development, LLM Autonomous Agents, Edge AI, Distributed Systems",
        body_style
    ))

    doc.build(story)
    print(f"Generated {pdf_path}")


if __name__ == "__main__":
    os.makedirs(PUBLIC_DIR, exist_ok=True)
    build_technical_resume()
    build_general_cv()

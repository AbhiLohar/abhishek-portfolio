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
        topMargin=26,
        bottomMargin=24
    )

    styles = getSampleStyleSheet()
    
    NAVY = colors.HexColor("#111827")
    DARK_GRAY = colors.HexColor("#374151")
    LINE_COLOR = colors.HexColor("#1F2937")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=19,
        leading=21,
        alignment=1,
        textColor=NAVY
    )

    contact_style = ParagraphStyle(
        'ContactLine',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.0,
        alignment=1,
        textColor=DARK_GRAY
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.0,
        leading=11.0,
        textColor=NAVY,
        textTransform='uppercase'
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.5,
        textColor=DARK_GRAY
    )

    bold_label_style = ParagraphStyle(
        'BoldLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.0,
        leading=10.5,
        textColor=NAVY
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.5,
        textColor=DARK_GRAY,
        leftIndent=10,
        firstLineIndent=-7
    )

    def section_header(title):
        return [
            Spacer(1, 3),
            Paragraph(title, section_heading_style),
            HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceBefore=1.0, spaceAfter=2.5),
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
    story.append(Spacer(1, 2))

    # --- PROFILE ---
    story.extend(section_header("PROFILE"))
    story.append(Paragraph(
        "Highly motivated Computer Science and Engineering student at VIT-AP with a strong focus on Artificial Intelligence, "
        "Deep Learning, and backend development. Experienced in building AI-powered applications, RAG pipelines, full-stack systems, "
        "and scalable software solutions. Passionate about open-source development and solving real-world problems through technology.",
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
            Paragraph("<i>B.Tech in Computer Science and Engineering &mdash; Current CGPA: <b>8.33 / 10.0</b></i>", body_style),
            Paragraph("<font color='#374151'>2023 &ndash; 2027</font>", ParagraphStyle('R2', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<b>Vidya Bharati Chinmaya Vidyalaya (CBSE)</b>", bold_label_style),
            Paragraph("<font color='#374151'>Jamshedpur, JH</font>", ParagraphStyle('R3', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<i>Higher Secondary Education (Class XII) &mdash; Percentage: <b>79.8%</b></i>", body_style),
            Paragraph("<font color='#374151'>2022</font>", ParagraphStyle('R4', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<b>Vidya Bharati Chinmaya Vidyalaya (CBSE)</b>", bold_label_style),
            Paragraph("<font color='#374151'>Jamshedpur, JH</font>", ParagraphStyle('R5', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<i>Secondary Education (Class X) &mdash; Percentage: <b>85.8%</b></i>", body_style),
            Paragraph("<font color='#374151'>2020</font>", ParagraphStyle('R6', parent=body_style, alignment=2))
        ],
    ]
    t_edu = Table(edu_table_data, colWidths=[380, 160])
    t_edu.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 0.3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.3),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu)
    story.append(Spacer(1, 1))

    # --- TECHNICAL SKILLS ---
    story.extend(section_header("TECHNICAL SKILLS"))
    skills_data = [
        [Paragraph("<b>Languages:</b>", bold_label_style), Paragraph("Java, Python, SQL, C++, JavaScript, HTML/CSS", body_style)],
        [Paragraph("<b>AI/ML Stack:</b>", bold_label_style), Paragraph("LLMs, RAG, Embeddings, LangChain, ChromaDB, Ollama, OpenCV, Data Science", body_style)],
        [Paragraph("<b>Backend & Tools:</b>", bold_label_style), Paragraph("FastAPI, React, PostgreSQL, Redis, Kafka, Raspberry Pi, Git, pytest, PyPI, GitHub Actions, Open-Source", body_style)],
        [Paragraph("<b>Soft Skills:</b>", bold_label_style), Paragraph("Leadership, Creative Thinking, Problem Solving", body_style)],
    ]
    t_skills = Table(skills_data, colWidths=[110, 430])
    t_skills.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 0.3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.3),
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
        "&bull; Published production-grade open-source Python package on PyPI (<code>pip install local-persona-memory</code>), "
        "giving local LLMs permanent long-term memory with zero cloud dependency.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Built full RAG pipeline with ChromaDB vector storage, PDF ingestion, semantic search, conversation history, "
        "export/import, and callback hooks. Shipped with 160 passing tests and GitHub Actions CI/CD.",
        bullet_style
    ))
    story.append(Spacer(1, 2.0))

    # Project 2
    p2_title = "<b>Fact Knowledge Layer &mdash; Document Intelligence System</b> | <i>Python, FastAPI, OpenAI, ChromaDB, SQLite, React</i>"
    story.append(Paragraph(p2_title, bold_label_style))
    story.append(Paragraph(
        "&bull; Built enterprise document intelligence pipeline extracting atomic, auditable facts from financial PDFs with value, unit, time, scope, source quote, and page-level provenance using GPT-4o mini.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Engineered two-stage reconciliation engine using ChromaDB semantic retrieval to prune irrelevant fact pairs before GPT-4o reasoning, reducing potential O(N&sup2;) comparisons by ~98%.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Implemented FastAPI + React web application with asynchronous background processing, multi-dimensional fact filtering, evidence drill-down, and evaluation dashboard.",
        bullet_style
    ))
    story.append(Spacer(1, 2.0))

    # Project 3
    p3_title = "<b>URL Shortener & Analytics Platform</b> | <i>Python, FastAPI, PostgreSQL, Redis, Kafka</i>"
    story.append(Paragraph(p3_title, bold_label_style))
    story.append(Paragraph(
        "&bull; Built microservices-based URL shortener with separate Shorten, Redirect, and Analytics services behind an API gateway to practice service decomposition.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Used PostgreSQL for persistent URL mappings and Redis caching in front of Redirect service; Kafka streams click events asynchronously to Analytics.",
        bullet_style
    ))
    story.append(Spacer(1, 1))

    # --- CERTIFICATIONS & ACHIEVEMENTS ---
    story.extend(section_header("CERTIFICATIONS & ACHIEVEMENTS"))
    certs = [
        "&bull; <b>Oracle Cloud Infrastructure (OCI) Certified AI Foundations Associate</b>",
        "&bull; <b>Finalist &mdash; Engineering Clinics 2025</b>",
        "&bull; <b>High-Performance Coding (HPC) Certification</b> by IAMNEO",
        "&bull; <b>Infosys Springboard &mdash; Introduction to Data Science</b> (May 2026)",
        "&bull; <b>Hashgraph Developer Course</b> &mdash; Hack2Skill GDG Hackathons at VIT-AP"
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
        topMargin=26,
        bottomMargin=24
    )

    styles = getSampleStyleSheet()
    PRIMARY = colors.HexColor("#0F172A")
    ACCENT = colors.HexColor("#1E40AF")
    TEXT_COLOR = colors.HexColor("#334155")

    title_style = ParagraphStyle(
        'CVTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=19,
        leading=21,
        alignment=1,
        textColor=PRIMARY
    )

    subtitle_style = ParagraphStyle(
        'CVSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=10.5,
        alignment=1,
        textColor=ACCENT
    )

    contact_style = ParagraphStyle(
        'CVContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.5,
        alignment=1,
        textColor=TEXT_COLOR
    )

    section_heading_style = ParagraphStyle(
        'CVSectionHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.0,
        leading=11.0,
        textColor=PRIMARY,
        textTransform='uppercase'
    )

    body_style = ParagraphStyle(
        'CVBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.9,
        leading=10.3,
        textColor=TEXT_COLOR
    )

    bold_label = ParagraphStyle(
        'CVBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.9,
        leading=10.3,
        textColor=PRIMARY
    )

    bullet_style = ParagraphStyle(
        'CVBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.9,
        leading=10.3,
        textColor=TEXT_COLOR,
        leftIndent=10,
        firstLineIndent=-7
    )

    def section_header(title):
        return [
            Spacer(1, 3),
            Paragraph(f"<b>{title}</b>", section_heading_style),
            HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#94A3B8"), spaceBefore=1.0, spaceAfter=2.5),
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
        'Jamshedpur, Jharkhand-831004 &nbsp;|&nbsp; '
        '<a href="https://github.com/AbhiLohar" color="#1e40af"><b>GitHub:</b> github.com/AbhiLohar</a> &nbsp;|&nbsp; '
        '<a href="https://linkedin.com/in/abhishek-lohar-216099350/" color="#1e40af"><b>LinkedIn:</b> linkedin.com/in/abhishek-lohar-216099350</a>',
        contact_style
    ))
    story.append(Spacer(1, 2))

    # Executive Summary
    story.extend(section_header("PROFESSIONAL SUMMARY"))
    story.append(Paragraph(
        "Highly motivated Computer Science and Engineering student at VIT-AP with a strong focus on Artificial Intelligence, "
        "Deep Learning, and backend development. Experienced in building AI-powered applications, RAG pipelines, full-stack systems, "
        "and scalable software solutions. Passionate about open-source development and solving real-world problems through technology.",
        body_style
    ))
    story.append(Spacer(1, 1))

    # Technical Skills
    story.extend(section_header("CORE TECHNICAL COMPETENCIES"))
    skills_data = [
        [Paragraph("<b>Programming Languages:</b>", bold_label), Paragraph("Java, Python, SQL, C++, JavaScript, HTML/CSS", body_style)],
        [Paragraph("<b>AI, ML & Vector Search:</b>", bold_label), Paragraph("LLMs, RAG, Embeddings, LangChain, ChromaDB, Ollama, OpenAI, OpenCV, Data Science", body_style)],
        [Paragraph("<b>Backend & Web Systems:</b>", bold_label), Paragraph("FastAPI, React, PostgreSQL, Redis, Apache Kafka, RESTful APIs, Microservices", body_style)],
        [Paragraph("<b>DevOps, Testing & Tools:</b>", bold_label), Paragraph("Git, GitHub Actions CI/CD, PyPI Package Deployment, pytest (160+ tests), Raspberry Pi", body_style)],
        [Paragraph("<b>Core CS Fundamentals:</b>", bold_label), Paragraph("Data Structures & Algorithms, Object-Oriented Design (OOD), DBMS, Operating Systems, Computer Networks", body_style)],
    ]
    t_skills = Table(skills_data, colWidths=[140, 400])
    t_skills.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 0.3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.3),
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
            Paragraph("<i>B.Tech in Computer Science and Engineering &mdash; <b>CGPA: 8.33 / 10.0</b></i>", body_style),
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
        [
            Paragraph("<b>Vidya Bharati Chinmaya Vidyalaya (CBSE)</b> &mdash; Jamshedpur, India", bold_label),
            Paragraph("<b>2020</b>", ParagraphStyle('R3', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<i>Secondary Education (Class X) &mdash; <b>Aggregate: 85.8%</b></i>", body_style),
            Paragraph("", body_style)
        ],
    ]
    t_edu = Table(edu_table_data, colWidths=[430, 110])
    t_edu.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 0.3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.3),
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
        "&bull; Architected and published open-source Python package on <b>PyPI</b> (<code>pip install local-persona-memory</code>), "
        "giving local LLMs autonomous long-term persistent memory with 100% data privacy and zero cloud dependence.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Designed resilient RAG pipeline incorporating ChromaDB vector embeddings, chunked PDF document ingestion, sub-second semantic search, "
        "and dynamic conversation recall hooks. Shipped with <b>160 passing tests</b> and GitHub Actions CI/CD.",
        bullet_style
    ))
    story.append(Spacer(1, 1.5))

    # Project 2
    story.append(Paragraph(
        "<b>Fact Knowledge Layer &mdash; Document Intelligence System</b> &nbsp;|&nbsp; "
        "<i>Python, FastAPI, OpenAI, ChromaDB, SQLite, React</i>",
        bold_label
    ))
    story.append(Paragraph(
        "&bull; Built enterprise document intelligence pipeline extracting atomic, auditable facts from financial PDFs with value, unit, time, scope, source quote, and page-level provenance using GPT-4o mini and Pydantic.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Engineered two-stage reconciliation engine using ChromaDB semantic retrieval to prune irrelevant fact pairs before GPT-4o reasoning, reducing potential O(N&sup2;) comparisons by ~98%.",
        bullet_style
    ))
    story.append(Spacer(1, 1.5))

    # Project 3
    story.append(Paragraph(
        "<b>Distributed URL Shortener & Analytics Engine</b> &nbsp;|&nbsp; "
        "<i>FastAPI, PostgreSQL, Redis, Apache Kafka, Microservices Architecture</i>",
        bold_label
    ))
    story.append(Paragraph(
        "&bull; Developed decoupled microservices backend featuring isolated Shorten, Redirect, and Analytics services coordinated behind API Gateway.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull; Configured <b>Redis in-memory caching</b> for sub-5ms redirects with <b>PostgreSQL</b> persistence, integrated <b>Apache Kafka</b> for asynchronous click metrics streaming.",
        bullet_style
    ))
    story.append(Spacer(1, 1))

    # Certifications & Achievements
    story.extend(section_header("CERTIFICATIONS, HONORS & AWARDS"))
    honors = [
        "&bull; <b>Oracle Cloud Infrastructure (OCI) Certified AI Foundations Associate:</b> Enterprise AI & cloud paradigms.",
        "&bull; <b>Finalist, Engineering Clinics 2025:</b> Recognized among top engineering innovators for practical hardware-software solutions.",
        "&bull; <b>High-Performance Coding (HPC) Certification (IAMNEO):</b> Algorithmic problem solving and runtime execution optimization.",
        "&bull; <b>Infosys Springboard &mdash; Introduction to Data Science (May 2026):</b> Data wrangling, analytics, and statistical modeling.",
        "&bull; <b>Hashgraph Developer Course & Hack2Skill GDG Hackathons:</b> Distributed ledger technology & collaborative hackathon prototyping."
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

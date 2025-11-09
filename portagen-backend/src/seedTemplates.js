const mongoose = require('mongoose');
const Template = require('./models/Template');
require('dotenv').config();

const sampleTemplates = [
  {
    name: 'Glassmorphism Pro',
    description: 'Modern glassmorphism design with smooth animations and gradients',
    previewUrl: 'https://picsum.photos/seed/glassmorphism/400/300.jpg',
    isPremium: false,
    files: {
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{personalInfo.fullName}} - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="background-animation">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
    </div>

    <div class="container">
        <header class="glass-card header-card">
            <div class="avatar-placeholder">{{#if personalInfo.fullName}}{{personalInfo.fullName}}{{/if}}</div>
            <h1 class="glitch" data-text="{{personalInfo.fullName}}">{{personalInfo.fullName}}</h1>
            <p class="subtitle">{{personalInfo.title}}</p>
            <div class="contact-links">
                <a href="mailto:{{personalInfo.contact.email}}" class="glass-btn">
                    <span>📧</span> Email
                </a>
                {{#if personalInfo.contact.linkedin}}
                <a href="{{personalInfo.contact.linkedin}}" class="glass-btn">
                    <span>💼</span> LinkedIn
                </a>
                {{/if}}
                {{#if personalInfo.contact.github}}
                <a href="{{personalInfo.contact.github}}" class="glass-btn">
                    <span>🔗</span> GitHub
                </a>
                {{/if}}
            </div>
        </header>

        <section class="glass-card about-section fade-in">
            <h2 class="section-title">
                <span class="title-number">01.</span> About Me
            </h2>
            <p class="about-text">{{personalInfo.about}}</p>
        </section>

        {{#if experience}}
        <section class="glass-card experience-section fade-in">
            <h2 class="section-title">
                <span class="title-number">02.</span> Experience
            </h2>
            <div class="timeline">
                {{#each experience}}
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>{{role}}</h3>
                        <h4>{{company}}</h4>
                        <span class="date">{{startDate}} - {{endDate}}</span>
                        <p>{{description}}</p>
                    </div>
                </div>
                {{/each}}
            </div>
        </section>
        {{/if}}

        {{#if projects}}
        <section class="glass-card projects-section fade-in">
            <h2 class="section-title">
                <span class="title-number">03.</span> Featured Projects
            </h2>
            <div class="projects-grid">
                {{#each projects}}
                <div class="project-card">
                    <div class="project-number">{{add @index 1}}</div>
                    <h3>{{name}}</h3>
                    <p>{{description}}</p>
                    {{#if link}}
                    <a href="{{link}}" class="project-link">
                        View Project <span class="arrow">→</span>
                    </a>
                    {{/if}}
                </div>
                {{/each}}
            </div>
        </section>
        {{/if}}

        {{#if skills}}
        <section class="glass-card skills-section fade-in">
            <h2 class="section-title">
                <span class="title-number">04.</span> Skills & Technologies
            </h2>
            <div class="skills-container">
                {{#each skills}}
                <div class="skill-tag">{{this}}</div>
                {{/each}}
            </div>
        </section>
        {{/if}}
    </div>

    <script src="script.js"></script>
</body>
</html>
      `,
      css: `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background: #0a0e27;
    color: #fff;
    overflow-x: hidden;
    min-height: 100vh;
}

.background-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
}

.gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
    animation: float 20s infinite ease-in-out;
}

.orb-1 {
    width: 500px;
    height: 500px;
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    top: -250px;
    left: -250px;
    animation-delay: 0s;
}

.orb-2 {
    width: 400px;
    height: 400px;
    background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
    bottom: -200px;
    right: -200px;
    animation-delay: 5s;
}

.orb-3 {
    width: 300px;
    height: 300px;
    background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
    top: 50%;
    left: 50%;
    animation-delay: 10s;
}

@keyframes float {
    0%, 100% {
        transform: translate(0, 0) scale(1);
    }
    33% {
        transform: translate(100px, -100px) scale(1.1);
    }
    66% {
        transform: translate(-100px, 100px) scale(0.9);
    }
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

.glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 40px;
    margin-bottom: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.glass-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
}

.header-card {
    text-align: center;
    padding: 60px 40px;
}

.avatar-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: bold;
    margin: 0 auto 30px;
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
}

.header-card h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.subtitle {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 30px;
}

.contact-links {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
}

.glass-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 12px 24px;
    border-radius: 50px;
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.glass-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.section-title {
    font-size: 2rem;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 15px;
}

.title-number {
    font-size: 1.2rem;
    color: #667eea;
    font-weight: 600;
}

.about-text {
    font-size: 1.1rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.8);
}

.timeline {
    position: relative;
    padding-left: 40px;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
}

.timeline-item {
    position: relative;
    margin-bottom: 40px;
}

.timeline-dot {
    position: absolute;
    left: -46px;
    top: 5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #667eea;
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.6);
}

.timeline-content h3 {
    font-size: 1.5rem;
    margin-bottom: 5px;
    color: #fff;
}

.timeline-content h4 {
    font-size: 1.2rem;
    color: #667eea;
    margin-bottom: 10px;
}

.date {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(102, 126, 234, 0.2);
    border-radius: 20px;
    font-size: 0.9rem;
    margin-bottom: 15px;
}

.timeline-content p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.project-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 30px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.project-card:hover::before {
    transform: scaleX(1);
}

.project-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(102, 126, 234, 0.3);
}

.project-number {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 3rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.05);
}

.project-card h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #fff;
}

.project-card p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 20px;
}

.project-link {
    color: #667eea;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.project-link:hover {
    gap: 12px;
}

.arrow {
    transition: transform 0.3s ease;
}

.project-link:hover .arrow {
    transform: translateX(5px);
}

.skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.skill-tag {
    background: rgba(102, 126, 234, 0.2);
    border: 1px solid rgba(102, 126, 234, 0.4);
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
}

.skill-tag:hover {
    background: rgba(102, 126, 234, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.fade-in {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .header-card h1 {
        font-size: 2.5rem;
    }
    
    .container {
        padding: 20px 15px;
    }
    
    .glass-card {
        padding: 25px;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
      `,
      js: `
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for background orbs
    document.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.gradient-orb');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            orb.style.transform = \`translate(\${x * speed}px, \${y * speed}px)\`;
        });
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add stagger animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = \`\${index * 0.2}s\`;
        item.style.opacity = '0';
        item.style.animation = 'fadeInUp 0.6s ease forwards';
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skills animation
    const skillTags = document.querySelectorAll('.skill-tag');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, { threshold: 0.5 });

    skillTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = 'all 0.3s ease';
        skillObserver.observe(tag);
    });
});
      `
    }
  },
  {
    name: 'Cyberpunk Neon',
    description: 'Futuristic cyberpunk design with neon accents and grid patterns',
    previewUrl: 'https://picsum.photos/seed/cyberpunk/400/300.jpg',
    isPremium: true,
    files: {
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{personalInfo.fullName}} - Cyber Portfolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="grid-background"></div>
    <div class="scanline"></div>
    
    <div class="container">
        <header class="cyber-header">
            <div class="glitch-wrapper">
                <div class="glitch" data-text="{{personalInfo.fullName}}">{{personalInfo.fullName}}</div>
            </div>
            <div class="cyber-line"></div>
            <p class="role-text">
                <span class="bracket">[</span>
                {{personalInfo.title}}
                <span class="bracket">]</span>
            </p>
            <div class="contact-grid">
                <a href="mailto:{{personalInfo.contact.email}}" class="neon-btn">
                    <span class="btn-text">CONTACT</span>
                </a>
                {{#if personalInfo.contact.github}}
                <a href="{{personalInfo.contact.github}}" class="neon-btn">
                    <span class="btn-text">GITHUB</span>
                </a>
                {{/if}}
            </div>
        </header>

        <section class="cyber-section">
            <h2 class="section-header">
                <span class="section-number">// 01</span>
                <span class="neon-text">PROFILE_DATA</span>
            </h2>
            <div class="data-box">
                <div class="box-corners"></div>
                <p class="mono-text">{{personalInfo.about}}</p>
            </div>
        </section>

        {{#if experience}}
        <section class="cyber-section">
            <h2 class="section-header">
                <span class="section-number">// 02</span>
                <span class="neon-text">WORK_HISTORY</span>
            </h2>
            {{#each experience}}
            <div class="experience-card">
                <div class="card-header">
                    <h3 class="card-title">{{role}}</h3>
                    <span class="company-tag">@{{company}}</span>
                </div>
                <div class="date-bar">
                    <span class="date-chip">{{startDate}}</span>
                    <span class="arrow">→</span>
                    <span class="date-chip">{{endDate}}</span>
                </div>
                <p class="card-description">{{description}}</p>
                <div class="card-line"></div>
            </div>
            {{/each}}
        </section>
        {{/if}}

        {{#if projects}}
        <section class="cyber-section">
            <h2 class="section-header">
                <span class="section-number">// 03</span>
                <span class="neon-text">PROJECTS_ARCHIVE</span>
            </h2>
            <div class="projects-container">
                {{#each projects}}
                <div class="project-box">
                    <div class="project-header">
                        <span class="project-id">[PRJ_{{add @index 1}}]</span>
                        <h3>{{name}}</h3>
                    </div>
                    <p class="project-desc">{{description}}</p>
                    {{#if link}}
                    <a href="{{link}}" class="access-link">
                        <span class="access-text">ACCESS_FILE</span>
                        <span class="access-arrow">&gt;&gt;</span>
                    </a>
                    {{/if}}
                    <div class="corner-accents"></div>
                </div>
                {{/each}}
            </div>
        </section>
        {{/if}}

        {{#if skills}}
        <section class="cyber-section">
            <h2 class="section-header">
                <span class="section-number">// 04</span>
                <span class="neon-text">SKILL_MATRIX</span>
            </h2>
            <div class="skills-grid">
                {{#each skills}}
                <div class="skill-chip">
                    <span class="chip-bracket">&lt;</span>
                    {{this}}
                    <span class="chip-bracket">/&gt;</span>
                </div>
                {{/each}}
            </div>
        </section>
        {{/if}}
    </div>

    <script src="script.js"></script>
</body>
</html>
      `,
      css: `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --neon-cyan: #00fff9;
    --neon-pink: #ff006e;
    --neon-purple: #8b00ff;
    --dark-bg: #0a0a0f;
    --darker-bg: #050508;
}

body {
    font-family: 'Share Tech Mono', monospace;
    background: var(--dark-bg);
    color: var(--neon-cyan);
    overflow-x: hidden;
    position: relative;
}

.grid-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        linear-gradient(var(--neon-cyan) 1px, transparent 1px),
        linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.05;
    z-index: -1;
    animation: gridPulse 4s ease-in-out infinite;
}

@keyframes gridPulse {
    0%, 100% { opacity: 0.05; }
    50% { opacity: 0.08; }
}

.scanline {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
    animation: scan 4s linear infinite;
    z-index: 1000;
    pointer-events: none;
    opacity: 0.5;
}

@keyframes scan {
    from { transform: translateY(0); }
    to { transform: translateY(100vh); }
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

.cyber-header {
    text-align: center;
    padding: 80px 20px;
    position: relative;
}

.glitch-wrapper {
    margin-bottom: 30px;
}

.glitch {
    font-family: 'Orbitron', sans-serif;
    font-size: 4rem;
    font-weight: 900;
    text-transform: uppercase;
    position: relative;
    color: var(--neon-cyan);
    text-shadow: 
        0 0 10px var(--neon-cyan),
        0 0 20px var(--neon-cyan),
        0 0 40px var(--neon-cyan);
    animation: glitchAnimation 5s infinite;
}

@keyframes glitchAnimation {
    0%, 90%, 100% {
        text-shadow: 
            0 0 10px var(--neon-cyan),
            0 0 20px var(--neon-cyan),
            0 0 40px var(--neon-cyan);
    }
    92% {
        text-shadow: 
            -2px 0 var(--neon-pink),
            2px 0 var(--neon-cyan);
        transform: translate(-2px, 0);
    }
    94% {
        text-shadow: 
            2px 0 var(--neon-pink),
            -2px 0 var(--neon-cyan);
        transform: translate(2px, 0);
    }
}

.cyber-line {
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
    margin: 20px auto;
    width: 300px;
    box-shadow: 0 0 10px var(--neon-cyan);
}

.role-text {
    font-size: 1.5rem;
    color: var(--neon-pink);
    text-shadow: 0 0 10px var(--neon-pink);
    margin-bottom: 30px;
}

.bracket {
    color: var(--neon-cyan);
    font-weight: bold;
}

.contact-grid {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.neon-btn {
    padding: 15px 40px;
    background: transparent;
    border: 2px solid var(--neon-cyan);
    color: var(--neon-cyan);
    text-decoration: none;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
}

.neon-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--neon-cyan);
    transition: all 0.3s ease;
    z-index: -1;
}

.neon-btn:hover {
    color: var(--dark-bg);
    box-shadow: 0 0 20px var(--neon-cyan);
}

.neon-btn:hover::before {
    left: 0;
}

.cyber-section {
    margin-bottom: 80px;
}

.section-header {
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    gap: 20px;
}

.section-number {
    color: var(--neon-pink);
    font-size: 1rem;
}

.neon-text {
    text-shadow: 0 0 10px var(--neon-cyan);
}

.data-box {
    background: rgba(0, 255, 249, 0.03);
    border: 2px solid var(--neon-cyan);
    padding: 30px;
    position: relative;
    clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
}

.box-corners::before,
.box-corners::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid var(--neon-pink);
}

.box-corners::before {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
}

.box-corners::after {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
}

.mono-text {
    font-size: 1.1rem;
    line-height: 1.8;
    color: rgba(0, 255, 249, 0.8);
}

.experience-card {
    background: rgba(139, 0, 255, 0.05);
    border-left: 3px solid var(--neon-purple);
    padding: 30px;
    margin-bottom: 30px;
    position: relative;
    transition: all 0.3s ease;
}

.experience-card:hover {
    background: rgba(139, 0, 255, 0.1);
    transform: translateX(10px);
    box-shadow: -5px 0 20px rgba(139, 0, 255, 0.3);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    flex-wrap: wrap;
    gap: 10px;
}

.card-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    color: var(--neon-cyan);
}

.company-tag {
    background: rgba(255, 0, 110, 0.2);
    border: 1px solid var(--neon-pink);
    padding: 5px 15px;
    color: var(--neon-pink);
    font-size: 0.9rem;
}

.date-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

.date-chip {
    background: rgba(0, 255, 249, 0.1);
    border: 1px solid var(--neon-cyan);
    padding: 5px 12px;
    font-size: 0.85rem;
}

.arrow {
    color: var(--neon-pink);
    font-weight: bold;
}

.card-description {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
}

.card-line {
    height: 1px;
    background: linear-gradient(90deg, var(--neon-purple), transparent);
    margin-top: 20px;
}

.projects-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
}

.project-box {
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid var(--neon-pink);
    padding: 30px;
    position: relative;
    transition: all 0.3s ease;
    clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
}

.project-box:hover {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 30px rgba(0, 255, 249, 0.3);
    transform: translateY(-5px);
}

.project-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
}

.project-id {
    color: var(--neon-pink);
    font-size: 0.85rem;
}

.project-box h3 {
    font-family: 'Orbitron', sans-serif;
    color: var(--neon-cyan);
    font-size: 1.3rem;
}

.project-desc {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 20px;
}

.access-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--neon-cyan);
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
}

.access-link:hover {
    gap: 15px;
    text-shadow: 0 0 10px var(--neon-cyan);
}

.access-arrow {
    transition: transform 0.3s ease;
}

.access-link:hover .access-arrow {
    transform: translateX(5px);
}

.corner-accents::before,
.corner-accents::after {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
}

.corner-accents::before {
    top: -2px;
    right: -2px;
    border-top: 2px solid var(--neon-cyan);
    border-right: 2px solid var(--neon-cyan);
}

.corner-accents::after {
    bottom: -2px;
    left: -2px;
    border-bottom: 2px solid var(--neon-cyan);
    border-left: 2px solid var(--neon-cyan);
}

.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.skill-chip {
    background: rgba(255, 0, 110, 0.1);
    border: 1px solid var(--neon-pink);
    padding: 10px 20px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.skill-chip::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 0, 110, 0.3), transparent);
    transition: left 0.5s ease;
}

.skill-chip:hover::before {
    left: 100%;
}

.skill-chip:hover {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 15px rgba(255, 0, 110, 0.5);
    transform: translateY(-3px);
}

.chip-bracket {
    color: var(--neon-cyan);
    font-weight: bold;
}

@media (max-width: 768px) {
    .glitch {
        font-size: 2.5rem;
    }
    
    .projects-container {
        grid-template-columns: 1fr;
    }
    
    .card-header {
        flex-direction: column;
        align-items: flex-start;
    }
}
      `,
      js: `
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced glitch effect
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                glitchText.style.transform = \`translate(\${Math.random() * 4 - 2}px, \${Math.random() * 4 - 2}px)\`;
                setTimeout(() => {
                    glitchText.style.transform = 'translate(0, 0)';
                }, 50);
            }
        }, 100);
    }

    // Animate sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.cyber-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });

    // Project box hover effect
    const projectBoxes = document.querySelectorAll('.project-box');
    projectBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--neon-cyan)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--neon-pink)';
        });
    });

    // Skill chip animation
    const skillChips = document.querySelectorAll('.skill-chip');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 50);
            }
        });
    }, { threshold: 0.5 });

    skillChips.forEach(chip => {
        chip.style.opacity = '0';
        chip.style.transform = 'translateX(-20px)';
        chip.style.transition = 'all 0.3s ease';
        skillObserver.observe(chip);
    });

    // Console Easter egg
    console.log('%cACCESS GRANTED', 'color: #00fff9; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00fff9;');
    console.log('%cWelcome to the Cyber Portfolio', 'color: #ff006e; font-size: 14px;');
});
      `
    }
  },
  {
    name: 'Elegant Minimalist',
    description: 'Clean and sophisticated design with subtle animations and premium feel',
    previewUrl: 'https://picsum.photos/seed/elegant/400/300.jpg',
    isPremium: false,
    files: {
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{personalInfo.fullName}}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navigation">
        <div class="nav-content">
            <div class="logo">{{#if personalInfo.fullName}}{{personalInfo.fullName}}{{/if}}</div>
            <div class="nav-links">
                <a href="#about">About</a>
                <a href="#experience">Experience</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
    </nav>

    <section class="hero-section">
        <div class="hero-content">
            <p class="greeting">Hello, I'm</p>
            <h1 class="hero-title">{{personalInfo.fullName}}</h1>
            <h2 class="hero-subtitle">{{personalInfo.title}}</h2>
            <p class="hero-description">{{personalInfo.about}}</p>
            <div class="hero-cta">
                <a href="mailto:{{personalInfo.contact.email}}" class="btn-primary">Get in touch</a>
                <a href="#projects" class="btn-secondary">View my work</a>
            </div>
        </div>
        <div class="scroll-indicator">
            <span>Scroll</span>
            <div class="scroll-line"></div>
        </div>
    </section>

    {{#if experience}}
    <section id="experience" class="content-section">
        <div class="section-container">
            <h2 class="section-title">Experience</h2>
            <div class="experience-timeline">
                {{#each experience}}
                <div class="timeline-entry">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <span class="timeline-date">{{startDate}} — {{endDate}}</span>
                        <h3 class="timeline-role">{{role}}</h3>
                        <h4 class="timeline-company">{{company}}</h4>
                        <p class="timeline-description">{{description}}</p>
                    </div>
                </div>
                {{/each}}
            </div>
        </div>
    </section>
    {{/if}}

    {{#if projects}}
    <section id="projects" class="content-section projects-section">
        <div class="section-container">
            <h2 class="section-title">Selected Projects</h2>
            <div class="projects-showcase">
                {{#each projects}}
                <article class="project-item">
                    <div class="project-content">
                        <span class="project-number">0{{add @index 1}}</span>
                        <h3 class="project-title">{{name}}</h3>
                        <p class="project-description">{{description}}</p>
                        {{#if link}}
                        <a href="{{link}}" class="project-link">
                            View Project
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </a>
                        {{/if}}
                    </div>
                </article>
                {{/each}}
            </div>
        </div>
    </section>
    {{/if}}

    {{#if skills}}
    <section class="content-section">
        <div class="section-container">
            <h2 class="section-title">Skills & Expertise</h2>
            <div class="skills-list">
                {{#each skills}}
                <span class="skill-item">{{this}}</span>
                {{/each}}
            </div>
        </div>
    </section>
    {{/if}}

    <footer id="contact" class="footer">
        <div class="footer-content">
            <h2>Let's work together</h2>
            <p>Feel free to reach out for collaborations or just a friendly hello</p>
            <a href="mailto:{{personalInfo.contact.email}}" class="footer-email">{{personalInfo.contact.email}}</a>
            <div class="footer-links">
                {{#if personalInfo.contact.linkedin}}
                <a href="{{personalInfo.contact.linkedin}}">LinkedIn</a>
                {{/if}}
                {{#if personalInfo.contact.github}}
                <a href="{{personalInfo.contact.github}}">GitHub</a>
                {{/if}}
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
      `,
      css: `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --color-primary: #1a1a1a;
    --color-secondary: #f5f5f5;
    --color-accent: #0066ff;
    --color-text: #333;
    --color-text-light: #666;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', sans-serif;
    color: var(--color-text);
    background: var(--color-secondary);
    line-height: 1.6;
}

.navigation {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(245, 245, 245, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.nav-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
}

.nav-links {
    display: flex;
    gap: 40px;
}

.nav-links a {
    color: var(--color-text);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: var(--color-accent);
}

.hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 100px 40px 40px;
}

.hero-content {
    max-width: 800px;
    animation: fadeInUp 1s ease;
}

.greeting {
    font-size: 1.2rem;
    color: var(--color-text-light);
    margin-bottom: 10px;
}

.hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 10px;
    line-height: 1.1;
}

.hero-subtitle {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    color: var(--color-accent);
    font-weight: 300;
    margin-bottom: 30px;
}

.hero-description {
    font-size: 1.1rem;
    color: var(--color-text-light);
    line-height: 1.8;
    margin-bottom: 40px;
    max-width: 600px;
}

.hero-cta {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
    padding: 15px 35px;
    text-decoration: none;
    font-weight: 500;
    border-radius: 50px;
    transition: all 0.3s ease;
    display: inline-block;
}

.btn-primary {
    background: var(--color-primary);
    color: white;
}

.btn-primary:hover {
    background: var(--color-accent);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3);
}

.btn-secondary {
    background: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
}

.btn-secondary:hover {
    background: var(--color-primary);
    color: white;
}

.scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 0.85rem;
    color: var(--color-text-light);
}

.scroll-line {
    width: 1px;
    height: 60px;
    background: var(--color-text-light);
    margin: 10px auto 0;
    animation: scrollAnimation 2s infinite;
}

@keyframes scrollAnimation {
    0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
    50% { transform: scaleY(1); opacity: 1; }
}

.content-section {
    padding: 120px 40px;
}

.section-container {
    max-width: 1000px;
    margin: 0 auto;
}

.section-title {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    margin-bottom: 60px;
    color: var(--color-primary);
}

.experience-timeline {
    border-left: 2px solid #ddd;
    padding-left: 40px;
    position: relative;
}

.timeline-entry {
    margin-bottom: 60px;
    position: relative;
}

.timeline-dot {
    position: absolute;
    left: -46px;
    top: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--color-accent);
    border: 3px solid var(--color-secondary);
}

.timeline-date {
    font-size: 0.9rem;
    color: var(--color-text-light);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.timeline-role {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--color-primary);
    margin: 10px 0 5px;
}

.timeline-company {
    font-size: 1.2rem;
    color: var(--color-accent);
    font-weight: 500;
    margin-bottom: 15px;
}

.timeline-description {
    color: var(--color-text-light);
    line-height: 1.8;
}

.projects-section {
    background: white;
}

.projects-showcase {
    display: grid;
    gap: 40px;
}

.project-item {
    padding: 40px 0;
    border-bottom: 1px solid #eee;
    transition: all 0.3s ease;
}

.project-item:last-child {
    border-bottom: none;
}

.project-number {
    font-size: 0.9rem;
    color: var(--color-accent);
    font-weight: 600;
    display: block;
    margin-bottom: 15px;
}

.project-title {
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 15px;
}

.project-description {
    color: var(--color-text-light);
    line-height: 1.8;
    margin-bottom: 20px;
    max-width: 700px;
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 500;
    transition: gap 0.3s ease;
}

.project-link:hover {
    gap: 15px;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.skill-item {
    padding: 12px 24px;
    background: white;
    border: 2px solid #eee;
    border-radius: 50px;
    color: var(--color-text);
    font-weight: 500;
    transition: all 0.3s ease;
}

.skill-item:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
    transform: translateY(-3px);
}

.footer {
    background: var(--color-primary);
    color: white;
    padding: 100px 40px;
    text-align: center;
}

.footer-content h2 {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    margin-bottom: 20px;
}

.footer-content p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 30px;
}

.footer-email {
    font-size: 1.5rem;
    color: var(--color-accent);
    text-decoration: none;
    transition: opacity 0.3s ease;
    display: inline-block;
    margin-bottom: 30px;
}

.footer-email:hover {
    opacity: 0.8;
}

.footer-links {
    display: flex;
    gap: 30px;
    justify-content: center;
}

.footer-links a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: white;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
    
    .hero-section {
        padding: 80px 20px 40px;
    }
    
    .content-section {
        padding: 80px 20px;
    }
    
    .experience-timeline {
        padding-left: 30px;
    }
}
      `,
      js: `
document.addEventListener('DOMContentLoaded', function() {
    // Smooth reveal animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe timeline entries
    document.querySelectorAll('.timeline-entry').forEach((entry, index) => {
        entry.style.opacity = '0';
        entry.style.transform = 'translateY(30px)';
        entry.style.transition = \`all 0.6s ease \${index * 0.1}s\`;
        observer.observe(entry);
    });

    // Observe project items
    document.querySelectorAll('.project-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = \`all 0.6s ease \${index * 0.15}s\`;
        observer.observe(item);
    });

    // Observe skills
    document.querySelectorAll('.skill-item').forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
        skill.style.transition = \`all 0.4s ease \${index * 0.05}s\`;
        observer.observe(skill);
    });

    // Navigation scroll effect
    let lastScroll = 0;
    const nav = document.querySelector('.navigation');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
      `
    }
  },
  {
    name: 'Creative Studio',
    description: 'Bold and dynamic design with large typography and creative layouts',
    previewUrl: 'https://picsum.photos/seed/creative-studio/400/300.jpg',
    isPremium: true,
    files: {
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{personalInfo.fullName}} - Creative Portfolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="cursor-dot" data-cursor-dot></div>
    <div class="cursor-outline" data-cursor-outline></div>

    <header class="main-header">
        <div class="header-content">
            <div class="mega-title">
                <span class="mega-line">{{#if personalInfo.fullName}}{{personalInfo.fullName}}{{/if}}</span>
                <span class="mega-line">{{#if personalInfo.fullName}}{{personalInfo.fullName}}{{/if}}</span>
            </div>
            <div class="header-info">
                <p class="role-badge">{{personalInfo.title}}</p>
                <p class="about-snippet">{{personalInfo.about}}</p>
            </div>
        </div>
        <div class="scroll-prompt">
            <span>Scroll to explore</span>
        </div>
    </header>

    {{#if projects}}
    <section class="projects-showcase">
        <h2 class="showcase-title">Featured Work</h2>
        <div class="projects-masonry">
            {{#each projects}}
            <div class="masonry-item" data-project="{{@index}}">
                <div class="project-overlay">
                    <span class="project-index">{{@index}}</span>
                    <h3 class="project-name">{{name}}</h3>
                    <p class="project-brief">{{description}}</p>
                    {{#if link}}
                    <a href="{{link}}" class="view-project-btn">
                        <span>View Case Study</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </a>
                    {{/if}}
                </div>
            </div>
            {{/each}}
        </div>
    </section>
    {{/if}}

    {{#if experience}}
    <section class="experience-showcase">
        <div class="showcase-container">
            <h2 class="big-heading">Experience & Journey</h2>
            <div class="experience-cards">
                {{#each experience}}
                <div class="exp-card">
                    <div class="exp-header">
                        <div class="exp-meta">
                            <span class="exp-dates">{{startDate}} → {{endDate}}</span>
                        </div>
                        <h3 class="exp-role">{{role}}</h3>
                        <h4 class="exp-company">at {{company}}</h4>
                    </div>
                    <p class="exp-desc">{{description}}</p>
                </div>
                {{/each}}
            </div>
        </div>
    </section>
    {{/if}}

    {{#if skills}}
    <section class="skills-display">
        <div class="skills-container">
            <h2 class="big-heading">Tools & Skills</h2>
            <div class="skills-marquee">
                <div class="marquee-content">
                    {{#each skills}}
                    <span class="skill-badge">{{this}}</span>
                    {{/each}}
                    {{#each skills}}
                    <span class="skill-badge">{{this}}</span>
                    {{/each}}
                </div>
            </div>
        </div>
    </section>
    {{/if}}

    <footer class="contact-footer">
        <div class="footer-container">
            <h2 class="footer-heading">Let's Create<br/>Something Amazing</h2>
            <div class="contact-details">
                <a href="mailto:{{personalInfo.contact.email}}" class="contact-link">{{personalInfo.contact.email}}</a>
                <div class="social-links">
                    {{#if personalInfo.contact.linkedin}}
                    <a href="{{personalInfo.contact.linkedin}}" class="social-btn">LinkedIn</a>
                    {{/if}}
                    {{#if personalInfo.contact.github}}
                    <a href="{{personalInfo.contact.github}}" class="social-btn">GitHub</a>
                    {{/if}}
                </div>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
      `,
      css: `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --color-bg: #fafafa;
    --color-dark: #111;
    --color-accent: #ff6b35;
    --color-secondary: #f7931e;
}

body {
    font-family: 'Space Grotesk', sans-serif;
    background: var(--color-bg);
    color: var(--color-dark);
    cursor: none;
    overflow-x: hidden;
}

.cursor-dot,
.cursor-outline {
    pointer-events: none;
    position: fixed;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s, transform 0.3s;
    z-index: 10000;
}

.cursor-dot {
    width: 8px;
    height: 8px;
    background: var(--color-accent);
}

.cursor-outline {
    width: 40px;
    height: 40px;
    border: 2px solid var(--color-accent);
}

.main-header {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 40px;
    position: relative;
}

.header-content {
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
}

.mega-title {
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;
}

.mega-line {
    font-family: 'Bebas Neue', cursive;
    font-size: clamp(5rem, 15vw, 12rem);
    line-height: 0.9;
    font-weight: 400;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: slideIn 1s ease forwards;
    opacity: 0;
}

.mega-line:nth-child(2) {
    animation-delay: 0.2s;
    padding-left: 100px;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(100px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.header-info {
    max-width: 600px;
    margin-left: auto;
    animation: fadeIn 1s ease 0.5s forwards;
    opacity: 0;
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}

.role-badge {
    display: inline-block;
    background: var(--color-accent);
    color: white;
    padding: 12px 30px;
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 30px;
    transform: skew(-5deg);
}

.about-snippet {
    font-size: 1.3rem;
    line-height: 1.8;
    color: #555;
}

.scroll-prompt {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    50% {
        transform: translateX(-50%) translateY(-10px);
    }
}

.projects-showcase {
    padding: 120px 40px;
    background: var(--color-dark);
    color: white;
}

.showcase-title {
    font-family: 'Bebas Neue', cursive;
    font-size: 5rem;
    text-align: center;
    margin-bottom: 80px;
    letter-spacing: 3px;
}

.projects-masonry {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
    max-width: 1400px;
    margin: 0 auto;
}

.masonry-item {
    aspect-ratio: 1;
    background: linear-gradient(135deg, var(--color-accent), var(--color-secondary));
    position: relative;
    overflow: hidden;
    cursor: none;
    transition: transform 0.4s ease;
}

.masonry-item:hover {
    transform: scale(1.05);
}

.project-overlay {
    position: absolute;
    inset: 0;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: opacity 0.4s ease;
}

.masonry-item:hover .project-overlay {
    opacity: 1;
}

.project-index {
    font-family: 'Bebas Neue', cursive;
    font-size: 6rem;
    position: absolute;
    top: -20px;
    right: 20px;
    opacity: 0.2;
}

.project-name {
    font-family: 'Bebas Neue', cursive;
    font-size: 3rem;
    margin-bottom: 15px;
    line-height: 1;
}

.project-brief {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 20px;
}

.view-project-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: white;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: gap 0.3s ease;
}

.view-project-btn:hover {
    gap: 20px;
}

.experience-showcase {
    padding: 120px 40px;
}

.showcase-container {
    max-width: 1200px;
    margin: 0 auto;
}

.big-heading {
    font-family: 'Bebas Neue', cursive;
    font-size: 5rem;
    margin-bottom: 80px;
    letter-spacing: 2px;
}

.experience-cards {
    display: grid;
    gap: 40px;
}

.exp-card {
    background: white;
    padding: 50px;
    border: 3px solid var(--color-dark);
    box-shadow: 15px 15px 0 var(--color-accent);
    transition: all 0.3s ease;
}

.exp-card:hover {
    transform: translate(-5px, -5px);
    box-shadow: 20px 20px 0 var(--color-accent);
}

.exp-meta {
    margin-bottom: 20px;
}

.exp-dates {
    display: inline-block;
    background: var(--color-dark);
    color: var(--color-accent);
    padding: 8px 20px;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.exp-role {
    font-family: 'Bebas Neue', cursive;
    font-size: 3rem;
    margin-bottom: 10px;
    line-height: 1;
}

.exp-company {
    font-size: 1.5rem;
    color: var(--color-accent);
    margin-bottom: 20px;
    font-weight: 700;
}

.exp-desc {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
}

.skills-display {
    padding: 120px 0;
    background: var(--color-accent);
    overflow: hidden;
}

.skills-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
}

.skills-marquee {
    overflow: hidden;
    margin-top: 60px;
}

.marquee-content {
    display: flex;
    gap: 30px;
    animation: marquee 30s linear infinite;
}

@keyframes marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

.skill-badge {
    font-family: 'Bebas Neue', cursive;
    font-size: 4rem;
    color: white;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.contact-footer {
    padding: 120px 40px;
    background: var(--color-dark);
    color: white;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

.footer-heading {
    font-family: 'Bebas Neue', cursive;
    font-size: 6rem;
    line-height: 1.1;
    margin-bottom: 60px;
    letter-spacing: 2px;
}

.contact-link {
    display: block;
    font-size: 2.5rem;
    color: var(--color-accent);
    text-decoration: none;
    margin-bottom: 40px;
    transition: transform 0.3s ease;
}

.contact-link:hover {
    transform: scale(1.05);
}

.social-links {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.social-btn {
    padding: 15px 40px;
    background: transparent;
    border: 3px solid white;
    color: white;
    text-decoration: none;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;
}

.social-btn:hover {
    background: white;
    color: var(--color-dark);
}

@media (max-width: 768px) {
    .mega-line:nth-child(2) {
        padding-left: 20px;
    }
    
    .projects-masonry {
        grid-template-columns: 1fr;
    }
    
    .exp-card {
        padding: 30px;
    }
    
    .skill-badge {
        font-size: 2.5rem;
    }
}
      `,
      js: `
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = \`\${posX}px\`;
        cursorDot.style.top = \`\${posY}px\`;
        cursorDot.style.opacity = '1';

        cursorOutline.style.left = \`\${posX}px\`;
        cursorOutline.style.top = \`\${posY}px\`;
        cursorOutline.style.opacity = '1';

        cursorOutline.animate({
            left: \`\${posX}px\`,
            top: \`\${posY}px\`
        }, { duration: 500, fill: 'forwards' });
    });

    // Expand cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .masonry-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Parallax effect on project items
    document.querySelectorAll('.masonry-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            item.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(1.05)\`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Scroll reveal animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate experience cards
    document.querySelectorAll('.exp-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = \`all 0.8s ease \${index * 0.2}s\`;
        observer.observe(card);
    });

    // Animate project items
    document.querySelectorAll('.masonry-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = \`all 0.6s ease \${index * 0.1}s\`;
        observer.observe(item);
    });

    // Smooth color transitions
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});
      `
    }
  }
];

module.exports = sampleTemplates;

async function seedTemplates() {
  try {
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing templates
    await Template.deleteMany({});
    console.log('Cleared existing templates');

    // Insert sample templates
    await Template.insertMany(sampleTemplates);
    console.log('Sample templates inserted successfully');

    // Disconnect from    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    console.log('✅ Templates seeded successfully!');
  } catch (error) {
    console.error('Error seeding templates:', error);
    process.exit(1);
  }
}

seedTemplates();
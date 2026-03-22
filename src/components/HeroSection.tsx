import React, { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Github, FileUser, Linkedin, ExternalLink } from 'lucide-react';
import OSWindow from './OSWindow';

const techBadges = ['REACT', 'NEXT.JS', 'NODE.JS', 'TYPESCRIPT', 'JAVA', 'SPRING'];

const TypewriterText = React.memo(({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete) {
          const timeout = setTimeout(onComplete, 50);
          return () => clearTimeout(timeout);
        }
      }
    }, 20);
    return () => clearInterval(interval);
  }, [text]);
  return <span className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">{displayed}</span>;
});

export default function HeroSection() {
  const [lineIndex, setLineIndex] = useState(0);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const abdulButtonStyle = {
    clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
  };

  const lines = [
    { content: '// Welcome to my workspace' },
    { content: "import { Developer } from './universe';" },
    { content: ' ' },
    { content: 'const Portfolio = () => {' },
    { content: '  return (' },
    { content: '    <Developer' },
    { content: '      name="Ansh Babel"' },
    { content: '      role="B.Tech CSE Student"' },
    { content: '      passion="Engineering Beyond Boundaries"' },
    { content: '    />' },
    { content: '  );' },
    { content: '};' },
  ];

  return (
    <section className="min-h-screen flex items-center relative z-10 px-4 md:px-8 lg:px-16">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="os-tag-active mb-6 w-fit uppercase text-[10px] tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-os-red inline-block mr-2 animate-pulse" />
            SYSTEM.KERNEL :: v2.5.0 ONLINE
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white tracking-tighter leading-[0.9]">
            Hello, I'm<br />
            <span className="bg-gradient-to-r from-os-cyan via-os-amber to-os-red bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">
              Ansh Babel
            </span>
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-os-green font-mono text-sm">&lt;B.Tech CSE Student /&gt;</span>
            <span className="text-os-text-muted text-sm font-light">Engineering Beyond Boundaries.</span>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8">
            {/* 1. LINKEDIN BUTTON (Replaces Initialize OS) */}
            <a 
              href="https://www.linkedin.com/in/anshbabel" 
              target="_blank" 
              style={abdulButtonStyle} 
              className="bg-white/10 border border-white/20 px-4 py-4 flex items-center gap-4 flex-1 backdrop-blur-xl group hover:bg-white/15 transition-all"
            >
              <div className="w-10 h-10 rounded bg-os-cyan/20 flex items-center justify-center text-os-cyan font-bold shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-black text-white uppercase tracking-widest">Connect</div>
                <div className="text-[9px] font-mono text-os-text-muted">LinkedIn Profile</div>
              </div>
            </a>

            {/* 2. GITHUB BUTTON */}
            <a 
              href="https://github.com/AnshBabel" 
              target="_blank" 
              style={abdulButtonStyle} 
              className="bg-white/10 border border-white/20 px-8 py-4 flex items-center gap-3 hover:bg-os-cyan/20 hover:text-os-cyan transition-all backdrop-blur-xl group"
            >
              <Github className="w-5 h-5 text-white group-hover:text-os-cyan" />
              <div className="text-left">
                <div className="text-[9px] text-os-text-muted uppercase tracking-widest">Source</div>
                <div className="text-xs font-bold uppercase text-white tracking-widest group-hover:text-os-cyan">GitHub</div>
              </div>
            </a>

            {/* 3. CV PREVIEW BUTTON */}
            <a 
              href="YOUR_CV_DRIVE_LINK_HERE" 
              target="_blank" 
              style={abdulButtonStyle} 
              className="bg-white/10 border border-white/20 px-8 py-4 flex items-center gap-3 hover:bg-os-amber/20 hover:text-os-amber transition-all backdrop-blur-xl group"
            >
              <FileUser className="w-5 h-5 text-white group-hover:text-os-amber" />
              <div className="text-left">
                <div className="text-[9px] text-os-text-muted uppercase tracking-widest">Resume</div>
                <div className="text-xs font-bold uppercase text-white tracking-widest group-hover:text-os-amber">CV Preview</div>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-3 mt-12 flex-wrap">
            <span className="text-[10px] font-mono text-os-text-muted tracking-widest mr-2 uppercase">Modules:</span>
            {techBadges.map((badge) => (
              <span key={badge} className="os-tag text-[9px] px-2 py-1 tracking-tighter opacity-70 hover:opacity-100">{badge}</span>
            ))}
          </div>
        </motion.div>

        {/* Right Side Window */}
        <motion.div className="hidden lg:block">
          <OSWindow id="hero-code" title="portfolio.tsx">
            <div className="p-6 font-mono text-sm leading-7 min-h-[350px]">
              {lines.map((line, idx) => (
                <Line key={idx} n={idx + 1}>
                  {lineIndex === idx ? (
                    <TypewriterText text={line.content} onComplete={() => setLineIndex(idx + 1)} />
                  ) : lineIndex > idx ? (
                    <span>{line.content}</span>
                  ) : null}
                </Line>
              ))}
            </div>
            
            <div className="px-6 pb-6 flex gap-4">
              <button className="os-tag-active flex items-center gap-2 px-5 py-2 hover:brightness-125 transition-all text-xs font-bold uppercase tracking-widest">
                <span className="text-os-green">▶</span> Run Profile
              </button>
              <button onClick={scrollToProjects} className="os-tag flex items-center gap-2 px-5 py-2 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest">
                📁 View Projects
              </button>
            </div>
          </OSWindow>
        </motion.div>
      </div>
    </section>
  );
}

function Line({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex">
      <span className="w-8 text-right mr-4 text-os-text-muted select-none text-xs">{n}</span>
      <div className="flex-1 whitespace-pre">{children}</div>
    </div>
  );
}
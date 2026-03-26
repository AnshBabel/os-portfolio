import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, FileUser, Linkedin } from 'lucide-react';
import OSWindow from './OSWindow';

const techBadges = ['REACT', 'NEXT.JS', 'NODE.JS', 'TYPESCRIPT', 'JAVA', 'SPRING'];

// Typewriter Component to handle character-by-character printing
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
          const timeout = setTimeout(onComplete, 100); // Small delay before moving to next line
          return () => clearTimeout(timeout);
        }
      }
    }, 30); // Speed of typing
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <span className="drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">{displayed}</span>;
});

export default function HeroSection() {
  // Task 1: Initialize state to track current line being typed
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
    { content: '// Welcome to Ansh-OS v2.6.0', type: 'comment', extra: '' },
    { content: "import ", type: 'keyword', extra: "{ Developer } from './universe';" },
    { content: ' ', type: 'default', extra: '' },
    { content: 'const ', type: 'keyword', extra: "Portfolio = () => {" },
    { content: '  return (', type: 'keyword', extra: '' },
    { content: '    <Developer', type: 'tag', extra: '' },
    { content: '      name=', type: 'tag', extra: '"Ansh Babel"' },
    { content: '      status=', type: 'tag', extra: '"Active_Node"' },
    { content: '      mission=', type: 'tag', extra: '"Full_Stack_Engineering"' },
    { content: '    />', type: 'tag', extra: '' },
    { content: '  );', type: 'keyword', extra: '' },
    { content: '};', type: 'keyword', extra: '' },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center relative z-10 px-4 md:px-8 lg:px-16">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="os-tag-active mb-6 w-fit uppercase text-[10px] tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-os-red inline-block mr-2 animate-pulse" />
            SYSTEM.KERNEL :: ONLINE
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white tracking-tighter leading-[0.9]">
            Hello, I'm<br />
            <span 
              className="bg-gradient-to-r from-[#f59e0b] to-[#00ffff] bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 0 10px rgba(245, 158, 11, 0.3))" }}
            >
              Ansh Babel
            </span>
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-os-green font-mono text-sm">&lt;B.Tech CSE Student&gt;</span>
            <span className="text-os-text-muted text-sm font-light">
              Engineering Beyond Boundaries. Specializing in distributed systems and high-performance applications.
            </span>
          </div>
          
          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8">
            <a 
              href="https://www.linkedin.com/in/anshbabel" 
              target="_blank" 
              style={abdulButtonStyle} 
              className="bg-white/10 border border-white/20 px-4 py-4 flex items-center gap-4 flex-1 backdrop-blur-xl group hover:bg-os-cyan/20 transition-all"
            >
              <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-white group-hover:text-os-cyan transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-black text-white uppercase tracking-widest">Connect</div>
                <div className="text-[9px] font-mono text-os-text-muted">LinkedIn Profile</div>
              </div>
            </a>

            <a 
              href="https://github.com/AnshBabel" 
              target="_blank" 
              style={abdulButtonStyle} 
              className="bg-white/10 border border-white/20 px-8 py-4 flex items-center gap-3 hover:bg-os-amber/20 transition-all group"
            >
              <Github className="w-5 h-5 text-white group-hover:text-os-amber" />
              <div className="text-left">
                <div className="text-[9px] text-os-text-muted uppercase tracking-widest">Source</div>
                <div className="text-xs font-bold uppercase text-white group-hover:text-os-amber">GitHub</div>
              </div>
            </a>

            <a 
              href="https://drive.google.com/file/d/1qLVWCQ_o22cjaXmiUfxdhQZhk74pPCW7/view?usp=drive_link" 
              target="_blank" 
              style={abdulButtonStyle} 
              className="bg-white/10 border border-white/20 px-8 py-4 flex items-center gap-3 hover:bg-os-cyan/20 transition-all group"
            >
              <FileUser className="w-5 h-5 text-white group-hover:text-os-cyan" />
              <div className="text-left">
                <div className="text-[9px] text-os-text-muted uppercase tracking-widest">Resume</div>
                <div className="text-xs font-bold uppercase text-white group-hover:text-os-cyan">CV Preview</div>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-3 mt-12 flex-wrap">
            <span className="text-[10px] font-mono text-os-text-muted tracking-widest mr-2 uppercase">Modules:</span>
            {techBadges.map((badge) => (
              <span key={badge} className="os-tag text-[9px] px-2 py-1 opacity-70 hover:opacity-100 transition-opacity">{badge}</span>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Terminal Window with Task 1 Update */}
        <div className="hidden lg:block">
          <OSWindow id="hero-code" title="portfolio.tsx">
            <div className="p-6 font-mono text-[13px] leading-7 min-h-[380px] bg-[#0c0c0e]/50">
              {lines.map((line, idx) => (
                <div key={idx} className="flex min-h-[28px]">
                  {/* Line numbers stay visible from start */}
                  <span className="w-8 text-right mr-4 text-zinc-700 select-none text-xs">{idx + 1}</span>
                  <div className="flex-1 whitespace-pre">
                    {/* Condition to only show content line-by-line */}
                    {lineIndex >= idx && (
                      <span className={
                        line.type === 'comment' ? 'text-zinc-500 italic' :
                        line.type === 'keyword' ? 'text-os-cyan' :
                        line.type === 'tag' ? 'text-os-amber' : 'text-zinc-300'
                      }>
                        {lineIndex === idx ? (
                          <TypewriterText text={line.content} onComplete={() => setLineIndex(idx + 1)} />
                        ) : (
                          <span>{line.content}</span>
                        )}
                        <span className="text-zinc-300">{line.extra}</span>
                      </span>
                    )}
                  </div>
                </div>
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
        </div>
      </div>
    </section>
  );
}
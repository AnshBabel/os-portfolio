import React, { useEffect } from 'react';
import { Cpu } from 'lucide-react';

const skills = [
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
];

export default function SkillsSection() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.goat1000.com/tagcanvas.min.js';
    script.async = true;
    script.onload = () => {
      try {
        // @ts-ignore
        window.TagCanvas.Start('skills-canvas', 'skills-list', {
          textColour: null,
          outlineColour: 'transparent',
          reverse: true,
          depth: 1,
          maxSpeed: 0.05,
          minSpeed: 0.02, // Constant rotation
          wheelZoom: false,
          imageScale: 1.4,
          fadeIn: 800,
          clickToFront: 600,
          imageMode: 'both',
          imagePosition: 'top',
          noSelect: true,
        });
      } catch (e) { console.error(e); }
    };
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden flex flex-col items-center">
      {/* Header */}
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 lg:px-16 mb-8">
        <div className="flex items-center gap-3 text-2xl font-mono font-bold">
          <span className="text-cyan-400"><Cpu className="w-6 h-6" /></span>
          <h2 className="text-white tracking-widest text-3xl uppercase"># Skills.json</h2>
        </div>
      </div>

      <div className="relative w-full max-w-[650px] aspect-square flex items-center justify-center">
        
        {/* THE GEODESIC WIREFRAME MESH */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-cyan-500/10 rounded-full blur-3xl opacity-50" />
          
          <svg viewBox="0 0 100 100" className="w-[115%] h-[115%] opacity-20 animate-[spin_60s_linear_infinite]">
            <defs>
              <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00ffff" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {/* The Ditto Wireframe Pattern */}
            <circle cx="50" cy="50" r="48" fill="none" stroke="url(#meshGrad)" strokeWidth="0.1" />
            <path d="M50 2 L50 98 M2 50 L98 50 M15 15 L85 85 M85 15 L15 85" stroke="url(#meshGrad)" strokeWidth="0.08" />
            <path d="M50 2 L85 15 L98 50 L85 85 L50 98 L15 85 L2 50 L15 15 Z" fill="none" stroke="url(#meshGrad)" strokeWidth="0.1" />
            <path d="M50 2 L15 15 M50 2 L85 15 M98 50 L85 15 M98 50 L85 85 M50 98 L85 85 M50 98 L15 85 M2 50 L15 85 M2 50 L15 15" stroke="url(#meshGrad)" strokeWidth="0.08" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="url(#meshGrad)" strokeWidth="0.08" strokeDasharray="1,1" />
          </svg>
        </div>
        
        <canvas
          id="skills-canvas"
          width="900"
          height="900"
          className="w-full h-full cursor-grab active:cursor-grabbing z-10 relative"
        >
          <ul id="skills-list" className="hidden">
            {skills.map((skill) => (
              <li key={skill.name}>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <img width="50" height="50" src={skill.icon} alt={skill.name} />
                  <span className="text-white font-mono text-[9px] uppercase">{skill.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </canvas>

        {/* Drag Instruction */}
        <div className="absolute bottom-[-40px] z-20 flex items-center gap-3 px-6 py-2 bg-[#0c0c0e]/90 border border-white/10 rounded-full backdrop-blur-md">
           <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,255,255,1)]" />
           <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-[0.4em]">
             Drag to explore skills universe
           </span>
        </div>
      </div>
    </section>
  );
}
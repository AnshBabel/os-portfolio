import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Settings, Terminal, Database, Search, Folder, ExternalLink, Cpu } from 'lucide-react';

const rawSkills = [
  // Frontend
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', cat: 'frontend', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', color: 'rgba(227, 76, 38, 0.15)' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', cat: 'frontend', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', color: 'rgba(38, 77, 228, 0.15)' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', cat: 'frontend', url: 'https://react.dev/', color: 'rgba(97, 218, 251, 0.15)' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', cat: 'frontend', url: 'https://tailwindcss.com/docs', color: 'rgba(56, 189, 248, 0.15)' },
  
  // Backend
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', cat: 'backend', url: 'https://www.php.net/manual/en/', color: 'rgba(119, 123, 179, 0.15)' },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', cat: 'backend', url: 'https://laravel.com/docs/', color: 'rgba(255, 45, 32, 0.15)' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', cat: 'backend', url: 'https://nodejs.org/api/', color: 'rgba(51, 153, 51, 0.15)' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', cat: 'backend', url: 'https://www.typescriptlang.org/docs/', color: 'rgba(49, 120, 198, 0.15)' },
  
  // Database
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', cat: 'database', url: 'https://dev.mysql.com/doc/', color: 'rgba(0, 117, 143, 0.15)' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', cat: 'database', url: 'https://www.mongodb.com/docs/', color: 'rgba(71, 162, 72, 0.15)' },
  
  // Tools
  { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg', cat: 'tools', url: 'https://www.canva.com/help/', color: 'rgba(0, 196, 201, 0.15)' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', cat: 'tools', url: 'https://git-scm.com/doc', color: 'rgba(240, 80, 50, 0.15)' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', cat: 'tools', url: 'https://docs.github.com/', color: 'rgba(255, 255, 255, 0.2)' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', cat: 'tools', url: 'https://vercel.com/docs', color: 'rgba(255, 255, 255, 0.2)' },
  
  // Languages
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', cat: 'languages', url: 'https://docs.python.org/3/', color: 'rgba(55, 118, 171, 0.15)' },
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', cat: 'languages', url: 'https://en.cppreference.com/w/c', color: 'rgba(168, 184, 203, 0.15)' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', cat: 'languages', url: 'https://en.cppreference.com/w/cpp', color: 'rgba(0, 89, 156, 0.15)' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', cat: 'languages', url: 'https://docs.oracle.com/en/java/', color: 'rgba(0, 115, 150, 0.15)' },
];

const skills = [...rawSkills].sort((a, b) => a.name.localeCompare(b.name));

const CATEGORIES = [
  { id: 'all', label: "root_dir", icon: <Folder size={14} /> },
  { id: 'frontend', label: "frontend_ui", icon: <Layout size={14} /> },
  { id: 'backend', label: "backend_services", icon: <Settings size={14} /> },
  { id: 'database', label: "database_schemas", icon: <Database size={14} /> },
  { id: 'languages', label: "system_langs", icon: <Terminal size={14} /> },
  { id: 'tools', label: "devops_tools", icon: <Cpu size={14} /> },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
          minSpeed: 0.02, 
          wheelZoom: false, 
          imageScale: 1.4,
          fadeIn: 800, 
          clickToFront: 600, 
          imageMode: 'image',
          noSelect: true,
        });
      } catch (e) { console.error(e); }
    };
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const filteredSkills = skills.filter(s => 
    (activeTab === 'all' || s.cat === activeTab) &&
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="skills" className="py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto flex flex-col items-start">
      
      <div className="w-full mb-12">
        <h2 className="text-3xl font-mono font-bold text-os-cyan flex items-center gap-4 uppercase">
          <Terminal className="w-10 h-10" /> systemctl status technical-skills
        </h2>
        <div className="h-1 w-24 bg-os-cyan mt-2 opacity-50" />
      </div>

      {/* 1. THE SKILLS UNIVERSE */}
      <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center mb-16 self-center group">
        
        {/* CENTERED IDENTITY AVATAR */}
        <div className="absolute z-40 w-28 h-28 rounded-full border-2 border-os-cyan/50 p-1 bg-black/50 backdrop-blur-md overflow-hidden transition-all duration-500 group-hover:scale-110 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          <img 
            src="/avatar.png" 
            alt="Ansh Avatar"
            className="w-full h-full object-cover rounded-full hover:grayscale-0 transition-all duration-300"
          />
        </div>

        {/* BACKGROUND DECORATION */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <svg viewBox="0 0 100 100" className="w-[115%] h-[115%] opacity-40 animate-[spin_60s_linear_infinite]">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#22d3ee" strokeWidth="0.2" />
            <path d="M50 2 L85 15 L98 50 L85 85 L50 98 L15 85 L2 50 L15 15 Z" fill="none" stroke="#22d3ee" strokeWidth="0.2" />
          </svg>
        </div>
        
        {/* THE CANVAS */}
        <canvas id="skills-canvas" width="800" height="800" className="w-full h-full cursor-grab z-10 relative">
          <ul id="skills-list" className="hidden">
            {skills.map((skill) => (
              <li key={skill.name}>
                <a href={skill.url} target="_blank" rel="noopener noreferrer">
                  <img 
                    width="50" 
                    height="50" 
                    src={skill.icon} 
                    alt={skill.name} 
                    className={skill.name === 'GitHub' || skill.name === 'Vercel' ? 'invert brightness-[200%]' : ''} 
                  />
                </a>
              </li>
            ))}
          </ul>
        </canvas>
      </div>

      {/* 2. COLORFUL FILE EXPLORER */}
      <motion.div className="os-window w-full grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-[500px] overflow-hidden border border-white/10 shadow-2xl bg-black/10">
        
        <div className="bg-black/40 border-r border-white/10 p-4 font-mono">
          <div className="flex items-center gap-2 mb-6 px-2 text-[10px] text-zinc-400 uppercase font-bold tracking-widest">
            <div className="w-2 h-2 rounded-full bg-os-cyan" /> EXPLORER
          </div>
          <div className="space-y-1">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => setActiveTab(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-all group ${activeTab === cat.id ? 'bg-os-cyan/10 text-os-cyan border border-os-cyan/20' : 'text-zinc-500 hover:bg-white/5 border border-transparent'}`}
              >
                {cat.icon} <span className="text-[11px] font-mono">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 bg-transparent flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-2 font-mono text-[11px] text-os-cyan">
              <span className="text-zinc-600">PATH:</span> ~/root/{activeTab}/
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search binaries..." 
                className="bg-black/40 border border-white/10 rounded py-2 pl-10 pr-4 text-[11px] font-mono text-white focus:outline-none focus:border-os-cyan/50 w-full md:w-64"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.a 
                  layout
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  className="flex flex-col items-center gap-4 group cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div 
                    className="relative p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center transition-all duration-300"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = skill.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)')}
                  >
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className={`w-12 h-12 transition-transform group-hover:scale-110 ${
                        skill.name === 'GitHub' || skill.name === 'Vercel' ? 'invert brightness-[200%]' : ''
                      }`} 
                    />
                    <ExternalLink size={12} className="absolute top-2 right-2 opacity-0 group-hover:opacity-40 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-[11px] font-mono text-zinc-400 group-hover:text-white uppercase font-bold tracking-tighter">
                      {skill.name}.sh
                    </p>
                    <p className="text-[9px] font-mono text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Read documentation</p>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
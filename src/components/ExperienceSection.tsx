import React from 'react';
import { motion } from 'framer-motion';
import { FileCode, Award, ExternalLink, Terminal, GitBranch, Trophy } from 'lucide-react';

const commits = [
  {
    hash: "a4b2c3d",
    tag: "HEAD -> mastering_dsa",
    title: "DSA Intensive Mastery",
    organization: "Technical Training",
    duration: "30+ Hours",
    date: "2025-06",
    description: "Completed 30+ hours of advanced Data Structures and Algorithms from Cipher Schools. Optimized 100+ challenges for time and space complexity.",
    skills: ["Data Structures", "Algorithms", "C++"],
    link: "https://drive.google.com/file/d/1vlZcpIn25cYjB0qKKugDfnu27oYqbCVI/view?usp=sharing",
    filesChanged: "3 files changed",
    insertions: "150 insertions(+)",
    deletions: "0 deletions(-)",
    icon: <Terminal className="w-5 h-5 text-os-cyan" />
  },
  {
    hash: "b5c3d4e",
    tag: "achievement -> bronze_medal",
    title: "3rd Position - Innovation Sprint",
    organization: "Hackathon 2025",
    duration: "Feb 2025",
    date: "2025-02",
    description: "Led team to 3rd place among 100+ participants. Built a high-performance financial dashboard with real-time API sync in 48 hours.",
    skills: ["Full-Stack", "Innovation", "System Design"],
    link: "https://drive.google.com/file/d/105ezssFDQKR2aIZLwvKdmwSNzzs9nFgW/view?usp=sharing",
    icon: <Trophy className="w-5 h-5 text-os-amber" />
  },
  {
    hash: "c7d8e9f",
    tag: "credential -> javascript",
    title: "ChatGPT Prompt Engineering",
    organization: "Certification",
    duration: "Issued 2025",
    date: "2025-08",
    description: "Professional certification for ES6+ standards, DOM manipulation, and high-performance asynchronous logic.",
    skills: ["ES6+", "Async JS", "Web APIs"],
    link: "https://drive.google.com/file/d/1y_gf_RpFixp2Wfqa9urXNL_--SRc7fKb/view?usp=sharing",
    filesChanged: "2 files changed",
    insertions: "50 insertions(+)",
    deletions: "0 deletions(-)",
    icon: <FileCode className="w-5 h-5 text-os-amber" />
  },
  {
    hash: "d8e9f0a",
    tag: "credential -> mern_stack",
    title: "Full-Stack Fundamentals",
    organization: "Certification",
    duration: "Issued 2025",
    date: "2024-01",
    description: "Validated expertise in MERN stack architecture, state management, and RESTful API security.",
    skills: ["React", "Node.js", "MongoDB"],
    link: "https://drive.google.com/file/d/1iWiJDo5vnkNIlpKNQtNtd6p67gZgkA8r/view?usp=sharing",
    filesChanged: "8 files changed",
    insertions: "210 insertions(+)",
    deletions: "5 deletions(-)",
    icon: <Award className="w-5 h-5 text-os-cyan" />
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="max-w-7xl mx-auto mb-20 flex items-center justify-center lg:justify-start gap-3"
      >
        <GitBranch className="w-7 h-7 text-os-amber" />
        <h2 className="text-white font-mono text-3xl font-bold tracking-tight">
          $ <span className="text-white hover:text-os-amber transition-colors">git log</span> --stat --oneline
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto relative">
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5 z-0" />

        <div className="space-y-16">
          {commits.map((commit, index) => (
            <div key={commit.hash} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex items-center gap-3 z-10 mt-6 md:-mt-2"
              >
                <div className={`w-3.5 h-3.5 rounded-full bg-[#050508] border-2 ${index === 1 ? 'border-os-amber shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'border-os-cyan shadow-[0_0_15px_rgba(0,255,255,0.5)]'}`} />
                <span className="hidden md:block text-[10px] font-mono text-white/50 px-2 py-0.5 rounded-full border border-white/10 bg-white/5 tracking-wider">
                  {commit.date}
                </span>
              </motion.div>

              <motion.div 
                initial={{ 
                  opacity: 0, 
                  x: index % 2 === 0 ? -50 : 50,
                  filter: "blur(10px)"
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  filter: "blur(0px)"
                }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex-1 ml-12 md:ml-0"
              >
                <div className="os-glass-card p-6 md:p-8 group hover:border-white/10 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.03)] h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6 font-mono text-[10px] sm:text-xs">
                    <span className="text-os-amber font-bold tracking-widest">{commit.hash}</span>
                    <span className="text-os-cyan font-bold tracking-widest uppercase">{commit.tag}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex-shrink-0">
                      {commit.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight truncate">{commit.title}</h3>
                      <p className="text-os-text-muted text-[9px] sm:text-[10px] font-mono uppercase mt-0.5 tracking-wider truncate">
                        {commit.organization} • {commit.duration}
                      </p>
                    </div>
                  </div>

                  <p className="text-os-text-muted text-sm leading-relaxed mb-8 font-mono opacity-90 border-l border-white/5 pl-4">
                    {commit.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {commit.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-[8px] sm:text-[9px] text-os-text-muted font-mono uppercase tracking-widest">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* FIXED RESPONSIVE FOOTER */}
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-6 border-t border-white/5 mt-auto">
                    <a 
                      href={commit.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] font-mono text-os-cyan uppercase tracking-widest hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Verify.sh
                    </a>
                    
                    <div className="text-[9px] sm:text-[10px] font-mono tracking-wider flex flex-wrap gap-x-2 gap-y-1 select-none items-center">
                      <span className="text-zinc-500 whitespace-nowrap">{commit.filesChanged || '1 file changed'}</span>
                      <div className="flex gap-2">
                        <span className="text-emerald-400 whitespace-nowrap">{commit.insertions || '10 insertions(+)'}</span>
                        <span className="text-red-400 whitespace-nowrap">{commit.deletions || '0 deletions(-)'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Coffee } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3 text-2xl font-mono font-bold">
          <span className="text-os-amber">&gt;_</span>
          <h2 className="text-white tracking-widest text-3xl uppercase"># About.system</h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Profile Card (Takes 5 columns) */}
        <div className="lg:col-span-5 os-glass-card p-10 flex flex-col items-center group">
          <div className="relative mb-12">
            <div className="os-half-ring" />
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 relative z-10 p-1 bg-[#0a0a0c]">
              <img 
                src="https://github.com/AnshBabel.png" 
                alt="Ansh Babel"
                className="w-full h-full rounded-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
            </div>
            <div className="absolute bottom-4 right-4 w-5 h-5 bg-emerald-500 rounded-full border-4 border-[#0c0c0e] z-20" />
          </div>

          <div className="w-full space-y-4 font-mono text-xs tracking-[0.2em]">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-os-text-muted uppercase">Operator</span>
              <span className="text-os-amber font-bold">ANSH BABEL</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-os-text-muted uppercase">Role</span>
              <span className="text-os-cyan font-bold uppercase">Full_Stack_Developer</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-os-text-muted uppercase">Location</span>
              <span className="text-white">Indore, India</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-os-text-muted uppercase">Status</span>
              <span className="px-2 border border-emerald-500 text-emerald-500 rounded text-[10px]">OPEN</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Log & Stats (Takes 7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Terminal Log Box */}
          <div className="os-glass-card overflow-hidden">
            <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center justify-between">
              <span className="font-mono text-[11px] text-os-text-muted tracking-widest uppercase">user_profile.log</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="p-8 font-mono space-y-8">
              <div className="group">
                <div className="text-os-cyan text-xs mb-3 transition-transform group-hover:translate-x-1">→ whoami</div>
                <p className="text-os-text-muted text-[13px] leading-relaxed pl-5 border-l border-white/5">
                  Passionate B.Tech Computer Science student with expertise in modern web technologies. I specialize in creating robust, scalable applications.
                </p>
              </div>
              <div className="group">
                <div className="text-os-cyan text-xs mb-3 transition-transform group-hover:translate-x-1">→ cat mission.txt</div>
                <p className="text-os-text-muted text-[13px] leading-relaxed pl-5 border-l border-white/5">
                  Translating complex business requirements into robust technical solutions. Currently focused on <span className="text-white">Full-Stack Development</span> and <span className="text-white">UI/UX</span>.
                </p>
              </div>
            </div>
          </div>

          {/* DITTO Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={<Terminal className="w-5 h-5" />} label="EXPERIENCE" value="1+ YRS" />
            <StatCard icon={<Code className="w-5 h-5" />} label="PROJECTS" value="20+ DEP" />
            <StatCard icon={<Coffee className="w-5 h-5" />} label="CAFFEINE" value="∞ mL" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="os-glass-card p-6 flex flex-col items-center justify-center text-center group cursor-default"
    >
      <div className="text-os-text-muted group-hover:text-white transition-colors mb-3">{icon}</div>
      <span className="text-[9px] text-os-text-muted uppercase tracking-widest mb-1">{label}</span>
      <span className="text-sm font-bold text-white tracking-widest">{value}</span>
    </motion.div>
  );
}
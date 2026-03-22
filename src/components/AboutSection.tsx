import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import OSWindow from './OSWindow';

function useTypewriter(text: string, speed = 20, trigger = true) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!trigger) return;
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, trigger]);
  return displayed;
}

const stats = [
  { icon: '⚙', label: 'EXPERIENCE', value: '4+', unit: 'YRS' },
  { icon: '</>', label: 'PROJECTS', value: '50+', unit: 'DEP' },
  { icon: '☕', label: 'CAFFEINE', value: '∞', unit: 'ml' },
];

export default function AboutSection() {
  const [inView, setInView] = useState(false);
  const whoami = useTypewriter(
    'Passionate full-stack developer with expertise in modern web technologies. I specialize in creating robust, scalable applications that solve real-world problems.',
    15,
    inView
  );
  const mission = useTypewriter(
    'Translating complex business requirements into robust technical solutions. Currently focused on Microservices, Real-time Systems, and AI Integration.',
    15,
    inView
  );

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto" id="about">
      <SectionHeader icon=">_" title="# About.system" />

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        onViewportEnter={() => setInView(true)}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Profile Card */}
        <OSWindow id="about-profile" title="user_profile.card">
          <div className="p-8 flex flex-col items-center">
            <div className="relative mb-8">
              <div className="w-40 h-40 rounded-full bg-os-surface border-2 border-os-amber overflow-hidden flex items-center justify-center">
                <span className="text-5xl font-bold text-os-amber font-mono">AM</span>
              </div>
              <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-os-green border-2 border-background" />
            </div>
            <div className="w-full space-y-3 font-mono text-sm">
              <Row label="OPERATOR" value="ABDUL MOMIN" accent />
              <Row label="ROLE" value="FULL_STACK_SOFTWARE_ENGINEER" accent />
              <Row label="LOCATION" value="Gujranwala, Pakistan" />
              <div className="flex justify-between items-center">
                <span className="text-os-text-muted">STATUS</span>
                <span className="px-2 py-0.5 text-xs border border-os-green text-os-green rounded">OPEN</span>
              </div>
            </div>
          </div>
        </OSWindow>

        {/* Terminal + Stats */}
        <div className="space-y-6">
          <OSWindow id="about-terminal" title="user_profile.log">
            <div className="p-6 font-mono text-sm space-y-4">
              <div>
                <span className="text-os-amber">→ </span>
                <span className="text-os-green font-bold">whoami</span>
              </div>
              <blockquote className="border-l-2 border-os-border pl-4 text-os-text-muted leading-relaxed min-h-[60px]">
                {whoami}<span className="inline-block w-1.5 h-4 bg-os-cyan animate-blink ml-0.5 align-middle" />
              </blockquote>
              <div>
                <span className="text-os-amber">→ </span>
                <span className="text-os-green font-bold">cat mission.txt</span>
              </div>
              <blockquote className="border-l-2 border-os-border pl-4 text-os-text-muted leading-relaxed min-h-[60px]">
                {mission}<span className="inline-block w-1.5 h-4 bg-os-cyan animate-blink ml-0.5 align-middle" />
              </blockquote>
            </div>
          </OSWindow>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="os-window p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="flex items-center gap-1.5 text-os-amber text-xs font-mono mb-2">
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">{s.value}</span>
                  <span className="text-xs text-os-text-muted font-mono">{s.unit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Row({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-os-text-muted">{label}</span>
      <span className={accent ? 'text-os-amber font-bold tracking-wider' : 'text-foreground'}>{value}</span>
    </div>
  );
}

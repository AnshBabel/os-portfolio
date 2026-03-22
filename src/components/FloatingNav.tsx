import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, User, Cpu, Briefcase, Mail, FolderOpen } from 'lucide-react';

const navItems = [
  { id: 'hero', icon: Code2, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'skills', icon: Cpu, label: 'Skills' },
  { id: 'projects', icon: FolderOpen, label: 'Projects' },
  { id: 'experience', icon: Briefcase, label: 'Experience' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 300;

      sections.forEach(section => {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-8">
      {/* The Timeline Vertical Line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 z-0" />

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="group relative flex items-center justify-center transition-all"
          >
            {/* The Nav Label (Tool-tip style) */}
            <span className="absolute right-12 opacity-0 group-hover:opacity-100 transition-opacity bg-os-card border border-white/10 px-2 py-1 rounded text-[10px] uppercase tracking-widest text-os-cyan whitespace-nowrap pointer-events-none">
              {item.label}
            </span>

            {/* The Icon Container (Task 7 implementation) */}
            <div className={`
              relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
              ${isActive ? 'bg-os-cyan/10 border border-os-cyan/40 os-nav-glow' : 'bg-[#0a0a0c] border border-white/10'}
            `}>
              {/* Rotating Orbit Ring for Active Item */}
              {isActive && (
                <div className="absolute -inset-1 rounded-full os-nav-orbit" />
              )}
              
              <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-os-cyan' : 'text-os-text-muted group-hover:text-white'}`} />
            </div>

            {/* Connection Dot for Non-active items */}
            {!isActive && (
              <div className="absolute -bottom-4 w-1 h-1 rounded-full bg-white/20 group-hover:bg-os-cyan/50" />
            )}
          </button>
        );
      })}
    </div>
  );
}
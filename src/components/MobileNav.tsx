import { Home, User, Code, Briefcase, Mail } from 'lucide-react';

const MobileNav = () => {
  const navItems = [
    { icon: <Home size={20} />, label: 'Home', href: '#home' },
    { icon: <User size={20} />, label: 'About', href: '#about' },
    { icon: <Code size={20} />, label: 'Skills', href: '#skills' },
    { icon: <Briefcase size={20} />, label: 'Projects', href: '#projects' },
    { icon: <Mail size={20} />, label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden">
      <div className="flex items-center gap-6 px-6 py-3 bg-black/60 backdrop-blur-xl border border-os-cyan/20 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.1)]">
        {navItems.map((item) => (
          <a 
            key={item.label}
            href={item.href}
            className="text-zinc-500 hover:text-os-cyan transition-all active:scale-95"
            aria-label={item.label}
          >
            {item.icon}
          </a>
        ))}
        
        {/* Decorative tactical scanner line at the bottom of the dock */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-os-cyan shadow-[0_0_8px_#00ffff]" />
      </div>
    </nav>
  );
};

export default MobileNav;
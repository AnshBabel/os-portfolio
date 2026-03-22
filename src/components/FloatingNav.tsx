import { motion } from 'framer-motion';

const links = [
  { href: '#about', icon: '>_', label: 'About' },
  { href: '#skills', icon: '⚙', label: 'Skills' },
  { href: '#projects', icon: '📂', label: 'Projects' },
  { href: '#experience', icon: '🔀', label: 'Experience' },
  { href: '#contact', icon: '✉', label: 'Contact' },
];

export default function FloatingNav() {
  return (
    <motion.nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3, duration: 0.6 }}
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="w-10 h-10 rounded-full border border-os-border bg-background/80 backdrop-blur flex items-center justify-center text-xs hover:border-os-cyan hover:text-cyan transition-all group relative"
          title={link.label}
        >
          <span>{link.icon}</span>
          <span className="absolute right-14 bg-os-surface border border-os-border text-foreground text-xs font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {link.label}
          </span>
        </a>
      ))}
    </motion.nav>
  );
}

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import OSWindow from './OSWindow';

const techBadges = ['REACT', 'NEXT.JS', 'NODE.JS', 'TYPESCRIPT', 'JAVA', 'SPRING'];

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden px-4 md:px-8 lg:px-16">
      {/* Decorative elements */}
      <motion.span
        className="absolute top-20 right-10 font-mono text-xs text-os-text-muted hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {'<System.Init />'}
      </motion.span>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="os-tag-active mb-6 w-fit"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-os-red inline-block" />
            SYSTEM.KERNEL :: v2.5.0 ONLINE
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
            <span className="text-foreground">Hello, I'm</span>
            <br />
            <span className="bg-gradient-to-r from-os-cyan via-os-amber to-os-red bg-clip-text text-transparent">
              Abdul Momin
            </span>
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-os-green font-mono text-sm">&lt;Architect /&gt;</span>
            <span className="text-os-text-muted">Engineering Beyond Boundaries.</span>
          </div>
          <p className="text-os-text-muted max-w-md mb-8 leading-relaxed">
            Specializing in distributed systems, real-time architecture, and high-performance applications.
          </p>

          {/* Terminal card + GitHub */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="os-window px-4 py-3 flex items-center gap-3 flex-1">
              <div className="w-8 h-8 rounded bg-os-amber/20 flex items-center justify-center text-os-amber font-mono text-sm font-bold">
                &gt;_
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-foreground">Initialize OS</div>
                <div className="text-xs font-mono text-os-text-muted">&gt; sudo boot_gui</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-16 bg-os-amber rounded-full" />
                <span className="text-xs font-mono text-os-amber">Loading ...</span>
              </div>
              <ExternalLink className="w-4 h-4 text-os-text-muted" />
            </div>
            <a
              href="https://github.com/Momin-786"
              target="_blank"
              rel="noopener noreferrer"
              className="os-window px-6 py-3 flex items-center gap-3 hover:bg-os-surface-hover transition-colors cursor-pointer"
            >
              <Github className="w-5 h-5 text-foreground" />
              <div>
                <div className="text-xs text-os-text-muted">Check out</div>
                <div className="text-sm font-bold text-foreground">GitHub</div>
              </div>
            </a>
          </div>

          {/* Tech badges */}
          <div className="flex items-center gap-3 mt-8 flex-wrap">
            <span className="text-xs font-mono text-os-text-muted">LOADED_MODULES:</span>
            {techBadges.map((badge) => (
              <span key={badge} className="os-tag text-[10px]">{badge}</span>
            ))}
          </div>

          <motion.p
            className="font-mono text-xs text-os-green/40 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            while(alive) {'{ code() }'}
          </motion.p>
        </motion.div>

        {/* Right - Code Window */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <OSWindow id="hero-code" title="portfolio.tsx">
            <div className="p-6 font-mono text-sm leading-7">
              <Line n={1}><span className="text-os-text-muted">{'// Welcome to my workspace'}</span></Line>
              <Line n={2}><Kw>import</Kw> {'{ '}<Cls>Developer</Cls>{' } '}<Kw>from</Kw> <Str>'./universe'</Str>;</Line>
              <Line n={3}>&nbsp;</Line>
              <Line n={4}><Kw>const</Kw> <Cls>Portfolio</Cls> = () <Sym>=&gt;</Sym> {'{'}</Line>
              <Line n={5}>&nbsp;&nbsp;<Kw>return</Kw> (</Line>
              <Line n={6}>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<Cls>Developer</Cls></Line>
              <Line n={7}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Prp>name</Prp>=<Str>"Abdul Momin"</Str></Line>
              <Line n={8}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Prp>role</Prp>=<Str>"Full Stack Engineer"</Str></Line>
              <Line n={9}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Prp>passion</Prp>=<Str>"Engineering Beyond Boundaries"</Str></Line>
              <Line n={10}>&nbsp;&nbsp;&nbsp;&nbsp;/&gt;</Line>
              <Line n={11}>&nbsp;&nbsp;);</Line>
              <Line n={12}>{'};'}</Line>
            </div>
            <div className="px-6 pb-6 flex gap-4">
              <button className="os-tag-active flex items-center gap-2 px-4 py-2 hover:bg-os-cyan/10 transition-colors active:scale-95">
                <span className="text-os-green">▶</span> Run Profile
              </button>
              <button className="os-tag flex items-center gap-2 px-4 py-2 hover:bg-muted transition-colors active:scale-95">
                📁 View Projects
              </button>
            </div>
          </OSWindow>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span className="text-os-text-muted text-2xl">⌄</span>
      </motion.div>
    </section>
  );
}

function Line({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="w-8 text-right mr-4 text-os-text-muted select-none">{n}</span>
      <span>{children}</span>
    </div>
  );
}
function Kw({ children }: { children: React.ReactNode }) {
  return <span className="text-[#c586c0]">{children}</span>;
}
function Cls({ children }: { children: React.ReactNode }) {
  return <span className="text-[#4ec9b0]">{children}</span>;
}
function Str({ children }: { children: React.ReactNode }) {
  return <span className="text-[#ce9178]">{children}</span>;
}
function Prp({ children }: { children: React.ReactNode }) {
  return <span className="text-[#9cdcfe]">{children}</span>;
}
function Sym({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground">{children}</span>;
}

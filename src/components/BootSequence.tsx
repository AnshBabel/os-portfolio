import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  { text: 'SYSTEM.KERNEL :: v2.5.0 ONLINE', delay: 0 },
  { text: 'LOADING MODULES...', delay: 300 },
  { text: '> react.core .............. OK', delay: 500 },
  { text: '> typescript.engine ....... OK', delay: 650 },
  { text: '> tailwind.styles ........ OK', delay: 800 },
  { text: 'MOUNTING FILESYSTEM...', delay: 1000 },
  { text: '> /home/abdul/portfolio', delay: 1150 },
  { text: '> /usr/lib/framer-motion', delay: 1300 },
  { text: 'INITIALIZING DISPLAY SERVER...', delay: 1500 },
  { text: 'ALL SYSTEMS NOMINAL', delay: 1800 },
  { text: '', delay: 2000 },
  { text: '████████████████████████ 100%', delay: 2100 },
  { text: '', delay: 2200 },
  { text: 'SUCCESS. Welcome, Abdul.', delay: 2300 },
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });
    setTimeout(() => setDone(true), 2800);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 400);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-2xl px-6">
            <div className="os-window p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-os-red" />
                <div className="w-3 h-3 rounded-full bg-os-amber" />
                <div className="w-3 h-3 rounded-full bg-os-green" />
                <span className="ml-3 text-xs font-mono text-os-text-muted">system.init</span>
              </div>
              <div className="font-mono text-sm space-y-1">
                {bootLines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={
                      line.text.includes('SUCCESS') ? 'text-os-green font-bold' :
                      line.text.includes('OK') ? 'text-os-green' :
                      line.text.includes('████') ? 'text-cyan' :
                      'text-os-text-muted'
                    }
                  >
                    {line.text}
                  </motion.div>
                ))}
                <span className="inline-block w-2 h-4 bg-os-green animate-blink" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

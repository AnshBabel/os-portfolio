import { ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';

interface OSWindowProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  draggable?: boolean;
  icon?: ReactNode;
}

export default function OSWindow({ id, title, children, className = '', draggable = false, icon }: OSWindowProps) {
  const { focusWindow, zIndexMap } = useWindowStore();
  const constraintsRef = useRef(null);
  const z = zIndexMap[id] || 1;

  const content = (
    <div
      className={`os-window os-glow-cyan overflow-hidden ${className}`}
      style={{ zIndex: z }}
      onMouseDown={() => focusWindow(id)}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-os select-none">
        <div className="w-3 h-3 rounded-full bg-os-red cursor-pointer hover:brightness-125 transition-all active:scale-90" />
        <div className="w-3 h-3 rounded-full bg-os-amber cursor-pointer hover:brightness-125 transition-all active:scale-90" />
        <div className="w-3 h-3 rounded-full bg-os-green cursor-pointer hover:brightness-125 transition-all active:scale-90" />
        <div className="flex items-center gap-2 ml-3">
          {icon}
          <span className="text-xs font-mono text-os-text-muted">{title}</span>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );

  if (draggable) {
    return (
      <div ref={constraintsRef} className="absolute inset-0 pointer-events-none">
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragMomentum={false}
          className="pointer-events-auto inline-block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {content}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {content}
    </motion.div>
  );
}

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface OSWindowProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function OSWindow({ title, children, className = "" }: OSWindowProps) {
  return (
    <div className={`os-window overflow-hidden flex flex-col ${className}`}>
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 select-none">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[10px] font-mono text-os-text-muted uppercase tracking-[0.3em]">
          {title}
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>
      
      {/* Window Content */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        {children}
      </div>
    </div>
  );
}
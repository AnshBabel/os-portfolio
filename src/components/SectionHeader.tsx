import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function SectionHeader({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <motion.h2
      className="flex items-center gap-3 text-2xl md:text-3xl font-bold font-mono mb-10"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-cyan">{icon}</span>
      <span className="text-foreground">{title}</span>
    </motion.h2>
  );
}

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const skills = [
  { name: 'React', color: '#61dafb' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'Java', color: '#ed8b00' },
  { name: 'Spring Boot', color: '#6db33f' },
  { name: 'Python', color: '#3776ab' },
  { name: 'Go', color: '#00add8' },
  { name: 'Rust', color: '#dea584' },
  { name: 'C++', color: '#00599c' },
  { name: 'Kotlin', color: '#7f52ff' },
  { name: 'Tailwind', color: '#06b6d4' },
  { name: 'Three.js', color: '#ffffff' },
  { name: 'K8s', color: '#326ce5' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'AWS', color: '#ff9900' },
  { name: 'Linux', color: '#fcc624' },
  { name: 'Firebase', color: '#ffca28' },
  { name: 'GraphQL', color: '#e535ab' },
  { name: 'MySQL', color: '#4479a1' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'Redis', color: '#dc382d' },
  { name: 'Terraform', color: '#7b42bc' },
  { name: 'Azure', color: '#0078d4' },
  { name: 'Bash', color: '#4eaa25' },
];

export default function SkillsSection() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto" id="skills">
      <SectionHeader icon="⚙" title="# Skills.json" />

      <div className="relative">
        {/* Globe wireframe decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[500px] h-[500px] rounded-full border border-os-amber/30" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-os-amber/20 rotate-45" />
          <div className="absolute w-[350px] h-[350px] rounded-full border border-os-amber/15 -rotate-12" />
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 relative z-10 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.04 } },
          }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="os-window px-4 py-3 flex items-center gap-2 cursor-grab active:cursor-grabbing select-none"
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              whileHover={{ scale: 1.08, boxShadow: `0 0 20px ${skill.color}33` }}
              whileTap={{ scale: 0.95 }}
              drag
              dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
              dragElastic={0.3}
              dragMomentum
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
              <span className="font-mono text-sm text-foreground">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

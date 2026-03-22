import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const experiences = [
  {
    hash: 'a1b2ca2',
    branch: 'HEAD → engineer',
    company: 'EboSoft Solutions',
    title: 'Full Stack Engineer',
    period: '2024-05 – Present',
    description: 'Leading development of scalable web applications with focus on performance and reliability.',
    skills: ['React', 'Next.js', 'TypeScript', 'NestJS', 'Spring Boot', 'MongoDB', 'AWS', 'Docker', 'Git', 'Jira', 'Figma'],
    stats: { files: 11, insertions: 100, deletions: 10 },
  },
  {
    hash: 'a1b2ca1',
    branch: 'HEAD → developer',
    company: 'Freelance - Upwork/ Fiverr',
    title: 'Full Stack Developer',
    period: '2022-06 – 2024-05',
    description: 'Developed and maintained web applications for various clients across different industries.',
    skills: ['JavaScript', 'Express', 'PostgreSQL', 'React'],
    stats: { files: 4, insertions: 120, deletions: 15 },
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto" id="experience">
      <SectionHeader icon="🔀" title="$ git log --stat --oneline" />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-os-border hidden lg:block" />

        <div className="space-y-16">
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={exp.hash}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${isLeft ? '' : 'lg:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Card */}
                <div className={`flex-1 ${isLeft ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="os-window p-6">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="font-mono text-xs text-os-amber">{exp.hash}</span>
                      <span className="os-tag-active text-[10px]">{exp.branch}</span>
                      <span className="text-xs text-os-text-muted font-mono ml-auto">{exp.company}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {exp.title} <span className="text-os-text-muted font-normal text-sm">@ {exp.company}</span>
                    </h3>
                    <blockquote className="border-l-2 border-os-border pl-4 text-sm text-os-text-muted mb-4 font-mono leading-relaxed">
                      {exp.description}
                    </blockquote>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.skills.map((s) => (
                        <span key={s} className="os-tag text-[10px]">{s}</span>
                      ))}
                    </div>
                    <div className="text-xs font-mono text-os-text-muted flex items-center gap-4">
                      <span>📄 {exp.stats.files} files changed</span>
                      <span className="text-os-green">+{exp.stats.insertions} insertions</span>
                      <span className="text-os-red">-{exp.stats.deletions} deletions</span>
                    </div>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                  <div className="w-4 h-4 rounded-full border-2 border-os-amber bg-background" />
                </div>

                {/* Date */}
                <div className={`flex-1 ${isLeft ? 'lg:pl-12' : 'lg:pr-12'} flex ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
                  <div className="os-tag flex items-center gap-2">
                    <span>📅</span>
                    <span>{exp.period}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Initial commit */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="os-window px-6 py-3 flex items-center gap-2 font-mono text-sm text-os-text-muted">
            <span>🔑</span> Initial Commit (Hello World)
          </div>
        </motion.div>
      </div>
    </section>
  );
}

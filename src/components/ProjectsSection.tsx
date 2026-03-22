import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Star } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface Repo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string | null;
  topics: string[];
}

const pinnedNames = ['trackmate', 'ripple', 'stocklens', 'resumate'];

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  Python: '#3572a5',
  'Next.js': '#000000',
  React: '#61dafb',
  Mathematica: '#dd1100',
};

export default function ProjectsSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [allRepos, setAllRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/Momin-786/repos?per_page=100&sort=updated')
      .then((r) => r.json())
      .then((data: Repo[]) => {
        if (Array.isArray(data)) {
          setAllRepos(data);
          const pinned = pinnedNames
            .map((name) => data.find((r) => r.name.toLowerCase() === name))
            .filter(Boolean) as Repo[];
          setRepos(pinned.length > 0 ? pinned : data.slice(0, 4));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto" id="projects">
      <SectionHeader icon="📂" title="$ ls -la ~/projects" />

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Repo list */}
        <motion.div
          className="os-window p-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="font-mono text-sm text-foreground flex items-center gap-2">
              📁 Repositories
            </span>
            <span className="text-xs text-os-text-muted font-mono">{allRepos.length || 21}</span>
          </div>
          <div className="space-y-1 max-h-[400px] overflow-y-auto">
            {(allRepos.length > 0 ? allRepos.slice(0, 10) : Array.from({ length: 8 }, (_, i) => ({
              name: `repo-${i}`, language: 'JavaScript', html_url: '#',
            }))).map((repo: any) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded hover:bg-muted transition-colors group"
              >
                <div>
                  <div className="text-sm text-cyan group-hover:underline font-mono">{repo.name}</div>
                  <div className="text-xs text-os-text-muted flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: languageColors[repo.language] || '#888' }} />
                    {repo.language || 'Unknown'}
                  </div>
                </div>
                <span className="text-[10px] text-os-text-muted font-mono border border-os-border rounded px-1.5 py-0.5">Public</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Pinned projects */}
        <div>
          <div className="text-xs font-mono text-os-text-muted tracking-widest mb-4">PINNED PROJECTS</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo, i) => (
              <motion.div
                key={repo.name}
                className="os-window p-5 hover:border-os-cyan/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-bold text-cyan flex items-center gap-2">
                    📄 {repo.name}
                  </span>
                  <span className="text-[10px] text-os-text-muted border border-os-border rounded px-1.5 py-0.5 font-mono">Public</span>
                </div>
                <p className="text-xs text-os-text-muted mb-4 leading-relaxed line-clamp-3 font-mono">
                  {repo.description || 'No description available.'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(repo.topics || []).slice(0, 6).map((t) => (
                    <span key={t} className="os-tag text-[10px]">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-os-text-muted font-mono">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: languageColors[repo.language] || '#888' }} />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork className="w-3 h-3" /> {repo.forks_count}</span>
                  </div>
                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-cyan hover:underline">
                      Demo <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <a
            href="https://github.com/Momin-786?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-6 text-sm text-os-text-muted hover:text-foreground transition-colors font-mono"
          >
            View all repositories →
          </a>
        </div>
      </div>
    </section>
  );
}

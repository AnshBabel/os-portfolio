import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Ensure these are imported from 'lucide-react'
import { ExternalLink, GitFork, Star, Loader2 } from 'lucide-react';
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

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  Python: '#3572a5',
  'Next.js': '#000000',
  React: '#61dafb',
};

export default function ProjectsSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = "AnshBabel";
    // Cache-buster ensures you see changes immediately after pinning/unpinning on GitHub
    const cacheBuster = `&t=${Date.now()}`;
    
    setLoading(true);

    // 1. Fetch live pins from your GitHub profile
    fetch(`https://gh-pinned-repos.statuscodes.com/?username=${username}${cacheBuster}`)
      .then(res => res.json())
      .then((pinnedData) => {
        // 2. Fetch full repository details for those pins
        fetch(`https://api.github.com/users/${username}/repos?per_page=100${cacheBuster}`)
          .then(r => r.json())
          .then((allData: Repo[]) => {
            if (Array.isArray(allData)) {
              // REPOSITORIES TABLE DATA: Stays exactly as requested
              setAllRepos(allData);

              // PINNED MODULES DATA: Filtered and sorted to match your profile exactly
              const pinnedNames = pinnedData.map((p: any) => p.repo.toLowerCase());
              const autoPinned = allData.filter(repo => 
                pinnedNames.includes(repo.name.toLowerCase())
              );
              
              // Sort to maintain the order you set on GitHub
              const sortedPinned = autoPinned.sort((a, b) => 
                pinnedNames.indexOf(a.name.toLowerCase()) - 
                pinnedNames.indexOf(b.name.toLowerCase())
              );

              setRepos(sortedPinned.length > 0 ? sortedPinned : allData.slice(0, 4));
            }
            setLoading(false);
          });
      })
      .catch(() => {
        // Fallback if the pinning service is down
        fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
          .then(r => r.json())
          .then(data => {
            if (Array.isArray(data)) {
              setAllRepos(data);
              setRepos(data.slice(0, 4));
            }
            setLoading(false);
          });
      });
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto" id="projects">
      <SectionHeader icon="📂" title="$ ls -la ~/projects" />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 font-mono text-os-cyan">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <span className="animate-pulse tracking-widest text-xs">SYNCING_GITHUB_CORE...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          
          {/* REPOSITORIES TABLE: DO NOT TOUCH - Logic and format preserved */}
          <motion.div
            className="os-window p-4 h-fit"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="font-mono text-sm text-foreground flex items-center gap-2">📁 Repositories</span>
              <span className="text-xs text-os-text-muted font-mono">{allRepos.length}</span>
            </div>
            <div className="space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar">
              {allRepos.slice(0, 10).map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  className="flex items-center justify-between px-3 py-2 rounded hover:bg-white/5 transition-colors group"
                >
                  <div>
                    <div className="text-sm text-os-cyan group-hover:underline font-mono">{repo.name}</div>
                    <div className="text-xs text-os-text-muted flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: languageColors[repo.language] || '#888' }} />
                      {repo.language || 'Code'}
                    </div>
                  </div>
                  <span className="text-[10px] text-os-text-muted border border-white/10 rounded px-1.5 py-0.5">Public</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* SYSTEM PINNED MODULES: Dynamically updated from your GitHub profile */}
          <div>
            <div className="text-xs font-mono text-os-text-muted tracking-widest mb-4 uppercase">System Pinned Modules</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo, i) => (
                <motion.div
                  key={repo.name}
                  className="os-window p-5 hover:border-os-cyan/30 transition-colors cursor-pointer group flex flex-col h-full"
                  onClick={() => window.open(repo.html_url, '_blank')}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-sm font-bold text-os-cyan flex items-center gap-2 group-hover:underline">📄 {repo.name}</span>
                    <span className="text-[10px] text-os-text-muted border border-white/10 rounded px-1.5 py-0.5 font-mono uppercase">Live_Module</span>
                  </div>
                  
                  <p className="text-xs text-os-text-muted mb-4 leading-relaxed line-clamp-3 font-mono flex-grow">
                    {repo.description || 'No system logs found for this repository.'}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(repo.topics || []).slice(0, 5).map((t) => (
                      <span key={t} className="os-tag text-[10px]">{t}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-os-text-muted font-mono">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: languageColors[repo.language] || '#888' }} />
                        {repo.language}
                      </span>
                      <span className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</span>
                    </div>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" className="text-os-cyan hover:underline" onClick={(e) => e.stopPropagation()}>
                        Demo <ExternalLink size={12} className="inline ml-1" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
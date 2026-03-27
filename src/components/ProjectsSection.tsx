import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitFork, Star, Terminal, Folder } from 'lucide-react';
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
  updated_at: string;
}

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  Python: '#3572a5',
  PHP: '#777bb3',
  'Next.js': '#ffffff',
  React: '#61dafb',
  HTML: '#e34c26',
  CSS: '#563d7c'
};

const STATIC_PINNED: Repo[] = [
  {
    name: "os-portfolio",
    description: "An interactive, OS-style portfolio built with React and Tailwind CSS featuring a terminal-like interface.",
    language: "TypeScript", stargazers_count: 2, forks_count: 1,
    html_url: "https://github.com/AnshBabel/os-portfolio",
    homepage: "https://ansh-portfolio.vercel.app",
    topics: ["React", "Tailwind", "Framer Motion"], updated_at: ""
  },
  {
    name: "CollabCanvas",
    description: "A real-time collaborative whiteboard application allowing users to draw and brainstorm together.",
    language: "JavaScript", stargazers_count: 1, forks_count: 0,
    html_url: "https://github.com/AnshBabel/CollabCanvas",
    homepage: null,
    topics: ["Socket.io", "Canvas", "Node.js"], updated_at: ""
  },
  {
    name: "FinSync-Pro",
    description: "A comprehensive financial dashboard for tracking transactions and managing personal banking data.",
    language: "TypeScript", stargazers_count: 4, forks_count: 2,
    html_url: "https://github.com/AnshBabel/FinSync-Pro",
    homepage: null,
    topics: ["Fullstack", "Next.js", "Financial-Tech"], updated_at: ""
  },
  {
    name: "EfficientPageReplacementSimulator",
    description: "A simulator for visualizing Operating System page replacement algorithms like FIFO, LRU, and Optimal.",
    language: "Java", stargazers_count: 1, forks_count: 0,
    html_url: "https://github.com/AnshBabel/EfficientPageReplacementSimulator",
    homepage: null,
    topics: ["OS", "Algorithms", "Simulation"], updated_at: ""
  }
];

export default function ProjectsSection() {
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = "AnshBabel";
    
    // 1. Instant Cache Load
    const cachedData = localStorage.getItem('gh_repos_cache');
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      // Alphabetical sort for cached data
      setAllRepos(parsed.sort((a: Repo, b: Repo) => a.name.localeCompare(b.name)));
      setLoading(false);
    }

    // 2. Background Refresh
    fetch(`https://api.github.com/users/${username}/repos?per_page=50&sort=full_name`)
      .then(res => res.json())
      .then((data: Repo[]) => {
        if (Array.isArray(data)) {
          // Filter and Alphabetical Sort
          const sortedData = data
            .filter(repo => !repo.fork)
            .sort((a, b) => a.name.localeCompare(b.name));
          
          setAllRepos(sortedData);
          localStorage.setItem('gh_repos_cache', JSON.stringify(sortedData));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto" id="projects">
      <div className="w-full mb-12">
        <h2 className="text-3xl font-mono font-bold text-os-cyan flex items-center gap-4 uppercase tracking-tighter">
          <Terminal className="w-10 h-10" /> ls -la ~/projects
        </h2>
        <div className="h-1 w-24 bg-os-cyan mt-2 opacity-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mt-10">
        
        {/* SIDEBAR: All Repositories (Alphabetical & Cached) */}
        <motion.div className="os-window p-4 h-fit min-h-[450px] bg-black/20 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-6 px-2">
            <span className="font-mono text-xs flex items-center gap-2 text-zinc-400 uppercase tracking-widest font-bold">
              <Folder size={14} className="text-os-cyan" /> ALL_BINARIES
            </span>
            <span className="text-[10px] text-os-cyan font-mono px-2 py-0.5 border border-os-cyan/30 rounded bg-os-cyan/5">
              {allRepos.length || "0"}
            </span>
          </div>
          
          <div className="space-y-1 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
            {loading && allRepos.length === 0 ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="h-11 w-full bg-white/5 animate-pulse rounded mb-2" />
              ))
            ) : (
              <AnimatePresence>
                {allRepos.map((repo) => (
                  <motion.a 
                    key={repo.name} 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noreferrer" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between px-3 py-2.5 rounded transition-all group border border-transparent hover:border-os-cyan/30 hover:bg-os-cyan/10"
                  >
                    <div className="min-w-0">
                      <div className="text-sm text-os-cyan group-hover:text-white font-mono truncate transition-colors">
                        {repo.name}.sh
                      </div>
                      <div className="text-[9px] opacity-40 flex items-center gap-2 mt-1 uppercase font-mono">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: languageColors[repo.language] || '#888' }} />
                        {repo.language || 'Binary'}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* PINNED GRID: High-Priority Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STATIC_PINNED.map((repo, i) => (
            <motion.div
              key={repo.name}
              className="os-window p-7 border border-white/10 hover:border-os-cyan/50 transition-all duration-300 cursor-pointer group flex flex-col h-full bg-black/30 backdrop-blur-md relative overflow-hidden"
              onClick={() => window.open(repo.html_url, '_blank')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }} // Lifts card up on hover
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-os-cyan/5 -rotate-45 translate-x-4 -translate-y-4 border border-os-cyan/20 group-hover:bg-os-cyan/20 transition-colors" />

              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-base font-bold text-os-cyan flex items-center gap-3 uppercase tracking-tighter transition-colors group-hover:text-white">
                  <span className="text-zinc-500 opacity-50">/</span> {repo.name}
                </span>
                <span className="text-[9px] text-os-cyan/50 border border-os-cyan/20 rounded-sm px-2 py-0.5 font-mono uppercase bg-os-cyan/5">
                  Pinned
                </span>
              </div>
              
              <p className="text-xs text-zinc-400 mb-8 leading-relaxed font-mono flex-grow">
                {repo.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {repo.topics.map((t) => (
                  <span key={t} className="text-[9px] font-mono border border-white/10 bg-white/5 text-zinc-500 px-2.5 py-1 rounded-sm group-hover:border-os-cyan/30 group-hover:text-os-cyan transition-colors">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] opacity-60 font-mono mt-auto pt-4 border-t border-white/5">
                <div className="flex items-center gap-5">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: languageColors[repo.language] || '#888' }} />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1.5 group-hover:text-yellow-500 transition-colors">
                    <Star size={12} /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1.5 group-hover:text-os-cyan transition-colors">
                    <GitFork size={12} /> {repo.forks_count}
                  </span>
                </div>
                {repo.homepage && (
                  <ExternalLink size={14} className="text-os-cyan group-hover:scale-110 transition-transform" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
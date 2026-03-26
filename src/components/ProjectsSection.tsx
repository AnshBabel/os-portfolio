import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  updated_at: string;
}

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  Python: '#3572a5',
  'Next.js': '#000000',
  React: '#61dafb',
  HTML: '#e34c26',
  CSS: '#563d7c'
};

// 1. HARDCODED PINNED REPOS (This ensures they show up NO MATTER WHAT)
const STATIC_PINNED: Repo[] = [
  {
    name: "os-portfolio",
    description: "An interactive, OS-style portfolio built with React and Tailwind CSS featuring a terminal-like interface.",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://ansh-stack-os.vercel.app/",
    homepage: "https://github.com/AnshBabel/os-portfolio/",
    topics: ["React", "Tailwind", "Framer Motion"],
    updated_at: new Date().toISOString()
  },
  {
    name: "CollabCanvas",
    description: "A real-time collaborative whiteboard application allowing users to draw and brainstorm together.",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/AnshBabel/CollabCanvas",
    homepage: null,
    topics: ["Socket.io", "Canvas", "Node.js"],
    updated_at: new Date().toISOString()
  },
  {
    name: "FinSync-Pro",
    description: "A comprehensive financial dashboard for tracking transactions and managing personal banking data.",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/AnshBabel/FinSync-Pro",
    homepage: null,
    topics: ["Fullstack", "Next.js", "Financial-Tech"],
    updated_at: new Date().toISOString()
  },
  {
    name: "EfficientPageReplacementSimulator",
    description: "A simulator for visualizing Operating System page replacement algorithms like FIFO, LRU, and Optimal.",
    language: "Java",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/AnshBabel/EfficientPageReplacementSimulator",
    homepage: null,
    topics: ["OS", "Algorithms", "Simulation"],
    updated_at: new Date().toISOString()
  }
];

export default function ProjectsSection() {
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = "AnshBabel";
    
    // We fetch for the SIDEBAR ONLY. If this fails, the pinned repos still show!
    fetch(`https://api.github.com/users/${username}/repos?per_page=10&sort=updated`)
      .then(res => {
        if (!res.ok) throw new Error("API Limit reached");
        return res.json();
      })
      .then((data: Repo[]) => {
        if (Array.isArray(data)) {
          setAllRepos(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sidebar fetch failed, using fallback empty list:", err);
        setLoading(false); // Stop loading even if fetch fails
      });
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto" id="projects">
      <SectionHeader icon="📂" title="$ ls -la ~/projects" />

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        
        {/* LEFT SIDEBAR: Automatic Latest Repos */}
        <motion.div className="os-window p-4 h-fit min-h-[200px]">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="font-mono text-sm flex items-center gap-2">📁 All Repositories</span>
            <span className="text-xs opacity-50 font-mono">{allRepos.length || "!"}</span>
          </div>
          
          {loading ? (
             <div className="flex justify-center py-10"><Loader2 className="animate-spin opacity-20" /></div>
          ) : (
            <div className="space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar">
              {allRepos.length > 0 ? allRepos.map((repo) => (
                <a key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer" className="flex items-center justify-between px-3 py-2 rounded hover:bg-white/5 transition-colors group">
                  <div className="min-w-0">
                    <div className="text-sm text-os-cyan group-hover:underline font-mono truncate">{repo.name}</div>
                    <div className="text-[10px] opacity-50 flex items-center gap-2 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: languageColors[repo.language] || '#888' }} />
                      {repo.language || 'Code'}
                    </div>
                  </div>
                </a>
              )) : (
                <div className="text-[10px] opacity-30 font-mono p-2">Connect to internet to fetch live list...</div>
              )}
            </div>
          )}
        </motion.div>

        {/* RIGHT SIDE: MANUALLY PINNED (Will show instantly) */}
        <div>
          <div className="text-xs font-mono opacity-50 tracking-widest mb-4 uppercase">System Pinned Modules</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STATIC_PINNED.map((repo, i) => (
              <motion.div
                key={repo.name}
                className="os-window p-5 hover:border-os-cyan/30 transition-colors cursor-pointer group flex flex-col h-full"
                onClick={() => window.open(repo.html_url, '_blank')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-bold text-os-cyan flex items-center gap-2 group-hover:underline">📄 {repo.name}</span>
                  <span className="text-[10px] opacity-50 border border-white/10 rounded px-1.5 py-0.5 font-mono">Pinned</span>
                </div>
                <p className="text-xs opacity-70 mb-4 leading-relaxed line-clamp-3 font-mono flex-grow">
                  {repo.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics.map((t) => (
                    <span key={t} className="os-tag text-[9px]">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs opacity-50 font-mono">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: languageColors[repo.language] || '#888' }} />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</span>
                  </div>
                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noreferrer" className="text-os-cyan hover:underline" onClick={(e) => e.stopPropagation()}>
                      Demo <ExternalLink size={12} className="inline ml-1" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
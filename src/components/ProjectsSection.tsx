import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Terminal, Folder, Plus, Minus, Github, Sparkles } from 'lucide-react';

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
  problem?: string;
  solution?: string;
  role?: string;
  imageUrl?: string;
}

const STATIC_PINNED: Repo[] = [
  {
    name: "Incredible-India",
    description: "An AI travel companion.",
    problem: "Travelers lack curated, culturally immersive itineraries personalized to their interests.",
    solution: "A MERN platform featuring an integrated AI chatbot that generates day-by-day itineraries and cultural guides using the Gemini API.",
    role: "Full-Stack Architecture & GenAI Integration",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1400&auto=format&fit=crop",
    language: "TypeScript", stargazers_count: 5, forks_count: 2,
    html_url: "https://github.com/AnshBabel/Incredible-India",
    homepage: "https://incredible-india-ai.vercel.app",
    topics: ["Gemini-AI", "React", "Node.js", "GenAI"], updated_at: ""
  },
  {
    name: "CollabCanvas",
    description: "Real-time collaborative whiteboard engine.",
    problem: "Remote teams struggle with latency and sync issues during rapid brainstorming sessions.",
    solution: "Engineered a low-latency shared drawing canvas using Socket.io to ensure instantaneous state synchronization across all clients.",
    role: "Backend & WebSocket Protocol",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1400&auto=format&fit=crop",
    language: "JavaScript", stargazers_count: 1, forks_count: 0,
    html_url: "https://github.com/AnshBabel/CollabCanvas",
    homepage: null,
    topics: ["Socket.io", "Canvas", "Node.js", "Collaboration"], updated_at: ""
  },
  {
    name: "FinSync-Pro",
    description: "Comprehensive financial dashboard.",
    problem: "Fragmented financial data prevents users from getting a cohesive view of their financial health.",
    solution: "A dashboard integrating Chart.js and Next.js to provide interactive visual analytics, transaction tracking, and budget forecasting.",
    role: "Full-Stack Development & Data Visualization",
    imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1400&auto=format&fit=crop",
    language: "TypeScript", stargazers_count: 4, forks_count: 2,
    html_url: "https://github.com/AnshBabel/FinSync-Pro",
    homepage: null,
    topics: ["Next.js", "Chart.js", "MongoDB", "Visualization"], updated_at: ""
  },
  {
    name: "Confession-Wall",
    description: "Safe anonymous social space.",
    problem: "Online anonymity often fosters toxicity, deterring meaningful interaction in community platforms.",
    solution: "Built a secure MERN portal with robust Google OAuth and automated moderation layers to maintain a safe, private sharing environment.",
    role: "Auth, Security Logic & Community Management",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop",
    language: "JavaScript", stargazers_count: 3, forks_count: 1,
    html_url: "https://github.com/AnshBabel/Confession-Wall",
    homepage: null,
    topics: ["MERN", "Google OAuth", "JWT", "Security"], updated_at: ""
  }
];

export default function ProjectsSection() {
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => {
    const username = "AnshBabel";
    const cachedData = localStorage.getItem('gh_repos_cache');
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      setAllRepos(parsed.sort((a: Repo, b: Repo) => a.name.localeCompare(b.name)));
      setLoading(false);
    }

    fetch(`https://api.github.com/users/${username}/repos?per_page=50&sort=full_name`)
      .then(res => res.json())
      .then((data: Repo[]) => {
        if (Array.isArray(data)) {
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

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 mt-10">
        
        {/* SIDEBAR: Tactical File Explorer (UPGRADED) */}
        <motion.div className="os-window p-5 h-fit min-h-[600px] bg-black/40 border border-os-cyan/20 relative backdrop-blur-xl">
          <div className="flex items-center justify-between mb-8 px-2 border-b border-os-cyan/10 pb-4">
            <span className="font-mono text-xs flex items-center gap-2 text-os-cyan uppercase tracking-[0.2em] font-black">
              <Folder size={16} className="animate-pulse" /> ROOT_SYSTEM
            </span>
            <span className="text-[10px] font-mono text-zinc-500">v4.0.2</span>
          </div>
          
          <div className="space-y-2 max-h-[700px] overflow-y-auto custom-scrollbar pr-1">
            {loading && allRepos.length === 0 ? (
              [...Array(12)].map((_, i) => (
                <div key={i} className="h-10 w-full bg-white/5 animate-pulse rounded-sm mb-2" />
              ))
            ) : (
              allRepos.map((repo) => (
                <a 
                  key={repo.name} 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center group relative px-3 py-2.5 rounded-sm border border-transparent hover:border-os-cyan/30 hover:bg-os-cyan/5 transition-all duration-300"
                >
                  {/* Status Dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/40 group-hover:bg-green-400 mr-3 transition-colors shadow-[0_0_5px_rgba(34,197,94,0.2)]" />
                  
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] text-zinc-400 group-hover:text-os-cyan font-mono truncate uppercase tracking-tighter transition-colors">
                      {repo.name}.sh
                    </span>
                    <div className="flex justify-between items-center mt-1 opacity-40 group-hover:opacity-80 transition-opacity">
                      <span className="text-[7px] text-zinc-500 font-mono uppercase tracking-widest">Perm: rwxr-xr-x</span>
                      <span className="text-[7px] text-os-cyan font-mono">{(Math.random() * 80).toFixed(1)} KB</span>
                    </div>
                  </div>

                  <ExternalLink size={10} className="text-os-cyan opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                  
                  {/* Visual Left Accent */}
                  <div className="absolute left-0 w-[2px] h-0 bg-os-cyan group-hover:h-full transition-all duration-300" />
                </a>
              ))
            )}
          </div>

          {/* Sidebar Footer Stats */}
          <div className="mt-8 pt-4 border-t border-os-cyan/10 text-[8px] font-mono text-zinc-600 uppercase">
            <div className="flex justify-between mb-2">
              <span className="tracking-widest">SYSTEM_MEMORY_USED</span>
              <span className="text-os-cyan">84.2%</span>
            </div>
            <div className="w-full h-[3px] bg-white/5 relative overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "84.2%" }}
                className="absolute h-full bg-os-cyan/40"
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: View Repo Button + Project Grid */}
        <div className="flex flex-col gap-6">
          
          {/* Tactical View Repository Button */}
          <div className="flex justify-end">
            <button 
              onClick={() => window.open('https://github.com/AnshBabel', '_blank')}
              className="group flex items-center gap-4 px-6 py-2.5 bg-os-cyan/5 border border-os-cyan/20 hover:border-os-cyan hover:bg-os-cyan/10 transition-all duration-500 relative overflow-hidden"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono text-os-cyan tracking-[0.3em] uppercase font-black">
                  EXECUTE_FULL_ARCHIVE
                </span>
                <span className="text-[7px] text-zinc-500 font-mono">ACCESSING: GITHUB.COM/ANSHBABEL</span>
              </div>
              <Github size={18} className="text-os-cyan group-hover:scale-110 transition-transform" />
              
              {/* Button corner highlights */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-os-cyan/50" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-os-cyan/50" />
            </button>
          </div>

          {/* PINNED GRID (Original Tactical HUD Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {STATIC_PINNED.map((repo, i) => {
              const isExpanded = expandedCard === repo.name;

              return (
                <motion.div
                  key={repo.name}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative group cursor-pointer border transition-all duration-500 overflow-hidden rounded-sm bg-black/40 backdrop-blur-xl ${
                    isExpanded ? 'border-os-cyan shadow-[0_0_30px_rgba(0,255,255,0.2)]' : 'border-white/10 hover:border-os-cyan/40'
                  }`}
                >
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-os-cyan/30 group-hover:border-os-cyan transition-colors z-30" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-os-cyan/30 group-hover:border-os-cyan transition-colors z-30" />
                  
                  <div className="absolute right-1 top-12 bottom-12 w-[1px] bg-os-cyan/10 z-30 hidden lg:block">
                      <motion.div 
                          animate={{ top: ["0%", "100%"] }} 
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-full h-10 bg-gradient-to-b from-transparent via-os-cyan to-transparent" 
                      />
                  </div>

                  <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
                    <img 
                      src={repo.imageUrl} 
                      alt={repo.name} 
                      className={`h-full w-full object-cover transition-all duration-700 ${
                        isExpanded ? 'scale-110 blur-md opacity-20' : 'scale-100 opacity-60 group-hover:opacity-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-transparent z-10" />
                  </div>

                  <div className="relative z-20 p-6 flex flex-col h-full" onClick={() => setExpandedCard(isExpanded ? null : repo.name)}>
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-os-cyan/60 px-1 border border-os-cyan/40 bg-black/50">MNTR_0{i+1}</span>
                          <h3 className="text-xl font-black tracking-tighter text-white group-hover:text-os-cyan group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all">
                            {repo.name.toUpperCase()}
                          </h3>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-300 mt-1 uppercase tracking-widest flex items-center gap-2 drop-shadow-md">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" /> SYSTEM_ACTIVE // {repo.language}
                        </span>
                      </div>
                      {isExpanded ? <Minus className="text-os-cyan" size={20} /> : <Plus className="text-os-cyan/50 group-hover:text-os-cyan" size={20} />}
                    </div>

                    <div className="space-y-4 mb-6">
                      <p className="text-[12px] text-zinc-100 leading-relaxed font-mono border-l-2 border-os-cyan/40 pl-4 py-1 bg-black/20 backdrop-blur-sm">
                        <span className="text-os-cyan/80 font-bold block text-[10px] mb-1 underline underline-offset-4 tracking-widest uppercase">Initial_Recon:</span>
                        {repo.description}
                      </p>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-6"
                        >
                          <div className="grid grid-cols-1 gap-4 bg-black/60 p-4 border border-os-cyan/20 rounded-sm backdrop-blur-md">
                            <div>
                              <span className="text-[10px] text-os-cyan block mb-2 font-bold opacity-90 select-none tracking-widest uppercase">{">"} Problem_Set</span>
                              <p className="text-[11px] text-zinc-300 font-mono italic leading-relaxed">"{repo.problem}"</p>
                            </div>
                            <div>
                              <span className="text-[10px] text-os-cyan block mb-2 font-bold opacity-90 select-none tracking-widest uppercase">{">"} Deployed_Solution</span>
                              <p className="text-[11px] text-zinc-100 font-mono leading-relaxed">{repo.solution}</p>
                            </div>
                            <div>
                              <span className="text-[10px] text-os-cyan block mb-2 font-bold opacity-90 select-none tracking-widest uppercase">{">"} System_Role</span>
                              <p className="text-[11px] text-zinc-100 font-mono leading-relaxed">{repo.role}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {repo.topics.map((t) => (
                              <span key={t} className="text-[9px] font-mono bg-os-cyan/20 text-os-cyan px-2 py-1 border border-os-cyan/30 hover:bg-os-cyan hover:text-black transition-colors uppercase backdrop-blur-sm">
                                #{t}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-4 pt-4">
                            <button 
                              onClick={(e) => { e.stopPropagation(); window.open(repo.html_url, '_blank'); }}
                              className="flex-1 group/btn py-3 bg-black/40 border border-white/20 hover:border-os-cyan text-white text-[10px] font-mono flex items-center justify-center gap-3 transition-all relative overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-os-cyan/10 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                              <Github size={14} className="relative z-10" /> 
                              <span className="relative z-10 tracking-widest uppercase">FETCH_SOURCE</span>
                            </button>
                            {repo.homepage && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); window.open(repo.homepage!, '_blank'); }}
                                className="flex-1 group/btn py-3 bg-os-cyan/30 border border-os-cyan/60 hover:bg-os-cyan text-black text-[10px] font-bold font-mono flex items-center justify-center gap-3 transition-all relative"
                              >
                                <ExternalLink size={14} /> 
                                <span className="tracking-widest uppercase">INIT_LIVE_VIEW</span>
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <div className="mt-auto pt-6 flex flex-col gap-2">
                         <div className="flex justify-between text-[8px] font-mono text-zinc-400">
                            <span>DEPLOYMENT_STABILITY</span>
                            <span>100%</span>
                         </div>
                         <div className="h-[1px] w-full bg-white/10 relative">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="absolute h-full bg-os-cyan shadow-[0_0_10px_#00ffff]" 
                            />
                         </div>
                         <span className="text-[8px] text-os-cyan font-mono text-right uppercase tracking-[0.2em] mt-1 animate-pulse drop-shadow-md">
                           click to decrypt project data
                         </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
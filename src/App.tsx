import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Home, User, Code, Briefcase, Mail } from 'lucide-react'; // Ensure these are imported!

const queryClient = new QueryClient();

// --- MINI MOBILE NAV COMPONENT ---
const MobileNav = () => (
  <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden">
    <div className="flex items-center gap-6 px-6 py-3 bg-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.1)]">
      <a href="#home" className="text-zinc-500 hover:text-cyan-400"><Home size={20} /></a>
      <a href="#about" className="text-zinc-500 hover:text-cyan-400"><User size={20} /></a>
      <a href="#skills" className="text-zinc-500 hover:text-cyan-400"><Code size={20} /></a>
      <a href="#projects" className="text-zinc-500 hover:text-cyan-400"><Briefcase size={20} /></a>
      <a href="#contact" className="text-zinc-500 hover:text-cyan-400"><Mail size={20} /></a>
    </div>
  </nav>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MobileNav />
      <div className="relative z-10">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
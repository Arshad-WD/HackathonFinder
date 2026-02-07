import { Search, Zap, Globe, Github } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-16 glass border-b">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* ---------- BRAND ---------- */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20 transition-transform group-hover:scale-110">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-gradient">
              Deep Search
            </h1>
            <p className="text-[10px] font-medium tracking-widest text-gray-500 uppercase">
              Opportunity Intelligence
            </p>
          </div>
        </div>

        {/* ---------- ACTIONS ---------- */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[11px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">Live System</span>
          </div>

          <a 
            href="https://github.com/Arshad-WD/HackathonFinder" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <Github className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </nav>
  );
}

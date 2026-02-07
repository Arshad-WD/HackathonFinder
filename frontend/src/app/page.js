"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchEvents, triggerFetch } from "@/services/api";
import { Sparkles, Compass, Search as SearchIcon, Bookmark, Zap, TrendingUp, Cpu } from "lucide-react";

import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import SearchBar from "@/components/SearchBar";
import FetchButton from "@/components/FetchButton";
import EventGrid from "@/components/EventGrid";
import Pagination from "@/components/Pagination";
import PriorityControls from "@/components/PriorityControls";
import QuickView from "@/components/QuickView";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("hackathon");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [sortByPriority, setSortByPriority] = useState(true);
  const [highPriorityOnly, setHighPriorityOnly] = useState(false);

  const PER_PAGE = 9;

  async function loadData() {
    const data = await fetchEvents();
    setEvents(data);
  }

  async function handleFetch() {
    try {
      setLoading(true);
      const res = await triggerFetch();
      if (!res.success) {
        alert(res.message || "Fetch blocked by server");
        return;
      }
      await loadData();
      alert(`✨ Optimization Successful! Deep Search has curated ${res.count} fresh opportunities for you.`);
    } catch (err) {
      alert(err.message || "Server unreachable");
    } finally {
      setLoading(false);
    }
  }

  // Load Saved Events from LocalStorage
  useEffect(() => {
    loadData();
    const saved = localStorage.getItem("deepsearch_saved");
    if (saved) {
      try {
        setSavedEvents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved events");
      }
    }
  }, []);

  // Persist Saved Events to LocalStorage
  useEffect(() => {
    localStorage.setItem("deepsearch_saved", JSON.stringify(savedEvents));
  }, [savedEvents]);

  const toggleSave = (event) => {
    const eventId = `${event.source}-${event.title}-${event.deadline}`;
    setSavedEvents(prev => {
      const exists = prev.some(s => `${s.source}-${s.title}-${s.deadline}` === eventId);
      if (exists) {
        return prev.filter(s => `${s.source}-${s.title}-${s.deadline}` !== eventId);
      }
      return [...prev, event];
    });
  };

  const stats = useMemo(() => ({
    hackathons: events.filter(e => e.type === "hackathon").length,
    internships: events.filter(e => e.type === "internship").length,
    highPriority: events.filter(e => e.priority >= 70).length
  }), [events]);

  const processedData = useMemo(() => {
    let result = tab === "saved" ? savedEvents : events.filter(e => e.type === tab);
    
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        e =>
          e.title?.toLowerCase().includes(q) ||
          e.location?.toLowerCase().includes(q)
      );
    }
    if (highPriorityOnly && tab !== "saved") {
      result = result.filter(e => e.priority >= 70);
    }
    if (sortByPriority) {
      result = [...result].sort((a, b) => b.priority - a.priority);
    }
    return result;
  }, [events, savedEvents, tab, search, highPriorityOnly, sortByPriority]);

  const total = processedData.length;
  const paginatedData = processedData.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [tab, search, highPriorityOnly, sortByPriority]);

  const currentIsSaved = selectedEvent ? savedEvents.some(s => 
    `${s.source}-${s.title}-${s.deadline}` === `${selectedEvent.source}-${selectedEvent.title}-${selectedEvent.deadline}`
  ) : false;

  return (
    <main className="min-h-screen pt-24 pb-20">
      <Navbar />

      {/* ---------- HERO SECTION ---------- */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-10 animate-float border-white/50 dark:border-white/10 shadow-2xl">
            <Cpu className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-accent">Artisanal Discovery v2.0</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 text-gradient leading-[1] text-balance">
            Design Meets <br /> Discovery
          </h1>
          
          <p className="text-gray-500/80 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed">
            A boutique experience for tech opportunities. Our algorithms curate, so you can create.
          </p>

          {/* ---------- STATS DASHBOARD ---------- */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-20">
            <motion.div whileHover={{ y: -5 }} className="px-8 py-4 rounded-[2rem] glass border border-white/40 flex items-center gap-4 group">
              <Zap className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400">Hackathons</div>
                <div className="text-xl font-extrabold leading-none">{stats.hackathons}</div>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="px-8 py-4 rounded-[2rem] glass border border-white/40 flex items-center gap-4 group">
              <TrendingUp className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400">Internships</div>
                <div className="text-xl font-extrabold leading-none">{stats.internships}</div>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="px-8 py-4 rounded-[2rem] glass border border-accent/30 flex items-center gap-4 bg-accent/[0.03]">
              <Compass className="w-5 h-5 text-accent animate-spin-slow" />
              <div className="text-left">
                <div className="text-[9px] font-black uppercase tracking-[0.15em] text-accent/60">Match Quality</div>
                <div className="text-xl font-extrabold leading-none text-accent">High-Tier</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ---------- CONTROLS PANEL ---------- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl mx-auto glass-card rounded-[3rem] p-8 md:p-10 relative z-10 border-white/50 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <Tabs active={tab} setActive={setTab} />
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-96 group">
                <SearchBar value={search} onChange={setSearch} />
                <div className="absolute inset-0 rounded-2xl border border-accent/0 group-focus-within:border-accent/30 transition-colors pointer-events-none" />
              </div>
              <div className={loading ? "scan-glow rounded-2xl" : ""}>
                <FetchButton onClick={handleFetch} loading={loading} />
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/5">
            <PriorityControls
              sortByPriority={sortByPriority}
              setSortByPriority={setSortByPriority}
              highPriorityOnly={highPriorityOnly}
              setHighPriorityOnly={setHighPriorityOnly}
            />
          </div>
        </motion.div>
      </section>

      {/* ---------- CONTENT SECTION ---------- */}
      <section className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab + search + page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <EventGrid 
              data={paginatedData} 
              loading={loading} 
              savedEvents={savedEvents}
              onToggleSave={toggleSave}
              onSelect={setSelectedEvent}
            />
          </motion.div>
        </AnimatePresence>

        <div className="mt-20 flex justify-center">
          <Pagination
            total={total}
            page={page}
            setPage={setPage}
            perPage={PER_PAGE}
          />
        </div>
      </section>

      {/* ---------- QUICK VIEW DRAWER ---------- */}
      <QuickView 
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        isSaved={currentIsSaved}
        onToggleSave={toggleSave}
      />
    </main>
  );
}

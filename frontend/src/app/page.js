"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchEvents, triggerFetch } from "@/services/api";
import { Sparkles, Compass, Search as SearchIcon, Bookmark, Zap, TrendingUp } from "lucide-react";

import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import SearchBar from "@/components/SearchBar";
import FetchButton from "@/components/FetchButton";
import EventGrid from "@/components/EventGrid";
import Pagination from "@/components/Pagination";
import PriorityControls from "@/components/PriorityControls";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("hackathon");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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

  return (
    <main className="min-h-screen pt-24 pb-20">
      <Navbar />

      {/* ---------- HERO SECTION ---------- */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-float">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold tracking-widest uppercase text-accent">Intelligent Scouter</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gradient leading-[1.1]">
            Curating The Best <br /> Tech Opportunities
          </h1>
          
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
            AI-driven discovery for ambitious students. We crawl thousands of sources to bring you high-value tech events.
          </p>

          {/* ---------- STATS DASHBOARD ---------- */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <div className="px-6 py-3 rounded-2xl glass border border-gray-200/50 flex items-center gap-3">
              <Zap className="w-4 h-4 text-purple-500" />
              <div className="text-left">
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Hackathons</div>
                <div className="text-lg font-bold leading-none">{stats.hackathons}</div>
              </div>
            </div>
            <div className="px-6 py-3 rounded-2xl glass border border-gray-200/50 flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <div className="text-left">
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Internships</div>
                <div className="text-lg font-bold leading-none">{stats.internships}</div>
              </div>
            </div>
            <div className="px-6 py-3 rounded-2xl glass border border-accent/20 flex items-center gap-3 bg-accent/5">
              <Compass className="w-4 h-4 text-accent" />
              <div className="text-left">
                <div className="text-[10px] font-black uppercase tracking-widest text-accent/60">Premium</div>
                <div className="text-lg font-bold leading-none text-accent">{stats.highPriority}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------- CONTROLS PANEL ---------- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto glass-card rounded-[2.5rem] p-6 md:p-8 relative z-10"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <Tabs active={tab} setActive={setTab} />
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <SearchBar value={search} onChange={setSearch} />
              </div>
              <FetchButton onClick={handleFetch} loading={loading} />
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-white/5">
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <EventGrid 
              data={paginatedData} 
              loading={loading} 
              savedEvents={savedEvents}
              onToggleSave={toggleSave}
            />
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 flex justify-center">
          <Pagination
            total={total}
            page={page}
            setPage={setPage}
            perPage={PER_PAGE}
          />
        </div>
      </section>
    </main>
  );
}

import { motion } from "framer-motion";
import { ExternalLink, MapPin, Calendar, Award, ShieldCheck, Globe, Bookmark, Share2, Check, Eye } from "lucide-react";
import { useState } from "react";

export default function EventCard({ event, isSaved, onToggleSave, onSelect }) {
  const [copied, setCopied] = useState(false);

  const sourceHost = (() => {
    try {
      return new URL(event.source).hostname.replace("www.", "");
    } catch {
      return "Source";
    }
  })();

  const isHighPriority = event.priority >= 70;

  const getRelativeTime = (deadline) => {
    if (!deadline) return null;
    const d = new Date(deadline);
    const now = new Date();
    const diff = d - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return "Expired";
    if (days === 0) return "Ends Today";
    if (days === 1) return "Ends Tomorrow";
    return `${days} days left`;
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(event.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relativeTime = getRelativeTime(event.deadline);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={onSelect}
      className="group relative flex flex-col glass-card rounded-[2.5rem] p-8 transition-all duration-500 cursor-pointer hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] dark:hover:shadow-none border-white/40 dark:border-white/5 active:scale-[0.98]"
    >
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between items-start mb-8">
        <div className={`
          px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border
          ${event.type === "hackathon" 
            ? "bg-purple-500/5 border-purple-500/20 text-purple-600/80 dark:text-purple-400" 
            : "bg-blue-500/5 border-blue-500/20 text-blue-600/80 dark:text-blue-400"
          }
        `}>
          {event.type}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full glass hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20"
            title="Share Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleSave(event); }}
            className={`p-2.5 rounded-full glass transition-all z-20 ${isSaved ? "bg-accent/10 text-accent border-accent/20" : "hover:bg-gray-100 dark:hover:bg-white/10"}`}
            title={isSaved ? "Remove from Saved" : "Save Opportunity"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* ---------- TITLE ---------- */}
      <div className="mb-6 min-h-[4.5rem]">
        <h2 className="text-2xl font-black leading-[1.15] group-hover:text-accent transition-colors line-clamp-2">
          {event.title}
        </h2>
      </div>

      {/* ---------- META INFO ---------- */}
      <div className="space-y-4 mb-10">
        <div className="flex items-center gap-3 text-[13px] text-gray-500 font-bold uppercase tracking-wide opacity-80">
          <Globe className="w-4 h-4" />
          <span>{event.mode} Participation</span>
        </div>

        {event.mode === "offline" && event.location && (
          <div className="flex items-center gap-3 text-[13px] text-gray-500 font-bold uppercase tracking-wide opacity-80">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        )}

        <div className="flex items-center gap-3 text-[13px] text-gray-500 font-bold uppercase tracking-wide opacity-80">
          <Calendar className="w-4 h-4" />
          <div className="flex flex-col">
            <span className={event.deadline ? "text-gray-900 dark:text-gray-200" : "italic opacity-40 font-normal"}>
              {event.deadline || "Flexible Deadline"}
            </span>
            {relativeTime && (
              <span className={`text-[9px] font-black uppercase tracking-widest mt-1 ${relativeTime.includes("left") ? "text-orange-500" : "text-red-500"}`}>
                {relativeTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ---------- PRIORITY & SOURCE ---------- */}
      <div className="mt-auto pt-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Award className={`w-4 h-4 ${isHighPriority ? "text-accent" : "text-gray-400"}`} />
          <span className={`text-sm font-black ${isHighPriority ? "text-accent" : "text-gray-500"}`}>
            {event.priority}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="invisible group-hover:visible flex items-center gap-1.5 text-accent text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-right-2 duration-300">
            <span>Details</span>
            <Eye className="w-3 h-3" />
          </div>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate max-w-[100px]">
            {sourceHost}
          </span>
        </div>
      </div>

      {/* ---------- VIEW BUTTON (FOR BOTHO MOBILE & DESKTOP CLARITY) ---------- */}
      <div className="mt-8 flex gap-3">
        <a
          href={event.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-950 dark:bg-white text-white dark:text-black rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:bg-black dark:hover:bg-accent dark:hover:text-white"
        >
          <span>Apply Now</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { ExternalLink, MapPin, Calendar, Clock, Award, ShieldCheck } from "lucide-react";

export default function EventCard({ event }) {
  const sourceHost = (() => {
    try {
      return new URL(event.source).hostname.replace("www.", "");
    } catch {
      return "Source";
    }
  })();

  const isHighPriority = event.priority >= 70;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative flex flex-col glass-card rounded-[2rem] p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] dark:hover:shadow-none"
    >
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between items-start mb-6">
        <div className={`
          px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
          ${event.type === "hackathon" 
            ? "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400" 
            : "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
          }
        `}>
          {event.type}
        </div>
        
        {isHighPriority && (
          <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Premium Match</span>
          </div>
        )}
      </div>

      {/* ---------- TITLE ---------- */}
      <h2 className="text-xl font-bold leading-tight mb-4 group-hover:text-accent transition-colors line-clamp-2">
        {event.title}
      </h2>

      {/* ---------- META INFO ---------- */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
          <Globe className="w-4 h-4 opacity-70" />
          <span className="capitalize">{event.mode} Participation</span>
        </div>

        {event.mode === "offline" && event.location && (
          <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
            <MapPin className="w-4 h-4 opacity-70" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        )}

        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
          <Calendar className="w-4 h-4 opacity-70" />
          <span className={event.deadline ? "text-gray-900 dark:text-gray-200" : "italic opacity-50"}>
            {event.deadline ? `Closes ${event.deadline}` : "Deadline not set"}
          </span>
        </div>
      </div>

      {/* ---------- PRIORITY & SOURCE ---------- */}
      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
        <div className="relative group/tooltip">
          <div className="flex items-center gap-2 cursor-pointer">
            <Award className={`w-4 h-4 ${isHighPriority ? "text-accent" : "text-gray-400"}`} />
            <span className={`text-sm font-black ${isHighPriority ? "text-accent" : "text-gray-500"}`}>
              {event.priority}
            </span>
          </div>

          {event.priorityReasons?.length > 0 && (
            <div className="absolute bottom-full left-0 mb-3 w-64 glass p-4 rounded-2xl opacity-0 translate-y-2 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 shadow-2xl transition-all z-[110]">
              <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-3">Priority Analysis</p>
              <ul className="space-y-2">
                {event.priorityReasons.map((reason, i) => (
                  <li key={i} className="text-xs font-semibold text-gray-600 dark:text-gray-300 flex gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate max-w-[120px]">
          via {sourceHost}
        </span>
      </div>

      {/* ---------- CTA ---------- */}
      <a
        href={event.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl text-sm font-bold transition-all hover:bg-accent dark:hover:bg-accent hover:text-white"
      >
        <span>Apply Now</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, MapPin, Calendar, Award, Globe, ShieldCheck, Share2, Check } from "lucide-react";
import { useState } from "react";

export default function QuickView({ event, isOpen, onClose, isSaved, onToggleSave }) {
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(event.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-white dark:bg-black border-l border-gray-100 dark:border-white/10 z-[210] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Quick Preview</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full glass hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => onToggleSave(event)}
                  className={`px-6 py-2.5 rounded-full glass font-bold text-sm transition-all ${
                    isSaved ? "bg-accent text-white" : "hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                >
                  {isSaved ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
                  {event.type}
                </div>
                <h2 className="text-4xl font-extrabold leading-[1.1] text-gradient">{event.title}</h2>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Globe className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Participation</span>
                  </div>
                  <div className="text-sm font-bold capitalize">{event.mode}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Deadline</span>
                  </div>
                  <div className="text-sm font-bold">{event.deadline || "Flexible"}</div>
                </div>
                {event.location && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Location</span>
                    </div>
                    <div className="text-sm font-bold">{event.location}</div>
                  </div>
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Award className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Match Score</span>
                  </div>
                  <div className="text-sm font-bold text-accent">{event.priority}/100</div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-12">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">About the opportunity</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {event.description || "No detailed description available for this event. Please visit the official link for complete information."}
                </p>
              </div>

              {/* Priority Analysis */}
              {event.priorityReasons?.length > 0 && (
                <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 mb-12">
                  <h3 className="text-xs font-black uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Priority Analysis
                  </h3>
                  <ul className="space-y-4">
                    {event.priorityReasons.map((reason, i) => (
                      <li key={i} className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/2">
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-5 bg-gray-950 dark:bg-white text-white dark:text-black rounded-[1.5rem] text-sm font-black transition-all hover:bg-accent dark:hover:bg-accent hover:text-white group"
              >
                <span>VISIT OFFICIAL PAGE</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

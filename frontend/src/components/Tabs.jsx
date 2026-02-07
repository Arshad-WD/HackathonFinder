import { motion } from "framer-motion";

export default function Tabs({ active, setActive }) {
  const tabs = [
    { key: "hackathon", label: "Hackathons" },
    { key: "internship", label: "Internships" },
    { key: "saved", label: "Saved" }
  ];

  return (
    <div className="inline-flex p-1.5 glass rounded-[1.25rem] border border-gray-200/50 dark:border-white/5 shadow-sm">
      {tabs.map(tab => {
        const isActive = active === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className="relative px-8 py-2.5 outline-none"
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white dark:bg-white/10 shadow-lg shadow-black/5 rounded-2xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={`relative z-10 text-sm font-bold tracking-tight transition-colors duration-300 ${
              isActive ? "text-accent" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

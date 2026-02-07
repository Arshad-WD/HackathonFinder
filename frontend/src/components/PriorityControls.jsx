import { ArrowUpWideCombined, Filter, Check } from "lucide-react";

export default function PriorityControls({
  sortByPriority,
  setSortByPriority,
  highPriorityOnly,
  setHighPriorityOnly
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button
        onClick={() => setSortByPriority(prev => !prev)}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border
          ${sortByPriority
            ? "bg-accent/10 border-accent/20 text-accent"
            : "bg-gray-100 dark:bg-white/5 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }
        `}
      >
        <ArrowUpWideCombined className="w-4 h-4" />
        <span>Sort by Priority</span>
        {sortByPriority && <Check className="w-3 h-3" />}
      </button>

      <button
        onClick={() => setHighPriorityOnly(prev => !prev)}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border
          ${highPriorityOnly
            ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
            : "bg-gray-100 dark:bg-white/5 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }
        `}
      >
        <Filter className="w-4 h-4" />
        <span>High Priority Only</span>
        {highPriorityOnly && <Check className="w-3 h-3" />}
      </button>
    </div>
  );
}

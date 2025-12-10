export default function PriorityControls({
  sortByPriority,
  setSortByPriority,
  highPriorityOnly,
  setHighPriorityOnly
}) {
  return (
    <div className="flex items-center gap-4 text-sm">
      
      {/* ✅ SORT TOGGLE */}
      <button
        onClick={() => setSortByPriority(prev => !prev)}
        className={`
          px-4 py-2 rounded-lg border transition
          ${
            sortByPriority
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }
        `}
      >
        Sort by Priority
      </button>

      {/* ✅ HIGH PRIORITY FILTER */}
      <button
        onClick={() => setHighPriorityOnly(prev => !prev)}
        className={`
          px-4 py-2 rounded-lg border transition
          ${
            highPriorityOnly
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }
        `}
      >
        High Priority Only
      </button>
    </div>
  );
}

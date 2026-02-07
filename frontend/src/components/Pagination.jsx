import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ total, page, setPage, perPage }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  function getVisiblePages() {
    const pages = [];
    const delta = 1;
    pages.push(1);
    if (page - delta > 2) pages.push("start-ellipsis");
    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      pages.push(i);
    }
    if (page + delta < totalPages - 1) pages.push("end-ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  }

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
        className="p-3 rounded-2xl glass border border-gray-200/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex gap-2">
        {visiblePages.map((p, index) => {
          if (p === "start-ellipsis" || p === "end-ellipsis") {
            return (
              <span key={`${p}-${index}`} className="w-11 h-11 flex items-center justify-center text-gray-400">
                …
              </span>
            );
          }

          return (
            <button
              key={`page-${p}`}
              onClick={() => setPage(p)}
              className={`
                w-11 h-11 rounded-2xl text-sm font-bold transition-all
                ${page === p
                  ? "bg-accent text-white shadow-lg shadow-accent/25"
                  : "glass border border-gray-200/50 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500"
                }
              `}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        className="p-3 rounded-2xl glass border border-gray-200/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

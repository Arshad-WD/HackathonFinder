export default function Pagination({ total, page, setPage, perPage }) {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  function getVisiblePages() {
    const pages = [];
    const delta = 1;

    pages.push(1);

    if (page - delta > 2) pages.push("start-ellipsis");

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      pages.push(i);
    }

    if (page + delta < totalPages - 1) pages.push("end-ellipsis");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  }

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-14 flex justify-center items-center gap-3 text-sm">

      {/* Previous */}
      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
        className="
          px-4 py-2 rounded-lg border bg-white shadow-sm
          hover:bg-gray-50 transition
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {visiblePages.map((p, index) => {
          // ✅ HANDLE ELLIPSIS WITH UNIQUE KEYS
          if (p === "start-ellipsis" || p === "end-ellipsis") {
            return (
              <span
                key={`${p}-${index}`}   // ✅ UNIQUE KEY
                className="px-3 py-2 text-gray-400 select-none"
              >
                …
              </span>
            );
          }

          // ✅ HANDLE NUMBERED PAGES WITH UNIQUE KEYS
          return (
            <button
              key={`page-${p}`}       // ✅ UNIQUE KEY PER PAGE
              onClick={() => setPage(p)}
              className={`
                px-4 py-2 rounded-lg border shadow-sm transition
                ${
                  page === p
                    ? "bg-black text-white border-black"
                    : "bg-white hover:bg-gray-50 text-gray-700"
                }
              `}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        className="
          px-4 py-2 rounded-lg border bg-white shadow-sm
          hover:bg-gray-50 transition
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Next
      </button>
    </div>
  );
}

export default function EventCard({ event }) {
  const sourceHost = (() => {
    try {
      return new URL(event.source).hostname;
    } catch {
      return "Unknown Source";
    }
  })();

  return (
    <div
      className="
        group
        relative
        bg-white/90
        backdrop-blur-xl
        border
        border-gray-200/70
        rounded-2xl
        p-6
        shadow-[0_4px_12px_rgba(0,0,0,0.05)]
        hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]
        transition-all
        duration-300
        flex
        flex-col
        justify-between
      "
    >
      {/* ---------- HEADER ---------- */}
      <div>
        <div className="flex justify-between items-start gap-3 mb-4">
          <h2 className="font-semibold text-[15px] leading-snug text-gray-900 line-clamp-2">
            {event.title}
          </h2>

          <span
            className="
              shrink-0
              text-[10px]
              px-2.5
              py-1
              rounded-full
              bg-gray-100
              text-gray-700
              capitalize
              border
              tracking-wide
            "
          >
            {event.type}
          </span>
        </div>

        {/* ---------- META INFO ---------- */}
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex justify-between">
            <span className="text-gray-500">Mode</span>
            <span className="font-medium capitalize text-gray-800">
              {event.mode}
            </span>
          </p>

          {event.mode === "offline" && event.location && (
            <p className="flex justify-between gap-2">
              <span className="text-gray-500">Location</span>
              <span className="font-medium text-right line-clamp-1 text-gray-800">
                {event.location}
              </span>
            </p>
          )}

          <p className="flex justify-between">
            <span className="text-gray-500">Deadline</span>
            <span
              className={`font-medium ${
                event.deadline ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {event.deadline || "Not specified"}
            </span>
          </p>
        </div>

        {/* ---------- FOOTER META ---------- */}
        <div className="flex justify-between items-center mt-6 text-xs text-gray-500">
          {/* ✅ PRIORITY WITH COLOR + TOOLTIP */}
          <div className="relative group flex items-center gap-1 cursor-default">
            <span className="text-gray-500">Priority:</span>

            <span
              className={`font-semibold ${
                event.priority >= 70
                  ? "text-green-600"
                  : event.priority >= 40
                  ? "text-yellow-600"
                  : "text-gray-700"
              }`}
            >
              {event.priority}
            </span>

            {event.priorityReasons?.length > 0 && (
              <div
                className="
                  absolute
                  bottom-full
                  left-1/2
                  -translate-x-1/2
                  mb-2
                  w-64
                  bg-white
                  border
                  border-gray-200
                  rounded-lg
                  shadow-xl
                  p-3
                  opacity-0
                  group-hover:opacity-100
                  transition
                  pointer-events-none
                  z-50
                  text-gray-700
                  text-xs
                "
              >
                <div className="font-medium mb-1 text-gray-900">
                  Why this priority?
                </div>

                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {event.priorityReasons.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <span className="truncate max-w-[140px] text-gray-400">
            {sourceHost}
          </span>
        </div>
      </div>

      {/* ---------- CTA ---------- */}
      <a
        href={event.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-6
          relative
          text-center
          bg-gradient-to-r
          from-gray-900
          to-gray-700
          text-white
          py-2.5
          rounded-lg
          text-sm
          font-medium
          transition-all
          duration-300
          hover:brightness-110
          hover:shadow-xl
          active:scale-[0.97]
        "
      >
        View & Apply
      </a>

      {/* ---------- HOVER ACCENT ---------- */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-2xl
          ring-1
          ring-transparent
          group-hover:ring-gray-900/10
          transition
        "
      />
    </div>
  );
}

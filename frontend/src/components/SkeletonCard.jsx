export default function SkeletonCard() {
  return (
    <div
      className="
        border
        border-gray-200/70
        rounded-2xl
        p-6
        bg-white/80
        backdrop-blur
        shadow-sm
        animate-pulse
        flex
        flex-col
        justify-between
      "
    >
      {/* ---------- HEADER ---------- */}
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-full w-12"></div>
        </div>

        {/* ---------- META ROWS ---------- */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/5"></div>
        </div>

        {/* ---------- FOOTER META ---------- */}
        <div className="flex justify-between items-center mt-5">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* ---------- CTA BUTTON ---------- */}
      <div className="mt-6 h-9 bg-gray-300 rounded-lg"></div>
    </div>
  );
}

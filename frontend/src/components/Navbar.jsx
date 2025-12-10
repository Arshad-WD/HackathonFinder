export default function Navbar() {
  return (
    <nav
      className="
        w-full
        sticky top-0 z-50
        bg-white/85
        backdrop-blur-xl
        border-b
        border-gray-200/60
        shadow-[0_1px_0_0_rgba(0,0,0,0.03)]
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-3.5
          flex
          justify-between
          items-center
        "
      >
        {/* ---------- BRAND ---------- */}
        <div className="flex flex-col leading-tight">
          <h1 className="text-[16px] font-semibold tracking-tight text-gray-900">
            Opportunity Intelligence
          </h1>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Hackathons &amp; Internships Discovery Platform
          </p>
        </div>

        {/* ---------- STATUS ---------- */}
        <div
          className="
            group
            relative
            flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            border
            bg-gray-50/80
            text-[11px]
            text-gray-700
            shadow-sm
            transition
            hover:bg-gray-100
          "
        >
          {/* ✅ STATUS DOT */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>

          <span className="font-medium">Live Data</span>

          {/* ✅ HOVER TOOLTIP */}
          <div
            className="
              absolute
              top-full
              right-0
              mt-2
              w-40
              rounded-lg
              border
              bg-white
              p-2.5
              text-[11px]
              text-gray-600
              shadow-lg
              opacity-0
              pointer-events-none
              group-hover:opacity-100
              transition
            "
          >
            Data is updated from live web sources in real time.
          </div>
        </div>
      </div>
    </nav>
  );
}

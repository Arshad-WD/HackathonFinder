export default function FetchButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        relative
        inline-flex
        items-center
        justify-center
        px-6
        py-2.5
        rounded-lg
        text-sm
        font-medium
        text-white
        bg-gradient-to-r
        from-gray-800
        via-gray-600
        to-gray-400
        shadow-md
        transition-all
        duration-200
        hover:brightness-110
        hover:shadow-lg
        active:scale-[0.98]
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus:outline-none
        focus:ring-2
        focus:ring-gray-800
        focus:ring-offset-2
      "
    >
      {loading && (
        <span className="absolute inset-0 rounded-lg bg-white/10 animate-pulse"></span>
      )}

      <span className="relative">
        {loading ? "Refreshing..." : "Refresh Data"}
      </span>
    </button>
  );
}

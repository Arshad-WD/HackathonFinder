import EventCard from "./EventCard";
import SkeletonCard from "./SkeletonCard";

export default function EventGrid({ data, loading }) {
  // ✅ LOADING STATE (SKELETON GRID)
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <SkeletonCard key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  // ✅ EMPTY STATE (PROFESSIONAL)
  if (data.length === 0) {
    return (
      <div className="mt-24 flex flex-col items-center text-center text-gray-500">
        <div className="text-lg font-medium text-gray-700 mb-1">
          No opportunities found
        </div>
        <div className="text-sm">
          Try changing your filters or refresh for latest data.
        </div>
      </div>
    );
  }

  // ✅ NORMAL GRID (WITH SAFE UNIQUE KEYS)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
      {data.map(event => (
        <EventCard
          key={`${event.source}-${event.title}-${event.deadline}`}
          event={event}
        />
      ))}
    </div>
  );
}

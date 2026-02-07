import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative group w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors">
        <Search className="w-4 h-4" />
      </div>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Filter by title or location..."
        className="
          w-full
          pl-11
          pr-4
          py-3
          bg-gray-100 dark:bg-white/5
          border-transparent
          focus:bg-white dark:focus:bg-white/10
          focus:border-accent
          focus:ring-4
          focus:ring-accent/10
          rounded-2xl
          text-sm
          font-medium
          transition-all
          outline-none
          placeholder:text-gray-400
        "
      />
    </div>
  );
}

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full md:w-80">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search by title, company, or location"
        className="
          w-full
          px-4
          py-2.5
          border
          border-gray-200
          rounded-lg
          text-sm
          text-black
          bg-white/90
          shadow-sm
          transition
          focus:outline-none
          focus:ring-2
          focus:ring-gray-900
          focus:border-gray-900
          placeholder-gray-400
        "
      />
    </div>
  );
}

export default function Tabs({ active, setActive }) {
  const tabs = [
    { key: "hackathon", label: "Hackathons" },
    { key: "internship", label: "Internships" }
  ];

  return (
    <div className="
      inline-flex
      items-center
      bg-gray-100/80
      backdrop-blur
      p-1
      rounded-xl
      border
      border-gray-200
      shadow-sm
    ">
      {tabs.map(tab => {
        const isActive = active === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`
              px-6
              py-2
              rounded-lg
              text-sm
              font-medium
              transition-all
              duration-200
              ${
                isActive
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

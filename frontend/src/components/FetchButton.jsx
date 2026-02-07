import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function FetchButton({ onClick, loading }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={loading}
      className={`
        relative
        flex
        items-center
        gap-2
        px-6
        py-3
        rounded-2xl
        text-sm
        font-bold
        transition-all
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${loading 
          ? "bg-gray-100 dark:bg-white/5 text-gray-400" 
          : "bg-accent text-white shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40"
        }
      `}
    >
      <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
      <span>{loading ? "Discovering..." : "Scan Web"}</span>
    </motion.button>
  );
}

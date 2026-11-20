import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

type ThemeToggleProps = {
  className?: string;
  /** compact = icon only (navbar); full = with label */
  variant?: "compact" | "full";
};

export function ThemeToggle({
  className = "",
  variant = "compact",
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`
        group relative inline-flex items-center justify-center gap-2
        rounded-full border transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50
        ${
          isDark
            ? "border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/20 hover:bg-white/[0.08]"
            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-sm"
        }
        ${variant === "full" ? "h-11 px-4" : "h-10 w-10"}
        ${className}
      `}
    >
      <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Sun className="h-4 w-4 text-amber-300" strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: 45, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -45, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Moon className="h-4 w-4 text-blue-600" strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {variant === "full" && (
        <span className="text-xs font-medium tracking-wide">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}

export default ThemeToggle;

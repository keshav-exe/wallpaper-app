import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleMouseEnter = (button: string) => {
    setHoveredButton(button);
  };

  return (
    <button
      onMouseEnter={() => handleMouseEnter("theme")}
      onMouseLeave={() => setHoveredButton(null)}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`w-full p-3 bg-background rounded-2xl hover:text-primary/80 transition-colors duration-300 z-50 flex items-center ${
        hoveredButton === "theme" ? "gap-2" : ""
      } relative`}
    >
      <motion.span
        initial={{ width: 0, opacity: 0, scale: 1 }}
        animate={{
          width: hoveredButton === "theme" ? "auto" : 0,
          opacity: hoveredButton === "theme" ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="text-sm font-semibold tracking-tight overflow-hidden whitespace-nowrap"
      >
        {theme === "light" ? "Light" : "Dark"}
      </motion.span>
      <div className="relative w-5 h-5">
        <Sun className="absolute size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
    </button>
  );
}

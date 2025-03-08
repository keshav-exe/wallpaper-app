import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-4 bg-secondary rounded-2xl hover:text-primary/80 transition-colors duration-300 z-50 flex items-center border border-primary/10 relative cursor-pointer"
    >
      <div className="relative w-4 h-4">
        <Sun className="absolute size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
    </button>
  );
}

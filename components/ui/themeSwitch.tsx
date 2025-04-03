import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-fit"
    >
      <div className="relative w-4 h-4">
        <Sun className="absolute size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
    </Button>
  );
}

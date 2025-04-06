"use client";

import { cn } from "@/lib/utils";

import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themes = [
  {
    key: "system",
    icon: Monitor,
    label: "System theme",
  },
  {
    key: "light",
    icon: Sun,
    label: "Light theme",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark theme",
  },
];

export type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitch = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleChangeTheme = (newTheme: "light" | "dark" | "system") => {
    if (newTheme === theme) return;
    if (!document.startViewTransition) return setTheme(newTheme);
    document.startViewTransition(() => setTheme(newTheme));
  };

  return (
    <div
      className={cn(
        "relative flex h-12 w-full items-center justify-between rounded-2xl border border-primary/10 bg-foreground/5 px-1 py-2",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            type="button"
            key={key}
            className="relative h-9 w-1/3 rounded-xl cursor-pointer"
            onClick={() =>
              handleChangeTheme(key as "light" | "dark" | "system")
            }
            aria-label={label}
          >
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 rounded-xl bg-primary"
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              />
            )}
            <Icon
              className={cn(
                "relative m-auto h-4 w-1/3 transition-colors duration-200",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

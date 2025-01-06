"use client";

import * as React from "react";
import { Moon, Sun, WandSparklesIcon, Undo } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { CircleProps } from "@/lib/constants";
import { useState } from "react";

export function ButtonsChin({
  generateNewPalette,
  isGenerating,
  previousCircles,
  setCircles,
  setPreviousCircles,
}: {
  generateNewPalette: () => void;
  isGenerating: boolean;
  previousCircles: CircleProps[];
  setCircles: (circles: CircleProps[]) => void;
  setPreviousCircles: (circles: CircleProps[]) => void;
}) {
  const { setTheme, theme } = useTheme();
  const [hoveredButton, setHoveredButton] = useState<
    "theme" | "generate" | "undo" | null
  >("generate");

  const handleMouseEnter = (button: "theme" | "generate" | "undo") => {
    setHoveredButton(button);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        type: "spring",
        damping: 20,
        stiffness: 100,
        mass: 0.5,
        delay: 0.5,
      }}
      className="flex items-center gap-2 p-4 w-fit mx-auto fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <button
        onMouseEnter={() => handleMouseEnter("theme")}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`w-full px-4 py-2 bg-secondary rounded-xl hover:text-primary/80 transition-colors duration-300 z-50 flex items-center ${
          hoveredButton === "theme" ? "gap-2" : ""
        } relative`}
      >
        <div className="relative w-5 h-5">
          <Sun className="absolute size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </div>
        <motion.span
          initial={{ width: 0, opacity: 0, scale: 1 }}
          animate={{
            width: hoveredButton === "theme" ? "auto" : 0,
            opacity: hoveredButton === "theme" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="text-sm font-semibold tracking-tight overflow-hidden whitespace-nowrap"
        >
          Theme
        </motion.span>
      </button>
      <button
        className={`w-full px-4 py-2 bg-gradient-to-b from-[#60A5FA] to-[#3B82F6] rounded-xl hover:text-white/80 text-white transition-all duration-300 z-50 flex items-center ${
          hoveredButton === "generate" ? "gap-2" : ""
        } justify-center disabled:opacity-50`}
        onClick={generateNewPalette}
        disabled={isGenerating}
        onMouseEnter={() => handleMouseEnter("generate")}
      >
        <WandSparklesIcon className="size-5" />
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: hoveredButton === "generate" ? "auto" : 0,
            opacity: hoveredButton === "generate" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="text-sm font-semibold tracking-tight overflow-hidden whitespace-nowrap"
        >
          Generate
        </motion.span>
      </button>
      <button
        className={`w-full px-4 py-2 bg-secondary rounded-xl hover:text-primary/80 transition-colors duration-300 z-50 flex items-center ${
          hoveredButton === "undo" ? "gap-2" : ""
        } disabled:opacity-50 ${
          previousCircles.length === 0 ? "opacity-50" : ""
        }`}
        onClick={() => {
          if (previousCircles.length > 0) {
            setCircles(previousCircles);
            setPreviousCircles([]);
          }
        }}
        onMouseEnter={() => handleMouseEnter("undo")}
      >
        <Undo className={`size-5 `} />
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: hoveredButton === "undo" ? "auto" : 0,
            opacity: hoveredButton === "undo" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className={`text-sm font-semibold tracking-tight overflow-hidden whitespace-nowrap`}
        >
          Undo
        </motion.span>
      </button>
    </motion.div>
  );
}

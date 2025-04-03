"use client";

import * as React from "react";
import { WandSparklesIcon, Undo, Trash2Icon } from "lucide-react";
import { motion } from "motion/react";
import { CircleProps } from "@/lib/constants";

interface ButtonsChinProps {
  isMobile?: boolean;
  generateNewPalette: () => void;
  isGenerating: boolean;
  previousCircles: CircleProps[];
  setCircles: (circles: CircleProps[]) => void;
  setPreviousCircles: (circles: CircleProps[]) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundImage: string | null;
  setBackgroundImage: (image: string | null) => void;
  setBlur: (blur: number) => void;
  blur: number;
}

export function ButtonsChin({
  isMobile = false,
  generateNewPalette,
  isGenerating,
  previousCircles,
  setCircles,
  setPreviousCircles,
  backgroundImage,
  setBackgroundImage,
  setBlur,
  blur,
}: ButtonsChinProps) {
  if (isMobile) {
    return (
      <div className="flex items-center gap-2 justify-center">
        <button
          className="flex items-center justify-between gap-2 text-primary-foreground bg-primary rounded-2xl relative px-4 py-3 cursor-pointer border border-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            generateNewPalette();
            setBackgroundImage(null);
            if (blur === 0) {
              setBlur(600);
            }
          }}
          disabled={isGenerating}
        >
          <WandSparklesIcon className="size-4" />
          <span className="text-sm">Generate</span>
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        type: "spring",
        damping: 20,
        stiffness: 100,
        mass: 0.5,
        delay: 0.5,
      }}
      className="flex items-center gap-2 mx-auto justify-start lg:justify-center overflow-x-auto no-scrollbar w-fit"
    >
      <button
        className="px-4 py-3 bg-primary rounded-2xl hover:text-primary-foreground/80 text-primary-foreground transition-all duration-300 z-50 flex items-center gap-2 justify-center disabled:opacity-50 text-nowrap cursor-pointer disabled:cursor-not-allowed shadow border border-primary/10"
        onClick={() => {
          generateNewPalette();
          setBackgroundImage(null);
          if (blur === 0) {
            setBlur(600);
          }
        }}
        disabled={isGenerating}
      >
        <WandSparklesIcon className="size-4" />
        <span className="text-sm tracking-tight">Generate</span>
      </button>

      <button
        className="px-4 py-3 relative items-center justify-center rounded-2xl text-foreground border border-primary/10 bg-secondary cursor-pointer flex gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow h-full"
        disabled={previousCircles.length === 0}
        onClick={() => {
          setBackgroundImage(null);
          if (previousCircles.length > 0) {
            setCircles(previousCircles);
            setPreviousCircles([]);
          }
        }}
      >
        {backgroundImage ? (
          <Trash2Icon className="size-4" />
        ) : (
          <Undo className="size-4" />
        )}
      </button>
    </motion.div>
  );
}

"use client";

import * as React from "react";
import {
  WandSparklesIcon,
  Undo,
  Trash2Icon,
  MonitorIcon,
  SmartphoneIcon,
  SquareIcon,
} from "lucide-react";
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
  aspectRatio: "desktop" | "mobile" | "square";
  setAspectRatio: (ratio: "desktop" | "mobile" | "square") => void;
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
  aspectRatio,
  setAspectRatio,
}: ButtonsChinProps) {
  const ASPECT_OPTIONS = [
    { value: "desktop", icon: MonitorIcon },
    { value: "mobile", icon: SmartphoneIcon },
    { value: "square", icon: SquareIcon },
  ] as const;

  if (isMobile) {
    return (
      <div className="flex items-center gap-2 justify-center">
        <button
          onClick={() => {
            const currentIndex = ASPECT_OPTIONS.findIndex(
              (opt) => opt.value === aspectRatio
            );
            const nextIndex = (currentIndex + 1) % ASPECT_OPTIONS.length;
            setAspectRatio(ASPECT_OPTIONS[nextIndex].value);
          }}
          className="px-4 py-3 min-w-[120px] relative items-center justify-center rounded-2xl text-foreground border border-primary/10 bg-secondary cursor-pointer flex gap-2"
        >
          {(() => {
            const Icon =
              ASPECT_OPTIONS.find((opt) => opt.value === aspectRatio)?.icon ||
              MonitorIcon;
            return <Icon className="size-4" />;
          })()}
          <span className="text-sm">
            {aspectRatio === "desktop"
              ? "Desktop"
              : aspectRatio === "mobile"
              ? "Mobile"
              : "Square"}
          </span>
        </button>

        <button
          className="flex items-center justify-between gap-2 text-primary-foreground text-sm bg-primary rounded-2xl relative px-4 py-3 cursor-pointer border border-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
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
      className="flex items-center gap-2 p-4 mx-auto justify-start lg:justify-center overflow-x-auto no-scrollbar w-fit"
    >
      <button
        onClick={() => {
          const currentIndex = ASPECT_OPTIONS.findIndex(
            (opt) => opt.value === aspectRatio
          );
          const nextIndex = (currentIndex + 1) % ASPECT_OPTIONS.length;
          setAspectRatio(ASPECT_OPTIONS[nextIndex].value);
        }}
        className="px-4 py-3 bg-primary rounded-xl text-primary-foreground relative flex items-center justify-center cursor-pointer"
      >
        {(() => {
          const Icon =
            ASPECT_OPTIONS.find((opt) => opt.value === aspectRatio)?.icon ||
            MonitorIcon;
          return <Icon className="size-4" />;
        })()}
      </button>

      <button
        className="px-4 py-3 bg-primary rounded-xl hover:text-primary-foreground/80 text-primary-foreground transition-all duration-300 z-50 flex items-center gap-2 justify-center disabled:opacity-50 text-nowrap cursor-pointer"
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
        <span className="text-xs tracking-tight">Generate Gradient</span>
      </button>

      <button
        className="size-10 bg-primary rounded-xl text-primary-foreground relative flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

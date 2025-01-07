"use client";

import * as React from "react";
import { WandSparklesIcon, Undo, Trash2Icon, Image } from "lucide-react";
import { motion } from "motion/react";
import { CircleProps } from "@/lib/constants";
import { useState } from "react";
import { Input } from "./input";

export function ButtonsChin({
  generateNewPalette,
  isGenerating,
  previousCircles,
  setCircles,
  setPreviousCircles,
  handleImageUpload,
  backgroundImage,
  setBackgroundImage,
  setBlur,
  blur,
}: {
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
}) {
  const [hoveredButton, setHoveredButton] = useState<
    "theme" | "generate" | "undo" | "upload" | null
  >("generate");
  const [isUploading, setIsUploading] = useState(false);

  const handleMouseEnter = (
    button: "theme" | "generate" | "undo" | "upload"
  ) => {
    setHoveredButton(button);
  };

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
      className="flex items-center gap-2 p-4 w-fit mx-auto fixed bottom-4 left-1/2 -translate-x-1/2 z-50 justify-center"
    >
      <button
        className={`w-full p-3 bg-primary rounded-2xl hover:text-primary-foreground/80 text-primary-foreground transition-all duration-300 z-50 flex items-center ${
          hoveredButton === "generate" ? "gap-2" : ""
        } justify-center disabled:opacity-50`}
        onClick={() => {
          generateNewPalette();
          setBackgroundImage(null);
          if (blur === 0) {
            setBlur(200);
          }
        }}
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
          className="text-sm  tracking-tight overflow-hidden whitespace-nowrap"
        >
          Generate Gradient
        </motion.span>
      </button>

      <div className="flex items-center gap-2">
        <label
          className={`w-full p-3 bg-primary rounded-2xl hover:text-primary-foreground/80 text-primary-foreground transition-all duration-300 z-50 flex items-center cursor-pointer ${
            hoveredButton === "upload" ? "gap-2" : ""
          } justify-center ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onMouseEnter={() => handleMouseEnter("upload")}
        >
          <Input
            type="file"
            accept="image/*"
            key={backgroundImage ? "has-image" : "no-image"}
            onChange={async (e) => {
              if (isUploading) return;
              setIsUploading(true);
              try {
                await handleImageUpload(e);
              } finally {
                setIsUploading(false);
                e.target.value = "";
              }
            }}
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? (
            <span className="animate-pulse">Uploading...</span>
          ) : (
            <>
              <Image className="size-5" />
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: hoveredButton === "upload" ? "auto" : 0,
                  opacity: hoveredButton === "upload" ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="text-sm  tracking-tight overflow-hidden whitespace-nowrap"
              >
                Background Image
              </motion.span>
            </>
          )}
        </label>

        <button
          className={`w-full p-3 bg-background rounded-2xl hover:text-primary/80 transition-colors duration-300 z-50 flex items-center ${
            hoveredButton === "undo" ? "gap-2" : ""
          }`}
          onClick={() => {
            setBackgroundImage(null);
            if (previousCircles.length > 0) {
              setCircles(previousCircles);
              setPreviousCircles([]);
            }
          }}
          onMouseEnter={() => handleMouseEnter("undo")}
        >
          {backgroundImage ? (
            <Trash2Icon className="size-5" />
          ) : (
            <Undo className={`size-5 `} />
          )}
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: hoveredButton === "undo" ? "auto" : 0,
              opacity: hoveredButton === "undo" ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className={`text-sm  tracking-tight overflow-hidden whitespace-nowrap`}
          >
            {backgroundImage ? "Clear" : "Undo"}
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
}

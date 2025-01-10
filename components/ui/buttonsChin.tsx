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
  const [isUploading, setIsUploading] = useState(false);

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
      className="flex items-center gap-2 p-4 mx-auto justify-center"
    >
      <button
        className="w-full p-3 bg-primary rounded-2xl hover:text-primary-foreground/80 text-primary-foreground transition-all duration-300 z-50 flex items-center gap-2 justify-center disabled:opacity-50"
        onClick={() => {
          generateNewPalette();
          setBackgroundImage(null);
          if (blur === 0) {
            setBlur(200);
          }
        }}
        disabled={isGenerating}
      >
        <WandSparklesIcon className="size-5" />
        <span className="text-sm tracking-tight">Generate Gradient</span>
      </button>

      <div className="flex items-center gap-2">
        <label
          className={`w-full p-3 bg-primary rounded-2xl hover:text-primary-foreground/80 text-primary-foreground transition-all duration-300 z-50 flex items-center gap-2 cursor-pointer justify-center ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
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

              <span className="text-sm tracking-tight text-nowrap">
                Background Image
              </span>
            </>
          )}
        </label>

        <button
          className="w-full p-3 bg-background rounded-2xl hover:text-primary/80 transition-colors duration-300 z-50 flex items-center gap-2"
          onClick={() => {
            setBackgroundImage(null);
            if (previousCircles.length > 0) {
              setCircles(previousCircles);
              setPreviousCircles([]);
            }
          }}
        >
          {backgroundImage ? (
            <Trash2Icon className="size-5" />
          ) : (
            <Undo className="size-5" />
          )}
          <span className="text-sm tracking-tight">
            {backgroundImage ? "Clear" : "Undo"}
          </span>
        </button>
      </div>
    </motion.div>
  );
}

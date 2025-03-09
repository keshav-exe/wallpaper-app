import { create } from "zustand";
import {
  INITIAL_COLORS,
  INITIAL_BACKGROUND_COLORS,
  RESOLUTIONS,
  type CircleProps,
  FONTS,
} from "@/lib/constants";
import { Dispatch, SetStateAction } from "react";

interface WallpaperState {
  // Colors and Circles
  colors: string[];
  backgroundColors: string[];
  activeColor: number | null;
  circles: CircleProps[];
  previousCircles: CircleProps[];
  numCircles: number;
  backgroundColor: string;

  // Text Properties
  text: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  opacity: number;
  fontFamily: string;
  lineHeight: number;
  textColor: string;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;

  // Effects
  blur: number;
  saturation: number;
  contrast: number;
  brightness: number;
  grainIntensity: number;
  vignetteIntensity: number;
  textShadow: {
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  };

  // UI State
  activeTab: "colors" | "text" | "effects" | "background";
  activeColorPicker: string;
  activeColorType: "text" | "background" | "gradient";
  resolution: (typeof RESOLUTIONS)[number];
  modifiedProperties: Set<string>;
  isDownloading: boolean;
  isGenerating: boolean;
  isUploading: boolean;
  backgroundImage: string | null;

  // Actions
  setCircles: (circles: CircleProps[]) => void;
  setPreviousCircles: (circles: CircleProps[]) => void;
  setActiveColor: (index: number | null) => void;
  updateColor: (newColor: string, index: number) => void;
  setText: (text: string) => void;
  setFontSize: (size: number) => void;
  setFontWeight: (weight: number) => void;
  setFontFamily: (family: string) => void;
  setBackgroundColor: (color: string) => void;
  setTextColor: (color: string) => void;
  trackPropertyModification: (property: string) => void;
  generateNewPalette: () => void;

  // Add missing setters
  setActiveTab: (tab: "colors" | "text" | "effects" | "background") => void;
  setLetterSpacing: (spacing: number) => void;
  setOpacity: (opacity: number) => void;
  setLineHeight: (height: number) => void;
  setBlur: (blur: number) => void;
  setSaturation: (saturation: number) => void;
  setContrast: (contrast: number) => void;
  setBrightness: (brightness: number) => void;
  setGrainIntensity: (intensity: number) => void;
  setVignetteIntensity: (intensity: number) => void;
  setTextShadow: Dispatch<
    SetStateAction<{
      color: string;
      blur: number;
      offsetX: number;
      offsetY: number;
    }>
  >;
  setIsItalic: (isItalic: boolean) => void;
  setIsUnderline: (isUnderline: boolean) => void;
  setIsStrikethrough: (isStrikethrough: boolean) => void;
  setResolution: (resolution: (typeof RESOLUTIONS)[number]) => void;
  setBackgroundImage: (image: string | null) => void;
  setIsUploading: (isUploading: boolean) => void;
  setNumCircles: (num: number) => void;
  setActiveColorPicker: (color: string) => void;
  setActiveColorType: (type: "text" | "background" | "gradient") => void;
}

export const useWallpaperStore = create<WallpaperState>((set, get) => ({
  // Initial state
  colors: INITIAL_COLORS,
  backgroundColors: INITIAL_BACKGROUND_COLORS,
  activeColor: null,
  circles: INITIAL_COLORS.map((color) => ({
    color,
    cx: Math.random() * 100,
    cy: Math.random() * 100,
  })),
  previousCircles: [],
  numCircles: INITIAL_COLORS.length,
  text: "Gradii.",
  fontSize: 36,
  blur: 500,
  fontWeight: 600,
  letterSpacing: -0.02,
  opacity: 100,
  fontFamily: "Onest",
  activeTab: "text",
  grainIntensity: 25,
  vignetteIntensity: 0,
  backgroundColor: "#0D1319",
  lineHeight: 1,
  textColor: "#f1f1f1",
  activeColorPicker: "#f1f1f1",
  activeColorType: "text",
  resolution: RESOLUTIONS[0],
  saturation: 100,
  contrast: 100,
  brightness: 100,
  backgroundImage: null,
  isItalic: false,
  isUnderline: false,
  isStrikethrough: false,
  modifiedProperties: new Set(),
  isDownloading: false,
  isGenerating: false,
  isUploading: false,
  textShadow: {
    color: "#f5f5f5",
    blur: 24,
    offsetX: 0,
    offsetY: 0,
  },

  // Actions
  setCircles: (circles) => set({ circles }),
  setPreviousCircles: (circles) => set({ previousCircles: circles }),
  setActiveColor: (index) => set({ activeColor: index }),
  updateColor: (newColor, index) => {
    const { circles } = get();
    const newCircles = [...circles];
    newCircles[index] = {
      ...newCircles[index],
      color: newColor,
    };
    set({ circles: newCircles });
  },
  setText: (text) => set({ text }),
  setFontSize: (size) => {
    get().trackPropertyModification("fontSize");
    set({ fontSize: size });
  },
  setFontWeight: (weight) => set({ fontWeight: weight }),
  setFontFamily: (family) => {
    get().trackPropertyModification("fontFamily");
    set({ fontFamily: family });
  },
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setTextColor: (color) => set({ textColor: color }),
  trackPropertyModification: (property) => {
    const { modifiedProperties } = get();
    set({ modifiedProperties: new Set([...modifiedProperties, property]) });
  },
  generateNewPalette: () => {
    const { circles, modifiedProperties } = get();
    set({
      previousCircles: circles,
      circles: circles.map((circle) => ({
        ...circle,
        cx: Math.random() * 100,
        cy: Math.random() * 100,
      })),
    });

    if (!modifiedProperties.has("backgroundColor")) {
      const randomColor =
        INITIAL_BACKGROUND_COLORS[
          Math.floor(Math.random() * INITIAL_BACKGROUND_COLORS.length)
        ];
      set({ backgroundColor: randomColor });
    }

    if (!modifiedProperties.has("fontFamily")) {
      const randomFont = FONTS[Math.floor(Math.random() * FONTS.length)];
      set({ fontFamily: randomFont.name });
    }

    if (!modifiedProperties.has("fontWeight")) {
      const randomFont = FONTS[Math.floor(Math.random() * FONTS.length)];
      const availableWeights = randomFont?.weights || [
        100, 200, 300, 400, 500, 600, 700, 800, 900,
      ];
      set({
        fontWeight:
          availableWeights[Math.floor(Math.random() * availableWeights.length)],
      });
    }

    if (!modifiedProperties.has("fontSize")) {
      const fontSizes = [24, 28, 32, 36, 40, 44, 48, 52, 56, 60];
      set({
        fontSize: fontSizes[Math.floor(Math.random() * fontSizes.length)],
      });
    }

    if (!modifiedProperties.has("letterSpacing")) {
      set({
        letterSpacing: Number((Math.random() * 0.15 - 0.05).toFixed(2)),
      });
    }

    set({ isGenerating: true });
    setTimeout(() => {
      set({ isGenerating: false });
    }, 1000);
  },

  // Add missing setters
  setActiveTab: (tab) => set({ activeTab: tab }),
  setLetterSpacing: (spacing) => set({ letterSpacing: spacing }),
  setOpacity: (opacity) => set({ opacity }),
  setLineHeight: (height) => set({ lineHeight: height }),
  setBlur: (blur) => set({ blur }),
  setSaturation: (saturation) => set({ saturation }),
  setContrast: (contrast) => set({ contrast }),
  setBrightness: (brightness) => set({ brightness }),
  setGrainIntensity: (intensity) => set({ grainIntensity: intensity }),
  setVignetteIntensity: (intensity) => set({ vignetteIntensity: intensity }),
  setTextShadow: (value) =>
    set({
      textShadow: typeof value === "function" ? value(get().textShadow) : value,
    }),
  setIsItalic: (isItalic) => set({ isItalic }),
  setIsUnderline: (isUnderline) => set({ isUnderline }),
  setIsStrikethrough: (isStrikethrough) => set({ isStrikethrough }),
  setResolution: (resolution) => set({ resolution }),
  setBackgroundImage: (image) => set({ backgroundImage: image }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setNumCircles: (num) => set({ numCircles: num }),
  setActiveColorPicker: (color) => set({ activeColorPicker: color }),
  setActiveColorType: (type) => set({ activeColorType: type }),
}));

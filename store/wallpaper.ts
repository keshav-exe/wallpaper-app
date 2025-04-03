import { create } from "zustand";
import {
  INITIAL_COLORS,
  INITIAL_BACKGROUND_COLORS,
  type CircleProps,
} from "@/lib/constants";
import { Dispatch, SetStateAction } from "react";
import { debounce } from "@/lib/utils";

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
  htmlContent: string;
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
  activeTab: "colors" | "design" | "filters" | "canvas";
  activeColorPicker: string;
  activeColorType: "text" | "background" | "gradient";
  resolution: { width: number; height: number };
  isDownloading: boolean;
  isGenerating: boolean;
  isUploading: boolean;
  backgroundImage: string | null;

  // Position
  textPosition: { x: number; y: number };

  // Add these to WallpaperState interface
  textMode: "text" | "image";
  logoImage: string | null;

  // Text Alignment
  textAlign: "left" | "center" | "right";

  // Actions
  setCircles: (circles: CircleProps[]) => void;
  setPreviousCircles: (circles: CircleProps[]) => void;
  setActiveColor: (index: number | null) => void;
  updateColor: (newColor: string, index: number) => void;
  setText: (text: string) => void;
  setHtmlContent: (content: string) => void;
  setFontSize: (size: number) => void;
  setFontWeight: (weight: number) => void;
  setFontFamily: (family: string) => void;
  setBackgroundColor: (color: string) => void;
  setTextColor: (color: string) => void;
  generateNewPalette: () => void;

  // Add missing setters
  setActiveTab: (tab: "colors" | "design" | "filters" | "canvas") => void;
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
  setResolution: (resolution: { width: number; height: number }) => void;
  setBackgroundImage: (image: string | null) => void;
  setIsUploading: (isUploading: boolean) => void;
  setNumCircles: (num: number) => void;
  setActiveColorPicker: (color: string) => void;
  setActiveColorType: (type: "text" | "background" | "gradient") => void;
  setIsDownloading: (isDownloading: boolean) => void;
  setTextPosition: (textPosition: { x: number; y: number }) => void;

  // Add these actions
  setTextMode: (mode: "text" | "image") => void;
  setLogoImage: (image: string | null) => void;

  // Add missing setters
  setTextAlign: (align: "left" | "center" | "right") => void;
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
  htmlContent: "<p>Gradii.</p>",
  fontSize: 36,
  blur: 600,
  fontWeight: 600,
  letterSpacing: -0.02,
  opacity: 100,
  fontFamily: "Onest",
  activeTab: "design",
  grainIntensity: 25,
  vignetteIntensity: 0,
  backgroundColor: "#001220",
  lineHeight: 1,
  textColor: "#f1f1f1",
  activeColorPicker: "#f1f1f1",
  activeColorType: "text",
  resolution: { width: 1920, height: 1080 },
  saturation: 100,
  contrast: 100,
  brightness: 100,
  backgroundImage: null,
  isItalic: false,
  isUnderline: false,
  isStrikethrough: false,
  isDownloading: false,
  isGenerating: false,
  isUploading: false,
  textShadow: {
    color: "#f5f5f5",
    blur: 24,
    offsetX: 0,
    offsetY: 0,
  },
  textPosition: { x: 0, y: 0 },

  // Add to initial state
  textMode: "text",
  logoImage: null,

  // Text Alignment
  textAlign: "center",

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
  setHtmlContent: (content) => set({ htmlContent: content }),
  setFontSize: debounce((size: number) => set({ fontSize: size }), 100),
  setFontWeight: (weight) => set({ fontWeight: weight }),
  setFontFamily: (family) => set({ fontFamily: family }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setTextColor: (color) => set({ textColor: color }),
  generateNewPalette: () => {
    const { circles } = get();
    set({
      previousCircles: circles,
      circles: circles.map((circle) => ({
        ...circle,
        cx: Math.random() * 100,
        cy: Math.random() * 100,
      })),
    });

    set({ isGenerating: true });
    setTimeout(() => {
      set({ isGenerating: false });
    }, 1000);
  },

  // Add missing setters
  setActiveTab: (tab) => set({ activeTab: tab }),
  setLetterSpacing: debounce(
    (spacing: number) => set({ letterSpacing: spacing }),
    100
  ),
  setOpacity: (opacity) => set({ opacity }),
  setLineHeight: debounce((height: number) => set({ lineHeight: height }), 100),
  setBlur: debounce((blur: number) => set({ blur }), 100),
  setSaturation: debounce((saturation: number) => set({ saturation }), 100),
  setContrast: debounce((contrast: number) => set({ contrast }), 100),
  setBrightness: debounce((brightness: number) => set({ brightness }), 100),
  setGrainIntensity: debounce(
    (grainIntensity: number) => set({ grainIntensity }),
    100
  ),
  setVignetteIntensity: debounce(
    (vignetteIntensity: number) => set({ vignetteIntensity }),
    100
  ),
  setTextShadow: (value) =>
    debounce(
      () =>
        set({
          textShadow:
            typeof value === "function" ? value(get().textShadow) : value,
        }),
      100
    ),
  setIsItalic: (isItalic) => set({ isItalic }),
  setIsUnderline: (isUnderline) => set({ isUnderline }),
  setIsStrikethrough: (isStrikethrough) => set({ isStrikethrough }),
  setResolution: (resolution) => set({ resolution }),
  setBackgroundImage: (image) => set({ backgroundImage: image }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setNumCircles: (num) => set({ numCircles: num }),
  setActiveColorPicker: (color) => set({ activeColorPicker: color }),
  setActiveColorType: (type) => set({ activeColorType: type }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setTextPosition: (textPosition) => set({ textPosition }),

  // Add these actions
  setTextMode: (mode) => set({ textMode: mode }),
  setLogoImage: (image) => set({ logoImage: image }),

  // Add missing setters
  setTextAlign: (align) => set({ textAlign: align }),
}));

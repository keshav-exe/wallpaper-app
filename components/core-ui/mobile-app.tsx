"use client";

import { Input } from "@/components/ui/input";
import { CameraIcon, Download, WandSparklesIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence, Variants } from "motion/react";
import { HexColorPicker } from "react-colorful";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  BLUR_OPTIONS,
  CircleProps,
  FontOption,
  RESOLUTIONS,
} from "@/lib/constants";
import { ButtonsChin } from "../ui/buttonsChin";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import { SidebarHeader } from "../ui/sidebarHeader";
import { ThemeSwitch } from "../ui/themeSwitch";

interface DesktopAppProps {
  backgroundColor: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  fontFamily: string;
  opacity: number;
  lineHeight: number;
  text: string;
  circles: CircleProps[];
  filterIntensity: number;
  filterStyle: React.CSSProperties;
  textColor: string;
  generateNewPalette: () => void;
  isGenerating: boolean;
  downloadImage: () => void;
  isDownloading: boolean;
  previousCircles: CircleProps[];
  setCircles: (circles: CircleProps[]) => void;
  setPreviousCircles: (circles: CircleProps[]) => void;
  setActiveTab: (tab: "text" | "colors" | "effects") => void;
  activeTab: "text" | "colors" | "effects";
  setText: (text: string) => void;
  setFontFamily: (fontFamily: string) => void;
  setFontSize: (fontSize: number) => void;
  setFontWeight: (fontWeight: number) => void;
  setLetterSpacing: (letterSpacing: number) => void;
  setOpacity: (opacity: number) => void;
  setLineHeight: (lineHeight: number) => void;
  setBackgroundColor: (backgroundColor: string) => void;
  setActiveColorPicker: (color: string) => void;
  handleColorChange: (color: string) => void;
  setActiveColorType: (colorType: "gradient" | "background" | "text") => void;
  setActiveColor: (color: number) => void;
  updateColor: (color: string, index: number) => void;
  fonts: FontOption[];
  activeColorPicker: string;
  filterType: "pastel" | "film" | "grain" | "static";
  setFilterIntensity: (filterIntensity: number) => void;
  setFilterType: (filterType: "pastel" | "film" | "grain" | "static") => void;
  setTextColor: (textColor: string) => void;
  resolution: (typeof RESOLUTIONS)[number];
  setResolution: (res: (typeof RESOLUTIONS)[number]) => void;
  saturation: number;
  setSaturation: (value: number) => void;
  contrast: number;
  setContrast: (value: number) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  blur: number;
  setBlur: (value: number) => void;
  backgroundImage: string | null;
  setBackgroundImage: (backgroundImage: string | null) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  setIsItalic: (value: boolean) => void;
  setIsUnderline: (value: boolean) => void;
  setIsStrikethrough: (value: boolean) => void;
}

const PREVIEW_DIMENSIONS = {
  desktop: {
    width: 240,
    height: 120, // 16:9
  },
  mobile: {
    width: 120,
    height: 240,
  },
  square: {
    width: 230,
    height: 230, // 1:1
  },
} as const;

export default function DesktopApp({
  blur,
  setBlur,
  backgroundColor,
  fontSize,
  fontWeight,
  letterSpacing,
  fontFamily,
  opacity,
  lineHeight,
  text,
  circles,
  filterIntensity,
  filterStyle,
  textColor,
  generateNewPalette,
  isGenerating,
  downloadImage,
  isDownloading,
  previousCircles,
  setCircles,
  setPreviousCircles,
  setActiveTab,
  activeTab,
  setText,
  setFontFamily,
  setFontSize,
  setFontWeight,
  setLetterSpacing,
  setOpacity,
  setLineHeight,
  setBackgroundColor,
  setActiveColorPicker,
  handleColorChange,
  setActiveColorType,
  setActiveColor,
  updateColor,
  fonts,
  activeColorPicker,
  filterType,
  setFilterIntensity,
  setFilterType,
  setTextColor,
  resolution,
  setResolution,
  saturation,
  setSaturation,
  contrast,
  setContrast,
  brightness,
  setBrightness,
  backgroundImage,
  setBackgroundImage,
  isItalic,
  isUnderline,
  isStrikethrough,
  setIsItalic,
  setIsUnderline,
  setIsStrikethrough,
}: DesktopAppProps) {
  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const scaleVariants: Variants = {
    initial: {
      y: 20,
      opacity: 0,
      position: "absolute",
    },
    animate: {
      y: 0,
      opacity: 1,
      position: "absolute",
    },
    exit: {
      y: -20,
      opacity: 0,
      position: "absolute",
    },
  };

  const [[page, direction], setPage] = useState([0, 0]);
  const tabIndex = ["text", "colors", "effects"].indexOf(activeTab);

  useEffect(() => {
    const newDirection = tabIndex > page ? 1 : -1;
    setPage([tabIndex, newDirection]);
  }, [tabIndex]);

  const getPreviewScale = (resolution: (typeof RESOLUTIONS)[number]) => {
    const container = PREVIEW_DIMENSIONS[aspectRatio];
    const scaleX = container.width / resolution.width;
    const scaleY = container.height / resolution.height;
    return Math.min(scaleX, scaleY);
  };

  const [aspectRatio, setAspectRatio] = useState<
    "desktop" | "mobile" | "square"
  >("mobile");

  const filteredResolutions = RESOLUTIONS.filter(
    (r) => r.ratio === aspectRatio
  );

  useEffect(() => {
    const resolutionsForRatio = RESOLUTIONS.filter(
      (r) => r.ratio === aspectRatio
    );
    if (resolutionsForRatio.length > 0) {
      setResolution(resolutionsForRatio[0]);
    }
  }, [aspectRatio]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const memoizedCircles = useMemo(
    () =>
      circles.map((circle, i) => (
        <circle
          key={i}
          cx={`${circle.cx}%`}
          cy={`${circle.cy}%`}
          r="30%"
          fill={circle.color}
          style={{
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
            contain: "strict",
          }}
        />
      )),
    [circles]
  );

  const fontPreloadText = useMemo(() => {
    return fonts.map((font) => (
      <div
        key={font.name}
        style={{
          fontFamily: font.name,
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          fontSize: "0px",
        }}
        aria-hidden="true"
      >
        {text}
      </div>
    ));
  }, [fonts, text]);
  return (
    <main className="relative flex flex-col h-screen bg-background">
      <div aria-hidden="true" className="sr-only">
        {fontPreloadText}
      </div>

      {/* Preview Section */}
      <section className="relative flex-1 bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative overflow-hidden rounded-lg"
            style={{
              width: PREVIEW_DIMENSIONS[aspectRatio].width,
              height: PREVIEW_DIMENSIONS[aspectRatio].height,
            }}
          >
            <div
              className="absolute inset-0 object-center overflow-hidden"
              id="wallpaper"
              style={{
                width: `${resolution.width}px`,
                height: `${resolution.height}px`,
                transform: `scale(${getPreviewScale(resolution)})`,
                transformOrigin: "top left",
              }}
            >
              {/* Background Layer */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: backgroundImage
                    ? "transparent"
                    : backgroundColor,
                }}
              />

              {/* Image/Gradient Layer */}
              {!backgroundImage ? (
                <div
                  className="absolute inset-0"
                  style={{ contain: "paint layout" }}
                >
                  <svg
                    className="w-full h-full"
                    style={{
                      filter: `blur(${
                        (blur * resolution.width) / 1920
                      }px) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                      transform: "translate3d(0,0,0)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      willChange: "transform filter",
                      contain: "strict",
                    }}
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                  >
                    {memoizedCircles}
                  </svg>
                </div>
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: `blur(${
                      (blur * resolution.width) / 1920
                    }px) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                  }}
                />
              )}

              {/* Filter Effects Layer */}
              <div className="absolute inset-0" style={filterStyle} />

              {/* Text Layer */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <p
                  style={{
                    fontSize: `${(fontSize * resolution.width) / 1920}px`,
                    fontWeight,
                    letterSpacing: `${
                      (letterSpacing * resolution.width) / 1920
                    }em`,
                    fontFamily,
                    opacity: opacity / 100,
                    lineHeight: `${(lineHeight * resolution.width) / 1920}em`,
                    color: textColor,
                    textAlign: "center",
                    maxWidth: "90%",
                    fontStyle: isItalic ? "italic" : "normal",
                    textDecoration: `${isUnderline ? "underline" : ""} ${
                      isStrikethrough ? "line-through" : ""
                    }`.trim(),
                  }}
                >
                  {text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="relative z-10 bg-background rounded-t-3xl -mt-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "text" | "colors" | "effects")
          }
          className="h-[45vh]"
        >
          <TabsList className="flex w-full p-2 gap-2 bg-muted/50 sticky top-0 z-10">
            {["text", "colors", "effects"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 relative"
                disabled={tab === "colors" && !!backgroundImage}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="overflow-x-auto">
            <div className="flex snap-x snap-mandatory">
              {/* Text Controls */}
              {activeTab === "text" && (
                <div className="flex-none w-full snap-center p-4 space-y-4">
                  <Input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text"
                    className="w-full"
                  />
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map((font: { name: string }) => (
                        <SelectItem key={font.name} value={font.name}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">
                      Font Size
                    </label>
                    <Slider
                      min={12}
                      max={180}
                      step={2}
                      value={[fontSize]}
                      onValueChange={([value]) => setFontSize(value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">
                      Text Decoration
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar rounded-xl">
                      <button
                        onClick={() => setIsItalic(!isItalic)}
                        className={cn(
                          "w-full rounded-xl px-4 py-2 text-sm relative",
                          "text-primary transition-all duration-300",
                          isItalic ? "bg-primary/20" : "bg-background"
                        )}
                      >
                        <span className="italic">Italic</span>
                      </button>
                      <button
                        onClick={() => setIsUnderline(!isUnderline)}
                        className={cn(
                          "w-full rounded-xl px-4 py-2 text-sm relative",
                          "text-primary transition-all duration-300",
                          isUnderline ? "bg-primary/20" : "bg-background"
                        )}
                      >
                        <span className="underline">Underline</span>
                      </button>
                      <button
                        onClick={() => setIsStrikethrough(!isStrikethrough)}
                        className={cn(
                          "w-full rounded-xl px-4 py-2 text-sm relative",
                          "text-primary transition-all duration-300",
                          isStrikethrough ? "bg-primary/20" : "bg-background"
                        )}
                      >
                        <span className="line-through">Strikethrough</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Colors Controls */}
              {activeTab === "colors" && (
                <div className="flex-none w-full snap-center p-4 space-y-4">
                  <HexColorPicker
                    color={activeColorPicker}
                    onChange={(color) => {
                      setActiveColorPicker(color);
                      handleColorChange(color);
                    }}
                    className="w-full"
                  />
                  <div className="space-y-2">
                    {circles.map((circle: { color: string }, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-lg"
                          style={{ backgroundColor: circle.color }}
                          onClick={() => {
                            setActiveColorType("gradient");
                            setActiveColor(index);
                            setActiveColorPicker(circle.color);
                          }}
                        />
                        <Input
                          value={circle.color}
                          onChange={(e) => updateColor(e.target.value, index)}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Effects Controls */}
              {activeTab === "effects" && (
                <div className="flex-none w-full snap-center p-4 space-y-4">
                  <Select
                    value={filterType}
                    onValueChange={(
                      value: "pastel" | "film" | "grain" | "static"
                    ) => setFilterType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select filter type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pastel">Pastel</SelectItem>
                      <SelectItem value="film">Film Grain</SelectItem>
                      <SelectItem value="grain">Grain</SelectItem>
                      <SelectItem value="static">Static</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">
                      Filter Intensity
                    </label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[filterIntensity]}
                      onValueChange={([value]) => setFilterIntensity(value)}
                    />
                  </div>
                  {/* Add other effects controls similarly */}
                </div>
              )}
            </div>
          </div>
        </Tabs>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 flex items-center gap-2 p-4 bg-background border-t">
          <button
            onClick={generateNewPalette}
            className="aspect-square h-full bg-primary text-primary-foreground rounded-xl p-3"
            disabled={isGenerating}
          >
            <WandSparklesIcon className="size-4" />
          </button>

          <button
            onClick={downloadImage}
            className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 flex items-center justify-center gap-2"
            disabled={isDownloading}
          >
            <Download className="size-4" />
            Download
          </button>

          <button
            onClick={() => {
              const nextIndex =
                (currentResolutionIndex + 1) % filteredResolutions.length;
              setResolution(filteredResolutions[nextIndex]);
            }}
            className="aspect-square h-full bg-primary text-primary-foreground rounded-xl p-3"
          >
            {resolution.scale}x
          </button>
        </div>
      </section>
    </main>
  );
}

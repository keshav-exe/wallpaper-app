"use client";

import { Input } from "@/components/ui/input";
import { DownloadIcon, Loader2Icon, SettingsIcon } from "lucide-react";
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
import { useState, useEffect, useMemo, useRef } from "react";
import logo from "@/public/logo.svg";
import { ThemeSwitch } from "../ui/themeSwitch";
import { generateRandomShape, renderShape } from "@/lib/utils/shapes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";

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
    width: 768,
    height: 432, // 16:9
  },
  mobile: {
    width: 293,
    height: 520,
  },
  square: {
    width: 520,
    height: 520, // 1:1
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
  >("desktop");

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

  const memoizedShapes = useMemo(
    () =>
      circles.map((circle, i) => {
        const shape = generateRandomShape(circle.color);
        return (
          <g
            key={i}
            style={{
              transform: "translate3d(0,0,0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              willChange: "transform",
              contain: "strict",
            }}
            dangerouslySetInnerHTML={{ __html: renderShape(shape) }}
          />
        );
      }),
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

  const getDynamicPreviewDimensions = (containerWidth: number) => {
    const maxWidth = PREVIEW_DIMENSIONS[aspectRatio].width;
    const maxHeight = PREVIEW_DIMENSIONS[aspectRatio].height;
    const scale = Math.min(1, containerWidth / maxWidth);

    return {
      width: maxWidth * scale,
      height: maxHeight * scale,
    };
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [previewDimensions, setPreviewDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const availableWidth = entry.contentRect.width - 32;
        setPreviewDimensions(getDynamicPreviewDimensions(availableWidth));
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [aspectRatio]);

  const [showDownloadingOverlay, setShowDownloadingOverlay] = useState(false);

  useEffect(() => {
    if (isDownloading) {
      setShowDownloadingOverlay(true);
    } else {
      // Keep showing overlay for 1.5s after download completes
      const timeout = setTimeout(() => {
        setShowDownloadingOverlay(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isDownloading]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative flex gap-2 items-center justify-center p-4 h-screen w-full">
      <div aria-hidden="true" className="sr-only">
        {fontPreloadText}
      </div>
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          type: "spring",
          damping: 20,
          stiffness: 100,
          mass: 0.5,
        }}
        className="flex flex-col gap-2 w-full max-w-[300px] min-w-[220px] h-full overflow-hidden"
      >
        <div className="flex items-center gap-2 p-2 bg-secondary rounded-2xl w-full border border-primary/10">
          <div className="flex items-center gap-2 justify-between w-full">
            <div className="flex items-center justify-between w-full outline-hidden focus:outline-hidden group">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Image
                    src={logo}
                    alt="logo"
                    className="size-8"
                    priority
                    loading="eager"
                  />
                  <p className="text-lg font-bold tracking-tighter">Gradii</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "text" | "colors" | "effects")
          }
          className="flex flex-col items-center z-50 w-full bg-secondary rounded-2xl p-2 border border-primary/10"
        >
          <TabsList className="w-full flex items-center gap-1">
            {["text", "colors", "effects"].map((tab) => (
              <TabsTrigger key={tab} value={tab} className="flex-1 relative">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* controls */}
        <section className="w-full bg-secondary rounded-2xl flex flex-col no-scrollbar overflow-hidden h-full  border border-primary/10">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div className="flex flex-col overflow-y-auto justify-between no-scrollbar relative h-full gap-2 p-4">
              {activeTab === "text" && (
                <motion.div
                  key={activeTab}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                  }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm text-muted-foreground">
                      Text
                    </label>
                    <Input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter text"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm text-muted-foreground">
                      Font Family
                    </label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fonts.map((font) => (
                          <SelectItem key={font.name} value={font.name}>
                            {font.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
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
                    <span className="text-xs text-muted-foreground">
                      {fontSize}px
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm text-muted-foreground">
                      Font Weight
                    </label>
                    <Slider
                      min={100}
                      max={900}
                      step={100}
                      value={[fontWeight]}
                      onValueChange={([value]) => setFontWeight(value)}
                      disabled={
                        !fonts.find((f) => f.name === fontFamily)?.variable
                      }
                      className={cn(
                        !fonts.find((f) => f.name === fontFamily)?.variable &&
                          "cursor-not-allowed"
                      )}
                    />
                    <span className="text-xs text-muted-foreground">
                      {fontWeight}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm text-muted-foreground">
                      Letter Spacing
                    </label>
                    <Slider
                      min={-0.1}
                      max={0.1}
                      step={0.01}
                      value={[letterSpacing]}
                      onValueChange={([value]) => setLetterSpacing(value)}
                    />
                    <span className="text-xs text-muted-foreground">
                      {letterSpacing}em
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm text-muted-foreground">
                      Text Opacity
                    </label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[opacity]}
                      onValueChange={([value]) => setOpacity(value)}
                    />
                    <span className="text-xs text-muted-foreground">
                      {opacity}%
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm text-muted-foreground">
                      Line Height
                    </label>
                    <Slider
                      min={0.5}
                      max={2}
                      step={0.1}
                      value={[lineHeight]}
                      onValueChange={([value]) => setLineHeight(value)}
                    />
                    <span className="text-xs text-muted-foreground">
                      {lineHeight}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm text-muted-foreground">
                      Text Decoration
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar rounded-xl">
                      <button
                        onClick={() => setIsItalic(!isItalic)}
                        className={cn(
                          "w-full rounded-xl px-4 py-2 text-sm relative",
                          "text-primary transition-all duration-300",
                          isItalic ? "bg-primary/20 " : "bg-background"
                        )}
                      >
                        <span className="italic">Italic</span>
                      </button>
                      <button
                        onClick={() => setIsUnderline(!isUnderline)}
                        className={cn(
                          "w-full rounded-xl px-4 py-2 text-sm relative",
                          "transition-all duration-300 text-primary",
                          isUnderline ? "bg-primary/20" : "bg-background"
                        )}
                      >
                        <span className="underline">Underline</span>
                      </button>
                      <button
                        onClick={() => setIsStrikethrough(!isStrikethrough)}
                        className={cn(
                          "w-full rounded-xl px-4 py-2 text-sm relative",
                          "transition-all duration-300 text-primary",
                          isStrikethrough ? "bg-primary/20" : "bg-background"
                        )}
                      >
                        <span className="line-through">Strikethrough</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "colors" && (
                <motion.div
                  key={activeTab}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                  }}
                  className="flex flex-col relative"
                >
                  <div className="w-full flex justify-center bg-linear-to-b from-secondary to-secondary/5 z-10 py-4">
                    <HexColorPicker
                      color={activeColorPicker}
                      onChange={(color) => {
                        setActiveColorPicker(color);
                        handleColorChange(color);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-4 overflow-y-auto h-full no-scrollbar">
                    {!backgroundImage && (
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-muted-foreground">
                          Gradient Colors
                        </label>
                        {circles.map((circle, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 relative w-full"
                          >
                            <div
                              className="flex items-center gap-2 w-full"
                              onClick={() => {
                                setActiveColorType("gradient");
                                setActiveColor(i);
                                setActiveColorPicker(circle.color);
                              }}
                            >
                              <span
                                className="size-5 rounded-xl cursor-pointer aspect-square"
                                style={{
                                  backgroundColor: circle.color,
                                }}
                              />
                              <Input
                                type="text"
                                value={circle.color}
                                placeholder="Color"
                                onChange={(e) => updateColor(e.target.value, i)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-muted-foreground">
                        Background Color
                      </label>
                      <div
                        className="flex items-center gap-2"
                        onClick={() => {
                          setActiveColorType("background");
                          setActiveColorPicker(backgroundColor);
                        }}
                      >
                        <span
                          className="size-5 rounded-xl cursor-pointer aspect-square border border-primary/60"
                          style={{ backgroundColor: backgroundColor }}
                        />
                        <Input
                          type="text"
                          value={backgroundColor}
                          placeholder="Color"
                          onChange={(e) => setBackgroundColor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-muted-foreground">
                        Text Color
                      </label>
                      <div
                        className="flex  items-center gap-2"
                        onClick={() => {
                          setActiveColorType("text");
                          setActiveColorPicker(textColor);
                        }}
                      >
                        <span
                          className="size-5 rounded-xl cursor-pointer aspect-square border border-primary/60"
                          style={{
                            backgroundColor: textColor,
                          }}
                        />
                        <Input
                          type="text"
                          value={textColor}
                          placeholder="Color"
                          onChange={(e) => setTextColor(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "effects" && (
                <motion.div
                  key={activeTab}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                  }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">
                      Filter Type
                    </label>
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
                  </div>
                  <div className="flex flex-col gap-2">
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
                    <span className="text-xs text-muted-foreground">
                      {filterIntensity}%
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">
                      Blur
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar rounded-xl">
                      {BLUR_OPTIONS.map((blurOption) => (
                        <button
                          key={blurOption.value}
                          onClick={() => setBlur(blurOption.value)}
                          disabled={!backgroundImage && blurOption.value === 0}
                          className={cn(
                            "w-full rounded-xl px-4 py-2 text-sm relative",
                            "transition-colors duration-200 bg-background",
                            !backgroundImage &&
                              blurOption.value === 0 &&
                              "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <span>{blurOption.name}</span>
                          {blur === blurOption.value && (
                            <motion.div
                              className="absolute inset-0 bg-primary/20 rounded-xl z-10"
                              layoutId="blur-background"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">
                      Saturation
                    </label>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      value={[saturation]}
                      onValueChange={([value]) => setSaturation(value)}
                    />
                    <span className="text-xs text-muted-foreground">
                      {saturation}%
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">
                      Contrast
                    </label>
                    <Slider
                      min={5}
                      max={200}
                      step={1}
                      value={[contrast]}
                      onValueChange={([value]) => setContrast(value)}
                    />
                    <span className="text-xs text-muted-foreground">
                      {contrast}%
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">
                      Brightness
                    </label>
                    <Slider
                      min={10}
                      max={200}
                      step={1}
                      value={[brightness]}
                      onValueChange={([value]) => setBrightness(value)}
                    />
                    <span className="text-xs text-muted-foreground">
                      {brightness}%
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        <div className="flex flex-col items-center rounded-2xl w-full gap-4">
          <div className="flex w-full gap-2">
            <button
              onClick={downloadImage}
              className="w-full flex items-center justify-between gap-2 text-primary-foreground text-sm bg-primary rounded-2xl relative p-4 cursor-pointer border border-primary/10"
              disabled={isDownloading}
            >
              <div className="flex items-center gap-2">
                <DownloadIcon className="size-4" />
                <span className="">Export</span>
              </div>
              <span className="text-secondary text-sm w-fit">
                {resolution.scale}x
              </span>
            </button>

            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="p-4 relative items-center justify-center bg-primary rounded-2xl text-primary-foreground border border-primary/10">
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SettingsIcon className="size-4" />
                  </motion.span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-2xl p-3 bg-background/50 backdrop-blur-md"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted-foreground">
                    Image Resolution
                  </label>
                  <Tabs
                    defaultValue={resolution.scale.toString()}
                    className="flex flex-col items-center w-full  rounded-xl"
                  >
                    <TabsList className="w-full flex items-center gap-1">
                      {filteredResolutions.map((res) => (
                        <TabsTrigger
                          key={res.width}
                          value={res.scale.toString()}
                          onClick={() => setResolution(res)}
                          className="flex-1 relative rounded-md text-xl flex flex-col items-center justify-center w-full bg-secondary hover:bg-background/50 transition-colors duration-200"
                        >
                          {res.name}
                          {resolution.scale === res.scale && (
                            <motion.div
                              layoutId="activeResolution"
                              className="absolute inset-0 bg-primary/10 rounded-md"
                              transition={{ type: "spring", duration: 0.5 }}
                            />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {res.scale}x
                          </span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.aside>

      {/* preview section */}
      <motion.section
        ref={containerRef}
        className="flex flex-col gap-4 w-full h-full items-center justify-center relative bg-secondary rounded-2xl border border-primary/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          type: "spring",
          damping: 20,
          stiffness: 100,
          mass: 0.5,
        }}
      >
        <div className="absolute top-2 right-2">
          <ThemeSwitch />
        </div>
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
          }}
          className="rounded-2xl overflow-hidden w-full max-w-3xl flex items-center justify-center relative"
        >
          <div
            className="relative w-full overflow-hidden rounded-2xl max-h-[95vh] border border-primary/10"
            style={{
              width:
                previewDimensions.width ||
                PREVIEW_DIMENSIONS[aspectRatio].width,
              height:
                previewDimensions.height ||
                PREVIEW_DIMENSIONS[aspectRatio].height,
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
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
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
                    {memoizedShapes}
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
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    willChange: "transform filter",
                    contain: "paint layout",
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
            {/* Downloading Overlay */}
            <motion.div
              animate={{ opacity: showDownloadingOverlay ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                type: "spring",
                damping: 20,
                stiffness: 100,
                mass: 0.5,
              }}
              className="absolute inset-0 bg-background z-50 flex items-center justify-center"
            >
              <Loader2Icon className="size-8 text-primary animate-spin" />
            </motion.div>
          </div>
        </motion.div>

        <ButtonsChin
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          handleImageUpload={handleImageUpload}
          backgroundImage={backgroundImage}
          setBackgroundImage={setBackgroundImage}
          generateNewPalette={generateNewPalette}
          isGenerating={isGenerating}
          previousCircles={previousCircles}
          setCircles={setCircles}
          setPreviousCircles={setPreviousCircles}
          setBlur={setBlur}
          blur={blur}
        />
      </motion.section>
    </main>
  );
}

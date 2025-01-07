"use client";

import { Input } from "@/components/ui/input";
import { CameraIcon, Download } from "lucide-react";
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
        className="flex flex-col gap-2 w-full max-w-[40vw] lg:max-w-[30vw] xl:max-w-[20vw] h-full overflow-hidden"
      >
        <div className="flex items-center gap-2 p-2 bg-secondary rounded-3xl w-full">
          <div className="flex items-center gap-2 justify-between w-full">
            <SidebarHeader />
          </div>
        </div>

        {/* controls */}
        <section className="w-full bg-secondary border-primary/20 rounded-3xl flex flex-col no-scrollbar overflow-hidden h-full">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div className="flex flex-col overflow-y-auto justify-between no-scrollbar relative h-full">
              <Tabs
                value={activeTab}
                onValueChange={(value) =>
                  setActiveTab(value as "text" | "colors" | "effects")
                }
                className="sticky top-0 flex flex-col items-center z-50 w-full bg-gradient-to-t to-35% from-transparent to-secondary"
              >
                <TabsList className="w-full flex items-center gap-1">
                  {["text", "colors", "effects"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="flex-1 relative"
                      disabled={tab === "colors" && !!backgroundImage}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary/10 rounded-2xl"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

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
                    opacity: { duration: 0.2 },
                  }}
                  className="flex flex-col gap-4 p-4"
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
                    opacity: { duration: 0.2 },
                  }}
                  className="flex flex-col relative"
                >
                  <div className="w-full flex justify-center bg-gradient-to-b from-secondary to-secondary/5 py-6 px-4  z-10">
                    <HexColorPicker
                      color={activeColorPicker}
                      onChange={(color) => {
                        setActiveColorPicker(color);
                        handleColorChange(color);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-4 overflow-y-auto h-full no-scrollbar p-4">
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
                              className="size-5 rounded-full cursor-pointer aspect-square"
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
                          className="size-5 rounded-full cursor-pointer aspect-square border border-primary/60"
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
                          className="size-5 rounded-full cursor-pointer aspect-square border border-primary/60"
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
                    opacity: { duration: 0.2 },
                  }}
                  className="flex flex-col gap-4 p-4"
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
                    <div className="flex items-center gap-2">
                      {BLUR_OPTIONS.map((blurOption) => (
                        <button
                          key={blurOption.value}
                          onClick={() => setBlur(blurOption.value)}
                          className={cn(
                            "w-full rounded-full px-4 py-2 text-sm relative",
                            "transition-colors duration-200",
                            blur !== blurOption.value && "bg-background"
                          )}
                        >
                          <span>{blurOption.name}</span>
                          {blur === blurOption.value && (
                            <motion.div
                              layoutId="activeBlur"
                              className="absolute inset-0 bg-primary/20 rounded-full -z-10"
                              transition={{ type: "spring", duration: 0.5 }}
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
                      min={0}
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
                      min={0}
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

              <div className="sticky bottom-0 flex flex-col items-center z-50 w-full bg-gradient-to-b to-50% from-transparent to-secondary p-4">
                <div className="flex w-full bg-primary rounded-2xl text-primary-foreground divide-x divide-primary-foreground/20 divide-dashed">
                  <button
                    onClick={downloadImage}
                    className="w-full flex items-center justify-center gap-2 text-primary-foreground text-sm"
                    disabled={isDownloading}
                  >
                    <Download className="size-5" />
                    Download
                  </button>

                  <button
                    onClick={() => {
                      const currentIndex = filteredResolutions.findIndex(
                        (r) => r.width === resolution.width
                      );
                      const nextIndex =
                        (currentIndex + 1) % filteredResolutions.length;
                      setResolution(filteredResolutions[nextIndex]);
                    }}
                    className="w-14 h-12 px-4 py-2 relative items-center justify-center"
                  >
                    <AnimatePresence mode="sync">
                      <motion.span
                        key={resolution.ratio}
                        variants={scaleVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut",
                        }}
                        className="top-3 inset-0"
                      >
                        {resolution.scale}x
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </div>

                <Tabs
                  value={aspectRatio}
                  onValueChange={(v) => setAspectRatio(v as typeof aspectRatio)}
                  className="w-full"
                >
                  <TabsList className="w-full">
                    <TabsTrigger value="desktop" className="w-full">
                      Desktop
                    </TabsTrigger>
                    <TabsTrigger value="mobile" className="w-full">
                      Mobile
                    </TabsTrigger>
                    <TabsTrigger value="square" className="w-full">
                      Square
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </motion.aside>

      {/* preview */}
      <motion.section
        className="flex flex-col gap-4 w-full h-full items-center justify-center relative bg-secondary rounded-3xl"
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
          className="rounded-3xl overflow-hidden w-full max-w-3xl flex items-center justify-center relative"
        >
          {isDownloading && (
            <div className="flex items-center justify-center h-full bg-secondary/25">
              <CameraIcon className="size-4 " />
            </div>
          )}
          <div
            className="relative w-full overflow-hidden rounded-3xl max-h-[95vh]"
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
                  }}
                >
                  {text}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <ButtonsChin
          handleImageUpload={handleImageUpload}
          backgroundImage={backgroundImage}
          setBackgroundImage={setBackgroundImage}
          generateNewPalette={generateNewPalette}
          isGenerating={isGenerating}
          previousCircles={previousCircles}
          setCircles={setCircles}
          setPreviousCircles={setPreviousCircles}
        />
      </motion.section>
    </main>
  );
}

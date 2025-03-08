"use client";

import { Input } from "@/components/ui/input";
import {
  DownloadIcon,
  Loader2Icon,
  SettingsIcon,
  Trash2Icon,
  UploadIcon,
  PaintbrushIcon,
  PaletteIcon,
  SparklesIcon,
  TypeIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";
import { HexColorPicker } from "react-colorful";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  BLUR_OPTIONS,
  CircleProps,
  FontOption,
  RESOLUTIONS,
  SAFARI_BLUR_OPTIONS,
} from "@/lib/constants";
import { ButtonsChin } from "../ui/buttonsChin";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo, useRef } from "react";
import logo from "@/public/logo.svg";
import { ThemeSwitch } from "../ui/themeSwitch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { CanvasPreview } from "./canvas-preview";
import Link from "next/link";
import { IMAGES } from "@/assets";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

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
  textColor: string;
  generateNewPalette: () => void;
  isGenerating: boolean;
  downloadImage: () => void;
  isDownloading: boolean;
  previousCircles: CircleProps[];
  setCircles: (circles: CircleProps[]) => void;
  setPreviousCircles: (circles: CircleProps[]) => void;
  setActiveTab: (tab: "text" | "colors" | "effects" | "background") => void;
  activeTab: "text" | "colors" | "effects" | "background";
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
  numCircles: number;
  setNumCircles: (num: number) => void;
  colors: string[];
  isSafari: boolean;
  textShadow: {
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  };
  grainIntensity: number;
  setGrainIntensity: (value: number) => void;
  vignetteIntensity: number;
  setVignetteIntensity: (value: number) => void;
  setTextShadow: React.Dispatch<
    React.SetStateAction<{
      color: string;
      blur: number;
      offsetX: number;
      offsetY: number;
    }>
  >;
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
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
  numCircles,
  setNumCircles,
  colors,
  isSafari,
  textShadow,
  setTextShadow,
  grainIntensity,
  setGrainIntensity,
  vignetteIntensity,
  setVignetteIntensity,
  isUploading,
  setIsUploading,
}: DesktopAppProps) {
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

  const [isAspectRatioChanging, setIsAspectRatioChanging] = useState(false);

  useEffect(() => {
    const resolutionsForRatio = RESOLUTIONS.filter(
      (r) => r.ratio === aspectRatio
    );
    if (resolutionsForRatio.length > 0) {
      setIsAspectRatioChanging(true);
      setResolution(resolutionsForRatio[0]);

      const timeout = setTimeout(() => {
        setIsAspectRatioChanging(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [aspectRatio]);

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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative flex gap-2 items-center justify-center p-2 h-screen w-full">
      <div aria-hidden="true" className="sr-only">
        {fontPreloadText}
      </div>
      <aside className="flex flex-col gap-2 w-full max-w-[300px] min-w-[220px] h-full overflow-hidden">
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
              <Link
                href="https://x.com/kshvbgde"
                target="_blank"
                className="hover:scale-110 transition-all duration-300"
              >
                <Image
                  src={IMAGES.x}
                  alt="Follow @kshvbgde on X"
                  className="size-8"
                  priority
                  loading="eager"
                />
              </Link>
            </div>
          </div>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "text" | "background" | "colors" | "effects")
          }
          className="flex flex-col items-center z-50 w-full bg-secondary rounded-2xl p-2 border border-primary/10"
        >
          <TabsList className="w-full flex items-center gap-1">
            <div className="flex items-center gap-2 min-w-full">
              {[
                { id: "text", icon: TypeIcon },
                { id: "background", icon: PaintbrushIcon },
                { id: "colors", icon: PaletteIcon },
                { id: "effects", icon: SparklesIcon },
              ].map(({ id, icon: Icon }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="flex-1 relative w-full p-2 cursor-pointer hover:bg-primary/10 transition-all duration-300 bg-background"
                >
                  <Icon className="size-4" />
                  {activeTab === id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-xl z-10"
                      transition={{
                        duration: 0.3,
                      }}
                    />
                  )}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </Tabs>

        {/* controls */}
        <section className="w-full bg-secondary rounded-2xl flex flex-col no-scrollbar overflow-hidden h-full  border border-primary/10">
          <div className="flex flex-col overflow-y-auto justify-between no-scrollbar relative h-full gap-2 p-4">
            {activeTab === "text" && (
              <div key={activeTab} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm text-muted-foreground">Text</label>
                  <Textarea
                    className="resize-none whitespace-pre-wrap"
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

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-muted-foreground">
                    Text Color
                  </label>
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <span
                          className="w-8 h-8 rounded-full cursor-pointer aspect-square border border-primary/10"
                          style={{ backgroundColor: textColor }}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-3" align="start">
                        <HexColorPicker
                          color={activeColorPicker}
                          onChange={(color) => {
                            setActiveColorType("text");
                            setActiveColorPicker(color);
                            handleColorChange(color);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="text"
                      value={textColor}
                      placeholder="Color"
                      onChange={(e) => setTextColor(e.target.value)}
                    />
                  </div>
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
                        "w-full rounded-xl px-4 py-2 text-sm relative flex items-center justify-center",
                        "text-primary transition-all duration-300 hover:bg-primary/10 cursor-pointer border border-primary/10",
                        isItalic ? "bg-primary/20 " : "bg-background"
                      )}
                    >
                      <ItalicIcon className="size-4" />
                    </button>
                    <button
                      onClick={() => setIsUnderline(!isUnderline)}
                      className={cn(
                        "w-full rounded-xl px-4 py-2 text-sm relative flex items-center justify-center",
                        "transition-all duration-300 text-primary hover:bg-primary/10 cursor-pointer border border-primary/10",
                        isUnderline ? "bg-primary/20" : "bg-background"
                      )}
                    >
                      <UnderlineIcon className="size-4" />
                    </button>
                    <button
                      onClick={() => setIsStrikethrough(!isStrikethrough)}
                      className={cn(
                        "w-full rounded-xl px-4 py-2 text-sm relative flex items-center justify-center",
                        "transition-all duration-300 text-primary hover:bg-primary/10 cursor-pointer border border-primary/10",
                        isStrikethrough ? "bg-primary/20" : "bg-background"
                      )}
                    >
                      <StrikethroughIcon className="size-4" />
                    </button>
                  </div>
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

                <Separator className="my-2" />

                <div className="flex flex-col gap-4">
                  <label className="text-sm text-muted-foreground">
                    Text Shadow
                  </label>
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <span
                          className="w-8 h-8 rounded-full cursor-pointer aspect-square border border-primary/10"
                          style={{ backgroundColor: textShadow.color }}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-3" align="start">
                        <HexColorPicker
                          color={textShadow.color}
                          onChange={(color) =>
                            setTextShadow((prev) => ({ ...prev, color }))
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="text"
                      value={textShadow.color}
                      placeholder="Glow Color"
                      onChange={(e) =>
                        setTextShadow((prev) => ({
                          ...prev,
                          color: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-muted-foreground">
                      Intensity
                    </label>
                    <Slider
                      min={0}
                      max={80}
                      step={1}
                      value={[textShadow.blur]}
                      onValueChange={([value]) =>
                        setTextShadow((prev) => ({ ...prev, blur: value }))
                      }
                    />
                    <span className="text-xs text-muted-foreground">
                      {textShadow.blur}px
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-muted-foreground">
                      Offset X
                    </label>
                    <Slider
                      min={-20}
                      max={20}
                      step={1}
                      value={[textShadow.offsetX]}
                      onValueChange={([value]) =>
                        setTextShadow((prev) => ({ ...prev, offsetX: value }))
                      }
                    />
                    <span className="text-xs text-muted-foreground">
                      {textShadow.offsetX}px
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-muted-foreground">
                      Offset Y
                    </label>
                    <Slider
                      min={-20}
                      max={20}
                      step={1}
                      value={[textShadow.offsetY]}
                      onValueChange={([value]) =>
                        setTextShadow((prev) => ({ ...prev, offsetY: value }))
                      }
                    />
                    <span className="text-xs text-muted-foreground">
                      {textShadow.offsetY}px
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "background" && (
              <div key={activeTab} className="flex flex-col relative">
                <div className="flex flex-col gap-4 overflow-y-auto h-full no-scrollbar">
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <span
                            className="w-8 h-8 rounded-full cursor-pointer aspect-square border border-primary/10"
                            style={{ backgroundColor: backgroundColor }}
                          />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3" align="start">
                          <HexColorPicker
                            color={activeColorPicker}
                            onChange={(color) => {
                              setActiveColorPicker(color);
                              setBackgroundColor(color);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <Input
                        type="text"
                        value={backgroundColor}
                        placeholder="Color"
                        onChange={(e) => setBackgroundColor(e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">
                      Background Image
                    </label>
                    <label
                      className={`px-4 py-3 bg-background rounded-xl hover:text-foreground/80 text-primary transition-all duration-300 flex items-center gap-2 cursor-pointer justify-center border border-primary/10 ${
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
                          <UploadIcon className="size-4" />
                          <span className="text-xs tracking-tight">
                            {backgroundImage ? "Change Image" : "Upload Image"}
                          </span>
                        </>
                      )}
                    </label>

                    {backgroundImage && (
                      <Button
                        onClick={() => {
                          setBackgroundImage(null);
                          if (blur === 0) {
                            setBlur(600);
                          }
                        }}
                        className="rounded-xl"
                        variant="destructive"
                      >
                        <Trash2Icon className="size-4" />
                        <span className="text-xs tracking-tight">
                          Remove Image
                        </span>
                      </Button>
                    )}
                  </div>

                  <Separator className="my-2" />

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">
                      Blur
                    </label>
                    <div className="grid grid-cols-2 gap-2 rounded-xl">
                      {(isSafari ? SAFARI_BLUR_OPTIONS : BLUR_OPTIONS).map(
                        (blurOption: { name: string; value: number }) => (
                          <button
                            key={blurOption.value}
                            onClick={() => setBlur(blurOption.value)}
                            disabled={
                              !backgroundImage && blurOption.value === 0
                            }
                            className={cn(
                              "w-full rounded-xl px-4 py-2 text-sm relative cursor-pointer",
                              "transition-10 hover:bg-primary/10 duration-300 bg-background border border-primary/10",
                              !backgroundImage &&
                                blurOption.value === 0 &&
                                "opacity-50 cursor-not-allowed",
                              blur === blurOption.value && "bg-primary/10"
                            )}
                          >
                            <span>{blurOption.name}</span>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "colors" && (
              <div key={activeTab} className="flex flex-col relative">
                <div className="flex flex-col gap-4 overflow-y-auto h-full no-scrollbar">
                  {!backgroundImage && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-muted-foreground">
                          Blobs
                        </label>
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[numCircles]}
                          onValueChange={([value]) => {
                            setNumCircles(value);
                            const newCircles = [...circles];
                            if (value > circles.length) {
                              // Add new circles
                              for (let i = circles.length; i < value; i++) {
                                newCircles.push({
                                  color: colors[i % colors.length],
                                  cx: Math.random() * 100,
                                  cy: Math.random() * 100,
                                });
                              }
                            } else {
                              // Remove circles
                              newCircles.splice(value);
                            }
                            setCircles(newCircles);
                          }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {numCircles}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-muted-foreground">
                          Colors
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
                              <Popover>
                                <PopoverTrigger asChild>
                                  <span
                                    className="w-8 h-8 rounded-full cursor-pointer aspect-square border border-primary/10"
                                    style={{ backgroundColor: circle.color }}
                                  />
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-3"
                                  align="start"
                                >
                                  <HexColorPicker
                                    color={activeColorPicker}
                                    onChange={(color) => {
                                      setActiveColorPicker(color);
                                      handleColorChange(color);
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                              <Input
                                type="text"
                                value={circle.color}
                                className="w-full"
                                placeholder="Color"
                                onChange={(e) => updateColor(e.target.value, i)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeTab === "effects" && (
              <div key={activeTab} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">
                      Grain
                    </label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[grainIntensity]}
                      onValueChange={([value]) => {
                        setGrainIntensity(value);
                        if (isSafari && value > 0) {
                          toast.warning(
                            "Effects may appear different in Safari due to browser limitations"
                          );
                        }
                      }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {grainIntensity}%
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">
                      Vignette
                    </label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[vignetteIntensity]}
                      onValueChange={([value]) => {
                        setVignetteIntensity(value);
                        if (isSafari && value > 0) {
                          toast.warning(
                            "Effects may appear different in Safari due to browser limitations"
                          );
                        }
                      }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {vignetteIntensity}%
                    </span>
                  </div>
                </div>
                <Separator className="my-2" />
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
              </div>
            )}
          </div>
        </section>

        <div className="flex flex-col items-center rounded-2xl w-full gap-4">
          <div className="flex w-full gap-2">
            <button
              onClick={downloadImage}
              className="w-full flex items-center justify-between gap-2 text-primary-foreground text-sm bg-primary rounded-2xl relative p-4 cursor-pointer border border-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDownloading}
            >
              <div className="flex items-center gap-2">
                <DownloadIcon className="size-4" />
                <span className="text-sm">Download</span>
              </div>
              <span className="text-secondary text-sm w-fit">
                {resolution.scale}x
              </span>
            </button>

            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="p-4 relative items-center justify-center rounded-2xl text-foreground border border-primary/10 bg-secondary">
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
                className="rounded-2xl p-3 bg-background/50 backdrop-blur-md border border-primary/10"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted-foreground">
                    Image Resolution
                  </label>
                  <Tabs
                    defaultValue={resolution.scale.toString()}
                    className="flex flex-col items-center w-full rounded-xl"
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
      </aside>

      {/* preview section */}
      <section
        ref={containerRef}
        className="flex flex-col gap-4 w-full h-full items-center justify-center relative bg-secondary rounded-2xl border border-primary/10"
      >
        <div className="absolute top-2 right-2">
          <ThemeSwitch />
        </div>
        <div className="rounded-2xl overflow-hidden w-full max-w-3xl flex items-center justify-center relative">
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
              {(isAspectRatioChanging || isGenerating) && (
                <div className="absolute inset-0 bg-background z-50 flex items-center justify-center">
                  <Loader2Icon className="size-16 text-primary animate-spin" />
                </div>
              )}
              {/* Background Layer */}
              <CanvasPreview
                width={resolution.width}
                height={resolution.height}
                backgroundColor={backgroundColor}
                circles={circles}
                text={text}
                textStyle={{
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                  letterSpacing: letterSpacing,
                  fontFamily: fontFamily,
                  opacity: opacity,
                  lineHeight: lineHeight,
                  color: textColor,
                  isItalic: isItalic,
                  isUnderline: isUnderline,
                  isStrikethrough: isStrikethrough,
                  textShadow: textShadow,
                }}
                filters={{
                  blur: blur,
                  brightness: brightness,
                  contrast: contrast,
                  saturation: saturation,
                }}
                effects={{
                  grain: grainIntensity,
                  vignette: vignetteIntensity,
                }}
                backgroundImage={backgroundImage}
              />
            </div>
            {/* Downloading Overlay */}
          </div>
        </div>

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
      </section>
    </main>
  );
}

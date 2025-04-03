import { Input } from "@/components/ui/input";
import {
  DownloadIcon,
  Trash2Icon,
  UploadIcon,
  PaintbrushIcon,
  PaletteIcon,
  SparklesIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  WandSparklesIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  ZoomInIcon,
  ZoomOutIcon,
  CropIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  MonitorIcon,
  ImageIcon,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HexColorPicker } from "react-colorful";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CircleProps, FontOption } from "@/lib/constants";
import { ButtonsChin } from "../ui/buttonsChin";
import { cn } from "@/lib/utils";
import { useMemo, useRef, useState } from "react";
import logo from "@/public/logo.svg";
import { ThemeSwitch } from "../ui/themeSwitch";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { CanvasPreview } from "./canvas-preview";
import Link from "next/link";
import { IMAGES } from "@/assets";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  DndContext,
  useDraggable,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import { PositionControl } from "@/components/ui/position-control";

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
  setActiveTab: (tab: "design" | "colors" | "filters" | "canvas") => void;
  activeTab: "design" | "colors" | "filters" | "canvas";
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
  resolution: { width: number; height: number };
  setResolution: (res: { width: number; height: number }) => void;
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
  textPosition: { x: number; y: number };
  setTextPosition: (position: { x: number; y: number }) => void;
  textMode: "text" | "image";
  logoImage: string | null;
  setTextMode: (mode: "text" | "image") => void;
  setLogoImage: (image: string | null) => void;
  textAlign: "left" | "center" | "right";
  setTextAlign: (align: "left" | "center" | "right") => void;
}

function DraggablePreview({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

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
  textPosition,
  setTextPosition,
  textMode,
  logoImage,
  setTextMode,
  setLogoImage,
  textAlign,
  setTextAlign,
}: DesktopAppProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.4);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta } = event;
    if (delta) {
      setPosition((prev) => ({
        x: prev.x + delta.x,
        y: prev.y + delta.y,
      }));
    }
  };

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
                </div>
              </div>
              <Link href="https://x.com/kshvbgde" target="_blank">
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
            setActiveTab(value as "design" | "colors" | "filters" | "canvas")
          }
          className="flex flex-col items-center w-full"
        >
          <TabsList className="w-full flex items-center gap-1">
            <div className="flex items-center gap-2 w-full">
              {[
                { id: "design", icon: PaintbrushIcon },
                { id: "canvas", icon: CropIcon },
                { id: "colors", icon: PaletteIcon },
                { id: "filters", icon: SparklesIcon },
              ].map(({ id, icon: Icon }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className={cn(
                    "flex-1 relative w-full px-4 py-3 cursor-pointer hover:bg-foreground/25 transition-all duration-300 rounded-2xl  text-foreground border border-primary/10"
                  )}
                  disabled={!!backgroundImage && id === "colors"}
                >
                  <Icon className="size-4" />
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </Tabs>

        {/* controls */}
        <section className="w-full bg-secondary rounded-2xl flex flex-col no-scrollbar overflow-hidden h-full  border border-primary/10">
          <div className="flex flex-col overflow-y-auto justify-between no-scrollbar relative h-full gap-2 p-4">
            {activeTab === "design" && (
              <div key={activeTab} className="flex flex-col gap-8">
                <h3 className="text-[64px] leading-[100%] text-center font-bold tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-b from-foreground/20 to-foreground/70">
                  {activeTab}
                </h3>

                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <Textarea
                      className={cn(
                        "resize-none whitespace-pre-wrap",
                        textMode === "image" && "opacity-50 cursor-not-allowed"
                      )}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter text"
                      disabled={textMode === "image"}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-x-0 -top-3 flex items-center justify-center">
                      <span className="bg-secondary px-2 text-xs text-muted-foreground">
                        or
                      </span>
                    </div>
                    <div className="relative pt-2">
                      <label
                        className={`px-4 py-3 bg-foreground/5 rounded-xl hover:text-foreground/80 text-primary transition-all duration-300 flex items-center gap-2 cursor-pointer justify-center border border-primary/10 ${
                          isUploading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            if (isUploading) return;
                            setIsUploading(true);
                            try {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setLogoImage(reader.result as string);
                                  setTextMode("image");
                                };
                                reader.readAsDataURL(file);
                              }
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
                              {logoImage ? "Change Image" : "Upload Image"}
                            </span>
                          </>
                        )}
                      </label>

                      {logoImage && (
                        <Button
                          onClick={() => {
                            setLogoImage(null);
                            setTextMode("text");
                          }}
                          variant="destructive"
                        >
                          <Trash2Icon className="size-4" />
                          <span className="text-xs tracking-tight ml-2">
                            Remove Logo/Image
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>

                  <Separator className="my-2" />

                  {textMode === "text" && (
                    <>
                      <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm text-muted-foreground">
                          Color
                        </label>
                        <div className="flex items-center gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <span
                                className="w-8 h-8 rounded-full cursor-pointer aspect-square border border-primary/10"
                                style={{ backgroundColor: textColor }}
                              />
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-3"
                              align="start"
                            >
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
                          Font
                        </label>
                        <Select
                          value={fontFamily}
                          onValueChange={setFontFamily}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select font" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {fonts.map((font) => (
                                <SelectItem key={font.name} value={font.name}>
                                  {font.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <PositionControl
                    value={textPosition}
                    onChange={setTextPosition}
                    width={resolution.width}
                    height={resolution.height}
                    className="max-w-[200px]"
                  />

                  <Slider
                    label={textMode === "text" ? "Size" : "Size"}
                    min={textMode === "text" ? 12 : 10}
                    max={textMode === "text" ? 180 : 100}
                    step={textMode === "text" ? 2 : 1}
                    value={[fontSize]}
                    onValueChange={([value]) => setFontSize(value)}
                    valueSubtext={textMode === "text" ? "px" : "%"}
                  />
                  {textMode === "text" && (
                    <>
                      <div className="flex flex-col gap-2 w-full">
                        <Slider
                          label="Weight"
                          min={100}
                          max={900}
                          step={100}
                          value={[fontWeight]}
                          onValueChange={([value]) => setFontWeight(value)}
                          disabled={
                            !fonts.find((f) => f.name === fontFamily)?.variable
                          }
                          className={cn(
                            !fonts.find((f) => f.name === fontFamily)
                              ?.variable && "cursor-not-allowed"
                          )}
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <Slider
                          label="Tracking"
                          min={-0.1}
                          max={0.1}
                          step={0.01}
                          value={[letterSpacing]}
                          onValueChange={([value]) => setLetterSpacing(value)}
                          valueSubtext="em"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <Slider
                          label="Leading"
                          min={0.5}
                          max={2}
                          step={0.1}
                          value={[lineHeight]}
                          onValueChange={([value]) => setLineHeight(value)}
                          valueSubtext="em"
                        />
                      </div>
                    </>
                  )}

                  <Slider
                    label="Opacity"
                    min={0}
                    max={100}
                    step={1}
                    value={[opacity]}
                    onValueChange={([value]) => setOpacity(value)}
                  />
                  {textMode === "text" && (
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-sm text-muted-foreground">
                        Decoration
                      </label>
                      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar rounded-xl">
                        <Button
                          onClick={() => setTextAlign("left")}
                          className={cn(
                            textAlign === "left"
                              ? "bg-primary/20"
                              : "bg-background/5"
                          )}
                        >
                          <AlignLeftIcon className="size-4" />
                        </Button>
                        <Button
                          onClick={() => setTextAlign("center")}
                          className={cn(
                            textAlign === "center"
                              ? "bg-primary/20"
                              : "bg-background/5"
                          )}
                        >
                          <AlignCenterIcon className="size-4" />
                        </Button>
                        <Button
                          onClick={() => setTextAlign("right")}
                          className={cn(
                            textAlign === "right"
                              ? "bg-primary/20"
                              : "bg-background/5"
                          )}
                        >
                          <AlignRightIcon className="size-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar rounded-xl">
                        <Button
                          onClick={() => setIsItalic(!isItalic)}
                          className={cn(
                            isItalic ? "bg-primary/20 " : "bg-background/5"
                          )}
                        >
                          <ItalicIcon className="size-4" />
                        </Button>
                        <Button
                          onClick={() => setIsUnderline(!isUnderline)}
                          className={cn(
                            isUnderline ? "bg-primary/20 " : "bg-background/5"
                          )}
                        >
                          <UnderlineIcon className="size-4 mx-auto" />
                        </Button>
                        <Button
                          onClick={() => setIsStrikethrough(!isStrikethrough)}
                          className={cn(
                            isStrikethrough
                              ? "bg-primary/20"
                              : "bg-background/5"
                          )}
                        >
                          <StrikethroughIcon className="size-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  <Separator className="my-2" />

                  <label className="text-sm text-muted-foreground">Glow</label>
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
                    <Slider
                      label="Intensity"
                      min={0}
                      max={100} // Changed from 80 to 100 for percentage
                      step={1}
                      value={[textShadow.blur]}
                      onValueChange={([value]) =>
                        setTextShadow((prev) => ({
                          ...prev,
                          blur: value, // Store as percentage
                        }))
                      }
                      valueSubtext="%"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Slider
                      label="Offset X"
                      min={-20}
                      max={20}
                      step={1}
                      value={[textShadow.offsetX]}
                      onValueChange={([value]) =>
                        setTextShadow((prev) => ({ ...prev, offsetX: value }))
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Slider
                      label="Offset Y"
                      min={-20}
                      max={20}
                      step={1}
                      value={[textShadow.offsetY]}
                      onValueChange={([value]) =>
                        setTextShadow((prev) => ({ ...prev, offsetY: value }))
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "canvas" && (
              <div key={activeTab} className="flex flex-col relative gap-8">
                <h3 className="text-[64px] leading-[100%] text-center font-bold tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-b from-foreground/20 to-foreground/70">
                  {activeTab}
                </h3>
                <div className="flex flex-col gap-4 overflow-y-auto h-full no-scrollbar">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">
                      Resolution
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col w-full gap-1">
                        <label className="text-xs text-muted-foreground">
                          Width
                        </label>
                        <Input
                          type="number"
                          min={0}
                          max={2560}
                          value={resolution.width}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value > 2560) {
                              toast.error("Maximum width is 2560px");
                              return;
                            }
                            setResolution({
                              ...resolution,
                              width: value,
                            });
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs text-muted-foreground">
                          Height
                        </label>
                        <Input
                          type="number"
                          min={0}
                          max={2560}
                          value={resolution.height}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value > 2560) {
                              toast.error("Maximum height is 2560px");
                              return;
                            }
                            setResolution({
                              ...resolution,
                              height: value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">
                      Presets
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="sm">
                            <FacebookIcon className="size-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 bg-transparent border-none p-0">
                          <div className="flex flex-col gap-1">
                            <Button
                              onClick={() =>
                                setResolution({ width: 1200, height: 630 })
                              }
                            >
                              Feed Post
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1080, height: 1920 })
                              }
                            >
                              Story
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1920, height: 1005 })
                              }
                            >
                              Event Cover
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="sm">
                            <InstagramIcon className="size-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 bg-transparent border-none p-0">
                          <div className="flex flex-col gap-1">
                            <Button
                              onClick={() =>
                                setResolution({ width: 1080, height: 1080 })
                              }
                            >
                              Square Post
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1080, height: 1350 })
                              }
                            >
                              Portrait Post
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1080, height: 1920 })
                              }
                            >
                              Story/Reels
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="sm">
                            <TwitterIcon className="size-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 bg-transparent border-none p-0">
                          <div className="flex flex-col gap-1">
                            <Button
                              onClick={() =>
                                setResolution({ width: 1600, height: 900 })
                              }
                            >
                              Post Image
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1500, height: 500 })
                              }
                            >
                              Header
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="sm">
                            <LinkedinIcon className="size-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 bg-transparent border-none p-0">
                          <div className="flex flex-col gap-1">
                            <Button
                              onClick={() =>
                                setResolution({ width: 1200, height: 627 })
                              }
                            >
                              Post
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1584, height: 396 })
                              }
                            >
                              Banner
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>

                      {/* Add Device Presets */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="sm">
                            <MonitorIcon className="size-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 bg-transparent border-none p-0">
                          <div className="flex flex-col gap-1">
                            <p className="text-xs text-muted-foreground px-2 py-1">
                              Mobile
                            </p>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1284, height: 2778 })
                              }
                            >
                              iPhone 14 Pro Max
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1170, height: 2532 })
                              }
                            >
                              iPhone 13/14
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1440, height: 3200 })
                              }
                            >
                              Samsung S21 Ultra
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1080, height: 2400 })
                              }
                            >
                              Android (Medium)
                            </Button>

                            <Separator className="my-2" />
                            <p className="text-xs text-muted-foreground px-2 py-1">
                              Tablet
                            </p>
                            <Button
                              onClick={() =>
                                setResolution({ width: 2048, height: 2732 })
                              }
                            >
                              iPad Pro 12.9&quot;
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1668, height: 2388 })
                              }
                            >
                              iPad Air
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 2560, height: 1600 })
                              }
                            >
                              Samsung Tab S7
                            </Button>

                            <Separator className="my-2" />
                            <p className="text-xs text-muted-foreground px-2 py-1">
                              Desktop
                            </p>
                            <Button
                              onClick={() =>
                                setResolution({ width: 2560, height: 1440 })
                              }
                            >
                              2K (QHD)
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1920, height: 1080 })
                              }
                            >
                              Full HD
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 3840, height: 2160 })
                              }
                            >
                              4K UHD
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>

                      {/* Add OG Image Presets */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="sm">
                            <ImageIcon className="size-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 bg-transparent border-none p-0">
                          <div className="flex flex-col gap-1">
                            <Button
                              onClick={() =>
                                setResolution({ width: 1200, height: 630 })
                              }
                            >
                              Open Graph
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1200, height: 600 })
                              }
                            >
                              Twitter Card
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 800, height: 418 })
                              }
                            >
                              Blog Cover
                            </Button>
                            <Button
                              onClick={() =>
                                setResolution({ width: 1280, height: 720 })
                              }
                            >
                              YouTube Thumbnail
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-muted-foreground">
                          Background
                        </label>
                        <div className="flex items-center gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <span
                                className="w-8 h-8 rounded-full cursor-pointer aspect-square border border-primary/10"
                                style={{ backgroundColor: backgroundColor }}
                              />
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-3"
                              align="start"
                            >
                              <HexColorPicker
                                color={activeColorPicker}
                                onChange={(color) => {
                                  setActiveColorType("background");
                                  setActiveColorPicker(color);
                                  setBackgroundColor(color);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                          <Input
                            type="text"
                            value={backgroundColor}
                            placeholder="Background Color"
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className={cn(
                              "resize-none",
                              backgroundImage && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={!!backgroundImage}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-x-0 -top-3 flex items-center justify-center">
                        <span className="bg-secondary px-2 text-xs text-muted-foreground">
                          or
                        </span>
                      </div>
                      <div className="relative pt-2">
                        <label
                          className={`px-4 py-3 bg-foreground/5 rounded-xl hover:text-foreground/80 text-primary transition-all duration-300 flex items-center gap-2 cursor-pointer justify-center border border-primary/10 ${
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
                                {backgroundImage
                                  ? "Change Image"
                                  : "Upload Image"}
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
                            className="rounded-xl mt-2 w-full"
                            variant="destructive"
                          >
                            <Trash2Icon className="size-4" />
                            <span className="text-xs tracking-tight">
                              Remove Image
                            </span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex flex-col gap-2">
                    <Slider
                      label="Blur"
                      min={backgroundImage ? 0 : 400}
                      max={isSafari ? 800 : 1200}
                      step={20}
                      value={[blur]}
                      valueSubtext="px"
                      onValueChange={([value]) => setBlur(value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "colors" && (
              <div key={activeTab} className="flex flex-col relative gap-8">
                <h3 className="text-[64px] leading-[100%] text-center font-bold tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-b from-foreground/20 to-foreground/70">
                  {activeTab}
                </h3>
                <div className="flex flex-col gap-4 overflow-y-auto h-full no-scrollbar">
                  {!backgroundImage && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-muted-foreground">
                          Blobs
                        </label>
                        <Slider
                          label="Blobs"
                          min={1}
                          max={10}
                          step={1}
                          value={[numCircles]}
                          onValueChange={([value]) => {
                            setNumCircles(value);
                            if (value > circles.length) {
                              // Only add new circles while preserving existing ones
                              const newCircles = [...circles];
                              for (let i = circles.length; i < value; i++) {
                                newCircles.push({
                                  color: colors[i % colors.length],
                                  cx: Math.random() * 100,
                                  cy: Math.random() * 100,
                                });
                              }
                              setCircles(newCircles);
                            } else {
                              // Remove excess circles
                              setCircles(circles.slice(0, value));
                            }
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

            {activeTab === "filters" && (
              <div key={activeTab} className="flex flex-col gap-8">
                <h3 className="text-[64px] leading-[100%] text-center font-bold tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-b from-foreground/20 to-foreground/70">
                  {activeTab}
                </h3>
                <div className="flex flex-col gap-4">
                  {!isSafari && (
                    <>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <Slider
                            label="Grain"
                            min={0}
                            max={100}
                            step={1}
                            value={[grainIntensity]}
                            onValueChange={([value]) => {
                              setGrainIntensity(value);
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Slider
                            label="Vignette"
                            min={0}
                            max={100}
                            step={1}
                            value={[vignetteIntensity]}
                            onValueChange={([value]) => {
                              setVignetteIntensity(value);
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <Slider
                    label="Saturation"
                    min={0}
                    max={200}
                    step={1}
                    value={[saturation]}
                    onValueChange={([value]) => setSaturation(value)}
                  />
                  <Slider
                    label="Contrast"
                    min={5}
                    max={200}
                    step={1}
                    value={[contrast]}
                    onValueChange={([value]) => setContrast(value)}
                  />
                  <Slider
                    label="Brightness"
                    min={10}
                    max={200}
                    step={1}
                    value={[brightness]}
                    onValueChange={([value]) => setBrightness(value)}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="flex flex-col items-center rounded-2xl w-full gap-4">
          <div className="flex w-full gap-2 flex-col">
            <div className="flex w-full gap-2">
              <Button
                className="flex items-center w-full justify-between py-4"
                onClick={downloadImage}
                disabled={isDownloading}
              >
                <div className="flex items-center gap-2">
                  <DownloadIcon className="size-4" />
                  <span className="text-sm">Download</span>
                </div>
              </Button>

              <ThemeSwitch />
            </div>
          </div>
        </div>
      </aside>

      {/* preview section */}
      <section
        ref={containerRef}
        className="flex flex-col gap-4 w-full h-full items-center justify-center relative bg-secondary rounded-2xl border border-primary/10 overflow-hidden"
      >
        <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
          <ButtonsChin
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
          <Button
            onClick={() => setZoom((z) => Math.min(z + 0.1, 2))}
            className="w-fit"
          >
            <ZoomInIcon className="size-4" />
          </Button>
          <Button
            onClick={() => setZoom((z) => Math.max(z - 0.1, 0.1))}
            className="w-fit"
          >
            <ZoomOutIcon className="size-4" />
          </Button>
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="rounded-2xl overflow-hidden w-full h-full flex items-center justify-center relative cursor-grab active:cursor-grabbing">
            <DraggablePreview id="preview">
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  height: resolution.height * zoom,
                  width: resolution.width * zoom,
                  transform: `translate(${position.x}px, ${position.y}px)`,
                }}
              >
                <div
                  id="wallpaper"
                  style={{
                    width: `${resolution.width}px`,
                    height: `${resolution.height}px`,
                    transform: `scale(${zoom})`,
                    transformOrigin: "top left",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {isGenerating && (
                    <div className="absolute inset-0 bg-background z-50 flex items-center justify-center">
                      <WandSparklesIcon className="size-16 text-primary animate-ping" />
                    </div>
                  )}
                  <CanvasPreview />

                  <div className="absolute inset-0 flex items-center justify-center z-40">
                    {textMode === "text" ? (
                      <p
                        style={{
                          fontSize: `${fontSize}px`,
                          fontWeight: fontWeight,
                          letterSpacing: `${letterSpacing}em`,
                          fontFamily: fontFamily,
                          opacity: opacity / 100,
                          lineHeight: lineHeight,
                          color: textColor,
                          fontStyle: isItalic ? "italic" : "normal",
                          textDecoration: `${isUnderline ? "underline" : ""} ${
                            isStrikethrough ? "line-through" : ""
                          }`.trim(),
                          textShadow: `${textShadow.offsetX}px ${textShadow.offsetY}px ${textShadow.blur}px ${textShadow.color}`,
                          transform: `translate(${textPosition.x}px, ${textPosition.y}px)`,
                          whiteSpace: "pre-wrap",
                          textAlign: textAlign,
                        }}
                      >
                        {text}
                      </p>
                    ) : (
                      logoImage && (
                        <Image
                          unoptimized
                          src={logoImage}
                          alt="Logo"
                          style={{
                            maxWidth: `${fontSize}%`,
                            maxHeight: `${fontSize}%`,
                            opacity: opacity / 100,
                            transform: `translate(${textPosition.x}px, ${textPosition.y}px)`,
                            filter: `drop-shadow(${textShadow.offsetX}px ${textShadow.offsetY}px ${textShadow.blur}px ${textShadow.color})`,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </DraggablePreview>
          </div>
        </DndContext>
      </section>
    </main>
  );
}

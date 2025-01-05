"use client";

import { Input } from "@/components/ui/input";
import { Download, Undo, WandSparklesIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import logo from "@/public/logo.svg";
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

import { CircleProps, FontOption, RESOLUTIONS } from "@/lib/constants";
import { ModeToggle } from "../ui/themeSwitch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  noiseIntensity: number;
  noiseStyle: React.CSSProperties;
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
  noiseType: "original" | "film";
  setNoiseIntensity: (noiseIntensity: number) => void;
  setNoiseType: (noiseType: "original" | "film") => void;
  setTextColor: (textColor: string) => void;
  resolution: (typeof RESOLUTIONS)[number];
  setResolution: (res: (typeof RESOLUTIONS)[number]) => void;
  saturation: number;
  setSaturation: (value: number) => void;
  contrast: number;
  setContrast: (value: number) => void;
  brightness: number;
  setBrightness: (value: number) => void;
}

export default function DesktopApp({
  backgroundColor,
  fontSize,
  fontWeight,
  letterSpacing,
  fontFamily,
  opacity,
  lineHeight,
  text,
  circles,
  noiseIntensity,
  noiseStyle,
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
  noiseType,
  setNoiseIntensity,
  setNoiseType,
  setTextColor,
  resolution,
  setResolution,
  saturation,
  setSaturation,
  contrast,
  setContrast,
  brightness,
  setBrightness,
}: DesktopAppProps) {
  return (
    <main className="relative flex gap-2 items-center justify-center p-4 h-screen w-full">
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
        <div className="flex items-center gap-2 p-2 bg-muted rounded-xl w-full">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="logo" className="size-6" unoptimized />
            <p className="text-xs text-foreground bg-primary/20 border border-primary/40 px-2 py-1 rounded-full tracking-tighter">
              ALPHA
            </p>
          </div>
        </div>

        {/* controls */}
        <section className="w-full bg-muted border-primary/20 rounded-2xl flex flex-col no-scrollbar overflow-hidden h-full">
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "text" | "colors" | "effects")
            }
            className="w-full"
          >
            <TabsList className="w-full flex items-center gap-1">
              <TabsTrigger value="text" className="flex-1">
                Text
              </TabsTrigger>
              <TabsTrigger value="colors" className="flex-1">
                Colors
              </TabsTrigger>
              <TabsTrigger value="effects" className="flex-1">
                Effects
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col gap-4 overflow-y-auto justify-between no-scrollbar relative h-full">
            {activeTab === "text" && (
              <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm text-muted-foreground">Text</label>
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
                    max={100}
                    step={1}
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
              </div>
            )}

            {activeTab === "colors" && (
              <div className="flex flex-col gap-4 relative">
                <div className="w-full flex justify-center bg-gradient-to-b from-muted to-muted/5 py-6 px-4 sticky top-0 z-10">
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
              </div>
            )}

            {activeTab === "effects" && (
              <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-muted-foreground">
                    Noise Type
                  </label>
                  <Select
                    value={noiseType}
                    onValueChange={(value: "original" | "film") =>
                      setNoiseType(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select noise type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="original">Original</SelectItem>
                      <SelectItem value="film">Film Grain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-muted-foreground">
                    Noise Intensity
                  </label>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[noiseIntensity]}
                    onValueChange={([value]) => setNoiseIntensity(value)}
                  />
                  <span className="text-xs text-muted-foreground">
                    {noiseIntensity}%
                  </span>
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
              </div>
            )}

            <div className="sticky bottom-0 flex items-center gap-2 z-50 w-full bg-gradient-to-b from-transparent to-muted p-4">
              <div className="flex w-full bg-primary rounded-full text-primary-foreground divide-x divide-primary-foreground/20 divide-dashed">
                <button
                  onClick={downloadImage}
                  className="w-full flex items-center justify-center gap-2 text-primary-foreground text-sm"
                  disabled={isDownloading}
                >
                  Download
                  <Download className="size-4" />
                </button>

                <DropdownMenu>
                  <DropdownMenuTrigger className="w-fit px-4 py-2">
                    {resolution.scale}x
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {RESOLUTIONS.map((res) => (
                      <DropdownMenuItem
                        key={res.name}
                        onClick={() => setResolution(res)}
                      >
                        {res.name} ({res.width}×{res.height})
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>
      </motion.aside>

      {/* preview */}
      <section className="flex flex-col gap-4 w-full h-full items-center justify-center">
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
          className="rounded-3xl overflow-hidden shadow-[0_0_24px_rgba(31,31,31,0.1)] w-full max-w-3xl"
        >
          <div
            className="relative w-full aspect-video overflow-hidden"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          >
            <div
              className="absolute inset-0 object-center"
              id="wallpaper"
              style={{
                backgroundColor,
                width: `${resolution.width}px`,
                height: `${resolution.height}px`,
                transform: `scale(${770 / resolution.width})`,
                transformOrigin: "top left",
                fontSize: `${fontSize}px`,
                letterSpacing: `${letterSpacing}em`,
                filter: `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturation}%)`,
              }}
            >
              <div style={noiseStyle} />
              <p
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  z-50 px-8 right-1/2`}
                style={{
                  fontSize: `${(fontSize * resolution.width) / 1920}px`,
                  fontWeight,
                  letterSpacing: `${
                    (letterSpacing * resolution.width) / 1920
                  }em`,
                  fontFamily,
                  opacity: opacity / 100,
                  lineHeight: `${(lineHeight * resolution.width) / 1920}px`,
                  color: textColor,
                  maxWidth: "90%",
                  width: "fit-content",
                  margin: "0",
                }}
              >
                {text}
              </p>
              <svg className="w-full h-full">
                {circles.map((circle, i) => (
                  <circle
                    key={i}
                    cx={`${circle.cx}%`}
                    cy={`${circle.cy}%`}
                    r="30%"
                    fill={circle.color}
                    style={{
                      filter: `blur(${(100 * resolution.width) / 1920}px)`,
                    }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </motion.div>
        <div className="flex items-center gap-2 p-4 w-fit mx-auto">
          <ModeToggle />

          <button
            className="px-4 py-2 bg-gradient-to-b from-[#60A5FA] to-[#3B82F6] rounded-xl hover:text-white/80 text-white transition-all duration-300 z-50 disabled:opacity-50 flex items-center gap-2 w-full justify-center"
            onClick={generateNewPalette}
            disabled={isGenerating}
          >
            <WandSparklesIcon className={`size-4`} />
            <span className="text-xs font-semibold tracking-tight">
              Generate
            </span>
          </button>
          <button
            className="px-4 py-2 bg-secondary rounded-xl hover:text-primary/80 transition-colors duration-300 z-50 flex items-center gap-2 w-full justify-center"
            onClick={() => {
              if (previousCircles.length > 0) {
                setCircles(previousCircles);
                setPreviousCircles([]);
              }
            }}
            disabled={previousCircles.length === 0}
          >
            <Undo className="size-4" />
            <span className="sr-only">Undo</span>
          </button>
        </div>
      </section>
    </main>
  );
}

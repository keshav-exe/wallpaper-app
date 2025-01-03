"use client";

import { Input } from "@/components/ui/input";
import { RefreshCcw, Download, Undo } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";
import { toast } from "sonner";

interface CircleProps {
  color: string;
  cx: number;
  cy: number;
}

interface FontOption {
  name: string;
  variable: boolean;
  weights: number[];
}

interface Position {
  name: string;
  class: string;
}

export default function Home() {
  const [colors] = useState([
    "#FF0080", // Pink
    "#7928CA", // Purple
    "#0070F3", // Blue
    "#00DFD8", // Cyan
    "#F5A623", // Orange
    "#FF4D4D", // Red
    "#F472B6", // Pink
    "#6366F1", // Violet
  ]);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [circles, setCircles] = useState<CircleProps[]>(() =>
    colors.map((color) => ({
      color,
      cx: Math.random() * 100,
      cy: Math.random() * 100,
    }))
  );
  const [previousCircles, setPreviousCircles] = useState<CircleProps[]>([]);
  const [text, setText] = useState("KSHV.");
  const [fontSize, setFontSize] = useState(36);
  const [fontWeight, setFontWeight] = useState(800);
  const [letterSpacing, setLetterSpacing] = useState(-0.02);
  const [opacity, setOpacity] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fontFamily, setFontFamily] = useState("Onest");
  const [activeTab, setActiveTab] = useState("text");
  const [noiseIntensity, setNoiseIntensity] = useState(0);
  const [noiseColor, setNoiseColor] = useState(30);
  const [textPosition, setTextPosition] = useState<string>(
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  );
  const [lineHeight, setLineHeight] = useState(1.2);
  const [textColor, setTextColor] = useState("#ffffff");
  const positions: Position[] = [
    { name: "Top Left", class: "top-4 left-4 -translate-x-0 -translate-y-0" },
    { name: "Top", class: "top-4 left-1/2 -translate-x-1/2 -translate-y-0" },
    { name: "Top Right", class: "top-4 right-4 translate-x-0 -translate-y-0" },
    { name: "Left", class: "top-1/2 left-4 -translate-x-0 -translate-y-1/2" },
    {
      name: "Center",
      class: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    },
    { name: "Right", class: "top-1/2 right-4 translate-x-0 -translate-y-1/2" },
    {
      name: "Bottom Left",
      class: "bottom-4 left-4 -translate-x-0 translate-y-0",
    },
    {
      name: "Bottom",
      class: "bottom-4 left-1/2 -translate-x-1/2 translate-y-0",
    },
    {
      name: "Bottom Right",
      class: "bottom-4 right-4 translate-x-0 translate-y-0",
    },
  ];

  const fonts: FontOption[] = [
    {
      name: "Onest",
      variable: true,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    {
      name: "Bricolage Grotesque",
      variable: true,
      weights: [200, 300, 400, 500, 600, 700, 800],
    },
    { name: "Space Mono", variable: false, weights: [400, 700] },
    {
      name: "Space Grotesk",
      variable: true,
      weights: [300, 400, 500, 600, 700],
    },
    {
      name: "Manrope",
      variable: true,
      weights: [200, 300, 400, 500, 600, 700, 800],
    },
    {
      name: "Poppins",
      variable: false,
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  ];

  const noiseSvg = `
  <svg viewBox="0 0 200 200" xmlns='http://www.w3.org/2000/svg'>
    <filter id='noiseFilter'>
      <feTurbulence 
        type='fractalNoise' 
        baseFrequency='1.5' 
        numOctaves='3' 
        stitchTiles='stitch'/>
      <feColorMatrix type="saturate" values="0"/>
      <feBlend mode='overlay' in2='SourceGraphic'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
  </svg>
  `;

  const svgToBase64 = (svg: string) => `data:image/svg+xml;base64,${btoa(svg)}`;

  const noiseStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url("${svgToBase64(noiseSvg)}")`,
    opacity: noiseIntensity / 100,
    mixBlendMode: "overlay",
    pointerEvents: "none",
  } as const;

  const [isCompatibleBrowser, setIsCompatibleBrowser] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const isChromium = /chrome|chromium|crios/i.test(navigator.userAgent);
    setIsCompatibleBrowser(isChromium);
  }, []);

  useEffect(() => {
    const currentFont = fonts.find((f) => f.name === fontFamily);
    if (!currentFont?.variable) {
      const availableWeights = currentFont?.weights || [];
      const closestWeight = availableWeights.reduce((prev, curr) =>
        Math.abs(curr - fontWeight) < Math.abs(prev - fontWeight) ? curr : prev
      );
      setFontWeight(closestWeight);
    }
  }, [fontFamily]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = document.getElementById("wallpaper");
    if (!container) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    // Fill with dark pixels
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 0; // R
      data[i + 1] = 0; // G
      data[i + 2] = 0; // B
      data[i + 3] = 255; // A
    }

    // Apply noise with reduced intensity
    if (noiseIntensity > 0) {
      for (let i = 0; i < data.length; i += 4) {
        const noiseValue = (noiseColor / 600) * Math.random();
        data[i] += noiseValue * 255;
        data[i + 1] += noiseValue * 255;
        data[i + 2] += noiseValue * 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [noiseIntensity, noiseColor]);

  if (!isCompatibleBrowser) {
    return (
      <main className="h-screen flex items-center justify-center p-4">
        <div className="max-w-lg text-center flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold tracking-tighter">
            Coming Soon to your browser!
          </h1>
          <p className="text-secondary-foreground font-medium">
            Sorry, this app is only compatible with Chrome and Chromium-based
            browsers at this time.
          </p>
        </div>
      </main>
    );
  }

  const updateColor = (newColor: string, index: number) => {
    setPreviousCircles(circles);
    const newCircles = [...circles];
    newCircles[index] = {
      ...newCircles[index],
      color: newColor,
    };
    setCircles(newCircles);
  };

  const downloadImage = async () => {
    const wallpaper = document.getElementById("wallpaper");
    if (!wallpaper) {
      toast.error("Could not find wallpaper element");
      return;
    }

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(wallpaper, {
        backgroundColor: "#ffffff",
        width: canvasRef.current?.width,
        height: canvasRef.current?.height,
        style: {
          width: "100%",
          height: "100%",
        },
        pixelRatio: 10,
      });

      const link = document.createElement("a");
      link.download = "gradient-circles.png";
      link.href = dataUrl;
      link.click();
      toast.success("Image downloaded successfully!");
    } catch (err) {
      console.error("Failed to generate image:", err);
      toast.error("Failed to generate image");
    } finally {
      setIsDownloading(false);
    }
  };

  const generateNewPalette = () => {
    setIsGenerating(true);
    try {
      setPreviousCircles(circles);
      setCircles(
        circles.map((circle) => ({
          ...circle,
          cx: Math.random() * 100,
          cy: Math.random() * 100,
        }))
      );
      setNoiseIntensity(Math.floor(Math.random() * (100 - 30) + 30));
      toast.success("Generated new palette!");
    } catch (err) {
      console.error("Failed to generate new palette:", err);
      toast.error("Failed to generate new palette");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="relative flex flex-col max-w-3xl mx-auto gap-4 items-center justify-center p-4 h-screen md:p-8">
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          type: "spring",
          damping: 20,
          stiffness: 100,
          mass: 0.5,
        }}
        className="max-w-3xl w-full aspect-video relative rounded-3xl overflow-hidden shadow-[0_0_24px_rgba(31,31,31,0.1)] flex-shrink-0"
      >
        <div className="w-full h-full relative" id="wallpaper">
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
            style={{ mixBlendMode: "overlay", opacity: noiseIntensity / 100 }}
          />
          <div style={noiseStyle} />
          <p
            className={`absolute ${textPosition} z-50`}
            style={{
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight,
              letterSpacing: `${letterSpacing}em`,
              fontFamily: fontFamily,
              opacity: opacity / 100,
              lineHeight: lineHeight,
              color: textColor,
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
                  filter: "blur(100px)",
                }}
              />
            ))}
          </svg>
        </div>
        <div className="absolute bottom-4 flex items-center justify-end gap-2 z-50 px-4 w-full">
          <button
            className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-300 z-50 disabled:opacity-50"
            onClick={generateNewPalette}
            disabled={isGenerating}
          >
            <RefreshCcw
              className={`size-4 text-primary ${
                isGenerating ? "animate-spin" : ""
              }`}
            />
            <span className="sr-only">Generate New Palette</span>
          </button>
          <button
            className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-300 z-50"
            onClick={() => {
              if (previousCircles.length > 0) {
                setCircles(previousCircles);
                setPreviousCircles([]);
              }
            }}
          >
            <Undo className="size-4 text-primary" />
            <span className="sr-only">Undo</span>
          </button>

          <button
            onClick={downloadImage}
            className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-300 z-50 disabled:opacity-50"
            type="button"
            disabled={isDownloading}
          >
            <Download
              className={`size-4 text-primary ${
                isDownloading ? "animate-pulse" : ""
              }`}
            />
            <span className="sr-only">Download PNG</span>
          </button>
        </div>
      </motion.section>

      <motion.section
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          type: "spring",
          damping: 20,
          stiffness: 100,
          mass: 0.5,
        }}
        className="w-full bg-white shadow-[0_0_12px_rgba(31,31,31,0.1)] rounded-3xl flex flex-col h-full md:max-h-[30vh] max-h-[50vh] no-scrollbar"
      >
        <div className="flex border-b flex-shrink-0 px-4">
          <button
            onClick={() => setActiveTab("text")}
            className={`px-4 py-3 text-sm ${
              activeTab === "text" ? "border-b-2 border-primary" : ""
            }`}
          >
            Text
          </button>
          <button
            onClick={() => setActiveTab("colors")}
            className={`px-4 py-3 text-sm ${
              activeTab === "colors" ? "border-b-2 border-primary" : ""
            }`}
          >
            Colors
          </button>
          <button
            onClick={() => setActiveTab("effects")}
            className={`px-4 py-3 text-sm ${
              activeTab === "effects" ? "border-b-2 border-primary" : ""
            }`}
          >
            Effects
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-full no-scrollbar">
          {activeTab === "text" && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 w-full">
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm text-muted-foreground">Size</label>
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
                    Weight
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
                    Spacing
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
                    Opacity
                  </label>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[opacity]}
                    onValueChange={([value]) => setOpacity(value)}
                  />
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

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm text-muted-foreground">
                    Position
                  </label>
                  <div className="grid grid-cols-3 gap-1 aspect-video">
                    {positions.map((pos) => (
                      <button
                        key={pos.name}
                        onClick={() => setTextPosition(pos.class)}
                        className={`rounded-xl md:rounded-2xl flex flex-shrink-0 items-center justify-center transition-all ${
                          textPosition === pos.class
                            ? "border-2 border-secondary/80 bg-primary/20"
                            : "border-2 hover:border-secondary/80 bg-secondary"
                        }`}
                        title={pos.name}
                      ></button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-muted-foreground">Color</label>
                  <div className="flex items-center gap-2">
                    <span
                      onClick={() => {
                        setTextColor(textColor ?? "#ffffff");
                      }}
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

          {activeTab === "colors" && (
            <div className="grid grid-cols-2 gap-4">
              {circles.map((circle, i) => (
                <div key={i} className="flex items-start gap-2 relative w-full">
                  <div className="flex items-center gap-2 w-full">
                    <span
                      onClick={() => {
                        if (activeColor === i) {
                          setActiveColor(null);
                        } else {
                          setActiveColor(i);
                        }
                      }}
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
          )}

          {activeTab === "effects" && (
            <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground">
                  Noise Color
                </label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[noiseColor]}
                  onValueChange={([value]) => setNoiseColor(value)}
                />
              </div>
            </div>
          )}
        </div>
      </motion.section>
    </main>
  );
}

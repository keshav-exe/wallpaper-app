"use client";
import DesktopApp from "@/components/core-ui/desktop-app";
import MobileApp from "@/components/core-ui/mobile-app";

import { useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import {
  INITIAL_BACKGROUND_COLORS,
  FONTS,
  NOISE_SVG_PATTERNS,
  type CircleProps,
  type FontOption,
  RESOLUTIONS,
  INITIAL_COLORS,
} from "@/lib/constants";

export default function Home() {
  const [colors] = useState(INITIAL_COLORS);
  const [backgroundColors] = useState(INITIAL_BACKGROUND_COLORS);
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
  const [fontFamily, setFontFamily] = useState("Onest");
  const [activeTab, setActiveTab] = useState<"colors" | "text" | "effects">(
    "text"
  );
  const [noiseIntensity, setNoiseIntensity] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [lineHeight, setLineHeight] = useState(1.2);
  const [textColor, setTextColor] = useState("#ffffff");
  const [noiseType, setNoiseType] = useState<"original" | "film">("original");
  const [activeColorPicker, setActiveColorPicker] = useState<string>(textColor);
  const [activeColorType, setActiveColorType] = useState<
    "text" | "background" | "gradient"
  >("text");
  const [resolution, setResolution] = useState<(typeof RESOLUTIONS)[number]>(
    RESOLUTIONS[0]
  );
  const [saturation, setSaturation] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);

  const fonts: FontOption[] = FONTS;

  const svgToBase64 = (svg: string) => `data:image/svg+xml;base64,${btoa(svg)}`;

  const noiseStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url("${svgToBase64(NOISE_SVG_PATTERNS[noiseType])}")`,
    opacity: noiseIntensity / 100,
    mixBlendMode: noiseType === "film" ? "multiply" : "soft-light",
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
    if (!wallpaper) return;

    setIsDownloading(true);
    try {
      // Store original styles
      const originalTransform = wallpaper.style.transform;
      const originalWidth = wallpaper.style.width;
      const originalHeight = wallpaper.style.height;

      // Reset transform and set exact dimensions
      wallpaper.style.transform = "none";
      wallpaper.style.width = `${resolution.width}px`;
      wallpaper.style.height = `${resolution.height}px`;

      const dataUrl = await toPng(wallpaper, {
        width: resolution.width,
        height: resolution.height,
        pixelRatio: 1, // Force 1:1 pixel ratio
        style: {
          transform: "none",
          transformOrigin: "top left",
        },
      });

      // Restore original styles
      wallpaper.style.transform = originalTransform;
      wallpaper.style.width = originalWidth;
      wallpaper.style.height = originalHeight;

      const link = document.createElement("a");
      link.download = `gradient-circles-${resolution.width}x${resolution.height}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      toast.error("Failed to download image");
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

      // Randomize noise settings
      setNoiseIntensity(Math.floor(Math.random() * (100 - 30) + 30));
      const noiseTypes: ("original" | "film")[] = ["original", "film"];
      setNoiseType(noiseTypes[Math.floor(Math.random() * noiseTypes.length)]);

      // Randomize background color
      const randomColor =
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
      setBackgroundColor(randomColor);

      // Randomize font family
      const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
      setFontFamily(randomFont.name);

      // Randomize font weight (between 100-900)
      const availableWeights = randomFont.weights || [
        100, 200, 300, 400, 500, 600, 700, 800, 900,
      ];
      setFontWeight(
        availableWeights[Math.floor(Math.random() * availableWeights.length)]
      );

      //Randomize font size
      const fontSizes = [24, 28, 32, 36, 40, 44, 48, 52, 56, 60];
      setFontSize(fontSizes[Math.floor(Math.random() * fontSizes.length)]);

      // Randomize letter spacing (between -0.05 and 0.1)
      setLetterSpacing(Number((Math.random() * 0.15 - 0.05).toFixed(2)));

      toast.success("Generated new palette!");
    } catch (err) {
      console.error("Failed to generate new palette:", err);
      toast.error("Failed to generate new palette");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleColorChange = (color: string) => {
    switch (activeColorType) {
      case "text":
        setTextColor(color);
        break;
      case "background":
        setBackgroundColor(color);
        break;
      case "gradient":
        if (activeColor !== null) {
          updateColor(color, activeColor);
        }
        break;
    }
  };
  return (
    <>
      <div className="md:hidden">
        <MobileApp />
      </div>
      <div className="hidden md:block">
        <DesktopApp
          backgroundColor={backgroundColor}
          activeTab={activeTab}
          fontSize={fontSize}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing}
          fontFamily={fontFamily}
          opacity={opacity}
          lineHeight={lineHeight}
          text={text}
          circles={circles}
          noiseIntensity={noiseIntensity}
          noiseStyle={noiseStyle}
          textColor={textColor}
          generateNewPalette={generateNewPalette}
          isGenerating={isGenerating}
          downloadImage={downloadImage}
          isDownloading={isDownloading}
          fonts={fonts}
          activeColorPicker={activeColorPicker}
          noiseType={noiseType}
          setNoiseIntensity={setNoiseIntensity}
          setNoiseType={setNoiseType}
          setTextColor={setTextColor}
          setText={setText}
          setFontFamily={setFontFamily}
          setFontSize={setFontSize}
          setFontWeight={setFontWeight}
          setLetterSpacing={setLetterSpacing}
          setOpacity={setOpacity}
          setLineHeight={setLineHeight}
          setBackgroundColor={setBackgroundColor}
          setActiveColorPicker={setActiveColorPicker}
          handleColorChange={handleColorChange}
          setActiveColorType={setActiveColorType}
          setActiveColor={setActiveColor}
          updateColor={updateColor}
          previousCircles={previousCircles}
          setCircles={setCircles}
          setPreviousCircles={setPreviousCircles}
          setActiveTab={setActiveTab}
          resolution={resolution}
          setResolution={setResolution}
          saturation={saturation}
          setSaturation={setSaturation}
          contrast={contrast}
          setContrast={setContrast}
          brightness={brightness}
          setBrightness={setBrightness}
        />
      </div>
    </>
  );
}

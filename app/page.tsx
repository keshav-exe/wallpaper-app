"use client";
import DesktopApp from "@/components/core-ui/desktop-app";
import MobileApp from "@/components/core-ui/mobile-app";

import { useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import {
  INITIAL_BACKGROUND_COLORS,
  FONTS,
  FILTER_SVG_PATTERNS,
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
  const [blur, setBlur] = useState(200);
  const [fontWeight, setFontWeight] = useState(800);
  const [letterSpacing, setLetterSpacing] = useState(-0.02);
  const [opacity, setOpacity] = useState(100);
  const [fontFamily, setFontFamily] = useState("Onest");
  const [activeTab, setActiveTab] = useState<"colors" | "text" | "effects">(
    "text"
  );
  const [filterIntensity, setFilterIntensity] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [lineHeight, setLineHeight] = useState(1.2);
  const [textColor, setTextColor] = useState("#ffffff");
  const [filterType, setFilterType] = useState<
    "pastel" | "film" | "grain" | "static"
  >("pastel");
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
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const fonts: FontOption[] = FONTS;

  const svgToBase64 = (svg: string) => `data:image/svg+xml;base64,${btoa(svg)}`;

  const filterStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url("${svgToBase64(FILTER_SVG_PATTERNS[filterType])}")`,
    opacity: filterIntensity / 100,
    mixBlendMode: filterType === "film" ? "multiply" : "soft-light",
    pointerEvents: "none",
  } as const;

  const [isDownloading, setIsDownloading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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

  // if (!isCompatibleBrowser) {
  //   return <MobileApp />;
  // }

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
      // Store ALL original styles
      const svgElement = wallpaper.querySelector("svg");
      const originalSvgStyle = svgElement?.getAttribute("style");
      const originalTransform = wallpaper.style.transform;
      const originalWidth = wallpaper.style.width;
      const originalHeight = wallpaper.style.height;

      // Set download styles
      wallpaper.style.transform = "none";
      wallpaper.style.width = `${resolution.width}px`;
      wallpaper.style.height = `${resolution.height}px`;

      const dataUrl = await toPng(wallpaper, {
        width: resolution.width,
        height: resolution.height,
        pixelRatio: 1,
        style: {
          transform: "none",
          transformOrigin: "top left",
        },
      });

      // Restore ALL original styles
      wallpaper.style.transform = originalTransform;
      wallpaper.style.width = originalWidth;
      wallpaper.style.height = originalHeight;
      if (svgElement && originalSvgStyle) {
        svgElement.setAttribute("style", originalSvgStyle);
      }

      const link = document.createElement("a");
      link.download = `gradii-${resolution.width}x${resolution.height}.png`;
      link.href = dataUrl;

      const downloadPromise = new Promise((resolve) => {
        link.click();
        resolve(true);
      });

      toast.promise(downloadPromise, {
        loading: "Downloading image...",
        success: "Downloaded image successfully",
        error: "Failed to download image",
      });
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

      // Randomize filter settings
      setFilterIntensity(Math.floor(Math.random() * (100 - 30) + 30));
      const filterTypes: ("pastel" | "film" | "grain" | "static")[] = [
        "pastel",
        "film",
        "grain",
        "static",
      ];
      setFilterType(
        filterTypes[Math.floor(Math.random() * filterTypes.length)]
      );

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (e.g., 10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be smaller than 10MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => {
      toast.error("Failed to read image file");
    };

    reader.onloadend = () => {
      const loadPromise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setBackgroundImage(reader.result as string);
          resolve(true);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      });

      toast.promise(loadPromise, {
        loading: "Loading image...",
        success: "Image uploaded successfully",
        error: "Failed to load image",
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="md:hidden">
        <MobileApp />
      </div>
      <div className="hidden md:block">
        <DesktopApp
          backgroundColor={backgroundColor}
          blur={blur}
          setBlur={setBlur}
          activeTab={activeTab}
          fontSize={fontSize}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing}
          fontFamily={fontFamily}
          opacity={opacity}
          lineHeight={lineHeight}
          text={text}
          circles={circles}
          filterIntensity={filterIntensity}
          filterStyle={filterStyle}
          textColor={textColor}
          generateNewPalette={generateNewPalette}
          isGenerating={isGenerating}
          downloadImage={downloadImage}
          isDownloading={isDownloading}
          fonts={fonts}
          activeColorPicker={activeColorPicker}
          filterType={filterType}
          setFilterIntensity={setFilterIntensity}
          setFilterType={setFilterType}
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
          backgroundImage={backgroundImage}
          handleImageUpload={handleImageUpload}
          setBackgroundImage={setBackgroundImage}
          isItalic={isItalic}
          setIsItalic={setIsItalic}
          isUnderline={isUnderline}
          setIsUnderline={setIsUnderline}
          isStrikethrough={isStrikethrough}
          setIsStrikethrough={setIsStrikethrough}
        />
      </div>
    </>
  );
}

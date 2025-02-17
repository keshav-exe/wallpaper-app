"use client";
import DesktopApp from "@/components/core-ui/desktop-app";
import MobileApp from "@/components/core-ui/mobile-app";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  INITIAL_BACKGROUND_COLORS,
  FONTS,
  type CircleProps,
  type FontOption,
  RESOLUTIONS,
  INITIAL_COLORS,
} from "@/lib/constants";
import { useSafariCheck } from "@/hooks/use-safari-check";
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
  const [text, setText] = useState("Gradii.");
  const [fontSize, setFontSizeState] = useState(36);
  const [blur, setBlur] = useState(500);
  const [fontWeight, setFontWeight] = useState(600);
  const [letterSpacing, setLetterSpacing] = useState(-0.02);
  const [opacity, setOpacity] = useState(100);
  const [fontFamily, setFontFamilyState] = useState("Onest");
  const [activeTab, setActiveTab] = useState<
    "colors" | "text" | "effects" | "background"
  >("text");
  const [grainIntensity, setGrainIntensity] = useState(25);
  const [vignetteIntensity, setVignetteIntensity] = useState(0);
  const isSafari = useSafariCheck();
  const [backgroundColor, setBackgroundColor] = useState("#0D1319");
  const [lineHeight, setLineHeight] = useState(1);
  const [textColor, setTextColor] = useState("#f1f1f1");

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
  const [modifiedProperties, setModifiedProperties] = useState<Set<string>>(
    new Set()
  );
  const [numCircles, setNumCircles] = useState(5);
  const [isUploading, setIsUploading] = useState(false);

  const fonts: FontOption[] = FONTS;
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [textShadow, setTextShadow] = useState({
    color: "#f5f5f5",
    blur: 24,
    offsetX: 0,
    offsetY: 0,
  });

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
    const canvas = document.querySelector(
      "#wallpaper canvas"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    setIsDownloading(true);
    try {
      const link = document.createElement("a");
      link.download = `gradii-${resolution.width}x${resolution.height}.png`;
      link.href = canvas.toDataURL("image/png");

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

      if (!modifiedProperties.has("backgroundColor")) {
        const randomColor =
          backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
        setBackgroundColor(randomColor);
      }

      if (!modifiedProperties.has("fontFamily")) {
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        setFontFamily(randomFont.name);
      }

      if (!modifiedProperties.has("fontWeight")) {
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        const availableWeights = randomFont?.weights || [
          100, 200, 300, 400, 500, 600, 700, 800, 900,
        ];
        setFontWeight(
          availableWeights[Math.floor(Math.random() * availableWeights.length)]
        );
      }

      if (!modifiedProperties.has("fontSize")) {
        const fontSizes = [24, 28, 32, 36, 40, 44, 48, 52, 56, 60];
        setFontSize(fontSizes[Math.floor(Math.random() * fontSizes.length)]);
      }

      if (!modifiedProperties.has("letterSpacing")) {
        setLetterSpacing(Number((Math.random() * 0.15 - 0.05).toFixed(2)));
      }

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

  const trackPropertyModification = (property: string) => {
    setModifiedProperties((prev) => new Set(prev).add(property));
  };

  // Modify the relevant setters
  const setFontSize = (value: number) => {
    trackPropertyModification("fontSize");
    setFontSizeState(value);
  };

  const setFontFamily = (value: string) => {
    trackPropertyModification("fontFamily");
    setFontFamilyState(value);
  };

  return (
    <>
      <div className="md:hidden">
        <MobileApp />
      </div>
      <div className="hidden md:block">
        <DesktopApp
          numCircles={numCircles}
          isSafari={isSafari}
          setNumCircles={setNumCircles}
          colors={colors}
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
          textColor={textColor}
          generateNewPalette={generateNewPalette}
          isGenerating={isGenerating}
          downloadImage={downloadImage}
          isDownloading={isDownloading}
          fonts={fonts}
          activeColorPicker={activeColorPicker}
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
          textShadow={textShadow}
          setTextShadow={setTextShadow}
          grainIntensity={grainIntensity}
          setGrainIntensity={setGrainIntensity}
          vignetteIntensity={vignetteIntensity}
          setVignetteIntensity={setVignetteIntensity}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
      </div>
    </>
  );
}

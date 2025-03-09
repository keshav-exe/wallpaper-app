"use client";
import DesktopApp from "@/components/core-ui/desktop-app";
import MobileApp from "@/components/core-ui/mobile-app";
import { useEffect } from "react";
import { toast } from "sonner";
import { FONTS } from "@/lib/constants";
import { useWallpaperStore } from "@/store/wallpaper";
import { useSafariCheck } from "@/hooks/use-safari-check";

export default function Home() {
  const isSafari = useSafariCheck();
  const store = useWallpaperStore();

  useEffect(() => {
    const currentFont = FONTS.find((f) => f.name === store.fontFamily);
    if (!currentFont?.variable) {
      const availableWeights = currentFont?.weights || [];
      const closestWeight = availableWeights.reduce((prev, curr) =>
        Math.abs(curr - store.fontWeight) < Math.abs(prev - store.fontWeight)
          ? curr
          : prev
      );
      store.setFontWeight(closestWeight);
    }
  }, [store.fontFamily]);

  const downloadImage = async () => {
    const canvas = document.querySelector(
      "#wallpaper canvas"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    try {
      const link = document.createElement("a");
      link.download = `gradii-${store.resolution.width}x${store.resolution.height}.png`;
      link.href = canvas.toDataURL("image/png");

      const downloadPromise = new Promise((resolve) => {
        link.click();
        resolve(true);
      });

      toast.promise(downloadPromise, {
        success: "Download started",
        error: "Failed to download image",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to download image");
    }
  };

  const handleColorChange = (color: string) => {
    switch (store.activeColorType) {
      case "text":
        store.setTextColor(color);
        break;
      case "background":
        store.setBackgroundColor(color);
        break;
      case "gradient":
        if (store.activeColor !== null) {
          store.updateColor(color, store.activeColor);
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
          store.backgroundImage = reader.result as string;
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
        <MobileApp
          {...store}
          fonts={FONTS}
          isSafari={isSafari}
          downloadImage={downloadImage}
          handleColorChange={handleColorChange}
          handleImageUpload={handleImageUpload}
        />
      </div>
      <div className="hidden md:block">
        <DesktopApp
          {...store}
          fonts={FONTS}
          isSafari={isSafari}
          downloadImage={downloadImage}
          handleColorChange={handleColorChange}
          handleImageUpload={handleImageUpload}
        />
      </div>
    </>
  );
}

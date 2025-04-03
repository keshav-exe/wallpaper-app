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
    try {
      // Get the preview canvas
      const previewCanvas = document.querySelector(
        "#wallpaper canvas"
      ) as HTMLCanvasElement;
      if (!previewCanvas) return;

      // Create a temporary canvas at full resolution
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = store.resolution.width;
      tempCanvas.height = store.resolution.height;
      const ctx = tempCanvas.getContext("2d")!;

      // Draw the preview canvas at full resolution
      ctx.drawImage(
        previewCanvas,
        0,
        0,
        store.resolution.width,
        store.resolution.height
      );

      // Draw the text
      if (store.textMode === "text") {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = store.htmlContent;
        const textContent = tempDiv.textContent || "";

        ctx.save();
        ctx.font = `${store.isItalic ? "italic" : ""} ${store.fontWeight} ${
          store.fontSize
        }px ${store.fontFamily}`;
        ctx.fillStyle = store.textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (store.textShadow.blur > 0) {
          ctx.shadowColor = store.textShadow.color;
          ctx.shadowBlur = store.textShadow.blur;
          ctx.shadowOffsetX = store.textShadow.offsetX;
          ctx.shadowOffsetY = store.textShadow.offsetY;
        }

        ctx.fillText(
          textContent,
          store.resolution.width / 2 + store.textPosition.x,
          store.resolution.height / 2 + store.textPosition.y
        );
        ctx.restore();
      }

      if (store.textMode === "image" && store.logoImage) {
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = store.logoImage as string;
        });

        const maxWidth = store.resolution.width * 0.5;
        const maxHeight = store.resolution.height * 0.5;
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
        const width = img.width * scale;
        const height = img.height * scale;

        ctx.save();
        ctx.globalAlpha = store.opacity / 100;
        ctx.filter = `drop-shadow(${store.textShadow.offsetX}px ${store.textShadow.offsetY}px ${store.textShadow.blur}px ${store.textShadow.color})`;
        ctx.drawImage(
          img,
          store.resolution.width / 2 - width / 2 + store.textPosition.x,
          store.resolution.height / 2 - height / 2 + store.textPosition.y,
          width,
          height
        );
        ctx.restore();
      }

      // Handle download based on browser
      if (isSafari) {
        const dataUrl = tempCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `gradii-${store.resolution.width}x${store.resolution.height}.png`;
        link.click();
      } else {
        const blob = await new Promise<Blob>((resolve) =>
          tempCanvas.toBlob((blob) => resolve(blob!), "image/png")
        );
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `gradii-${store.resolution.width}x${store.resolution.height}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      toast.success("Download started");
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

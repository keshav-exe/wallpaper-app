import { useEffect, useRef, useCallback, useMemo } from "react";
import { CircleProps } from "@/lib/constants";
import { generateRandomShape } from "@/lib/utils/shapes";
import "context-filter-polyfill";
import { debounce } from "@/lib/utils";
import { applyGrainEffect, applyVignetteEffect } from "@/lib/utils/effects";
import { drawShape } from "@/lib/utils/shapes";

interface CanvasPreviewProps {
  width: number;
  height: number;
  backgroundColor: string;
  circles: CircleProps[];
  filters: {
    blur: number;
    brightness: number;
    contrast: number;
    saturation: number;
  };
  effects: {
    grain: number;
    vignette: number;
  };
  backgroundImage: string | null;
}

export function CanvasPreview({
  width,
  height,
  backgroundColor,
  circles,
  filters,
  backgroundImage,
  effects,
}: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backgroundLayerRef = useRef<HTMLCanvasElement | null>(null);

  const debouncedCompositeCanvas = useMemo(
    () => debounce((fn: () => void) => fn(), 16), // ~60fps
    []
  );

  // Initialize canvases once
  useEffect(() => {
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement("canvas");
      backgroundLayerRef.current = document.createElement("canvas");
    }

    [offscreenCanvasRef, backgroundLayerRef].forEach((ref) => {
      if (ref.current) {
        ref.current.width = width;
        ref.current.height = height;
      }
    });
  }, [width, height]);

  // Handle background and shapes
  useEffect(() => {
    if (!backgroundLayerRef.current) return;
    const ctx = backgroundLayerRef.current.getContext("2d")!;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        const scale = Math.max(width / img.width, height / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (width - scaledWidth) / 2;
        const y = (height - scaledHeight) / 2;

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        debouncedCompositeCanvas(compositeCanvas);
      };
    } else {
      circles.forEach((circle) => {
        const shape = generateRandomShape(circle.color);
        drawShape(ctx, shape, circle);
      });
      debouncedCompositeCanvas(compositeCanvas);
    }
  }, [backgroundColor, circles, backgroundImage, width, height]);

  // Handle filters
  useEffect(() => {
    debouncedCompositeCanvas(compositeCanvas);
  }, [filters]);

  const compositeCanvas = useCallback(() => {
    if (!canvasRef.current || !backgroundLayerRef.current) return;

    const ctx = canvasRef.current.getContext("2d", {
      alpha: true,
      willReadFrequently: false,
    })!;

    // Clear main canvas
    ctx.clearRect(0, 0, width, height);

    // 1. Draw solid background color first (no filters)
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw shapes/gradients with filters
    const cssFilters = [
      filters.blur > 0 ? `blur(${filters.blur / 4}px)` : "",
      `brightness(${filters.brightness}%)`,
      `contrast(${filters.contrast}%)`,
      `saturate(${filters.saturation}%)`,
    ]
      .filter(Boolean)
      .join(" ");

    ctx.filter = cssFilters;
    ctx.drawImage(backgroundLayerRef.current, 0, 0);

    // 3. Apply film grain
    if (effects.grain > 0) {
      applyGrainEffect(ctx, effects.grain / 100);
    }

    // 4. Apply vignette
    if (effects.vignette > 0) {
      applyVignetteEffect(ctx, effects.vignette / 100);
    }
  }, [filters, width, height, backgroundColor, effects]);

  return (
    <canvas
      id="wallpaper"
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        imageRendering: "-webkit-optimize-contrast",
        willChange: "transform",
      }}
    />
  );
}

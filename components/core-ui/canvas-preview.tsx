import { useEffect, useRef, useCallback, useMemo } from "react";
import { CircleProps } from "@/lib/constants";
import { generateRandomShape } from "@/lib/utils/shapes";
import "context-filter-polyfill";
import { debounce } from "@/lib/utils";

interface CanvasPreviewProps {
  width: number;
  height: number;
  backgroundColor: string;
  circles: CircleProps[];
  text: string;
  textStyle: {
    fontSize: number;
    fontWeight: number;
    letterSpacing: number;
    fontFamily: string;
    opacity: number;
    lineHeight: number;
    color: string;
    isItalic: boolean;
    isUnderline: boolean;
    isStrikethrough: boolean;
  };
  filters: {
    blur: number;
    brightness: number;
    contrast: number;
    saturation: number;
  };
  backgroundImage: string | null;
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: ReturnType<typeof generateRandomShape>,
  circle: CircleProps
) {
  const path = new Path2D();

  // Scale coordinates to canvas size
  const x = (shape.x / 100) * ctx.canvas.width;
  const y = (shape.y / 100) * ctx.canvas.height;

  // Generate blob path
  const points = 6;
  const radius = (30 / 100) * Math.min(ctx.canvas.width, ctx.canvas.height); // Scale radius
  const variance = 0.4;

  path.moveTo(x + radius, y);

  for (let i = 1; i <= points; i++) {
    const angle = (i * 2 * Math.PI) / points;
    const r = radius * (1 + (Math.random() - 0.5) * variance);
    const pointX = x + r * Math.cos(angle);
    const pointY = y + r * Math.sin(angle);

    const prevAngle = ((i - 1) * 2 * Math.PI) / points;
    const cpRadius = radius * (1.2 + Math.random() * 0.4);

    const cp1x = x + cpRadius * Math.cos(prevAngle + Math.PI / points);
    const cp1y = y + cpRadius * Math.sin(prevAngle + Math.PI / points);
    const cp2x = x + cpRadius * Math.cos(angle - Math.PI / points);
    const cp2y = y + cpRadius * Math.sin(angle - Math.PI / points);

    path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, pointX, pointY);
  }

  path.closePath();
  ctx.fillStyle = circle.color;
  ctx.fill(path);
}

export function CanvasPreview({
  width,
  height,
  backgroundColor,
  circles,
  text,
  textStyle,
  filters,
  backgroundImage,
}: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backgroundLayerRef = useRef<HTMLCanvasElement | null>(null);
  const textLayerRef = useRef<HTMLCanvasElement | null>(null);

  const debouncedCompositeCanvas = useMemo(
    () => debounce((fn: () => void) => fn(), 16), // ~60fps
    []
  );

  // Initialize canvases once
  useEffect(() => {
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement("canvas");
      backgroundLayerRef.current = document.createElement("canvas");
      textLayerRef.current = document.createElement("canvas");
    }

    [offscreenCanvasRef, backgroundLayerRef, textLayerRef].forEach((ref) => {
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

  // Handle text separately
  useEffect(() => {
    if (!textLayerRef.current) return;
    const ctx = textLayerRef.current.getContext("2d")!;

    ctx.clearRect(0, 0, width, height);
    drawText(ctx, text, textStyle, width, height);
    debouncedCompositeCanvas(compositeCanvas);
  }, [text, textStyle, width, height]);

  // Handle filters
  useEffect(() => {
    debouncedCompositeCanvas(compositeCanvas);
  }, [filters]);

  const drawText = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      text: string,
      style: typeof textStyle,
      width: number,
      height: number
    ) => {
      ctx.save();
      ctx.font = `${style.isItalic ? "italic" : ""} ${style.fontWeight} ${
        style.fontSize
      }px ${style.fontFamily}`;
      ctx.fillStyle = style.color;
      ctx.globalAlpha = style.opacity / 100;
      ctx.textAlign = "center";

      const lines = text.split("\n");
      const lineHeight = style.fontSize * style.lineHeight;
      const y = height / 2;

      lines.forEach((line, i) => {
        const metrics = ctx.measureText(line);
        const x = width / 2;
        const yPos = y - ((lines.length - 1) * lineHeight) / 2 + i * lineHeight;

        ctx.fillText(line, x, yPos);

        if (style.isUnderline || style.isStrikethrough) {
          ctx.beginPath();
          if (style.isUnderline) {
            ctx.moveTo(x - metrics.width / 2, yPos + 3);
            ctx.lineTo(x + metrics.width / 2, yPos + 3);
          }
          if (style.isStrikethrough) {
            ctx.moveTo(x - metrics.width / 2, yPos - style.fontSize / 4);
            ctx.lineTo(x + metrics.width / 2, yPos - style.fontSize / 4);
          }
          ctx.strokeStyle = style.color;
          ctx.stroke();
        }
      });
      ctx.restore();
    },
    []
  );

  const compositeCanvas = useCallback(() => {
    if (
      !canvasRef.current ||
      !backgroundLayerRef.current ||
      !textLayerRef.current
    )
      return;

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

    // 3. Draw text on top without filters
    ctx.filter = "none";
    ctx.drawImage(textLayerRef.current, 0, 0);
  }, [filters, width, height, backgroundColor]);

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
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    />
  );
}

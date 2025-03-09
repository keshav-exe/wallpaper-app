import { useEffect, useRef, useCallback, useMemo } from "react";
import { CircleProps } from "@/lib/constants";
import { generateRandomShape } from "@/lib/utils/shapes";
import "context-filter-polyfill";
import { debounce } from "@/lib/utils";
import { applyGrainEffect, applyVignetteEffect } from "@/lib/utils/effects";

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
    textShadow: {
      color: string;
      blur: number;
      offsetX: number;
      offsetY: number;
    };
  };
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
  effects,
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
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const lines = text.split("\n");
      const lineHeight = style.fontSize * style.lineHeight;

      // Calculate the total height of all lines
      const totalTextHeight = lines.length * lineHeight;

      // Start y position to center all text vertically in the canvas
      const startY = height / 2 - totalTextHeight / 2 + lineHeight / 2;

      // Draw shadow/glow first
      if (style.textShadow.blur > 0) {
        ctx.shadowColor = style.textShadow.color;
        ctx.shadowBlur = style.textShadow.blur;
        ctx.shadowOffsetX = style.textShadow.offsetX;
        ctx.shadowOffsetY = style.textShadow.offsetY;
        ctx.globalAlpha = style.opacity / 100;

        lines.forEach((line, i) => {
          const yPos = startY + i * lineHeight;

          // Apply letter spacing
          if (style.letterSpacing !== 0) {
            let totalWidth = 0;
            // First measure the total width with letter spacing
            for (let j = 0; j < line.length; j++) {
              const char = line[j];
              const metrics = ctx.measureText(char);
              totalWidth +=
                metrics.width + style.letterSpacing * style.fontSize;
            }
            // Adjust for the extra spacing after the last character
            totalWidth -= style.letterSpacing * style.fontSize;

            // Now draw each character with spacing
            let xPos = width / 2 - totalWidth / 2;
            for (let j = 0; j < line.length; j++) {
              const char = line[j];
              const metrics = ctx.measureText(char);
              ctx.fillStyle = style.textShadow.color;
              ctx.fillText(char, xPos + metrics.width / 2, yPos);
              xPos += metrics.width + style.letterSpacing * style.fontSize;
            }
          } else {
            // No letter spacing, draw the whole line at once
            const x = width / 2;
            ctx.fillStyle = style.textShadow.color;
            ctx.fillText(line, x, yPos);
          }
        });
      }

      // Reset shadow and draw main text
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = style.color;
      ctx.globalAlpha = style.opacity / 100;

      lines.forEach((line, i) => {
        const yPos = startY + i * lineHeight;

        // Apply letter spacing
        if (style.letterSpacing !== 0) {
          let totalWidth = 0;
          // First measure the total width with letter spacing
          for (let j = 0; j < line.length; j++) {
            const char = line[j];
            const metrics = ctx.measureText(char);
            totalWidth += metrics.width + style.letterSpacing * style.fontSize;
          }
          // Adjust for the extra spacing after the last character
          totalWidth -= style.letterSpacing * style.fontSize;

          // Now draw each character with spacing
          let xPos = width / 2 - totalWidth / 2;
          for (let j = 0; j < line.length; j++) {
            const char = line[j];
            const metrics = ctx.measureText(char);
            ctx.fillText(char, xPos + metrics.width / 2, yPos);
            xPos += metrics.width + style.letterSpacing * style.fontSize;
          }

          // Handle underline and strikethrough
          if (style.isUnderline || style.isStrikethrough) {
            ctx.beginPath();
            if (style.isUnderline) {
              ctx.moveTo(width / 2 - totalWidth / 2, yPos + style.fontSize / 4);
              ctx.lineTo(width / 2 + totalWidth / 2, yPos + style.fontSize / 4);
            }
            if (style.isStrikethrough) {
              ctx.moveTo(width / 2 - totalWidth / 2, yPos);
              ctx.lineTo(width / 2 + totalWidth / 2, yPos);
            }
            ctx.strokeStyle = style.color;
            ctx.stroke();
          }
        } else {
          // No letter spacing, draw the whole line at once
          const metrics = ctx.measureText(line);
          const x = width / 2;
          ctx.fillText(line, x, yPos);

          if (style.isUnderline || style.isStrikethrough) {
            ctx.beginPath();
            if (style.isUnderline) {
              ctx.moveTo(x - metrics.width / 2, yPos + style.fontSize / 4);
              ctx.lineTo(x + metrics.width / 2, yPos + style.fontSize / 4);
            }
            if (style.isStrikethrough) {
              ctx.moveTo(x - metrics.width / 2, yPos);
              ctx.lineTo(x + metrics.width / 2, yPos);
            }
            ctx.strokeStyle = style.color;
            ctx.stroke();
          }
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

    // 3. Apply film grain
    if (effects.grain > 0) {
      applyGrainEffect(ctx, effects.grain / 100);
    }

    // 4. Draw text
    ctx.filter = "none";
    ctx.drawImage(textLayerRef.current, 0, 0);

    // 5. Apply vignette
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

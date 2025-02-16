import { createNoise2D } from "simplex-noise";

export function applyGrainEffect(
  ctx: CanvasRenderingContext2D,
  intensity: number = 0.15
) {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;
  const noise2D = createNoise2D();

  // Reduced amplitude for Safari compatibility
  const scale = 1;
  const amplitude = 50; // Reduced from 200

  // Process every pixel without gaps
  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % ctx.canvas.width;
    const y = Math.floor(i / 4 / ctx.canvas.width);

    // Generate monochromatic noise
    const noise = noise2D(x * scale, y * scale) * (intensity * amplitude);

    // Apply noise as a darker overlay in Safari
    const grainValue = Math.max(-30, Math.min(30, noise)); // Limit the range

    // Darken pixels instead of brightening
    data[i] = Math.max(0, data[i] + grainValue); // R
    data[i + 1] = Math.max(0, data[i + 1] + grainValue); // G
    data[i + 2] = Math.max(0, data[i + 2] + grainValue); // B
  }

  ctx.putImageData(imageData, 0, 0);
}

export function applyVignetteEffect(
  ctx: CanvasRenderingContext2D,
  intensity: number = 0.7
) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  // Create a separate canvas for the vignette
  const vignetteCanvas = document.createElement("canvas");
  vignetteCanvas.width = w;
  vignetteCanvas.height = h;
  const vignetteCtx = vignetteCanvas.getContext("2d")!;

  const gradient = vignetteCtx.createRadialGradient(
    w / 2,
    h / 2,
    0,
    w / 2,
    h / 2,
    Math.max(w / 2, h / 2)
  );

  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.7, `rgba(0,0,0,${intensity * 0.5})`);
  gradient.addColorStop(1, `rgba(0,0,0,${intensity})`);

  vignetteCtx.fillStyle = gradient;
  vignetteCtx.fillRect(0, 0, w, h);

  // Apply vignette with multiply blend mode
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(vignetteCanvas, 0, 0);
  ctx.restore();
}

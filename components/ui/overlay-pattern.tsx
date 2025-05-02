import { cn } from "@/lib/utils";
import { useWallpaperStore } from "@/store/wallpaper";

interface OverlayPatternProps {
  className?: string;
  color?: string;
  borderColor?: string;
}

export function OverlayPattern({
  className,
  color = "#FF0000",
  borderColor = "#000000",
}: OverlayPatternProps) {
  const pattern = useWallpaperStore((state) => state.pattern);

  return (
    <div
      className={cn("absolute inset-0 z-10 mix-blend-overlay", className)}
      style={{
        opacity: pattern.opacity,
        background: `
          repeating-linear-gradient(
            ${pattern.rotation}deg,
            transparent,
            transparent ${pattern.transparentWidth}px,
            ${borderColor} ${pattern.transparentWidth}px,
            ${borderColor} ${pattern.transparentWidth + pattern.borderWidth1}px,
            ${color} ${pattern.transparentWidth + pattern.borderWidth1}px,
            ${color} ${
          pattern.transparentWidth +
          pattern.borderWidth1 +
          pattern.mainStripeWidth
        }px,
            ${borderColor} ${
          pattern.transparentWidth +
          pattern.borderWidth1 +
          pattern.mainStripeWidth
        }px,
            ${borderColor} ${pattern.stripeWidth}px
          )
        `,
      }}
    />
  );
}

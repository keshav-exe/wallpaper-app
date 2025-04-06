import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "./switch";

interface Position {
  x: number;
  y: number;
}

interface PositionControlProps {
  value: Position;
  onChange: (position: Position) => void;
  width: number;
  height: number;
  className?: string;
}

export function PositionControl({
  value,
  onChange,
  width,
  height,
  className,
}: PositionControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const GRID_SIZE = 20; // matches our background grid size

  // Calculate aspect ratio and dimensions
  const aspectRatio = width / height;
  const isWide = aspectRatio > 1;

  const containerStyle = isWide
    ? {
        width: "100%",
        height: `${(1 / aspectRatio) * 100}%`,
        aspectRatio: aspectRatio,
      }
    : {
        width: `${aspectRatio * 100}%`,
        height: "100%",
        aspectRatio: aspectRatio,
      };

  // Convert absolute coordinates to relative (-1 to 1)
  const absoluteToRelative = (x: number, y: number): Position => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    const relX = ((x - rect.left) / rect.width) * 2 - 1;
    const relY = ((y - rect.top) / rect.height) * 2 - 1;

    let newX = Math.max(-1, Math.min(1, relX)) * (width / 2);
    let newY = Math.max(-1, Math.min(1, relY)) * (height / 2);

    if (snapToGrid) {
      // Convert to grid space
      const gridStepX = width / 2 / (rect.width / GRID_SIZE);
      const gridStepY = height / 2 / (rect.height / GRID_SIZE);

      // Snap to nearest grid point
      newX = Math.round(newX / gridStepX) * gridStepX;
      newY = Math.round(newY / gridStepY) * gridStepY;
    }

    return { x: newX, y: newY };
  };

  // Handle mouse/touch events
  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const pos = absoluteToRelative(e.clientX, e.clientY);
    onChange(pos);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, snapToGrid]);

  // Convert relative position back to pixel coordinates for the handle
  const handlePosition = {
    left: `${((value.x / (width / 2) + 1) / 2) * 100}%`,
    top: `${((value.y / (height / 2) + 1) / 2) * 100}%`,
  };

  return (
    <div
      className={
        "relative w-full flex flex-col pb-32 lg:pb-0 gap-6 lg:min-h-[20vh] lg:max-h-[35vh] h-full"
      }
    >
      <div className="flex items-center justify-between w-full">
        <h4 className="text-sm text-muted-foreground">Position</h4>
        <div className="flex items-center gap-2">
          <label
            htmlFor="snap-grid"
            className="text-xs text-muted-foreground cursor-pointer"
          >
            Snap to Grid
          </label>
          <Switch
            checked={snapToGrid}
            onCheckedChange={setSnapToGrid}
            id="snap-grid"
          />
        </div>
      </div>
      <div
        ref={containerRef}
        className={cn(
          "relative rounded-xl bg-secondary border border-primary/10 flex mx-auto scale-95 hover:scale-100 transition-all duration-300 ease-[cubic-bezier(0.45, 0.05, 0.55, 0.95)] hover:border-primary/20",
          className
        )}
        onPointerDown={(e) => {
          setIsDragging(true);
          const pos = absoluteToRelative(e.clientX, e.clientY);
          onChange(pos);
        }}
        style={{
          ...containerStyle,
          backgroundImage:
            "radial-gradient(circle at center, hsl(var(--foreground) / 0.1) 1px, transparent 1px)",
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
      >
        <div
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary cursor-grab active:cursor-grabbing"
          style={handlePosition}
        />
      </div>
    </div>
  );
}

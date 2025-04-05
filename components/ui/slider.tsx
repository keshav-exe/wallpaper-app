"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    label: string;
    valueSubtext?: string;
  }
>(({ className, label, valueSubtext, ...props }, ref) => (
  <div className="relative overflow-hidden">
    <label className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground text-sm font-medium z-10">
      {label}
    </label>
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center overflow-clip z-10",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-10 w-full grow rounded-xl border border-foreground/10 bg-foreground/5">
        <SliderPrimitive.Range className="absolute h-full hidden" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-8 w-2 rounded-full bg-foreground/20 shadow transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/80 text-sm font-medium">
      {valueSubtext ? `${props.value}${valueSubtext}` : props.value}
    </span>
  </div>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

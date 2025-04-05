import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm relative cursor-pointer transition-all duration-300 rounded-xl border border-primary/10 bg-foreground/5 hover:bg-primary/10 backdrop-blur-md w-full disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/20 transition-all duration-300 ease-[cubic-bezier(0.45, 0.05, 0.55, 0.95)]",
  {
    variants: {
      variant: {
        default: "text-foreground",
        accent:
          "bg-secondary-foreground hover:bg-secondary-foreground/80 text-secondary",
        destructive:
          "bg-destructive/50 text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-foreground/10 hover:text-accent-foreground border-none bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-600/50 text-white hover:bg-green-600/90",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1.5",
        lg: "px-3 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

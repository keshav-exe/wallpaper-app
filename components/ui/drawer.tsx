"use client";

import { cn } from "@/lib/utils";
import { Drawer } from "vaul";

export default function VaulDrawer({
  children,
  title,
  direction = "left",
  className,
  isOpen,
  setIsOpen,
  showHandle = false,
}: {
  children: React.ReactNode;
  title: string;
  direction?: "left" | "right" | "top" | "bottom";
  className?: string;
  showHandle?: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Drawer.Root
      direction={direction}
      open={isOpen}
      onOpenChange={setIsOpen}
      repositionInputs={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Drawer.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 outline-none z-50 bg-secondary",
            className
          )}
        >
          {showHandle && (
            <div className="py-2 bg-secondary rounded-t-lg">
              <Drawer.Handle />
            </div>
          )}
          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

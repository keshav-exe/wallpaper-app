"use client";

import { Drawer } from "vaul";

export default function VaulDrawer({
  children,
  trigger,
  title,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title: string;
}) {
  return (
    <Drawer.Root direction="left">
      <Drawer.Trigger className="focus:outline-hidden focus:ring-0">
        {trigger}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="min-h-screen fixed top-0 bottom-0 left-0 rounded-r-2xl right-0 outline-none">
          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          <div className="p-4 bg-background h-full">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

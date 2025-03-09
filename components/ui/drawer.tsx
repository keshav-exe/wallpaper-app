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
    <Drawer.Root>
      <Drawer.Trigger>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-background h-fit fixed bottom-0 left-0 right-0 outline-none">
          <div className="py-4">
            <Drawer.Handle />
          </div>
          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          <div className="p-4 bg-background pb-8">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

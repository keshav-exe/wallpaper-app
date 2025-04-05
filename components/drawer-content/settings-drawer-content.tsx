import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { ThemeSwitch } from "../ui/themeSwitch";
import logo from "@/public/logo.svg";
export default function SettingsDrawerContent({
  setIsSettingsOpen,
}: {
  setIsSettingsOpen: (isSettingsOpen: boolean) => void;
}) {
  return (
    <div className="flex flex-col h-full bg-secondary overflow-y-auto no-scrollbar rounded-2xl relative">
      <div className="flex items-center justify-between p-2 border-b border-primary/10 bg-secondary w-full sticky top-0">
        <Image
          src={logo}
          alt="logo"
          className="size-10"
          priority
          loading="eager"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSettingsOpen(false)}
          className="rounded-xl"
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-col w-full h-full p-2 justify-between">
        <p className="text-sm text-foreground">
          Welcome to Gradii, a simple gradient generator tool made by designer
          for designers to create stunning gradients with customizable colors,
          text, and effects. Use it for your designs, wallpapers, presentations,
          social assets or mockups or just for fun.
        </p>
        <ThemeSwitch />
      </div>
    </div>
  );
}

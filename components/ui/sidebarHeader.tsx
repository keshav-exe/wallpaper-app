import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowRightIcon,
  BrushIcon,
  DownloadIcon,
  PaletteIcon,
  WandSparklesIcon,
} from "lucide-react";
import Link from "next/link";
import logo from "@/public/logo.svg";
import Image from "next/image";
import gradientWallpaper from "@/public/gradient-wall.png";
import { motion } from "motion/react";
import { IMAGES } from "@/assets";
import Marquee from "./marquee";
import { Button } from "./button";
import { useEffect, useState } from "react";

export function SidebarHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenDialog = localStorage.getItem("hasSeenGradiiDialog");
    if (!hasSeenDialog) {
      setOpen(true);
      localStorage.setItem("hasSeenGradiiDialog", "true");
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-between w-full outline-none focus:outline-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="logo"
                className="size-8"
                priority
                loading="eager"
              />
              <p className="font-bold text-primary tracking-tighter text-xl">
                Gradii
              </p>
            </div>
            <span className="text-[10px] text-primary font-semibold border-primary/50 border px-2 py-1 rounded-full tracking-tighter">
              v0.2 ALPHA
            </span>
          </div>
          <span className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300">
            <ArrowRightIcon className="size-4" />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl border-none !rounded-3xl h-[95vh]">
        <DialogTitle className="sr-only">Gradii</DialogTitle>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            type: "spring",
            damping: 20,
            stiffness: 100,
            mass: 0.5,
          }}
          className="flex flex-col gap-4 overflow-auto no-scrollbar rounded-2xl"
        >
          <section className="flex items-center gap-6 justify-center flex-col rounded-2xl p-4 relative overflow-hidden min-h-[50%]">
            <div className="flex flex-col items-center gap-4 z-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Image src={logo} alt="logo" className="size-10" />
                  <p className="font-bold text-white text-4xl tracking-tighter">
                    Gradii
                  </p>
                </div>
                <span className="text-[10px] text-white bg-gradient-to-b font-semibold border-white/50 border px-2 py-1 rounded-full tracking-tighter">
                  v0.2 ALPHA
                </span>
              </div>
              <p className="text-white text-center max-w-sm">
                Generate beautiful gradient wallpapers with customizable colors,
                text, and effects.
              </p>
              <DialogClose asChild>
                <Button className="rounded-full">Generate Now!</Button>
              </DialogClose>
            </div>
            <Image
              src={gradientWallpaper}
              alt="gradient"
              className="absolute bottom-0 right-0 inset-0 w-full h-full"
            />
          </section>

          <section className="w-full">
            <div className="grid grid-cols-2 gap-2 w-full rounded-2xl">
              <div className="flex flex-col rounded-2xl p-4 bg-[#3B82F6]/5 gap-8 hover:bg-[#3B82F6]/10 transition-colors duration-300">
                <WandSparklesIcon className="size-6 text-[#3B82F6]" />
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold tracking-tighter">
                    Elegant Gradients
                  </h2>
                  <p className="text-sm">
                    Create gradients of infinite possibilities with up to 8
                    custom colors. Additional colors coming soon!
                  </p>
                </div>
              </div>
              <div className="flex flex-col rounded-2xl p-4 bg-[#FF0080]/5 gap-8 hover:bg-[#FF0080]/10 transition-colors duration-300">
                <BrushIcon className="size-6 text-[#FF0080]" />
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold tracking-tighter">
                    Customizable text
                  </h2>
                  <p className="text-sm">
                    Add customizable text with various fonts and styles. With
                    more fonts coming soon!
                  </p>
                </div>
              </div>
              <div className="flex flex-col rounded-2xl p-4 bg-[#F5A623]/5 gap-8 hover:bg-[#F5A623]/10 transition-colors duration-300">
                <PaletteIcon className="size-6 text-[#F5A623]" />
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold tracking-tighter">
                    Cool Filters.
                  </h2>
                  <p className="text-sm">
                    Fine tune your wallpapers to your liking with noise, grain,
                    static effects and other filters. More filters coming soon!
                  </p>
                </div>
              </div>
              <div className="flex flex-col rounded-2xl p-4 bg-[#00DFD8]/5 gap-8 hover:bg-[#00DFD8]/10 transition-colors duration-300">
                <DownloadIcon className="size-6 text-[#00DFD8]" />
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold tracking-tighter">
                    8K Wallpapers.
                  </h2>
                  <p className="text-sm">
                    Download your custom wallpapers in up to 8k resolutions in
                    16:9 aspect ratio. Additional resolutions and aspect ratios
                    coming soon!
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="relative flex w-full h-[250px] items-center justify-center overflow-hidden rounded-2xl flex-shrink-0">
            <Marquee className="[--duration:20s]">
              {[IMAGES.tweet1, IMAGES.tweet2, IMAGES.tweet3, IMAGES.tweet4].map(
                (image, i) => (
                  <div key={i} className="h-[250px]">
                    <Image
                      src={image}
                      alt={`tweet ${i + 1}`}
                      className="h-full w-auto object-contain rounded-2xl"
                    />
                  </div>
                )
              )}
            </Marquee>
          </section>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Note:</span> Gradii is currently
              in alpha (v0.2) and only supports Chromium-based browsers on
              desktop. I&apos;m actively working on expanding compatibility to
              all major browsers and devices. More features are coming soon!
            </p>
          </div>

          <p className="text-sm text-muted-foreground mx-auto">
            Found a bug or have feedback? Feel free to{" "}
            <Link
              href="https://x.com/kshvbgde"
              target="_blank"
              className="text-primary hover:underline"
            >
              DM me on X
            </Link>
            .
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

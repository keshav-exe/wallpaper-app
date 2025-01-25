import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BrushIcon,
  DownloadIcon,
  InfoIcon,
  PaletteIcon,
  WandSparklesIcon,
} from "lucide-react";
import Link from "next/link";
import logo from "@/public/logo.svg";
import Image from "next/image";
import gradientWallpaper from "@/public/gradii-logo.png";
import { motion } from "motion/react";
import { IMAGES } from "@/assets";
import Marquee from "./marquee";
import { useEffect, useState } from "react";

const CURRENT_VERSION = "0.3";

export function SidebarHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Clean up ALL old version keys
    const cleanupOldVersions = () => {
      const oldVersions = ["0.1", "0.2", "0.3"];
      oldVersions.forEach((version) => {
        localStorage.removeItem(`gradiiLastSeenVersion_${version}`);
      });
      localStorage.removeItem("hasSeenGradiiDialog"); // Remove the very old key too
    };

    cleanupOldVersions();

    const lastSeenVersion = localStorage.getItem("gradiiLastSeenVersion");
    if (!lastSeenVersion || lastSeenVersion !== CURRENT_VERSION) {
      setOpen(true);
      localStorage.setItem("gradiiLastSeenVersion", CURRENT_VERSION);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-between w-full outline-hidden focus:outline-hidden group">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Image
                src={logo}
                alt="logo"
                className="size-8"
                priority
                loading="eager"
              />
              <p className="text-lg font-bold tracking-tighter">Gradii</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300 p-2">
            <InfoIcon className="size-4" />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl border-none rounded-2xl! h-[95vh]">
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
            <Image
              src={gradientWallpaper}
              alt="gradient"
              className="absolute bottom-0 right-0 inset-0 w-full h-full object-cover"
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
                    custom colors and background images.
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
                    Add customizable text with various fonts and styles.
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
                    static effects and other filters.
                  </p>
                </div>
              </div>
              <div className="flex flex-col rounded-2xl p-4 bg-[#00DFD8]/5 gap-8 hover:bg-[#00DFD8]/10 transition-colors duration-300">
                <DownloadIcon className="size-6 text-[#00DFD8]" />
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold tracking-tighter">
                    4K Wallpapers.
                  </h2>
                  <p className="text-sm">
                    Download your custom wallpapers in up to 4k resolutions in
                    desktop, mobile and square aspect ratios.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="relative flex w-full h-[250px] items-center justify-center overflow-hidden rounded-2xl shrink-0">
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

          <section className="flex flex-col gap-4 p-4 rounded-2xl bg-muted/50">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold tracking-tighter">
                What&apos;s New in v0.4 ALPHA 👀 ✨
              </h2>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
              <li>Upgraded to Tailwind v4</li>
              <li>Better UX</li>
              <li>Cleaner codebase</li>
            </ul>
          </section>

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

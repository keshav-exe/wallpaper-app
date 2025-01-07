import {
  WandSparklesIcon,
  BrushIcon,
  PaletteIcon,
  DownloadIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import gradientWallpaper from "@/public/gradii-logo.png";
import { IMAGES } from "@/assets";
import Marquee from "../ui/marquee";
import Link from "next/link";
export default function MobileUI() {
  return (
    <main className="flex items-center justify-center p-4 relative">
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
        <section className="flex items-center gap-6 justify-center flex-col rounded-2xl p-4 relative overflow-hidden min-h-[35vh]">
          <Image
            src={gradientWallpaper}
            alt="gradient"
            className="absolute bottom-0 right-0 inset-0 w-full h-full object-cover"
          />
        </section>

        <section className="w-full">
          <div className="grid lg:grid-cols-2 gap-2 w-full rounded-2xl">
            <div className="flex flex-col rounded-2xl p-4 bg-[#3B82F6]/5 gap-8 hover:bg-[#3B82F6]/10 transition-colors duration-300">
              <WandSparklesIcon className="size-6 text-[#3B82F6]" />
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold tracking-tighter">
                  Elegant Gradients
                </h2>
                <p className="text-sm">
                  Create gradients of infinite possibilities with up to 8 custom
                  colors or upload your own background image.
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
                  Add customizable text with various fonts, styles and
                  decoration.
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

        <section className="flex flex-col gap-4 p-4 rounded-2xl bg-muted/50">
          <h2 className="text-lg font-semibold tracking-tighter">
            What&apos;s New in v0.3 ALPHA
          </h2>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
            <li>Safari browser compatibility</li>
            <li>Added more fonts to select from</li>
            <li>Text decoration support (Underline, Strikethrough)</li>
            <li>Multiple aspect ratio support (Desktop, Mobile, Square)</li>
            <li>Upload background images to create gradients</li>
            <li>Performance improvements</li>
          </ul>
        </section>

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Note:</span> Gradii is currently in
            alpha (v0.3) and only supports desktop. I&apos;m actively working on
            expanding compatibility to mobile devices. More features are coming
            soon!
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
    </main>
  );
}

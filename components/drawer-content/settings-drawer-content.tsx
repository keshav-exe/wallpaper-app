import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { ThemeSwitch } from "../ui/themeSwitch";
import logo from "@/public/logo.svg";
import GithubIcon from "@/lib/icons/github";
import Link from "next/link";
import { motion } from "motion/react";
import TwitterIcon from "@/lib/icons/twitter";
export default function SettingsDrawerContent({
  setIsSettingsOpen,
}: {
  setIsSettingsOpen: (isSettingsOpen: boolean) => void;
}) {
  return (
    <div className="flex flex-col h-full bg-secondary overflow-y-auto no-scrollbar rounded-2xl relative">
      <div className="flex items-center justify-between p-2 border-b border-primary/10 bg-secondary w-full sticky top-0 z-10">
        <Link
          href="https://github.com/keshav-exe/wallpaper-app"
          target="_blank"
        >
          <Button variant="accent">
            <GithubIcon className=" size-4" />
            Give us a star
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSettingsOpen(false)}
          className="rounded-xl"
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-col w-full h-full p-2">
        <ThemeSwitch />

        <div className="rounded-2xl bg-foreground/5 p-4 border border-primary/10 flex flex-col justify-between min-h-80">
          <motion.div
            animate={{
              y: [-5, 5],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Image
              src={logo}
              alt="logo"
              className="size-28 my-2"
              priority
              loading="eager"
            />
          </motion.div>
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-semibold flex items-center gap-2 tracking-tight">
              Welcome to Gradii
              <span className="text-xs rounded-full bg-primary/10 px-2 py-1 w-fit">
                BETA
              </span>
            </h5>

            <p className="text-sm text-foreground tracking-tight">
              Gradii is a simple gradient generator tool made by designer for
              designers to create stunning gradients with customizable colors,
              text, and effects.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between border border-primary/10 rounded-2xl p-4 bg-foreground/5 min-h-40">
          <TwitterIcon className="size-6" />
          <h5 className="font-medium tracking-tight">
            Enjoying <span className="font-bold">Gradii</span>? Share your
            experience on X/Twitter
          </h5>
        </div>
      </div>
    </div>
  );
}

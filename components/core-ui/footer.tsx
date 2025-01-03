"use client";

import AnimatedGradient from "@/components/ui/animatedGradient";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

export default function Footer() {
  const { scrollYProgress } = useScroll();

  return (
    <footer className="w-full p-4 md:p-8 items-center justify-center h-full overflow-hidden z-30 max-w-7xl mx-auto">
      <motion.div
        className="sticky z-30 bottom-0 bg-[#3B82F6] rounded-[36px] left-0 w-full h-80 flex justify-center items-center overflow-hidden"
        style={{
          scale: useTransform(scrollYProgress, [0.2, 0.4], [1, 1]),
        }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          type: "spring",
          damping: 20,
          stiffness: 100,
          mass: 0.5,
        }}
        viewport={{ amount: 0.5 }}
      >
        <AnimatedGradient
          colors={["#3B82F6", "#A78BFA", "#3B82F6", "#60A5FA", "#0F2F65"]}
          speed={0.1}
          blur="heavy"
        />
        <div className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12 text-white">
          <div className="flex flex-row space-x-12 sm:pace-x-16  md:space-x-24 text-sm sm:text-lg md:text-xl">
            <ul>
              <li className="hover:underline cursor-pointer">
                <Link href="https://blog.keshavbagaade.com" target="_blank">
                  cool asf blogs
                </Link>
              </li>{" "}
              <li className="hover:underline cursor-pointer">
                <Link href="https://chirp.wtf" target="_blank">
                  cool asf social media
                </Link>
              </li>
              <li className="hover:underline cursor-pointer">
                <Link href="https://prithvi.keshavbagaade.com" target="_blank">
                  cool asf yt clone
                </Link>
              </li>
              <li className="hover:underline cursor-pointer">
                <Link href="https://kshitij.keshavbagaade.com" target="_blank">
                  cool asf summarizer
                </Link>
              </li>
            </ul>
            <ul>
              <li className="hover:underline cursor-pointer">
                <Link href="https://x.com/kshvbgde" target="_blank">
                  X (Twitter)
                </Link>
              </li>
              <li className="hover:underline cursor-pointer">
                <Link href="https://github.com/keshav-exe" target="_blank">
                  Github
                </Link>
              </li>
              <li className="hover:underline cursor-pointer">
                <Link
                  href="https://linkedin.com/in/keshavbagaade"
                  target="_blank"
                >
                  Linkedin
                </Link>
              </li>
            </ul>
          </div>
          <Link
            href="https://keshavbagaade.com"
            target="_blank"
            className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[128px] text-white font-extrabold tracking-tighter"
          >
            KSHV.
          </Link>
        </div>
      </motion.div>
    </footer>
  );
}

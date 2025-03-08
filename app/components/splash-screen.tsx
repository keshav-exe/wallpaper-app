"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/public/logo.svg";

export function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          bounce: 0,
          ease: "cubic-bezier[0.08,0.82,0.17,1]",
        }}
      >
        <Image src={logo} alt="Gradii" className="size-24" priority />
      </motion.div>
    </motion.div>
  );
}

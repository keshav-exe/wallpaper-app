import Image from "next/image";
import logo from "@/public/logo.svg";
import AnimatedGradient from "@/components/ui/animatedGradient";

export default function MobileUI() {
  return (
    <main className="flex h-screen w-screen items-center justify-center text-center p-4 relative">
      <div className="flex flex-col gap-12 items-center justify-center p-8 relative max-w-6xl mx-auto w-full h-auto aspect-video rounded-3xl overflow-hidden bg-[#3B82F6]">
        <AnimatedGradient
          colors={["#3B82F6", "#A78BFA", "#3B82F6", "#60A5FA", "#0F2F65"]}
          speed={0.1}
          blur="heavy"
        />
        <div className="flex flex-col gap-4 items-center justify-center z-10">
          <h1 className="text-3xl font-bold tracking-tighter text-white">
            🤕 Device/Browser Unavailable
          </h1>
          <p className="text-lg max-w-lg font-medium tracking-tighter text-white">
            This app only supports Chrome and other Chromium-based browsers and
            is currently available only on desktops. I&apos;m actively working
            on expanding compatibility on mobile devices and other browsers.
          </p>
        </div>
        <div className="flex items-center gap-4 z-10">
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
      </div>
    </main>
  );
}

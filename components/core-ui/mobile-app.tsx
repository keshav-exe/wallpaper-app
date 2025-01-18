import Image from "next/image";
import logo from "@/public/logo.svg";

export default function MobileApp() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center gap-4 flex-col">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            className="size-9"
            priority
            loading="eager"
          />
          <p className="font-bold text-primary tracking-tighter text-3xl">
            Gradii
          </p>
        </div>
        <h1 className="text-primary/80 tracking-tighter text-xl">
          Mobile app coming soon!
        </h1>
      </div>
    </main>
  );
}

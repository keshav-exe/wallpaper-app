import { Metadata } from "next";
import "./globals.css";
import { onest } from "@/lib/fonts";
import Footer from "@/components/core-ui/footer";

export const metadata: Metadata = {
  title: "Create your own gradient wallpapers - GradientWalls",
  description:
    "A simple gradient generator for your walls. add your own colors or use one of our presets. Texts are also supported.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${onest.variable} antialiased min-h-screen bg-background`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}

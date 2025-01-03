import "./globals.css";
import { onest } from "@/lib/fonts";
import Footer from "@/components/core-ui/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Create your own gradient wallpapers - GradientWalls",
  description:
    "A simple gradient generator for your walls. Add your own colors or use one of our presets. Texts are also supported.",
  metadataBase: new URL("https://gradientwalls.keshavbagaade.com"),
  keywords: [
    "gradient",
    "wallpaper",
    "generator",
    "design",
    "background",
    "colors",
  ],
  authors: [{ name: "Keshav Bagaade", url: "https://keshavbagaade.com" }],
  creator: "Keshav Bagaade",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gradientwalls.keshavbagaade.com",
    title: "Create your own gradient wallpapers - GradientWalls",
    description:
      "A simple gradient generator for your walls. Add your own colors or use one of our presets. Texts are also supported.",
    siteName: "GradientWalls",
    images: [
      {
        url: "https://i.ibb.co/sjgMRkz/16x9.png",
        width: 1200,
        height: 630,
        alt: "GradientWalls Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create your own gradient wallpapers - GradientWalls",
    description:
      "A simple gradient generator for your walls. Add your own colors or use one of our presets. Texts are also supported.",
    creator: "@kshvbgde",
    images: ["https://i.ibb.co/sjgMRkz/16x9.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}

import "./globals.css";
import { onest } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Gradii - Generate your own gradient wallpapers",
  description:
    "A simple gradient generator for your walls. Add your own colors or use one of our presets. Texts are also supported.",
  metadataBase: new URL("https://gradii.keshavbagaade.com"),
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
    url: "https://gradii.keshavbagaade.com",
    title: "Gradii - Generate your own gradient wallpapers",
    description:
      "A simple gradient generator for your walls. Add your own colors or use one of our presets. Texts are also supported.",
    siteName: "Gradii",
    images: [
      {
        url: "https://i.ibb.co/GCY3FGg/gradii-og.png",
        width: 1200,
        height: 630,
        alt: "Gradii Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradii - Generate your own gradient wallpapers",
    description:
      "A simple gradient generator for your walls. Add your own colors or use one of our presets. Texts are also supported.",
    creator: "@kshvbgde",
    images: ["https://i.ibb.co/GCY3FGg/gradii-og.png"],
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
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors closeButton />
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { onest } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Gradii - Generate Beautiful Gradients",
  description:
    "A simple gradient generator tool made by designer for designers to create stunning gradients with customizable colors, text, and effects. Use it for your designs, wallpapers, presentations, or mockups or just for fun.",
  metadataBase: new URL("https://gradii.fun"),
  keywords: [
    // Core Features
    "gradient generator",
    "gradient maker",
    "gradient creator",
    "gradient design tool",
    "gradient background maker",
    "gradient wallpaper creator",

    // Types & Use Cases
    "desktop wallpaper",
    "mobile wallpaper",
    "4K wallpaper",
    "custom wallpaper",
    "background generator",
    "website background",
    "presentation background",
    "social media background",

    // Technical Features
    "canvas effects",
    "grain effect",
    "vignette effect",
    "text effects",
    "color palette",
    "color picker",
    "hex color",
    "aspect ratio",
    "high resolution",
    "image filters",

    // Formats & Quality
    "HD wallpaper",
    "2K wallpaper",
    "4K resolution",
    "16:9 wallpaper",
    "9:16 wallpaper",
    "square wallpaper",

    // Descriptors
    "beautiful gradients",
    "modern gradients",
    "professional backgrounds",
    "custom design",
    "online tool",
    "free",
    "web-based",
    "browser-based",
    "no download required",
    "no installation required",
    "no signup required",
    "no login required",
    "no email required",
    "no password required",
    "no signup required",

    // Design Related
    "design tool",
    "graphic design",
    "web design",
    "UI design",
    "design resources",
    "design assets",
  ],
  authors: [{ name: "Keshav Bagaade", url: "https://keshavbagaade.com" }],
  creator: "Keshav Bagaade",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gradii.fun",
    title: "Gradii - Generate Beautiful Gradients",
    description:
      "A simple gradient generator tool made by designer for designers to create stunning gradients with customizable colors, text, and effects. Use it for your designs, wallpapers, presentations, or mockups or just for fun.",
    siteName: "Gradii",
    images: [
      {
        url: "https://i.ibb.co/xqWH5rCg/gradii-v5-og.png",
        width: 1200,
        height: 630,
        alt: "Gradii - Gradient Wallpaper Generator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradii - Generate Beautiful Gradients",
    description:
      "A simple gradient generator tool made by designer for designers to create stunning gradients with customizable colors, text, and effects. Use it for your designs, wallpapers, presentations, or mockups or just for fun.",
    creator: "@kshvbgde",
    images: ["https://i.ibb.co/xqWH5rCg/gradii-v5-og.png"],
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
  verification: {
    google: "your-google-site-verification", // Add your verification code
  },
  alternates: {
    canonical: "https://gradii.fun",
  },
  category: "Design Tools",
  applicationName: "Gradii",
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
          <Toaster
            richColors
            position="top-center"
            style={{ borderRadius: "24px" }}
          />
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}

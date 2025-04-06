import "./globals.css";
import { onest } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SplashScreenWrapper } from "@/app/components/splash-screen-wrapper";

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
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradii - Generate Beautiful Gradients",
    description:
      "A simple gradient generator tool made by designer for designers to create stunning gradients with customizable colors, text, and effects. Use it for your designs, wallpapers, presentations, or mockups or just for fun.",
    creator: "@kshvbgde",
    images: ["/opengraph-image.png"],
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    themeColor: "transparent",
    title: "Gradii",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="a6c56611-b58e-4db6-96b2-de9da8d17529"
        ></script>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#09090b"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Gradii" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
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
          <SplashScreenWrapper>{children}</SplashScreenWrapper>
          <Toaster position="top-center" />
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}

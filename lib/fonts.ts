import {
  Bricolage_Grotesque,
  Space_Mono,
  Space_Grotesk,
  Manrope,
  Poppins,
  Montserrat,
  Onest,
  Instrument_Serif,
  Inter,
  DM_Serif_Display,
  Lora,
  Geist,
  Ms_Madi,
} from "next/font/google";

// Sans-serif fonts
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

// Serif fonts
export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  weight: ["400"],
});

export const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

export const msMadi = Ms_Madi({
  subsets: ["latin"],
  variable: "--font-ms-madi",
  weight: ["400"],
});

// Monospace fonts
export const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

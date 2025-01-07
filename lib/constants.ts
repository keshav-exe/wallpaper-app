export interface CircleProps {
  color: string;
  cx: number;
  cy: number;
  r?: string;
}

export interface FontOption {
  name: string;
  variable: boolean;
  weights: number[];
}

export interface Position {
  name: string;
  class: string;
}

export const INITIAL_COLORS = [
  "#FF0080", // Pink
  "#7928CA", // Purple
  "#0070F3", // Blue
  "#00DFD8", // Cyan
  "#F5A623", // Orange
  "#FF4D4D", // Red
  "#F472B6", // Pink
  "#6366F1", // Violet
];

export const INITIAL_BACKGROUND_COLORS = [
  "#FFF0F7", // Ultra Light Pink
  "#F7F0FF", // Ultra Light Purple
  "#F0F7FF", // Ultra Light Blue
  "#F0FFFD", // Ultra Light Cyan
  "#FFF7F0", // Ultra Light Orange
  "#FFF0F0", // Ultra Light Red
  "#FFF0F7", // Ultra Light Pink
  "#F0F0FF", // Ultra Light Violet

  "#1A0D13", // Dark Pink (5% lightness)
  "#130D1A", // Dark Purple
  "#0D131A", // Dark Blue
  "#0D1A19", // Dark Cyan
  "#1A130D", // Dark Orange
  "#1A0D0D", // Dark Red
  "#1A0D13", // Dark Pink
  "#0D0D1A", // Dark Violet
];

export const FONTS: FontOption[] = [
  {
    name: "Onest",
    variable: true,
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Bricolage Grotesque",
    variable: true,
    weights: [200, 300, 400, 500, 600, 700, 800],
  },
  { name: "Space Mono", variable: false, weights: [400, 700] },
  {
    name: "Space Grotesk",
    variable: true,
    weights: [300, 400, 500, 600, 700],
  },
  {
    name: "Manrope",
    variable: true,
    weights: [200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: "Poppins",
    variable: false,
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Instrument Serif",
    variable: false,
    weights: [400],
  },
  {
    name: "Inter",
    variable: true,
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "DM Serif Display",
    variable: false,
    weights: [400],
  },
  {
    name: "Lora",
    variable: true,
    weights: [400, 500, 600, 700],
  },
];

export const FILTER_SVG_PATTERNS = {
  pastel: `
    <svg viewBox="0 0 200 200" xmlns='http://www.w3.org/2000/svg'>
      <filter id='noiseFilter'>
        <feTurbulence 
          type='fractalNoise' 
          baseFrequency='1.5' 
          numOctaves='3' 
          stitchTiles='stitch'/>
        <feColorMatrix type="saturate" values="0"/>
        <feBlend mode='overlay' in2='SourceGraphic'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
    </svg>
  `,
  film: `
    <svg viewBox="0 0 200 200" xmlns='http://www.w3.org/2000/svg'>
      <filter id='noiseFilter'>
        <feTurbulence 
          type='fractalNoise' 
          baseFrequency='1.2' 
          numOctaves='3' 
          seed='2'
          stitchTiles='stitch'/>
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues="0 .01 .02 .03 .04 .05 .06 .07 .08 .09 1"/>
          <feFuncG type="discrete" tableValues="0 .01 .02 .03 .04 .05 .06 .07 .08 .09 1"/>
          <feFuncB type="discrete" tableValues="0 .01 .02 .03 .04 .05 .06 .07 .08 .09 1"/>
        </feComponentTransfer>
      </filter>
      <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
    </svg>
  `,
  grain: `
    <svg viewBox="0 0 200 200" xmlns='http://www.w3.org/2000/svg'>
      <filter id='noiseFilter'>
        <feTurbulence 
          type='turbulence' 
          baseFrequency='0.8' 
          numOctaves='4' 
          seed='5'
          stitchTiles='stitch'/>
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer>
          <feFuncR type="gamma" amplitude="0.8" exponent="1"/>
          <feFuncG type="gamma" amplitude="0.8" exponent="1"/>
          <feFuncB type="gamma" amplitude="0.8" exponent="1"/>
        </feComponentTransfer>
      </filter>
      <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
    </svg>
  `,
  static: `
    <svg viewBox="0 0 200 200" xmlns='http://www.w3.org/2000/svg'>
      <filter id='noiseFilter'>
        <feTurbulence 
          type='fractalNoise' 
          baseFrequency='2' 
          numOctaves='5' 
          seed='10'
          stitchTiles='stitch'/>
        <feColorMatrix type="saturate" values="0"/>
        <feConvolveMatrix order="3" kernelMatrix="1 -1 1 -1 1 -1 1 -1 1"/>
      </filter>
      <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
    </svg>
  `,
  pixelate: `
    <svg viewBox="0 0 200 200" xmlns='http://www.w3.org/2000/svg'>
      <filter id='pixelate'>
        <feFlood x="0" y="0" width="100%" height="100%" />
        <feImage xlink:href="#source" result="img"/>
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues="0 .5 1 1"/>
          <feFuncG type="discrete" tableValues="0 .5 1"/>
          <feFuncB type="discrete" tableValues="0"/>
        </feComponentTransfer>
      </filter>
      <rect width='100%' height='100%' filter='url(#pixelate)'/>
    </svg>
  `,
} as const;

export const RESOLUTIONS = [
  // Desktop (16:9)
  { name: "HD", width: 1920, height: 1080, scale: "1", ratio: "desktop" },
  { name: "2K", width: 2560, height: 1440, scale: "2", ratio: "desktop" },
  { name: "4K", width: 3840, height: 2160, scale: "3", ratio: "desktop" },

  // Mobile (9:16)
  { name: "Mobile HD", width: 1080, height: 1920, scale: "1", ratio: "mobile" },
  { name: "Mobile 2K", width: 1440, height: 2560, scale: "2", ratio: "mobile" },
  { name: "Mobile 4K", width: 2160, height: 3840, scale: "3", ratio: "mobile" },

  // Square (1:1)
  { name: "Square HD", width: 1080, height: 1080, scale: "1", ratio: "square" },
  { name: "Square 2K", width: 1440, height: 1440, scale: "2", ratio: "square" },
  { name: "Square 4K", width: 2160, height: 2160, scale: "3", ratio: "square" },
] as const;

export const BLUR_OPTIONS = [
  { name: "None", value: 0 },
  { name: "Low", value: 100 },
  { name: "Medium", value: 150 },
  { name: "High", value: 200 },
] as const;

export const PIXEL_SIZES = [
  { name: "4px", value: 4 },
  { name: "8px", value: 8 },
  { name: "16px", value: 16 },
  { name: "32px", value: 32 },
  { name: "64px", value: 64 },
] as const;

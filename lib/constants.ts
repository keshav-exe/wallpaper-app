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
  "#001220", // Dark Blue
  "#FF6600", // Dark Orange
  "#002B50", // Navy Blue
  "#FFB366", // Light Orange
  "#004080", // Medium Blue
  "#FF8000", // Orange
  "#0066CC", // Bright Blue
  "#000000", // Black
  "#66A3FF", // Light Blue
];

export const INITIAL_BACKGROUND_COLORS = [
  // // Ultra Light variants (95% lightness)
  // "#F0F7FF", // Ultra Light Dark Blue
  // "#F0F8FF", // Ultra Light Navy Blue
  // "#F0F9FF", // Ultra Light Medium Blue
  // "#F0FAFF", // Ultra Light Bright Blue
  // "#F7FBFF", // Ultra Light Light Blue
  // "#FFF8F0", // Ultra Light Light Orange
  // "#FFF4F0", // Ultra Light Orange
  // "#FFF2F0", // Ultra Light Dark Orange
  // "#F0F0F0", // Ultra Light Black

  // Dark variants (5% lightness)
  "#0D1319", // Dark Blue
  "#0D151A", // Dark Navy Blue
  "#0D161C", // Dark Medium Blue
  "#0D171D", // Dark Bright Blue
  "#0D191F", // Dark Light Blue
  "#1A160D", // Dark Light Orange
  "#1A130D", // Dark Orange
  "#1A110D", // Dark Dark Orange
  "#0D0D0D", // Dark Black
];

export const FONTS: FontOption[] = [
  // Sans-serif fonts
  {
    name: "Bricolage Grotesque",
    variable: true,
    weights: [200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: "Geist",
    variable: true,
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Inter",
    variable: true,
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Manrope",
    variable: true,
    weights: [200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: "Montserrat",
    variable: true,
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Onest",
    variable: true,
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Poppins",
    variable: false,
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Space Grotesk",
    variable: true,
    weights: [300, 400, 500, 600, 700],
  },

  // Serif fonts
  {
    name: "DM Serif Display",
    variable: false,
    weights: [400],
  },
  {
    name: "Instrument Serif",
    variable: false,
    weights: [400],
  },
  {
    name: "Lora",
    variable: true,
    weights: [400, 500, 600, 700],
  },
  {
    name: "Ms Madi",
    variable: false,
    weights: [400],
  },

  // Monospace fonts
  {
    name: "Space Mono",
    variable: false,
    weights: [400, 700],
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
  { name: "HD", width: 1080, height: 1920, scale: "1", ratio: "mobile" },
  { name: "2K", width: 1440, height: 2560, scale: "2", ratio: "mobile" },
  { name: "4K", width: 2160, height: 3840, scale: "3", ratio: "mobile" },

  // Square (1:1)
  { name: "HD", width: 1080, height: 1080, scale: "1", ratio: "square" },
  { name: "2K", width: 1440, height: 1440, scale: "2", ratio: "square" },
  { name: "4K", width: 2160, height: 2160, scale: "3", ratio: "square" },
] as const;

export const BLUR_OPTIONS = [
  { name: "None", value: 0 },
  { name: "Low", value: 600 },
  { name: "Medium", value: 800 },
  { name: "High", value: 1000 },
] as const;

export const SAFARI_BLUR_OPTIONS = [
  { name: "None", value: 0 },
  { name: "Low", value: 500 },
  { name: "Medium", value: 600 },
  { name: "High", value: 800 },
] as const;

export const PIXEL_SIZES = [
  { name: "4px", value: 4 },
  { name: "8px", value: 8 },
  { name: "16px", value: 16 },
  { name: "32px", value: 32 },
  { name: "64px", value: 64 },
] as const;

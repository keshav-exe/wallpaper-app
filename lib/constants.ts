export interface CircleProps {
  color: string;
  cx: number;
  cy: number;
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
} as const;

export const RESOLUTIONS = [
  { name: "1080p", width: 1920, height: 1080, scale: 1 },
  { name: "2K", width: 2560, height: 1440, scale: 2 },
  { name: "4K", width: 3840, height: 2160, scale: 3 },
] as const;

export const BLUR_OPTIONS = [
  { name: "Low", value: 100 },
  { name: "Medium", value: 150 },
  { name: "High", value: 200 },
] as const;

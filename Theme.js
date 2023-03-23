import { rem } from "polished";

export const FONT_STACK = {
  SERIF: `'DM Serif Display', serif`,
  INTER: `'Inter', sans-serif`,
  MANROPE: `'Manrope', sans-serif`,
};

export const FONT_WEIGHT = {
  LIGHT: 200,
  REGULAR: 400,
  BOLDER: 600,
  BOLD: 700,
  EXTRABOLD: 800,
};

export const LETTER_SPACING = {
  TIGHTER: "-0.05rem",
  TIGHT: "-0.025rem",
  NORMAL: "0",
  WIDE: "0.025rem",
  WIDER: "0.05rem",
  WIDEST: "0.1rem",
};

// should match with tailwind.config.js theme screens
export const SCREENS = {
  XS: "480px",
  SM: "640px",
  MD: "768px",
  LG: "1024px",
  XL: "1280px",
  XXL: "1536px",
  "3XL": "3840px",
};

export const COLOR = {
  FEI_PRIMARY: "#EAAA00",
  PRIMARY: "#C7A97A",
  SECONDARY: "#053426",
  WHITE: "#FFF",
  DANGER: "#B42B51",
  LIGHT: "#F4F8FB",
  BLACK: "#000",
  DARKTEXT: "#3B3A40",
  LIGHTBROWN: "#F4EFE9",
  DARKERBROWN: "#dccdba",
  SMOKE: "#A1A1A2",
  GRAY: "#C1CCC9",
  DARKGRAY: "#64626A",
  FORDGRAY: "#979797",
  DARKBLUE: "#4D646E",
  BACKGROUND: "#FCFAF8",
  PLATINUM: {
    DEFAULT: "#DFE1E0",
    50: "#FFFFFF",
    100: "#FFFFFF",
    200: "#FFFFFF",
    300: "#FFFFFF",
    400: "#F4F5F4",
    500: "#DFE1E0",
    600: "#C2C6C4",
    700: "#A5ABA8",
    800: "#88908C",
    900: "#6C7370",
  },
  PRI: {
    DEFAULT: "#FCB814",
    50: "#FEEFC9",
    100: "#FEE9B5",
    200: "#FEDD8D",
    300: "#FDD065",
    400: "#FDC43C",
    500: "#FCB814",
    600: "#D59703",
    700: "#9E7002",
    800: "#664901",
    900: "#2F2101",
  },
  SEC: {
    DEFAULT: "#527A5C",
    50: "#B6CEBC",
    100: "#AAC6B1",
    200: "#91B59A",
    300: "#79A584",
    400: "#62926E",
    500: "#527A5C",
    600: "#3B5843",
    700: "#253729",
    800: "#0E1510",
    900: "#000000",
  },
};

export const SPACE = {
  XXS: rem(5),
  XS: rem(10),
  S: rem(15),
  M: rem(20),
  L: rem(30),
  XL: rem(40),
  XXL: rem(60),
  XXXL: rem(80),
  XXXXL: rem(100),
  XXXXXL: rem(150),
  XXXXXXL: rem(175),
};

export const FONT_SIZE = {
  XXS: rem(5),
  XS: rem(12),
  SS: rem(14),
  S: rem(16),
  MM: rem(18),
  M: rem(20),
  L: rem(30),
  XL: rem(40),
  XXL: rem(60),
  XXXL: rem(80),
  XXXXL: rem(100),
};

export const BOX_SHADOW = {
  DARK: "0px 1px 2px rgba(13, 64, 128, 0.19)",
  INNER: "inset 1px 1px 4px rgba(0, 0, 0, 0.08)",
  ELEVATION_1: "0px 5px 10px rgba(24, 27, 25, 0.07)",
  ELEVATION_2: "0px 5px 20px rgba(24, 27, 25, 0.08)",
  ELEVATION_3: "0px 5px 30px rgba(24, 27, 25, 0.1)",
  ELEVATION_4: "0px 5px 40px rgba(24, 27, 25, 0.1)",
  ELEVATION_5: "0px 5px 20px rgba(24, 27, 25, 0.1)",
  ELEVATION_6: "0px 5px 20px rgba(0, 0, 0, 0.1)",
};

export const WIDTH = {
  MOBILE: rem(4),
  XXXXS: rem(120), // 36
  XXXS: rem(144), // 36
  XXS: rem(160), //40
  XS: rem(176), //44
  S: rem(192), //48
  M: rem(208), //52
  L: rem(224), //56
  XL: rem(240), //60
  XXL: rem(256), //64
  XXXL: rem(288), //72
  XXXXL: rem(320), //80
  XXXXXL: rem(384), //96
};
export const HEIGHT = {
  XXS: rem(40),
  XS: rem(60),
  S: rem(80), //20
  M: rem(224), //56
  L: rem(384), //96
  XL: rem(420),
  XXL: rem(480), //custom = 30rem
  XXXL: rem(669),
};

export default {
  space: SPACE,
  colors: COLOR,
  heights: HEIGHT,
  widths: WIDTH,
  font_sizes: FONT_SIZE,
  screens: SCREENS,
};

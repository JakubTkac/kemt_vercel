import { rem } from "polished";

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
  WHITE: "#FFF",
  BLACK: "#000",
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
  XXXS: rem(5),
  XXS: rem(9),
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

export const WIDTH = {
  MOBILE: rem(4),
  XXXXXXS: rem(30),
  XXXXXS: rem(60),
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
  XXXXS: rem(20),
  XXXS: rem(30),
  XXS: rem(40),
  XS: rem(60),
  S: rem(80), //20
  M: rem(224), //56
  L: rem(384), //96
  XL: rem(420),
  XXL: rem(480), //custom = 30rem
  XXXL: rem(669),
  DropdownBigger: rem(110),
  DropdownSmaller: rem(90),
};

export default {
  space: SPACE,
  colors: COLOR,
  heights: HEIGHT,
  widths: WIDTH,
  font_sizes: FONT_SIZE,
  screens: SCREENS,
};

import { FontSizes, Colors, Layers, Variables, BreakPoints } from "../common";

export const BREAK_POINTS: BreakPoints = {
   SMALL: "384px",
   MEDIUM: "480px",
   LARGE: "786px"
};

export const FONT_SIZES: FontSizes = {
   XS: "0.5rem",
   S: "0.75rem",
   M: "1rem",
   L: "1.5rem",
   XL: "2.0rem",
   XXL: "2.5rem"
};

export const COLORS: Colors = {
   Tan: "#e8d8b6",
   LightBlue: "#27405e",
   Blue: "#1F324C",
   DarkBlue: "#0B1928",
   LightGrey: "#777777",
   Grey: "#555555",
   DarkGrey: "#222222",
   Red: "#c02828",
   Green: "#2ec958"
};

export const LAYERS: Layers = {
   MODAL: 60,
   ON_TOP: 40,
   FOREGROUND: 20,
   MID_GROUND: 10,
   BACKGROUND: 1
};

// $breakpoints: (
//    "xsmall": 280px,
//    "small": 480px,
//    "medium": 768px,
//    "large": 1080px,
//    "xlarge": 1280px
// );

const VARIABLES: Variables = {
   BREAK_POINTS,
   FONT_SIZES,
   COLORS,
   LAYERS
};

export default VARIABLES;

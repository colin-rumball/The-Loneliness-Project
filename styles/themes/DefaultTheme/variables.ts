export interface FontSizes {
   XS: string;
   S: string;
   M: string;
   L: string;
   XL: string;
   XXL: string;
}

export interface Colors {
   Tan: string;
   LightBlue: string;
   Blue: string;
   DarkBlue: string;
   LightGrey: string;
   Grey: string;
   DarkGrey: string;
   Red: string;
   Green: string;
}

export interface Layers {
   MODAL: number;
   ON_TOP: number;
   FOREGROUND: number;
   MID_GROUND: number;
   BACKGROUND: number;
}

export interface Variables {
   FONT_SIZES: FontSizes;
   COLORS: Colors;
   LAYERS: Layers;
}

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
   BACKGROUND: -10
};

const VARIABLES: Variables = {
   FONT_SIZES,
   COLORS,
   LAYERS
};

export default VARIABLES;

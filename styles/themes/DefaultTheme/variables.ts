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

export interface Variables {
   FONT_SIZES: FontSizes;
   COLORS: Colors;
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

const VARIABLES: Variables = {
   FONT_SIZES,
   COLORS
};

export default VARIABLES;

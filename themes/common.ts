export interface BreakPoints {
   SMALL: string;
   MEDIUM: string;
   LARGE: string;
}

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
   BREAK_POINTS: BreakPoints;
   FONT_SIZES: FontSizes;
   COLORS: Colors;
   LAYERS: Layers;
}

export interface IconStyles {
   SIZE_S: string;
   SIZE_M: string;
   SIZE_L: string;
   COLOR_DEFAULT: string;
   COLOR_HOVER: string;
}

export interface ApartmentStyles {
   STORE_PADDING: string;
   UNIT_PADDING: string;
   ROOF_PADDING: string;
   QUERY_AMOUNT_SMALL: number;
   QUERY_AMOUNT_MEDIUM: number;
   QUERY_AMOUNT_LARGE: number;
}

export interface Animations {
   [x: string]: any;
}

export interface Theme {
   ANIMATIONS: Animations;
   VARIABLES: Variables;
   ICON_STYLES: IconStyles;
   APARTMENT_STYLES: ApartmentStyles;
}

export interface ThemeContainer {
   theme: Theme;
   [x: string]: any;
}

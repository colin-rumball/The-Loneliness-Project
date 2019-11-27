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
}

export interface Theme {
   VARIABLES: Variables;
   ICON_STYLES: IconStyles;
   APARTMENT_STYLES: ApartmentStyles;
}

export interface ThemeContainer {
   theme: Theme;
   [x: string]: any;
}

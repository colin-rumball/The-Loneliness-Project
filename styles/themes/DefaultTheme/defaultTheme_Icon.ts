import { FONT_SIZES, COLORS } from "./variables";

export interface IconStyles {
   SIZE_S: string;
   SIZE_M: string;
   SIZE_L: string;
   COLOR_DEFAULT: string;
   COLOR_HOVER: string;
}

const ICON_STYLES: IconStyles = {
   SIZE_S: FONT_SIZES.S,
   SIZE_M: FONT_SIZES.M,
   SIZE_L: FONT_SIZES.L,
   COLOR_DEFAULT: COLORS.DarkGrey,
   COLOR_HOVER: COLORS.LightBlue
};

export default ICON_STYLES;

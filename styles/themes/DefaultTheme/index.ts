import VARIABLES, { Variables } from "./variables";
import ICON_STYLES, { IconStyles } from "./defaultTheme_Icon";
import APARTMENT_STYLES, { ApartmentStyles } from "./defaultTheme_Apartment";

const DefaultTheme: Theme = {
   VARIABLES,
   ICON_STYLES,
   APARTMENT_STYLES
};

export interface Theme {
   VARIABLES: Variables;
   ICON_STYLES: IconStyles;
   APARTMENT_STYLES: ApartmentStyles;
}

export interface ThemeContainer {
   theme: Theme;
   [x: string]: any;
}

export default DefaultTheme;

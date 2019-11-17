import VARIABLES, { Variables } from "./variables";
import ICON_STYLES, { IconStyles } from "./defaultTheme_Icon";

const DefaultTheme: Theme = {
   VARIABLES,
   ICON_STYLES
};

export interface Theme {
   VARIABLES: Variables;
   ICON_STYLES: IconStyles;
}

export interface ThemeContainer {
   theme: Theme;
   [x: string]: any;
}

export default DefaultTheme;

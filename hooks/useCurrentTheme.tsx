import DefaultTheme from "../themes/DefaultTheme";
import { Theme } from "../themes/common";

const useCurrentTheme = (): Theme => {
   return DefaultTheme;
};

export default useCurrentTheme;

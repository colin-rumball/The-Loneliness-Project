import { useCallback } from "react";
import { Theme } from "../themes/common";

export interface WindowDimensions {
   width: number;
   height: number;
}

const useQueryAmount = (windowDimensions: WindowDimensions, currentTheme: Theme) => {
   const getQueryAmount = useCallback(() => {
      if (windowDimensions.width > parseInt(currentTheme.VARIABLES.BREAK_POINTS.LARGE)) {
         return currentTheme.APARTMENT_STYLES.QUERY_AMOUNT_LARGE;
      } else if (windowDimensions.width > parseInt(currentTheme.VARIABLES.BREAK_POINTS.MEDIUM)) {
         return currentTheme.APARTMENT_STYLES.QUERY_AMOUNT_MEDIUM;
      }
      return currentTheme.APARTMENT_STYLES.QUERY_AMOUNT_SMALL;
   }, [windowDimensions]);

   return getQueryAmount();
};

export default useQueryAmount;

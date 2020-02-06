import { random } from "lodash";
import { useMemo, useCallback, useState } from "react";

const RandomColors = [
   "#dec2c4",
   "#dbbeb3",
   "#e7c9b1",
   "#eddbb4",
   "#e7e2b8",
   "#dde2c7",
   "#dbe9d0",
   "#d0e9d7",
   "#d0e9e9",
   "#cadeee",
   "#c6d0e7",
   "#d7d0e9"
];

const RandomDarkenedColors = [
   "#b2a1a3",
   "#b09a92",
   "#c3a288",
   "#cdb787",
   "#c3bd90",
   "#b4b8a5",
   "#b5c2aa",
   "#aac2b1",
   "#aac2c2",
   "#9fb8cd",
   "#a0aac1",
   "#b1aac2"
];

const useRandomColor = () => {
   const [chosenColorIndex, setChosenColorIndex] = useState(random(RandomColors.length - 1));
   const rerandomizeColors = useCallback(() => {
      setChosenColorIndex(random(RandomColors.length - 1));
   }, [RandomColors]);
   const randomColor = useMemo(() => RandomColors[chosenColorIndex], [chosenColorIndex]);
   const randomDarkenedColor = useMemo(() => RandomDarkenedColors[chosenColorIndex], [
      chosenColorIndex
   ]);
   return { randomColor, randomDarkenedColor, rerandomizeColors };
};

export default useRandomColor;

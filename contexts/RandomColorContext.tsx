import React, { useState, useContext, useCallback } from "react";

const RandomColorContext = React.createContext({
   randomColor: "#000",
   randomDarkenedColor: "#000"
});

interface RandomColorContextProviderProps {
   randomColor: string;
   randomDarkenedColor: string;
}

const RandomColorContextProvider: React.FC<RandomColorContextProviderProps> = props => {
   const { randomColor, randomDarkenedColor } = props;
   return (
      <RandomColorContext.Provider value={{ randomColor, randomDarkenedColor }}>
         {props.children}
      </RandomColorContext.Provider>
   );
};

export { RandomColorContext, RandomColorContextProvider };

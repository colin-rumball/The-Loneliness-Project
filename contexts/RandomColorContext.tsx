import React, { useState, useContext, useCallback } from "react";

const RandomColorContext = React.createContext({
   randomColor: "#000",
   randomDarkenedColor: "#000",
   rerandomizeColors: () => {}
});

interface RandomColorContextProviderProps {
   randomColor: string;
   randomDarkenedColor: string;
   rerandomizeColors: () => void;
}

const RandomColorContextProvider: React.FC<RandomColorContextProviderProps> = props => {
   return (
      <RandomColorContext.Provider value={{ ...props }}>
         {props.children}
      </RandomColorContext.Provider>
   );
};

export { RandomColorContext, RandomColorContextProvider };

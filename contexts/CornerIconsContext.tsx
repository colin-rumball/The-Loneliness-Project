import React, { useState, useContext } from "react";
import { IconCorner } from "../components/CornerIcon/CornerIconWithContent";

const CornerIconsContext = React.createContext([undefined, () => {}]);

const CornerIconsContextProvider = props => {
   const [state, setState] = useState(undefined);
   return (
      <CornerIconsContext.Provider value={[state, setState]}>
         {props.children}
      </CornerIconsContext.Provider>
   );
};

const useCornerIconsContext = () => {
   const [activeCorner, setActiveCorner] = useContext(CornerIconsContext);
   const ac = (activeCorner as unknown) as IconCorner;
   const setAC: (newCorner: IconCorner) => void = setActiveCorner;
   return { activeCorner: ac, setActiveCorner: setAC };
};

export { CornerIconsContext, CornerIconsContextProvider, useCornerIconsContext };

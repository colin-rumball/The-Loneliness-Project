import React, { useState, useContext, useCallback } from "react";

export enum Controller {
   NONE,
   MAIN,
   OVERLAY,
   MODAL
}

const ControllerContext = React.createContext([
   Controller.MAIN,
   (setController: React.SetStateAction<Controller>) => {}
]);

const ControllerContextProvider = props => {
   const [state, setState] = useState(Controller.MAIN);
   return (
      <ControllerContext.Provider value={[state, setState]}>
         {props.children}
      </ControllerContext.Provider>
   );
};

const useControllerContext = () => {
   const [currentController, setCC] = useContext(ControllerContext);
   const setCurrentController = useCallback((newController: Controller) => {
      if (typeof document != "undefined") {
         if (newController == Controller.MAIN) {
            document.querySelector("html").classList.remove("modal-open");
         } else {
            document.querySelector("html").classList.add("modal-open");
         }
      }

      const setNewController = setCC as React.Dispatch<React.SetStateAction<Controller>>;
      setNewController(() => newController);
   }, []);

   return {
      currentController: currentController as Controller,
      setCurrentController: setCurrentController as React.Dispatch<React.SetStateAction<Controller>>
   };
};

export { ControllerContext, ControllerContextProvider, useControllerContext };

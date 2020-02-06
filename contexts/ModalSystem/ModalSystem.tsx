import React, { useReducer, useContext } from "react";
import { ModalSystem, ModalSystemState, ModalContext } from "./actions/common";
import modalSystemReducer from "./ModalSystemReducer";

const initialModalSystem: ModalSystem = {
   state: ModalSystemState.EMPTY,
   queue: []
};

const initialModalDispatch = () => {
   console.error("Initial modal dispatch invoked.");
};

const ModalContextObject = React.createContext<ModalContext>({
   system: initialModalSystem,
   dispatch: initialModalDispatch
});

const ModalSystemProvider = ({ children }) => {
   const [modalSystem, dispatchModalAction] = useReducer(modalSystemReducer, initialModalSystem);
   return (
      <ModalContextObject.Provider value={{ system: modalSystem, dispatch: dispatchModalAction }}>
         {children}
      </ModalContextObject.Provider>
   );
};

export { ModalContextObject, ModalSystemProvider };

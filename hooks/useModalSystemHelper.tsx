import { ModalContextObject } from "../contexts/ModalSystem/ModalSystem";
import { useContext, useCallback, ReactNode, useEffect } from "react";
import { createPushAction } from "../contexts/ModalSystem/actions/PushAction";
import { ModalOptions, ModalSystemState } from "../contexts/ModalSystem/actions/common";
import { createPopAction } from "../contexts/ModalSystem/actions/PopAction";
import { useControllerContext, Controller } from "../contexts/ControllerContext";
import { createChangeStateAction } from "../contexts/ModalSystem/actions/ChangeStateAction";

const useModalSystemHelper = () => {
   const { system, dispatch } = useContext(ModalContextObject);
   const { setCurrentController } = useControllerContext();

   const currentModal = system.queue.length > 0 ? system.queue[0] : null;

   const changeState = useCallback((newState: ModalSystemState) => {
      dispatch(createChangeStateAction(newState));
   }, []);

   // Basic state management
   useEffect(() => {
      switch (system.state) {
         case ModalSystemState.EMPTY:
            if (system.queue.length > 0) {
               changeState(ModalSystemState.OPENING);
            }
            break;
         case ModalSystemState.OPENING:
            break;
         case ModalSystemState.CLOSING:
            changeState(
               system.queue.length > 0 ? ModalSystemState.OPENING : ModalSystemState.EMPTY
            );
            break;
      }
   }, [system]);

   const pushModal = useCallback(
      (node: ReactNode, options?: ModalOptions) => {
         setCurrentController(Controller.MODAL);
         dispatch(createPushAction(node, options));
         if (system.state == ModalSystemState.EMPTY) {
            changeState(ModalSystemState.OPENING);
         }
      },
      [system]
   );

   const popModal = useCallback(() => {
      system.queue[0]?.options.onClose();
      if (system.queue.length == 1) setCurrentController(Controller.MAIN);
      dispatch(createPopAction());
      changeState(ModalSystemState.CLOSING);
   }, [system]);

   return { currentModal, system, pushModal, popModal, changeState };
};

export default useModalSystemHelper;

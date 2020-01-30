import React, {
   useState,
   useContext,
   ReactNode,
   useCallback,
   useMemo,
   useEffect,
   useRef
} from "react";
import { useControllerContext, Controller } from "./ControllerContext";

export interface ModalOptions {
   onOpen?();
   onClose?();
   allowOutsideClick?: boolean;
   allowEscapeKey?: boolean;
   allowEnterKey?: boolean;
   name?: string;
}

export enum ModalState {
   EMPTY,
   QUEUED,
   OPENING,
   SHOWING,
   CLOSING
}

const DefaultModalOptions: ModalOptions = {
   onOpen: () => {},
   onClose: () => {}
};

export interface Modal {
   node: ReactNode;
   state: ModalState;
   options: ModalOptions;
}

export type ModalQueue = Modal[];

const ModalContext = React.createContext([[], (setQueue: React.SetStateAction<ModalQueue>) => {}]);

const ModalContextProvider = props => {
   const [modalQueue, setModalQueue] = useState([]);
   return (
      <ModalContext.Provider value={[modalQueue, setModalQueue]}>
         {props.children}
      </ModalContext.Provider>
   );
};

const useModalContext = () => {
   const { setCurrentController } = useControllerContext();
   const [mq, setMQ] = useContext(ModalContext);
   const modalQueue = (mq as unknown) as ModalQueue;
   const setModalQueue = setMQ as (setQueue: React.SetStateAction<ModalQueue>) => void;

   const currentModal: Modal = modalQueue.length > 0 ? modalQueue[0] : null;

   const pushModal = useCallback(
      (node: ReactNode, options?: ModalOptions) => {
         setCurrentController(Controller.MODAL);
         setModalQueue(prevQueue => [
            ...prevQueue,
            { node, state: ModalState.QUEUED, options: { ...DefaultModalOptions, ...options } }
         ]);
      },
      [setModalQueue]
   );

   const popModal = useCallback(() => {
      currentModal.options.onClose();
      setModalQueue(prevQueue => {
         prevQueue.shift();
         if (prevQueue.length == 0) setCurrentController(Controller.MAIN);
         return [...prevQueue];
      });
   }, [currentModal, setModalQueue]);

   useEffect(() => {
      if (currentModal?.state == ModalState.QUEUED) {
         setModalQueue(prevQueue => {
            if (prevQueue.length > 0) {
               const curr = prevQueue.shift();
               curr.state = ModalState.OPENING;
               return [curr, ...prevQueue];
            }
            return [];
         });
      }
   }, [currentModal?.state]);

   return {
      currentModal,
      pushModal,
      popModal
   };
};

export { ModalContext, ModalContextProvider, useModalContext };

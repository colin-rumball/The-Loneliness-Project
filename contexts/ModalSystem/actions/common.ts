import { ReactNode } from "react";

export enum ModalActionType {
   PUSH,
   POP,
   CHANGE_STATE
}

export interface ModalAction {
   type: ModalActionType;
}

export enum ModalSystemState {
   EMPTY,
   OPENING,
   CLOSING
}

export interface ModalOptions {
   onOpen?();
   onClose?();
   allowOutsideClick?: boolean;
   allowEscapeKey?: boolean;
   allowEnterKey?: boolean;
   name?: string;
}

export const DefaultModalOptions: ModalOptions = {
   onOpen: () => {},
   onClose: () => {}
};

export interface Modal {
   node: ReactNode;
   options: ModalOptions;
}

export type ModalQueue = Modal[];

export interface ModalSystem {
   state: ModalSystemState;
   queue: ModalQueue;
}

export interface ModalContext {
   system: ModalSystem;
   dispatch: React.Dispatch<ModalAction>;
}

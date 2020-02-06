import { ModalAction, ModalSystem, ModalActionType } from "./common";

export interface PopAction extends ModalAction {}

export const handlePopAction = (system: ModalSystem, action: ModalAction): ModalSystem => {
   system.queue.shift();
   return { ...system, queue: system.queue };
};

export const createPopAction = (): PopAction => ({ type: ModalActionType.POP });

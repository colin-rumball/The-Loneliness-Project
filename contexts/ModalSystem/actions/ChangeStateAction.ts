import { ModalAction, ModalSystem, ModalActionType, ModalSystemState } from "./common";

export interface ChangeStateAction extends ModalAction {
   newState: ModalSystemState;
}

export const handleChangeStateAction = (system: ModalSystem, action: ModalAction): ModalSystem => {
   const changeStateAction: ChangeStateAction = action as ChangeStateAction;
   return { queue: system.queue, state: changeStateAction.newState };
};

export const createChangeStateAction = (newState: ModalSystemState): ChangeStateAction => ({
   type: ModalActionType.CHANGE_STATE,
   newState
});

import { ModalSystem, ModalAction, ModalActionType } from "./actions/common";
import { handlePushAction } from "./actions/PushAction";
import { handlePopAction } from "./actions/PopAction";
import { handleChangeStateAction } from "./actions/ChangeStateAction";

const modalSystemReducer = (system: ModalSystem, action: ModalAction): ModalSystem => {
   switch (action.type) {
      case ModalActionType.PUSH:
         return handlePushAction(system, action);
      case ModalActionType.POP:
         return handlePopAction(system, action);
      case ModalActionType.CHANGE_STATE:
         return handleChangeStateAction(system, action);
      default:
         throw new Error();
   }
};

export default modalSystemReducer;

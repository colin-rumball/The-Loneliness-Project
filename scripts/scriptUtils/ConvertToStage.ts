import { STAGE } from "./Constants";

const ConvertToStage = (target: string) => {
   target = target.toLowerCase();
   switch (target) {
      case STAGE.DEVELOPMENT.toLowerCase():
         return STAGE.DEVELOPMENT;
      case STAGE.PRODUCTION.toLowerCase():
         return STAGE.PRODUCTION;
      case STAGE.TEST.toLowerCase():
         return STAGE.TEST;
      default:
         return STAGE.NONE;
   }
};

export default ConvertToStage;

import { ShowConfirmationPrompt } from "./ShowPrompt";
import ExecuteCommand from "./ExecuteCommand";
import { STAGE, NOW_STAGE } from "./Constants";

const BuildIonic = async (target: STAGE) => {
   if (target === STAGE.NONE || target === STAGE.TEST) {
      throw new Error(
         `Valid targets for Build Ionic are ${STAGE.DEVELOPMENT} or ${STAGE.PRODUCTION}.`
      );
   }

   // Deploy to now
   console.log(`Creating new Ionic build for ${target}...`);
   await ExecuteCommand(
      `env-cmd -f ./.env next build && env-cmd -f ./.env next export`,
      "Ionic Build & Export"
   );
};

export default BuildIonic;

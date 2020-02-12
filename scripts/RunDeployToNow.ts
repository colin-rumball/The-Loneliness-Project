import { ShowConfirmationPrompt, ShowEnvPrompt } from "./scriptUtils/ShowPrompt";
import { argv } from "yargs";
import { STAGE } from "./scriptUtils/Constants";
import ConvertToStage from "./scriptUtils/ConvertToStage";
import DeployToNow from "./scriptUtils/DeployToNow";
import CreateEnvFile from "./scriptUtils/CreateEnvFile";
import AddEnvToNow from "./scriptUtils/AddEnvToNow";
import CleanUpNowDeployment from "./scriptUtils/CleanUpNowDeployment";

const runDeployment = async (target: STAGE) => {
   try {
      await CreateEnvFile(target);
   } catch (error) {
      console.error(`CreateEnvFile encountered an error: ${error} for target ${target}`);
      return;
   }

   try {
      // await AddEnvToNow(target);
      await DeployToNow(target);
      await CleanUpNowDeployment();
   } catch (error) {
      console.error(`DeployToNow encountered an error: ${error}.`);
   }
};

// Script code

if (argv.target) {
   const target: STAGE = ConvertToStage(argv.target as string);

   if (target !== STAGE.NONE && target !== STAGE.TEST) {
      runDeployment(target);
   } else {
      console.log(`Aborting RunDeployToNow.ts`);
      throw new Error(
         `Valid targets for RunDeployToNow.ts are ${STAGE.DEVELOPMENT} or ${STAGE.PRODUCTION}.`
      );
   }
} else {
   ShowEnvPrompt().then(target => {
      if (target === STAGE.PRODUCTION) {
         // Confirm for production
         ShowConfirmationPrompt(
            "Are you sure? Deploying to production will replace the currently live Now build!"
         )
            .then(() => {
               runDeployment(target);
            })
            .catch(err => {
               console.log("Aborting Now deployment.");
            });
      } else {
         runDeployment(target);
      }
   });
}

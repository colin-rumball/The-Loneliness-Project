import { ShowConfirmationPrompt, ShowEnvPrompt } from "./scriptUtils/ShowPrompt";
import { argv } from "yargs";
import { STAGE } from "./scriptUtils/Constants";
import DeployToNow from "./scriptUtils/DeployToNow";
import ConvertToStage from "./scriptUtils/ConvertToStage";
import DeployToPrisma from "./scriptUtils/DeployToPrisma";
import CreateEnvFile from "./scriptUtils/CreateEnvFile";
import BuildGraphQLSchema from "./scriptUtils/BuildGraphQLSchema";
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
      await DeployToPrisma(target);
      await BuildGraphQLSchema(target);
   } catch (error) {
      console.error(`DeployToPrisma encountered an error: ${error} for target ${target}`);
      return;
   }

   try {
      await AddEnvToNow(target);
      await DeployToNow(target);
      await CleanUpNowDeployment();
   } catch (error) {
      console.error(`DeployToNow encountered an error: ${error}.`);
      console.log(
         `Prisma deployment for target ${target} was successful, while Now deployment failed. Things may be in a state of unrest.`
      );
      return;
   }
};

// Script code

if (argv.target) {
   const target: STAGE = ConvertToStage(argv.target as string);

   if (target !== STAGE.NONE && target !== STAGE.TEST) {
      runDeployment(target);
   } else {
      console.log(`Aborting RunDeployEverything.ts`);
      throw new Error(
         `Valid targets for RunDeployEverything.ts are ${STAGE.DEVELOPMENT} or ${STAGE.PRODUCTION}.`
      );
   }
} else {
   ShowEnvPrompt().then(target => {
      if (target === STAGE.PRODUCTION) {
         // Confirm for production
         ShowConfirmationPrompt(
            "Are you sure? Deploying to production will replace the currently live build everywhere!"
         )
            .then(() => {
               runDeployment(target);
            })
            .catch(err => {
               console.log("Aborting deployment of everything.");
            });
      } else {
         runDeployment(target);
      }
   });
}

import { ShowConfirmationPrompt, ShowEnvPrompt } from "./scriptUtils/ShowPrompt";
import { argv } from "yargs";
import ConvertToStage from "./scriptUtils/ConvertToStage";
import { STAGE } from "./scriptUtils/Constants";
import DeployToPrisma from "./scriptUtils/DeployToPrisma";
import BuildGraphQLSchema from "./scriptUtils/BuildGraphQLSchema";
import CreateEnvFile from "./scriptUtils/CreateEnvFile";

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
};

// Script code

if (argv.target) {
   const stage = ConvertToStage(argv.target as string);

   if (stage !== STAGE.NONE) {
      runDeployment(stage);
   } else {
      console.log(`Aborting RunDeployToPrisma.ts`);
      throw new Error(
         `Valid targets for RunDeployToPrisma.ts are ${STAGE.DEVELOPMENT}, ${STAGE.PRODUCTION}  or ${STAGE.TEST}.`
      );
   }
} else {
   ShowEnvPrompt(true).then(target => {
      if (target === STAGE.PRODUCTION) {
         // Confirm for production
         ShowConfirmationPrompt(
            "Are you sure? Deploying to production will replace the currently live Prisma build!"
         )
            .then(() => {
               runDeployment(target);
            })
            .catch(err => {
               console.log("Aborting deployment.");
            });
      } else {
         runDeployment(target);
      }
   });
}

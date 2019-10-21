import { ShowEnvPrompt, ShowPrompt } from "./scriptUtils/ShowPrompt";
import { argv } from "yargs";
import ConvertToStage from "./scriptUtils/ConvertToStage";
import { STAGE } from "./scriptUtils/Constants";
import CreateEnvFile from "./scriptUtils/CreateEnvFile";
import SeedPrisma from "./scriptUtils/SeedPrisma";

const runSeedPrisma = async (target: STAGE, reset: boolean) => {
   try {
      await CreateEnvFile(target);
   } catch (error) {
      console.error(`CreateEnvFile encountered an error: ${error} for target ${target}`);
      return;
   }

   try {
      await SeedPrisma(target, reset);
   } catch (error) {
      console.error(`DeployToPrisma encountered an error: ${error} for target ${target}`);
      return;
   }
};

// Script code

const scriptCode = async () => {
   console.log("Running Prisma Seed Script");
   if (argv.target !== undefined) {
      const stage = ConvertToStage(argv.target as string);

      if (stage !== STAGE.NONE) {
         runSeedPrisma(stage, !!argv.reset);
      } else {
         console.log(`Aborting RunPrismaSeed.ts`);
         throw new Error(
            `Valid targets for RunPrismaSeed.ts are ${STAGE.DEVELOPMENT}, ${STAGE.PRODUCTION}  or ${STAGE.TEST}.`
         );
      }
   } else {
      const target = await ShowEnvPrompt(true);
      if (target === STAGE.PRODUCTION) {
         // Confirm for production
         console.log(
            'If you actually want to seed production then do it manually. (RunCreateEnv.ts, then "prisma seed -e ./.env"'
         );
      } else {
         const answer = await ShowPrompt("Include reset flag? (resetting the entire database)", [
            "Yes, reset/empty the entire database.",
            "No, keep data that the seed script doesn't touch."
         ]);
         const reset = answer === "Yes, reset/empty the entire database." ? true : false;
         runSeedPrisma(target, reset);
      }
   }
};

scriptCode();

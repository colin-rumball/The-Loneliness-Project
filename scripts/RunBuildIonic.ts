import { ShowEnvPrompt } from "./scriptUtils/ShowPrompt";
import { argv } from "yargs";
import { STAGE } from "./scriptUtils/Constants";
import ConvertToStage from "./scriptUtils/ConvertToStage";
import CreateEnvFile from "./scriptUtils/CreateEnvFile";
import BuildIonic from "./scriptUtils/BuildIonic";
import ExecuteCommand from "./scriptUtils/ExecuteCommand";

const runBuild = async (target: STAGE) => {
   try {
      await CreateEnvFile(target, false, false, true);
   } catch (error) {
      console.error(`CreateEnvFile encountered an error: ${error} for target ${target}`);
      return;
   }

   try {
      await BuildIonic(target);
   } catch (error) {
      console.error(`BuildIonic encountered an error: ${error}.`);
      return;
   }

   try {
      await ExecuteCommand(
         `ts-node -P config/tsconfig.json scripts/MoveFiles.ts --o=out --d=www`,
         "Ionic Move Files to www"
      );
   } catch (error) {
      console.error(`Move Files encountered an error: ${error}.`);
      return;
   }

   try {
      await ExecuteCommand(
         `ts-node -P config/tsconfig.json scripts/PrepareIonic.ts`,
         "Ionic Prepare Files"
      );
   } catch (error) {
      console.error(`Prepare Ionic encountered an error: ${error}.`);
      return;
   }

   try {
      await ExecuteCommand(`npx cap sync`, "Capacitor Sync");
   } catch (error) {
      console.error(`Capacitor Sync encountered an error: ${error}.`);
      return;
   }

   try {
      await ExecuteCommand(`npx cap open android`, "Capacitor Open Android");
   } catch (error) {
      console.error(`Capacitor Open Android encountered an error: ${error}.`);
      return;
   }
};

// Script code

if (argv.target) {
   const target: STAGE = ConvertToStage(argv.target as string);

   if (target !== STAGE.NONE && target !== STAGE.TEST) {
      runBuild(target);
   } else {
      console.log(`Aborting RunBuildIonic.ts`);
      throw new Error(
         `Valid targets for RunBuildIonic.ts are ${STAGE.DEVELOPMENT} or ${STAGE.PRODUCTION}.`
      );
   }
} else {
   ShowEnvPrompt().then(target => {
      runBuild(target);
   });
}

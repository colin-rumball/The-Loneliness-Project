import { ShowEnvPrompt } from "./scriptUtils/ShowPrompt";
import ConvertToStage from "./scriptUtils/ConvertToStage";
import { argv } from "yargs";
import BuildGraphQLSchema from "./scriptUtils/BuildGraphQLSchema";
import { STAGE } from "./scriptUtils/Constants";

const build = async (target: STAGE) => {
   console.log(` RunBuildGraphQLSchema.ts`);
   await BuildGraphQLSchema(target);
};

const scriptCode = async () => {
   if (argv.target) {
      const target: STAGE = ConvertToStage(argv.target as string);

      if (target !== STAGE.NONE) {
         build(target);
      } else {
         console.log(`Aborting RunBuildGraphQLSchema.ts`);
         throw new Error(
            `Valid targets for RunBuildGraphQLSchema.ts are ${STAGE.DEVELOPMENT}, ${STAGE.PRODUCTION}, or ${STAGE.TEST}.`
         );
      }
   } else {
      ShowEnvPrompt(true).then(target => {
         build(target);
      });
   }
};

scriptCode();

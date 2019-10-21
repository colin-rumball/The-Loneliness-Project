import { copyFileSync, writeFileSync, readFileSync } from "fs";
import * as path from "path";
import { STAGE } from "./Constants";
import AddEnvToNow from "./AddEnvToNow";

const pathToConfig = path.join(__dirname, "..", "..", "config");
const pathToProjectEnv = path.join(__dirname, "..", "..", ".env");

const moveEnvFileFromConfig = async (filename: string) => {
   copyFileSync(path.join(pathToConfig, filename), pathToProjectEnv);
   console.log(".env created.");
};

const CreateEnvFile = async (
   target: STAGE,
   debug: boolean = false,
   useLocalServer: boolean = false,
   withIonicEnv: boolean = false
) => {
   console.log(`Creating ${target} .env file.`);
   switch (target) {
      case STAGE.DEVELOPMENT:
         await moveEnvFileFromConfig(".env.development");
         break;
      case STAGE.PRODUCTION:
         await moveEnvFileFromConfig(".env.production");
         break;
      case STAGE.TEST:
         await moveEnvFileFromConfig(".env.test");
         break;
   }

   if (debug || withIonicEnv || useLocalServer) {
      let envVars = readFileSync(pathToProjectEnv, { encoding: "utf8" });
      if (withIonicEnv) {
         console.log("Adding PD_IONIC_DEPLOYMENT env variable to .env.");
         envVars += "\nPD_IONIC_DEPLOYMENT=true";
      }

      if (debug) {
         console.log("Adding PD_LOCAL_DEVELOPMENT env variable to .env.");
         envVars += "\nPD_LOCAL_DEVELOPMENT=true";
      }

      if (useLocalServer) {
         console.log("Adding PD_USE_LOCAL_SERVER env variable to .env.");
         envVars += "\nPD_USE_LOCAL_SERVER=true";
      }
      writeFileSync(pathToProjectEnv, envVars);
   }
   await AddEnvToNow(target);
};

export default CreateEnvFile;

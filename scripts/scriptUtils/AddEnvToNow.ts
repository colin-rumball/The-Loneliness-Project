import dotenv from "dotenv";
import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import { STAGE } from "./Constants";

const pathToNowConfig = path.join(__dirname, "..", "..", "now.json");
const pathToDebugNowConfig = path.join(__dirname, "..", "..", "debugNow.json");
const pathToDeployableNowConfig = path.join(__dirname, "..", "..", "deployableNow.json");
const pathToEnv = path.join(__dirname, "..", "..", ".env");

const AddEnvToNow = async (target: STAGE) => {
   console.log(`Reading now config...`);
   const nowConfig = JSON.parse(readFileSync(pathToNowConfig, { encoding: "utf8" }));
   console.log(`Reading environment variables from .env...`);
   const envVars = dotenv.parse(readFileSync(pathToEnv));

   nowConfig.build = { env: {} };
   nowConfig.env = {};

   for (const key in envVars) {
      nowConfig.build.env[key] = envVars[key];
      nowConfig.env[key] = envVars[key];
   }

   if (target === STAGE.DEVELOPMENT) {
      console.log(`Creating debug now.json file at ${pathToDebugNowConfig}`);
      writeFileSync(pathToDebugNowConfig, JSON.stringify(nowConfig));
   } else {
      console.log(`Creating deployable now.json file at ${pathToDeployableNowConfig}`);
      writeFileSync(pathToDeployableNowConfig, JSON.stringify(nowConfig));
   }
};

export default AddEnvToNow;

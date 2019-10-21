import { unlinkSync, existsSync } from "fs";
import { join } from "path";

const pathToTempProdConfig = join(__dirname, "..", "..", "deployableNow.json");
const pathToTempDevConfig = join(__dirname, "..", "..", "debugNow.json");

const CleanUpNowDeployment = async () => {
   let fileExists = existsSync(pathToTempProdConfig);
   if (fileExists) {
      unlinkSync(pathToTempProdConfig);
      console.log("Deleted temp Production Now config.");
   }

   fileExists = existsSync(pathToTempDevConfig);
   if (fileExists) {
      unlinkSync(pathToTempDevConfig);
      console.log("Deleted temp Development Now config.");
   }
};

export { CleanUpNowDeployment as default };

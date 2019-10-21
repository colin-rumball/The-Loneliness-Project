import { readFileSync, writeFileSync } from "fs";
import * as path from "path";

const pathToTSConfig = path.join(__dirname, "..", "..", "tsconfig.json");

const FixTSConfig = async () => {
   const tsConfig = JSON.parse(readFileSync(pathToTSConfig, { encoding: "utf8" }));
   tsConfig.compilerOptions.module = "commonjs";
   writeFileSync(pathToTSConfig, JSON.stringify(tsConfig));
   console.log("Fixed ./tsconfig.json");
};

export default FixTSConfig;

import { copyFileSync, existsSync } from "fs";
import * as path from "path";
import del from "del";
import { ncp } from "ncp";
import { argv } from "yargs";

const moveFiles = (originPath, destPath) => {
   ncp(originPath, destPath, err => {
      if (err) {
         return console.error(err);
      }
      console.log(`Files moved to ${destPath}`);
   });
};

// Script code

const scriptCode = () => {
   if (argv.o && argv.d) {
      const origin = argv.o as string;
      const dest = argv.d as string;

      const originPath = path.join(__dirname, "..", origin);
      const destPath = path.join(__dirname, "..", dest);

      if (!existsSync(originPath)) {
         console.log(`${originPath} does not exist.`);
         return;
      }

      if (existsSync(destPath)) {
         console.log(`${destPath} exists. Deleting contents...`);
         del.sync([destPath + "/**", `!${destPath}`], { force: true, concurrency: 1 });
      }

      moveFiles(originPath, destPath);
   } else {
      console.log(`Valid arguments are --o for origin and --d for destination`);
   }
};

scriptCode();

import recursive from "recursive-readdir";
import * as path from "path";
import { existsSync, writeFileSync } from "fs";

const pathToSass = path.join(__dirname, "..", "..", "styles");

const importOrder = ["vendors", "abstracts", "base", "pages", "containers", "components", "layout"];

const MakeNewSass = async () => {
   if (existsSync(pathToSass)) {
      recursive(pathToSass, function(err, files) {
         // `files` is an array of file paths
         let newMainSCSS =
            "// ****** This is an auto generated file. Do not edit directly ******\n";
         newMainSCSS += '@import "normalize.css";\n';

         const folders = {};

         files.sort();
         files.forEach(file => {
            const str = file.split(process.platform === "win32" ? "\\" : "/");
            const currentFolder = str[str.length - 2];
            const currentFile = str[str.length - 1];
            if (currentFile[0] === "_" && currentFile.slice(currentFile.length - 5) === ".scss") {
               folders[currentFolder] = folders[currentFolder] ? folders[currentFolder] : [];
               folders[currentFolder].push(
                  `@import \'./${currentFolder}/${currentFile.slice(
                     1,
                     currentFile.length - 5
                  )}\';\n`
               );
            }
         });

         for (const folder of importOrder) {
            if (folders.hasOwnProperty(folder)) {
               const arr = folders[folder];
               arr.forEach(statement => {
                  newMainSCSS += statement;
               });
            }
         }

         writeFileSync(pathToSass + "/main.scss", newMainSCSS, "utf8");
      });
   }
};

export { MakeNewSass as default };

MakeNewSass();

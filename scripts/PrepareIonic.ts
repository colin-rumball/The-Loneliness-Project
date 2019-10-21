import * as path from "path";
import glob from "glob";
// import { join } from "path";
import fs from "fs";

const pathToWWW = path.join(__dirname, "..", "www");
const pathToIndex = path.join(pathToWWW, "index.html");
const pathTo_Next = path.join(pathToWWW, "_next");
const pathToNext = path.join(pathToWWW, "next");

enum FILE_TYPE {
   HTML,
   JS
}

const replace = async (source: string, replaceMe: string, withMe: string): Promise<string> => {
   while (source.indexOf(replaceMe) !== -1) {
      source = source.replace(replaceMe, withMe);
   }
   return source;
};

const replaceAllInFile = async (file: string, fileType: FILE_TYPE) => {
   return new Promise(async (resolve, reject) => {
      fs.readFile(file, "utf8", async (error, fileData) => {
         if (error) reject(error);

         // Replace all /_next/ references
         let newFileData: string = await replace(fileData, "/_next/", "next/");

         if (fileType === FILE_TYPE.HTML) {
            // Replace all src="/static/ references
            newFileData = await replace(newFileData, 'src="/static/', 'src="static/');
         }

         fs.writeFile(file, newFileData, err => {
            if (err) {
               console.error(
                  `An error occurred file trying to write the file ${file} with new data.`
               );
               return;
            }
            resolve(newFileData);
         });
      });
   });
};

const processFiles = async (files: string[], fileType: FILE_TYPE) => {
   try {
      await Promise.all(files.map(file => replaceAllInFile(file, fileType)));
   } catch (error) {
      console.error(
         `An error occurred while processing the ${fileType} files in www, error: ${error}.`
      );
      return;
   }
};

const globWrapper = async (globPattern: string, fileType: FILE_TYPE) => {
   return new Promise((resolve, reject) => {
      glob(globPattern, {}, async (err, files) => {
         if (err) reject(err);
         await processFiles(files, fileType);
         resolve();
      });
   });
};

const scriptCode = async () => {
   if (fs.existsSync(pathToIndex)) {
      // Replace in each html file
      await Promise.all([
         globWrapper(`${pathToWWW}/**/*.html`, FILE_TYPE.HTML),
         globWrapper(`${pathToWWW}/**/*.js`, FILE_TYPE.JS)
      ]);
      console.log("All exported html and js files processed for Ionic.");

      // Rename next folder
      fs.renameSync(pathTo_Next, pathToNext);
   } else {
      console.error(`${pathToIndex} does not exist.`);
   }
};

scriptCode();

import { readdir, statSync } from "fs";
import { join, parse } from "path";
import { argv } from "yargs";
import ResizeImage from "./scriptUtils/ResizeImage";

console.assert(argv.path || argv.p, "--path or --p arguments are required for Image Resizer.");
if (argv.path || argv.p) {
   const p: string = (argv.path || argv.p) as string;
   const pathToFolder = join(__dirname, "..", p);

   readdir(pathToFolder, (err, files) => {
      if (err) {
         console.error("An error occurred while trying to readdir of", pathToFolder, err);
         return;
      }

      files.forEach(file => {
         const stats = statSync(join(pathToFolder, file));
         if (!stats.isDirectory()) {
            const fileInfo = parse(file);

            const smallOutFile = fileInfo.name + "_small" + fileInfo.ext;
            ResizeImage({
               fileName: smallOutFile,
               inFilePath: join(pathToFolder, file),
               outFilePath: join(pathToFolder, "small", smallOutFile),
               outFileDir: join(pathToFolder, "small"),
               width: 360
            });

            const medOutFile = fileInfo.name + "_medium" + fileInfo.ext;
            ResizeImage({
               fileName: medOutFile,
               inFilePath: join(pathToFolder, file),
               outFilePath: join(pathToFolder, "medium", medOutFile),
               outFileDir: join(pathToFolder, "medium"),
               width: 640
            });

            const largeOutFile = fileInfo.name + "_large" + fileInfo.ext;
            ResizeImage({
               fileName: largeOutFile,
               inFilePath: join(pathToFolder, file),
               outFilePath: join(pathToFolder, "large", largeOutFile),
               outFileDir: join(pathToFolder, "large"),
               width: 920
            });
         }
      });
   });
} else {
}

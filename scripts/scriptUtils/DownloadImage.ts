import fs from "fs";
import request from "request";
import { argv } from "yargs";
import { join } from "path";

const PATH_TO_STATIC = join(__dirname, "..", "..", "static", "test");

const download = (uri, filename, callback) => {
   request.head(uri, function(err, res, body) {
      request(uri)
         .pipe(fs.createWriteStream(join(PATH_TO_STATIC, filename)))
         .on("close", callback);
   });
};

const scriptCode = async () => {
   if (argv.url && argv.filename) {
      process.stdout.write(`Downloading ${argv.filename} from ${argv.url}`);

      download(argv.url, argv.filename, () => {
         process.stdout.write(`Finished downloading ${argv.filename} from ${argv.url}.`);
      });
   } else {
      console.log("DownloadImages.ts requires a url and filename.");
   }
};

scriptCode();

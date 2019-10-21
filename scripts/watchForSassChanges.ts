import { watch } from "chokidar";
import { join } from "path";
import MakeNewSass from "./scriptUtils/MakeNewSass";

const pathToSass = join(__dirname, "..", "src", "styles");

let executing = false;

const makeSass = async () => {
   if (!executing) {
      executing = true;
      try {
         await MakeNewSass();
      } catch (error) {
         console.error(`MakeNewSass encountered an error: ${error}.`);
         console.log("Closing Sass watcher. Please restart task to begin again.");
         watcher.close();
      }
      executing = false;
   }
};

var watcher = watch(pathToSass, {
   ignored: /(^|[\/\\])\../,
   persistent: true,
   ignoreInitial: true
});

watcher.on("add", makeSass).on("unlink", makeSass);

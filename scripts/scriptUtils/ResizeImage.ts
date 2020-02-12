import tinify from "tinify";
import sharp from "sharp";
import { join } from "path";

tinify.key = "NF5LF3TSJtH9gXrLw35Hy8xq2VyPKvjW";
// "3d9w4ThLZdykVtxJZvXCks3X42y4hF7c";
// "xYBpXJnWmkdw0PP3VNCgWPg04GL2Ds65";
// "DSr0HlYPbN9xj6zSKsvGCcdBP6gDYGfn"

export interface ResizeOptions {
   fileName: string;
   inFilePath: string;
   outFilePath: string;
   outFileDir: string;
   width: number;
}

const ResizeImage = (options: ResizeOptions) => {
   sharp(options.inFilePath)
      .resize(options.width)
      .toFile(join(options.outFilePath), (err, info) => {
         if (err) {
            console.error("An error occured while resizing", options.inFilePath, err);
            return;
         }

         const source = tinify.fromFile(options.outFilePath);
         source.toFile(join(options.outFileDir, "optimized", options.fileName));
      });
};

export default ResizeImage;

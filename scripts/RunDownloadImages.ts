import ExecuteCommand from "./scriptUtils/ExecuteCommand";

const LAST_IMAGE_INDEX = 20;
let count = 0;

const download = async imageNumber => {
   count++;
   const url = `https://thelonelinessproject.org/images/storey_${imageNumber}.png`;
   const filename = `storey_${imageNumber}.png`;
   await ExecuteCommand(
      `ts-node -P config/tsconfig.json scripts/scriptUtils/DownloadImage.ts --url=${url} --filename=${filename}`,
      `Download Apartment Image #${imageNumber}`,
      { logsEnabled: false }
   );
   count--;
};

const scriptCode = async () => {
   let currentImage = 1;

   const intervalID = setInterval(() => {
      while (count < 10) {
         const imageNumber = currentImage;
         currentImage++;

         try {
            if (imageNumber <= LAST_IMAGE_INDEX) download(imageNumber);
         } catch (err) {
            console.error(`Error while downloading image #${imageNumber}. ${err}`);
         }
      }

      if (currentImage > LAST_IMAGE_INDEX) {
         console.log("ALL DOWNLOADS STARTED");
         clearInterval(intervalID);
      }
   }, 500);
};

scriptCode();

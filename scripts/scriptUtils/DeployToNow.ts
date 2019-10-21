import { ShowConfirmationPrompt } from "./ShowPrompt";
import ExecuteCommand from "./ExecuteCommand";
import { STAGE, NOW_STAGE } from "./Constants";

const DeployToNow = async (target: STAGE) => {
   if (target === STAGE.NONE || target === STAGE.TEST) {
      throw new Error(
         `Valid targets for Now deploy are ${STAGE.DEVELOPMENT} or ${STAGE.PRODUCTION}.`
      );
   }

   // Deploy to now
   console.log(`Deploying Now to ${target}...`);
   let logsURL = "";
   const onDeploymentLog = message => {
      // Pull out the now logs command
      if (message.includes("now logs")) {
         const regex = /now logs .+.now.sh/;
         logsURL = message.match(regex)[0];
      }
   };

   const nowTarget = target === STAGE.PRODUCTION ? NOW_STAGE.PRODUCTION : NOW_STAGE.STAGING;
   const prefix = nowTarget === NOW_STAGE.PRODUCTION ? "deployable" : "debug";
   await ExecuteCommand(
      `now deploy --local-config=./${prefix}Now.json --target=${nowTarget}`,
      "Now Deployment",
      {
         onError: onDeploymentLog
      }
   );

   if (logsURL !== "") {
      try {
         await ShowConfirmationPrompt("Open logs file now?");
         await ExecuteCommand(logsURL, "Now Logs");
      } catch (err) {}
   }
};

export default DeployToNow;

import List from "prompt-list";
import { STAGE } from "./Constants";

const ANSWER_YES = "Yes";
const ANSWER_NO = "No";

export const ShowPrompt = (message, options): Promise<any> => {
   const list = new List({
      name: "PROMPT",
      message: message,
      choices: options
   });
   return list.run();
};

export const ShowConfirmationPrompt = confirmationMessage => {
   return new Promise((resolve, reject) => {
      const list = new List({
         name: "PROMPT",
         message: confirmationMessage,
         choices: [ANSWER_YES, ANSWER_NO]
      });
      list.run().then(answer => {
         if (answer === ANSWER_YES) resolve();
         if (answer === ANSWER_NO) reject();
      });
   });
};

export const ShowEnvPrompt = (withTest: boolean = false): Promise<STAGE> => {
   const targets = [STAGE.DEVELOPMENT, STAGE.PRODUCTION];
   if (withTest) targets.push(STAGE.TEST);
   return ShowPrompt("Which env are you targeting?", targets);
};

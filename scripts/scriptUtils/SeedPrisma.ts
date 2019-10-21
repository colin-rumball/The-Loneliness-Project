import { ShowConfirmationPrompt, ShowPrompt } from "./ShowPrompt";
import ExecuteCommand from "./ExecuteCommand";
import { STAGE } from "./Constants";

const confirmationAnswer = "Yes, continue with prisma reset and delete all data.";

const SeedPrisma = async (target: STAGE, shouldReset: boolean) => {
   if (target === STAGE.NONE) {
      throw new Error(
         `Valid targets for Seed Prisma are ${STAGE.DEVELOPMENT}, ${STAGE.TEST}, or ${STAGE.PRODUCTION}.`
      );
   }

   console.log(
      `Seeding prisma database at target ${target} with reset flag set to ${shouldReset}.`
   );

   if (shouldReset && target !== STAGE.TEST) {
      const answer = await ShowPrompt(
         `Found reset prisma flag with target not set to ${STAGE.TEST}. Continue?`,
         [confirmationAnswer, "No, cancel immediately."]
      );
      const reset = answer === confirmationAnswer ? true : false;

      if (!reset) {
         console.log("Cancelling...");
         throw new Error("Cancelled by user.");
      }
   }

   await ExecuteCommand(`prisma seed -e="./.env" ${shouldReset ? "-r" : ""}`, "Seed Prisma");
};

export default SeedPrisma;

import ExecuteCommand from "./ExecuteCommand";
import { STAGE } from "./Constants";

const DeployToPrisma = async (stage: STAGE) => {
   if (stage !== STAGE.NONE) {
      console.log(`Deploying Prisma to ${stage}...`);
      await ExecuteCommand(`prisma deploy --env-file .env`, "Prisma Deployment");
   }
};

export default DeployToPrisma;

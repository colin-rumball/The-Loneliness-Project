import { Prisma } from "../generated/prisma-client";

export const AddCustomPrismaFunctions = () => {
   // Prisma.prototype.customFunc = async function(): Promise<ReturnType> {
   //    const self = this as Prisma;
   //    return result;
   // };
};

export interface IPrismaWrapper extends Prisma {
   // customFunc(): Promise<ReturnType>;
}

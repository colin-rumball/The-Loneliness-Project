import Query from "./Query";
import Mutation from "./Mutation";
import User from "./User";
import { AddCustomPrismaFunctions } from "./../PrismaWrapper/PrismaWrapper";

AddCustomPrismaFunctions();

export const resolvers = {
   Query,
   Mutation
};

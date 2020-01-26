import { ContextParameters } from "graphql-yoga/dist/types";
import { Request, Response } from "express-serve-static-core";
import { User as PrismaUser } from "./../generated/prisma-client";
import { IPrismaWrapper } from "./../PrismaWrapper/PrismaWrapper";

export interface ResolveContext extends ContextParameters {
   user: PrismaUser;
   prisma: IPrismaWrapper;
   request: Request;
   response: Response;
}

import { ContextParameters } from "graphql-yoga/dist/types";
import { Request, Response } from "express-serve-static-core";
import { User as PrismaUser } from "./../generated/prisma-client";
import { IPrismaWrapper } from "./../PrismaWrapper/PrismaWrapper";
import Pusher from "pusher";

export interface ResolveContext extends ContextParameters {
   pusher: Pusher;
   user: PrismaUser;
   prisma: IPrismaWrapper;
   request: Request;
   response: Response;
}

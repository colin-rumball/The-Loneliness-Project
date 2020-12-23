import { User, Prisma } from "../generated/prisma-client";
import { ContextParameters } from "graphql-yoga/dist/types";
import { Request, Response } from "express-serve-static-core";

export enum Permission {
   ADMIN = "ADMIN",
   USER = "USER"
}

export interface RequestWrapper extends Request {
   userId: string;
   user: User;
}

interface ResolveContext extends ContextParameters {
   prisma: Prisma;
   request: RequestWrapper;
   response: Response;
}

interface ResolverContainer {
   [index: string]: (parent, args, ctx: ResolveContext, info) => {};
}

export default ResolverContainer;

import { User, PrismaClient } from "@prisma/client";
import { IncomingMessage, ServerResponse } from "http";

export interface Context {
   user?: User;
   req: IncomingMessage;
   res: ServerResponse;
   prisma: PrismaClient;
}

const createContext = ({ req, res }): Context => {
   const prisma = new PrismaClient();
   return {
      user: undefined,
      req,
      res,
      prisma,
   };
};

export default createContext;

import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { prisma } from "./../generated/prisma-client";
import Mutation from "./../resolvers/Mutation";
import Query from "./../resolvers/Query";
import ResolverErrorBoundary from "../middleware/ResolverErrorBoundary";

const createServer = (pathToSchema: string) =>
   new GraphQLServer({
      typeDefs: importSchema(pathToSchema),
      resolvers: {
         Mutation: Mutation,
         Query: Query
      },
      middlewares: [ResolverErrorBoundary],
      context(request) {
         return {
            prisma: prisma,
            request: request.request,
            response: request.response
         };
      }
   });

export default createServer;

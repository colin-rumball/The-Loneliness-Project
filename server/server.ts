import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./resolvers/index";
import { prisma } from "./generated/prisma-client";
import { join } from "path";
import jwt from "jsonwebtoken";
import extractDecodedToken from "./serverUtils/extractDecodedToken";

const pathToSchema = join(
   __dirname,
   "generated",
   `${process.env.PD_STAGING_ENVIRONMENT}Schema.graphql`
);

const extractUserMiddleware = async (resolve, root, args, context, info) => {
   try {
      const token = extractDecodedToken(context.request);
      if (token && token.userId) {
         const user = await prisma.user({ id: token.userId });
         context.user = user;
      }
   } catch (err) {
      if (err.name !== "TokenExpiredError") {
         console.log("TCL: extractUserMiddleware -> err", err);
      }
   }
   const result = await resolve(root, args, context, info);
   return result;
};

const server = new GraphQLServer({
   typeDefs: pathToSchema,
   resolvers,
   middlewares: [extractUserMiddleware],
   context(request) {
      return {
         prisma,
         request: request.request,
         response: request.response
      };
   }
});

export { server as default };

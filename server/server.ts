import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./resolvers/index";
import { prisma } from "./generated/prisma-client";
// import Pusher from "pusher";
import { join } from "path";
import jwt from "jsonwebtoken";

const pathToSchema = join(
   __dirname,
   "generated",
   `${process.env.PD_STAGING_ENVIRONMENT}Schema.graphql`
);

const extractUserMiddleware = async (resolve, root, args, context, info) => {
   const req = context.request;

   if (req) {
      const authorizationHeader = req.headers && req.headers.authorization;

      if (
         typeof authorizationHeader == "string" &&
         authorizationHeader != null &&
         authorizationHeader != "null"
      ) {
         const token = authorizationHeader.replace("Bearer ", "");
         if (token != "") {
            const decoded = jwt.verify(token, process.env.SECRET_PD_JWT_SECRET);

            if (decoded && decoded.userId) {
               const user = await prisma.user({ id: decoded.userId });
               context.user = user;
            }
         }
      }
   }
   const result = await resolve(root, args, context, info);
   return result;
};

// var pusher = new Pusher({
//    appId: process.env.SECRET_PD_PUSHER_ID,
//    key: process.env.PD_PUSHER_KEY,
//    secret: process.env.SECRET_PD_PUSHER_SECRET,
//    cluster: "us2",
//    useTLS: true
// });

const server = new GraphQLServer({
   typeDefs: pathToSchema,
   resolvers,
   middlewares: [extractUserMiddleware],
   context(request) {
      return {
         // pusher,
         prisma,
         request: request.request,
         response: request.response
      };
   }
});

export { server as default };

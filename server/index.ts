import "@babel/polyfill/noConflict";
import { formatError } from "apollo-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import { join } from "path";
import { prisma } from "./generated/prisma-client";
import createServer from "./serverUtils/createServer";

const graphQLEndpoint = "/graphql";
const port = process.env.PORT || 4000;
const targetStage = process.env.STAGING_ENVIRONMENT;
const playground = targetStage === "development" ? graphQLEndpoint : false;
const pathToSchema = join(__dirname, `schema.graphql`);

const server = createServer(pathToSchema);

server.express.use(
   cors({
      origin: process.env.LOCAL_DEVELOPMENT ? "*" : process.env.FRONTEND_ENDPOINT,
      credentials: true
   })
);
server.express.use(cookieParser());

// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
   const { token } = req.cookies;
   if (token) {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      // put the userId onto the req for future requests to access
      req["userId"] = userId;
   }
   next();
});

// middleware that populates the user on each request
server.express.use(async (req, res, next) => {
   // if they aren't logged in, skip this
   if (!req["userId"]) return next();
   const user = await prisma.user({ id: req["userId"] });
   req["user"] = user;
   next();
});

server.start(
   {
      port,
      formatError,
      endpoint: graphQLEndpoint,
      playground,
      cors: false
   },
   ops => {
      console.log(
         `The ${targetStage} server is up on port ${ops.port} at endpoint ${ops.endpoint}`
      );
   }
);

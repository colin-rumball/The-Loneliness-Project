import { makeSchema } from "nexus";
import { applyMiddleware } from "graphql-middleware";
import { nexusPrisma } from "nexus-plugin-prisma";
import path from "path";
import Permissions from "../middleware/Permissions";
import PopulateUserFromCookie from "../middleware/PopulateUserFromCookie";
import PrismaDisconnect from "../middleware/PrismaDisconnect";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import ErrorBoundary from "../middleware/ErrorBoundary";
import Story from "./resolvers/Story";

const createSchema = () => {
   const pathToGenerated = path.resolve("backend/generated");
   return makeSchema({
      types: [User, Story],
      plugins: [
         nexusPrisma({
            outputs: {
               typegen: path.resolve("backend/generated")
            }
         })
      ]
      // outputs: {
      //    typegen: path.resolve(pathToGenerated, "nexus.ts")
      // }
      // typegenAutoConfig: {
      //    contextType: "Context.Context",
      //    sources: [
      //       {
      //          source: "@prisma/client",
      //          alias: "prisma",
      //       },
      //       {
      //          source: path.resolve("backend/src/utils/createContext.ts"),
      //          alias: "Context",
      //       },
      //    ],
      // },
   });
};

const SchemaWithMiddleware = applyMiddleware(
   createSchema(),
   PrismaDisconnect,
   PopulateUserFromCookie,
   Permissions,
   ErrorBoundary
);

export default SchemaWithMiddleware;

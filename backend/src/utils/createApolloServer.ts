import { ApolloServer } from "apollo-server-micro";
import createContext from "./createContext";
import FormatError from "../errors/FormatError";
import SchemaWithMiddleware from "../schema/SchemaWithMiddleware";

const isDevelopment = process.env.STAGING_ENVIRONMENT == "development";

const createApolloServer = (): ApolloServer => {
   return new ApolloServer({
      debug: isDevelopment,
      playground: isDevelopment,
      introspection: isDevelopment,
      formatError: FormatError,
      schema: SchemaWithMiddleware,
      context: createContext,
   });
};

export default createApolloServer;

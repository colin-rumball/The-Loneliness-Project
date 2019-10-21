import { importSchema } from "graphql-import";
import { join } from "path";
import { writeFileSync } from "fs";
import { STAGE } from "./Constants";

const pathToServer = join(__dirname, "..", "..", "server");
const pathToSchema = join(pathToServer, "schema.graphql");

const BuildGraphQLSchema = (target: STAGE) => {
   console.log(`Building usable graphql schema for ${target}`);
   const orgSchema = importSchema(pathToSchema);
   writeFileSync(`${pathToServer}/generated/${target.toLowerCase()}Schema.graphql`, orgSchema);
};

export default BuildGraphQLSchema;

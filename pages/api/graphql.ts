// import "./../../backend/generated/index";
// import "./../../backend/generated/nexus";
import { formatError } from "apollo-errors";
import cookieParser from "cookie-parser";
// import cors from "cors";
import createApolloServer from "../../backend/src/utils/createApolloServer";
import signToken from "./../../backend/src/utils/signToken";
import cors from "micro-cors";

// const graphQLEndpoint = "/graphql";
// const port = process.env.PORT || 4000;
// const targetStage = process.env.STAGING_ENVIRONMENT;
// const playground = targetStage === "development" ? graphQLEndpoint : false;

const gqlServer = createApolloServer();
const gqlHandler = gqlServer.createHandler({ path: "/api/graphql" });

// lambda.express.use(
//    cors({
//       origin: process.env.ENDPOINT,
//       credentials: true,
//    })
// );
// lambda.express.use(cookieParser());

// lambda.start(
//    {
//       port,
//       endpoint: graphQLEndpoint,
//       playground,
//       formatError,
//       debug: true,
//       cors: false,
//    },
//    (ops) => {
//       console.log(
//          `The ${targetStage} server is up on port ${ops.port} at endpoint ${ops.endpoint}`
//       );
//    }
// );

// const middleware = [decodeJWT];

// const lambda = async (req, res) => {
// 	for (const func of middleware) {
// 		await func(req, res);
// 	}
// 	return await gqlHandler(req, res);
// }

export const config = {
   api: {
      bodyParser: false,
   },
};

export default gqlHandler; // cors(parseToken, gqlServer.createHandler({ path: "/api/graphql" }));

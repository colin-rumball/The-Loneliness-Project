import "@babel/polyfill/noConflict";
import cookieParser from "cookie-parser";
import cors from "cors";
import server from "./server";

const graphQLEndpoint = "/graphql";

const port = process.env.PORT || 4000;
const targetStage = process.env.PD_STAGING_ENVIRONMENT;
const debug = process.env.PD_LOCAL_DEVELOPMENT ? true : false;
const playground = targetStage === "development" ? graphQLEndpoint : false;

const corsOptions = {
   origin: "*",
   credentials: true
};

server.express.use(cors(corsOptions));

server.express.use(cookieParser());

server.start(
   {
      port,
      endpoint: graphQLEndpoint,
      playground,
      cors: false,
      debug
   },
   ops => {
      console.log(
         `The ${targetStage} server is up on port ${ops.port} at endpoint ${ops.endpoint}`
      );
   }
);

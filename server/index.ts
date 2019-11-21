import "@babel/polyfill/noConflict";
import cookieParser from "cookie-parser";
import cors from "cors";
import { formatError } from "apollo-errors";
import multer from "multer";
import server from "./server";
import fs from "fs";
import { join } from "path";

const graphQLEndpoint = "/graphql";

const upload = multer();

const port = process.env.PORT || 4000;
const targetStage = process.env.PD_STAGING_ENVIRONMENT;
const debug = process.env.PD_LOCAL_DEVELOPMENT ? true : false;
const playground = targetStage === "development" ? graphQLEndpoint : false;

const corsOptions = {
   origin: "http://localhost:3000",
   credentials: true
};

server.express.use(cors(corsOptions));

server.express.use(cookieParser());

server.express.post("/upload", upload.any(), (req, res) => {
   const files = req["files"];
   if (files && files.length > 0) {
      fs.writeFileSync(
         join(__dirname, "..", "static", "apartments", files[0].originalname),
         files[0].buffer
      );
      res.sendStatus(200);
   } else {
      res.sendStatus(400);
   }
});

server.start(
   {
      port,
      formatError,
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

import debug from "debug";

const ServerLogger = debug("SERVER");
if (process.env.STAGING_ENVIRONMENT == "development") {
   debug.enable("SERVER");
}

export default ServerLogger;

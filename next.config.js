const withSourceMaps = require("@zeit/next-source-maps");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");

// Create Next JS config
const config = {
   target: process.env.PD_IONIC_DEPLOYMENT ? "server" : "serverless",
   env: {},
   cssLoaderOptions: {
      url: false
   }
};

for (const key in process.env) {
   if (key.substring(0, 10) !== "SECRET_PD_" && key.substring(0, 3) === "PD_") {
      config.env[key] = process.env[key];
   }
}

module.exports = withPlugins([[withSourceMaps], [withImages], [withSass], [withCSS, {}]], config);

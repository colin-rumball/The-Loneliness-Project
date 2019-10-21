import server from "./../../server/server";

const graphQLEndpoint = "/graphql";

const port = process.env.PORT || 4000;

const setup = async () => {
   (global as any).testGQLServer = await server.start(
      {
         endpoint: graphQLEndpoint,
         subscriptions: graphQLEndpoint,
         cors: {
            origin: "*",
            credentials: true
         }
      },
      () => {
         console.log(`The server is up on port ${port}`);
      }
   );
};

export default setup;

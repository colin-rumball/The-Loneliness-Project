import "cross-fetch/polyfill";
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from "apollo-boost";
import fetch from "isomorphic-unfetch";

const useFullEndpoint = process.env.PD_IONIC_DEPLOYMENT;
let endpoint = useFullEndpoint ? process.env.PD_FRONTEND_ENDPOINT : "";

endpoint =
   process.env.PD_LOCAL_DEVELOPMENT && process.env.PD_USE_LOCAL_SERVER
      ? "http://localhost:4000"
      : endpoint;

const graphQLEndpoint = endpoint + "/graphql"; // needs to be full graphqlEndpoint for ionic not just "/graphql"

let apolloClient = null;

function create(initialState) {
   // const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : "";
   const isBrowser = typeof window !== "undefined";

   const httpLink = new HttpLink({
      uri: graphQLEndpoint, // Server URL (must be absolute)
      credentials: "include", // Additional fetch() options like `credentials` or `headers`
      // headers: {
      //    authorization: typeof localStorage !== "undefined" ? localStorage.getItem("token") : ""
      // },
      fetch: fetch
   });

   // const authMiddleware = new ApolloLink((operation, forward) => {
   //    // add the authorization to the headers
   //    const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : "";
   //    if (token) {
   //       operation.setContext({
   //          headers: {
   //             authorization: "Bearer " + token
   //          }
   //       });
   //    }

   //    return forward(operation);
   // });

   return new ApolloClient({
      connectToDevTools: isBrowser,
      ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
      link: httpLink, //concat(authMiddleware, httpLink),
      cache: new InMemoryCache().restore(initialState || {})
   });
}

export default function initApollo(initialState) {
   // Make sure to create a new client for every server-side request so that data
   // isn't shared between connections (which would be bad)
   if (typeof window === "undefined") {
      return create(initialState);
   }

   // Reuse client on the client-side
   if (!apolloClient) {
      apolloClient = create(initialState);
   }

   return apolloClient;
}

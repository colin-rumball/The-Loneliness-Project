import "cross-fetch/polyfill";
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from "apollo-boost";
import fetch from "isomorphic-unfetch";

const endpoint = process.env.LOCAL_DEVELOPMENT
   ? "http://localhost:3000"
   : process.env.FRONTEND_ENDPOINT;

const graphQLEndpoint = `${endpoint}/graphql`; // needs to be full graphqlEndpoint for ionic not just "/graphql"

let apolloClient = null;

function create(initialState) {
   // const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : "";
   const isBrowser = typeof window !== "undefined";

   const httpLink = new HttpLink({
      uri: "/graphql", // Server URL (must be absolute)
      credentials: process.env.LOCAL_DEVELOPMENT ? "include" : "same-origin", // Additional fetch() options like `credentials` or `headers`
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

import { ApolloError } from "apollo-boost";

const useGQLErrorHandler = (err: ApolloError) => {
   console.log("TCL: useGQLErrorHandler -> err", err);
};

export default useGQLErrorHandler;

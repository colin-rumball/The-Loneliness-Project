import { ApolloError } from "apollo-boost";
import { ErrorNames } from "../gql/errors";
import { useRouter } from "next/router";
import { useCallback } from "react";

const useGQLErrorHandler = () => {
   const router = useRouter();

   const onError = useCallback(
      (err: any) => {
         if (err.graphQLErrors.some(e => e.name == ErrorNames.AUTHENTICATION_REQUIRED)) {
            // router.replace("/login");
         } else {
            console.log("TCL: useGQLErrorHandler -> err", err);
         }
      },
      [router]
   );

   return { onError };
};

export default useGQLErrorHandler;

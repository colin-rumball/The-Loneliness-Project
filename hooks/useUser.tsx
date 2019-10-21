import { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "../gql/mutations";
import { useRouter } from "next/router";

const useUser = () => {
   const router = useRouter();
   // Grab token if it exists to determine if we need to create a user
   const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

   const [authenticated, setAuthenticated] = useState(!!token);
   const [createUser, { loading }] = useMutation(CREATE_USER, {
      onCompleted({ createUser }) {
         localStorage.setItem("token", createUser.token);
         setAuthenticated(true);
      },
      onError(err) {
         console.log("GraphQLError while creating user:", err);
         router.replace("/Error");
      }
   });

   useEffect(() => {
      if (token) {
         setAuthenticated(true);
      } else {
         // createUser({ variables: { name: generatedName } });
      }
   }, []);

   return { authenticated, creatingUser: loading };
};

export default useUser;

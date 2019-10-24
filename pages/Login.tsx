import React, { useMemo } from "react";
import UserForm from "../components/UserForm";
import styled from "styled-components";
import { LOGIN } from "../gql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";

const Login: React.FC = () => {
   const router = useRouter();
   const [login, {}] = useMutation(LOGIN, {
      onCompleted({ login }) {
         localStorage.setItem("token", login.token);
         router.replace("/Dashboard");
      },
      onError(err) {
         console.log("GraphQLError during login:", err);
      }
   });

   const StyledLoginPage = useMemo(
      () => styled.div`
         display: flex;
         justify-content: center;
         width: 100%;
      `,
      []
   );

   return (
      <StyledLoginPage>
         <UserForm
            title="Login"
            onFormSubmit={(username, password) => {
               login({ variables: { data: { username, password } } });
            }}
         />
      </StyledLoginPage>
   );
};

export default Login;

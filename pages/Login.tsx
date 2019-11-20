import React, { useMemo } from "react";
import UserForm from "../components/UserForm";
import styled from "styled-components";
import { LOGIN } from "../gql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { ThemeContainer } from "../styles/themes/DefaultTheme";

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
         flex-direction: column;
         justify-content: center;
         align-items: center;
         width: 100%;
         background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};
         height: 100%;
         min-height: 100vh;
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

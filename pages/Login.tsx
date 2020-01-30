import React, { useMemo } from "react";
import UserForm from "../components/UserForm";
import styled from "styled-components";
import { LOGIN } from "../gql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { ThemeContainer } from "../themes/common";
import Spinner from "../components/Spinner";
import MessageModal from "../containers/modals/MessageModal";
import { useModalContext } from "../contexts/ModalContext";

const Login: React.FC = () => {
   const router = useRouter();
   const { pushModal } = useModalContext();
   const [login, { data, loading }] = useMutation(LOGIN, {
      onCompleted(data) {
         if (data && data.login) {
            setTimeout(() => {
               router.replace("/dashboard");
            }, 1500);
         }
      },
      onError(err) {
         pushModal(<MessageModal message="Unable to login with provided username and password." />);
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
         {loading || (data && data.login) ? (
            <Spinner />
         ) : (
            <UserForm
               inverted={false}
               title="Login"
               onFormSubmit={(username, password) => {
                  login({ variables: { data: { username, password } } });
               }}
            />
         )}
      </StyledLoginPage>
   );
};

export default Login;

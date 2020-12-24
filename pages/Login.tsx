import React, { useMemo, useCallback } from "react";
import UserForm from "../components/UserForm";
import styled from "styled-components";
// import { LOGIN } from "../gql/mutations";
import { useRouter } from "next/router";
import { ThemeContainer } from "../themes/common";
import Spinner from "../components/Spinner";
import MessageModal from "../containers/modals/MessageModal";
import useModalSystemHelper from "../hooks/useModalSystemHelper";

const Login: React.FC = () => {
   return <></>;
   // const router = useRouter();
   // const { pushModal } = useModalSystemHelper();
   // const [login, { data, loading }] = useMutation(LOGIN, {
   //    onCompleted(data) {
   //       console.log("GOING TO DASHBOARD");

   //       router.replace("/dashboard");
   //    },
   //    onError(err) {
   //       console.error("login error:", err.message);
   //       pushModal(<MessageModal message="Unable to login with provided username and password." />);
   //    }
   // });

   // const onFormSubmit = useCallback(
   //    async (username, password) => {
   //       login({ variables: { data: { username, password } } });
   //    },
   //    [pushModal]
   // );

   // const StyledLoginPage = useMemo(
   //    () => styled.div`
   //       display: flex;
   //       flex-direction: column;
   //       justify-content: center;
   //       align-items: center;
   //       width: 100%;
   //       background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};
   //       height: 100%;
   //       min-height: 100vh;
   //    `,
   //    []
   // );

   // return (
   //    <StyledLoginPage>
   //       {false || (data && data.login) ? (
   //          <Spinner />
   //       ) : (
   //          <UserForm inverted={false} title="Login" onFormSubmit={onFormSubmit} />
   //       )}
   //    </StyledLoginPage>
   // );
};

export default Login;

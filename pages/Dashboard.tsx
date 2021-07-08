// import { useMutation, useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
// import styled from "styled-components";
// import ApartmentList from "../containers/ApartmentList";
// import ConfirmationModal from "../containers/modals/ConfirmationModal";
// import UserList from "../containers/UserList";
// import { LOGOUT } from "../gql/mutations";
// import { ME } from "../gql/queries";
// import useModalSystemHelper from "../hooks/useModalSystemHelper";
// import { ThemeContainer } from "../themes/common";
// import { NextPageContext } from "next";
// import nextCookie from "next-cookies";

const Dashboard = ({ myName }) => {
   return <></>;
   // const router = useRouter();
   // const { pushModal } = useModalSystemHelper();
   // const [logout] = useMutation(LOGOUT, {
   //    onCompleted() {
   //       router.replace("/");
   //    },
   //    onError(err) {
   //       console.log(err);
   //    }
   // });

   // const onLogoutClicked = useCallback(() => {
   //    pushModal(
   //       <ConfirmationModal
   //          onContinueClicked={() => logout()}
   //          message="Are you sure you'd like to logout?"
   //       />
   //    );
   // }, []);

   // const StyledDashboardPage = useMemo(
   //    () => styled.div<any>`
   //       display: flex;
   //       flex-direction: column;
   //       width: 100%;
   //       height: 100%;
   //       min-height: 100vh;
   //       background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};
   //    `,
   //    []
   // );

   // const StyledPageHeader = useMemo(
   //    () => styled.div<any>`
   //       display: flex;
   //       justify-content: space-between;
   //       width: 100%;
   //       font-family: "lato", sans-serif;
   //       color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
   //       background: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.DarkBlue};
   //       border-bottom: ${({ theme }: ThemeContainer) => `1px solid ${theme.VARIABLES.COLORS.Tan}`};
   //       padding: 5px 10px;
   //       margin-bottom: 10px;
   //    `,
   //    []
   // );

   // const StyledMinimalButton = useMemo(
   //    () => styled.span<any>`
   //       &:hover {
   //          color: #fff;
   //          cursor: pointer;
   //       }
   //    `,
   //    []
   // );

   // return (
   //    <StyledDashboardPage>
   //       <StyledPageHeader>
   //          <span>Hello, {myName}</span>
   //          <StyledMinimalButton onClick={() => router.push("/")}>
   //             The Loneliness Project
   //          </StyledMinimalButton>
   //          <StyledMinimalButton onClick={onLogoutClicked}>Logout</StyledMinimalButton>
   //       </StyledPageHeader>
   //       <UserList />
   //       <ApartmentList />
   //    </StyledDashboardPage>
   // );
};

// Dashboard.getInitialProps = async (ctx: NextPageContext) => {
//    const redirectOnError = () => {
//       if (process.browser) {
//          window.location.href = "/login";
//       } else {
//          ctx.res.writeHead(301, { Location: "/login" });
//          ctx.res.end();
//       }
//    };

//    const { token } = nextCookie(ctx);

//    if (!token && !process.browser) {
//       redirectOnError();
//       return {};
//    }

//    return {};
// };

export default Dashboard;

import React, { useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ME } from "../gql/queries";
import { LOGOUT } from "../gql/mutations";
import UserList from "../containers/UserList";
import ApartmentList from "../containers/ApartmentList";
import { ThemeContainer } from "../styles/themes/DefaultTheme";
import useModal from "../hooks/useModal";
import ConfirmationModal from "../containers/modals/ConfirmationModal";

const Dashboard: React.FC = () => {
   const router = useRouter();
   const { pushModal } = useModal();
   const [logout] = useMutation(LOGOUT);

   const { data, loading } = useQuery(ME, {
      onCompleted(data) {
         if (!data || !data.me) {
            router.replace("/login");
         }
      }
   });

   const onLogoutClicked = useCallback(() => {
      pushModal({
         html: (
            <ConfirmationModal
               onContinueClicked={async () => {
                  logout();
                  router.replace("/");
               }}
               message="Are you sure you'd like to logout?"
            />
         )
      });
   }, []);

   const StyledDashboardPage = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         width: 100%;
         height: 100%;
         min-height: 100vh;
         background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};
      `,
      []
   );

   const StyledPageHeader = useMemo(
      () => styled.div`
         display: flex;
         justify-content: space-between;
         width: 100%;
         font-family: "lato", sans-serif;
         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
         background: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.DarkBlue};
         border-bottom: ${({ theme }: ThemeContainer) => `1px solid ${theme.VARIABLES.COLORS.Tan}`};
         padding: 5px 10px;
         margin-bottom: 10px;
      `,
      []
   );

   const StyledMinimalButton = useMemo(
      () => styled.span`
         &:hover {
            color: #fff;
            cursor: pointer;
         }
      `,
      []
   );

   if (!data || !data.me || loading) return <></>;

   return (
      <StyledDashboardPage>
         <StyledPageHeader>
            <span>Hello, {data.me.user.username}</span>
            <StyledMinimalButton onClick={() => router.push("/")}>
               The Loneliness Project
            </StyledMinimalButton>
            <StyledMinimalButton onClick={onLogoutClicked}>Logout</StyledMinimalButton>
         </StyledPageHeader>
         <UserList />
         <ApartmentList />
      </StyledDashboardPage>
   );
};

export default Dashboard;

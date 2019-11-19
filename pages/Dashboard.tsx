import React, { useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../components/Base/Button";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { USERS } from "../gql/queries";
import useGQLErrorHandler from "../hooks/useGQLErrorHandler";
import { LOGOUT } from "../gql/mutations";
import UserList from "../containers/UserList";
import Card from "../components/Base/Card";
import ApartmentList from "../containers/ApartmentList";
import { ThemeContainer } from "../styles/themes/DefaultTheme";

const Dashboard: React.FC = () => {
   const router = useRouter();
   const [logout] = useMutation(LOGOUT);

   const StyledDashboardPage = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         width: 100%;
         height: 100%;
         min-height: 100vh;
         background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
      `,
      []
   );

   return (
      <StyledDashboardPage>
         <UserList />
         <ApartmentList />
         {/* <Button text="Logout" onClick={() => logout()} /> */}
      </StyledDashboardPage>
   );
};

export default Dashboard;

import React, { useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../components/Base/Button";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { USERS } from "../gql/queries";
import useGQLErrorHandler from "../hooks/useGQLErrorHandler";
import { LOGOUT } from "../gql/mutations";

const Dashboard: React.FC = () => {
   const router = useRouter();

   const {} = useQuery(USERS, {
      onCompleted(data) {
         console.log("TCL: {} -> data", data);
      },
      onError: useGQLErrorHandler
   });

   const [logout] = useMutation(LOGOUT);

   const StyledDashboardPage = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         width: 100%;
         height: 100%;
         min-height: 100vh;
         background-color: ${({ theme }) => theme.Tan};
      `,
      []
   );

   return (
      <StyledDashboardPage>
         <div>Add / Edit / Remove Apartments</div>
         <div>Add / Edit / Remove Accounts</div>
         <Button text="Logout" onClick={() => logout()} />
      </StyledDashboardPage>
   );
};

export default Dashboard;

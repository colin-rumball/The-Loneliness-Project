import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { USERS } from "../gql/queries";
import useGQLErrorHandler from "../hooks/useGQLErrorHandler";
import { FaTimes, FaPlusSquare } from "react-icons/fa";
import Card from "../components/Base/Card";
import useModal from "../hooks/useModal";
import AddUserModal from "./modals/AddUserModal";
import { CREATE_USER, DELETE_USER } from "../gql/mutations";
import ConfirmationModal from "./modals/ConfirmationModal";
import MainTheme from "../styles/themes/MainTheme";

const UserList: React.FC = () => {
   const { pushModal } = useModal();
   const { data, loading } = useQuery(USERS, {
      onCompleted(data) {
         console.log("TCL: {} -> data", data);
      },
      onError: useGQLErrorHandler
   });

   const StyledUserList = useMemo(
      () => styled.table`
         width: 100%;
         text-align: center;
      `,
      []
   );

   const StyledAddIcon = useMemo(
      () => styled(FaPlusSquare)`
         color: ${({ theme }) => theme.Grey};
         &:hover {
            cursor: pointer;
            color: ${({ theme }) => theme.DarkGrey};
            transition: color 0.3s;
         }
      `,
      []
   );

   const StyledRemoveIcon = useMemo(
      () => styled(FaTimes)`
         color: ${({ theme }) => theme.Grey};
         &:hover {
            cursor: pointer;
            color: ${({ theme }) => theme.Red};
            transition: color 0.3s;
         }
      `,
      []
   );

   const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER);
   const [deleteUser, { loading: deletingUser }] = useMutation(DELETE_USER);

   const onCreateUser = useCallback((username, password) => {
      createUser({ variables: { data: { username, password } } });
   }, []);

   if (loading) return <>Loading</>;

   return (
      <Card
         header={{
            text: "Users",
            actions: [
               <StyledAddIcon
                  onClick={() =>
                     pushModal({
                        html: <AddUserModal onCreateUser={onCreateUser} creating={creatingUser} />
                     })
                  }
               />
            ]
         }}
      >
         <StyledUserList>
            <tbody>
               <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Remove</th>
               </tr>

               {data &&
                  data.users &&
                  data.users.map(user => (
                     <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.id}</td>
                        <td>
                           <StyledRemoveIcon
                              onClick={() =>
                                 pushModal({
                                    showCloseButton: false,
                                    background: MainTheme.LightBlue,
                                    html: (
                                       <ConfirmationModal
                                          onContinueClicked={() =>
                                             deleteUser({ variables: { userId: user.id } })
                                          }
                                          message={`Are you sure you'd like to delete the user "${user.username}"?`}
                                       />
                                    )
                                 })
                              }
                           />
                        </td>
                     </tr>
                  ))}
            </tbody>
         </StyledUserList>
      </Card>
   );
};

export default UserList;

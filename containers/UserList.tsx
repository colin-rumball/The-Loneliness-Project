import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { USERS } from "../gql/queries";
import useGQLErrorHandler from "../hooks/useGQLErrorHandler";
import { FaTimes } from "react-icons/fa";
import useModal from "../hooks/useModal";
import AddUserModal from "./modals/AddUserModal";
import { DELETE_USER } from "../gql/mutations";
import ConfirmationModal from "./modals/ConfirmationModal";
import FlexibleTable from "../components/Base/FlexibleTable";
import StyledIcon from "../components/Styled/StyledIcon";
import useCurrentTheme from "../hooks/useCurrentTheme";

const UserList: React.FC = () => {
   const { pushModal } = useModal();
   const { onError } = useGQLErrorHandler();
   const theme = useCurrentTheme();

   const { data, loading: loadingUserList, refetch, client } = useQuery(USERS, {
      onError
   });

   const [deleteUser, { loading: deletingUser }] = useMutation(DELETE_USER);

   return (
      <FlexibleTable
         loading={loadingUserList || deletingUser}
         header={{
            title: "Users",
            showAddButton: true,
            onAddButtonClicked: () =>
               pushModal({
                  html: <AddUserModal onNewUserCreated={() => refetch()} apolloClient={client} />
               })
         }}
         body={{
            TableHeaders: ["Name", "ID", "Remove"],
            TableRows:
               data &&
               data.users &&
               data.users.map(user => ({
                  id: user.id,
                  cells: [
                     user.username,
                     user.id,
                     <StyledIcon
                        icon={FaTimes}
                        hovercolor={theme.VARIABLES.COLORS.Red}
                        onClick={() =>
                           pushModal({
                              showCloseButton: false,
                              html: (
                                 <ConfirmationModal
                                    onContinueClicked={async () => {
                                       await deleteUser({ variables: { userId: user.id } });
                                       refetch();
                                    }}
                                    message={`Are you sure you'd like to delete the user "${user.username}"?`}
                                 />
                              )
                           })
                        }
                     />
                  ]
               }))
         }}
      />
   );
};

export default UserList;

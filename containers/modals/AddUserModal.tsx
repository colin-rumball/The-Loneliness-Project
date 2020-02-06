import React, { useMemo, useCallback, useContext, useEffect } from "react";
import UserForm from "../../components/UserForm";
import { CREATE_USER } from "../../gql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-boost";
import useModalSystemHelper from "../../hooks/useModalSystemHelper";
import withModalBase from "../../helpers/withModalBase";

interface AddUserModalProps {
   onNewUserCreated();
   apolloClient: ApolloClient<any>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ apolloClient, onNewUserCreated, ...rest }) => {
   const { popModal } = useModalSystemHelper();
   const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER, {
      client: apolloClient
   });

   const onCreateUser = useCallback(async (username, password) => {
      await createUser({ variables: { data: { username, password } } });
      onNewUserCreated();
      popModal();
   }, []);

   return <UserForm onFormSubmit={onCreateUser} inverted={true} title={"Add New User"} />;
};

export default withModalBase<AddUserModalProps>(AddUserModal);

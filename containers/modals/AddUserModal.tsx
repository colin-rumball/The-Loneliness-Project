import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import UserForm from "../../components/UserForm";
import ModalBase, { ModalBaseProps } from "./ModalBase";
import { CREATE_USER } from "../../gql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { useModalContext } from "../../contexts/ModalContext";

interface AddUserModalProps extends ModalBaseProps {
   onNewUserCreated();
}

const AddUserModal: React.FC<AddUserModalProps> = ({ apolloClient, onNewUserCreated, ...rest }) => {
   const { popModal } = useModalContext();
   const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER, {
      client: apolloClient
   });

   const onCreateUser = useCallback(async (username, password) => {
      await createUser({ variables: { data: { username, password } } });
      onNewUserCreated();
      popModal();
   }, []);

   return (
      <ModalBase showSpinner={creatingUser} {...rest}>
         <UserForm onFormSubmit={onCreateUser} inverted={true} title={"Add New User"} />
      </ModalBase>
   );
};

export default AddUserModal;

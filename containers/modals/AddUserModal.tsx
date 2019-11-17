import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import UserForm from "../../components/UserForm";
import ModalBase, { ModalBaseProps } from "./ModalBase";
import { CREATE_USER } from "../../gql/mutations";
import { useMutation } from "@apollo/react-hooks";
import useModal from "../../hooks/useModal";

interface AddUserModalProps extends ModalBaseProps {}

const AddUserModal: React.FC<AddUserModalProps> = ({ apolloClient, ...rest }) => {
   const { closeTopModal } = useModal();
   const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER, {
      client: apolloClient
   });

   const onCreateUser = useCallback(async (username, password) => {
      await createUser({ variables: { data: { username, password } } });
      closeTopModal();
   }, []);

   return (
      <ModalBase showSpinner={creatingUser} {...rest}>
         <UserForm onFormSubmit={onCreateUser} title={"Add New User"} />
      </ModalBase>
   );
};

export default AddUserModal;

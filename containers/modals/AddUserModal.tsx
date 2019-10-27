import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import UserForm from "../../components/UserForm";

interface AddUserModalProps {
   onCreateUser(username, password);
   creating?: boolean;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onCreateUser, creating }) => {
   if (creating) return <>Creating</>;

   return <UserForm onFormSubmit={onCreateUser} title={"Add New User"} />;
};

export default AddUserModal;

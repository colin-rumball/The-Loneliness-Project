import React, { useState, useCallback } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import styled from "styled-components";
import ManagedStyledInput from "./Forms/ManagedStyledInput";
import Button from "./Base/Button";
import { ThemeContainer } from "../themes/common";

const StyledLoginForm = styled.form<any>`
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   align-items: center;

   .form-title {
      font-family: "lato", sans-serif;
      font-size: 40px;
      font-weight: 100;
      color: ${({ theme, inverted }: ThemeContainer) =>
         inverted ? theme.VARIABLES.COLORS.DarkBlue : theme.VARIABLES.COLORS.Tan};
      margin: 0 0 20px 0;
      padding: 0;
   }
`;

const StyledErrorMessage = styled.span<any>`
   color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Red};
   padding: 10px 0;
`;

interface UserFormProps {
   title: string;
   inverted: boolean;
   onFormSubmit(username: string, password: string);
}

const UserForm: React.FC<UserFormProps> = ({ title, inverted, onFormSubmit }) => {
   // Username states
   const [username, setUsername] = useState("");
   const [usernameError, setUsernameError] = useState("");
   // Password states
   const [password, setPassword] = useState("");
   const [passwordError, setPasswordError] = useState("");

   const internalOnFormSubmit = useCallback(
      (event) => {
         event.preventDefault();

         // Validation
         if (!username) {
            return setUsernameError("Username must not be blank.");
         }

         if (!password) {
            return setPasswordError("Password must not be blank.");
         }

         if (password.length < 8) {
            return setPasswordError("Password must be 8 characters or longer.");
         }

         // Reset error messages
         setUsernameError("");
         setPasswordError("");

         onFormSubmit(username, password);
      },
      [username, password, onFormSubmit]
   );

   return (
      <StyledLoginForm inverted={inverted} onSubmit={internalOnFormSubmit}>
         {/* TITLE */}
         <div className="form-title">{title}</div>
         {/* USERNAME */}
         <ManagedStyledInput
            inverted={inverted}
            Icon={FaUser}
            value={username}
            error={usernameError}
            name="username"
            placeholder="Username"
            autoComplete="off"
            onChange={(event) => {
               setUsernameError("");
               setUsername(event.target.value);
            }}
         />
         {/* PASSWORD */}
         <ManagedStyledInput
            inverted={inverted}
            type="password"
            Icon={FaLock}
            value={password}
            error={passwordError}
            name="password"
            placeholder="Password"
            onChange={(event) => {
               setPasswordError("");
               setPassword(event.target.value);
            }}
         />
         <StyledErrorMessage>{usernameError || passwordError}</StyledErrorMessage>
         {/* LOGIN BUTTON */}
         <Button type="submit" className="login-button" text={title.toUpperCase()} />
      </StyledLoginForm>
   );
};

export default UserForm;

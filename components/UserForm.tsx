import React, { useState, useMemo, useCallback } from "react";
import classnames from "classnames";
import { FaUser, FaLock } from "react-icons/fa";
import styled from "styled-components";
import ManagedStyledInput from "./ManagedStyledInput";
import Button from "./Base/Button";

interface UserFormProps {
   title: string;
   onFormSubmit(username: string, password: string);
}

const UserForm: React.FC<UserFormProps> = ({ title, onFormSubmit }) => {
   // Username states
   const [username, setUsername] = useState("");
   const [usernameError, setUsernameError] = useState("");
   // Password states
   const [password, setPassword] = useState("");
   const [passwordError, setPasswordError] = useState("");

   const internalOnFormSubmit = useCallback(
      event => {
         event.preventDefault();

         // Validation
         if (!username) {
            return setUsernameError("Username must not be blank");
         }

         if (!password) {
            return setPasswordError("Password must not be blank");
         }

         // Reset error messages
         setUsernameError("");
         setPasswordError("");

         onFormSubmit(username, password);
      },
      [username, password, onFormSubmit]
   );

   const StyledLoginForm = useMemo(
      () => styled.form`
         display: flex;
         flex-direction: column;
         justify-content: space-evenly;
         align-items: center;
         border-radius: 22px;
         background: ${({ theme }) => theme.LightBlue};
         height: 60vh;
         max-height: 500px;
         width: 40%;
         min-width: 440px;
         max-width: 610px;
         padding: 18px 36px;
         box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);

         .form-title {
            font-family: "lato", sans-serif;
            font-size: 40px;
            font-weight: 100;
            color: ${({ theme }) => theme.Tan};
            margin: 0 0 20px 0;
            padding: 0;
         }
      `,
      []
   );

   return (
      <StyledLoginForm onSubmit={internalOnFormSubmit}>
         <div className="form-title">{title}</div>
         {/* USERNAME */}
         <ManagedStyledInput
            Icon={FaUser}
            value={username}
            error={usernameError}
            name="username"
            placeholder="Username"
            autoComplete="off"
            onChange={event => {
               setUsernameError("");
               setUsername(event.target.value);
            }}
         />
         {/* PASSWORD */}
         <ManagedStyledInput
            type="password"
            Icon={FaLock}
            value={password}
            error={passwordError}
            name="password"
            placeholder="Password"
            onChange={event => {
               setPasswordError("");
               setPassword(event.target.value);
            }}
         />
         {/* LOGIN BUTTON */}
         <Button className="login-button" text={title.toUpperCase()} />
      </StyledLoginForm>
   );
};

export default UserForm;

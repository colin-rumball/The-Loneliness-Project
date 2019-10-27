import React, { useMemo } from "react";
import styled from "styled-components";
import { IconType } from "react-icons/lib/cjs";
import MainTheme from "../styles/themes/MainTheme";

interface ManagedStyledInputProps {
   type?: string;
   Icon?: IconType;
   value?: string;
   error?: string;
   name: string;
   placeholder?: string;
   autoComplete?: "off" | "on";
   onChange(event);
}

const ManagedStyledInput: React.FC<ManagedStyledInputProps> = ({
   type,
   Icon,
   value,
   error,
   name,
   placeholder,
   autoComplete,
   onChange
}) => {
   const StyledInputWithIcon = useMemo(
      () => styled.span`
         width: 100%;
         height: 30px;
         position: relative;
         padding: 0 5px;
         margin: 15px 0;

         .icon {
            position: absolute;
            font-size: 14px;
            top: 6px;
            left: 12px;
            color: ${props => props.color};
            z-index: 3;
            user-select: none;
            pointer-events: none;
         }

         input {
            position: relative;
            background: transparent;
            outline: none;
            border: none;
            padding-left: 35px;
            width: 100%;
            height: 100%;
            font-size: 20px;
            color: ${({ theme }) => theme.Tan};
            border-bottom: ${props => props.border};

            &::placeholder {
               color: ${props => props.color};
               opacity: 0.5;
            }
         }

         &:hover,
         &:focus-within {
            .icon {
               color: ${props => props.color};
            }

            input {
               border-bottom: 2px solid ${props => props.color};

               &::placeholder {
                  color: ${props => props.color};
                  opacity: 0.3;
               }
            }
         }
      `,
      []
   );

   const color = useMemo(() => {
      return error ? MainTheme.Red : MainTheme.Tan;
   }, [value, error]);

   const border = useMemo(() => {
      let borderColor = error ? MainTheme.Red : MainTheme.Tan;
      return `2px solid ${borderColor}`;
   }, [error]);

   return (
      <StyledInputWithIcon color={color} border={border}>
         <Icon className="icon" />
         <input
            autoComplete={autoComplete}
            type={type || "text"}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
         />
      </StyledInputWithIcon>
   );
};

export default ManagedStyledInput;

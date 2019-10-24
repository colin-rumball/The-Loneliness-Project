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
   onChange(event);
}

const ManagedStyledInput: React.FC<ManagedStyledInputProps> = ({
   type,
   Icon,
   value,
   error,
   name,
   placeholder,
   onChange
}) => {
   const StyledInputWithIcon = useMemo(
      () => styled.span`
         width: 100%;
         height: 30px;
         position: relative;
         margin: 15px 5px;

         .icon {
            position: absolute;
            font-size: 14px;
            top: 6px;
            left: 12px;
            color: ${props => props.color};
            opacity: ${props => props.opacity};
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
               opacity: ${props => (props.opacity > 0.8 ? props.opacity : 0.8)};
            }

            input {
               border-bottom: 2px solid ${props => props.color};

               &::placeholder {
                  color: ${props => props.color};
                  opacity: ${props => (props.opacity > 0.8 ? props.opacity : 0.8)};
               }
            }
         }
      `,
      []
   );

   const opacity = useMemo(() => {
      if (value || error) return 1.0;
      return 0.5;
   }, [value, error]);

   const border = useMemo(() => {
      let borderColor = error ? MainTheme.Red : MainTheme.DarkGrey;
      borderColor += opacity === 1.0 ? "FF" : "80";
      return `2px solid ${borderColor}`;
   }, [error, opacity]);

   return (
      <StyledInputWithIcon
         color={error ? MainTheme.Red : MainTheme.DarkGrey}
         opacity={opacity}
         border={border}
      >
         <Icon className="icon" />
         <input
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

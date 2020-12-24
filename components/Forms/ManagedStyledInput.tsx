import React, { useMemo } from "react";
import styled from "styled-components";
import { IconType } from "react-icons/lib/cjs";
import useCurrentTheme from "../../hooks/useCurrentTheme";
import { ThemeContainer } from "../../themes/common";

const StyledInputWithIcon = styled.span`
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
      color: ${props => props.color};
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
`;

interface ManagedStyledInputProps {
   inverted?: boolean;
   type?: string;
   Icon?: IconType;
   value?: string;
   error?: string;
   name: string;
   placeholder?: string;
   autoComplete?: "off" | "on";
   onChange(event);
}

const DefaultManagedStyledInputProps: ManagedStyledInputProps = {
   inverted: false,
   type: "text",
   Icon: null,
   value: "",
   error: undefined,
   name: "",
   placeholder: "",
   autoComplete: "on",
   onChange: () => {}
};

const ManagedStyledInput: React.FC<ManagedStyledInputProps> = props => {
   const { inverted, type, Icon, value, error, name, placeholder, autoComplete, onChange } = {
      ...DefaultManagedStyledInputProps,
      ...props
   };
   const currentTheme = useCurrentTheme();

   const color = useMemo(() => {
      return error
         ? currentTheme.VARIABLES.COLORS.Red
         : inverted
         ? currentTheme.VARIABLES.COLORS.DarkBlue
         : currentTheme.VARIABLES.COLORS.Tan;
   }, [inverted, currentTheme, value, error]);

   const border = useMemo(() => {
      let borderColor = error
         ? currentTheme.VARIABLES.COLORS.Red
         : inverted
         ? currentTheme.VARIABLES.COLORS.DarkBlue
         : currentTheme.VARIABLES.COLORS.Tan;
      return `2px solid ${borderColor}`;
   }, [currentTheme, error]);

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

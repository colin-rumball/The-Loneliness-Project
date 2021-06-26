import React, { CSSProperties, MouseEventHandler, useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";

const StyledButton = styled.button`
   font-family: "lato", sans-serif;
   cursor: pointer;
   border: none;
   outline: none;

   font-style: normal;
   line-height: 20px;
   text-align: center;
   letter-spacing: 2px;

   color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.DarkBlue};
   font-size: 16px;
   background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};
   border: ${({ theme }: ThemeContainer) => `2px solid ${theme.VARIABLES.COLORS.DarkBlue}`};

   min-width: 200px;
   padding: 14px 5px;

   transition: color 0.3s ease, border-color 0.3s ease;

   &:hover {
      border-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
      color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
   }

   &:active {
      transform: scale(0.95);
      transition: transform 0.2s ease;
   }

   &[disabled] {
      cursor: default;
      pointer-events: none;
      opacity: 0.5;
   }
`;

export enum ButtonVariant {
   DEFAULT = "default",
}

export interface ButtonProps {
   text?: string;
   id?: string;
   tabIndex?: number;
   variant?: ButtonVariant;
   onClick?: MouseEventHandler<Element>;
   disabled?: boolean;
   className?: string;
   type?: string;
   style?: CSSProperties;
}

const defaultButtonProps: ButtonProps = {
   id: undefined,
   tabIndex: undefined,
   variant: ButtonVariant.DEFAULT,
   onClick: () => {},
   disabled: false,
   className: undefined,
   type: "button",
   style: {},
};

/**
 * Buttons are clickable items used to perform an action.
 */
const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
   const { text, id, tabIndex, onClick, disabled, className, type, style } = {
      ...defaultButtonProps,
      ...props,
   };

   return (
      <StyledButton
         data-id="button-element"
         id={id}
         className={className}
         style={style}
         disabled={disabled}
         tabIndex={tabIndex}
         onClick={onClick}
         type={type as any}
      >
         {text}
      </StyledButton>
   );
};

export default Button;

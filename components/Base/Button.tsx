import React, { CSSProperties, MouseEventHandler, useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";

export enum ButtonVariant {
   DEFAULT = "default"
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
   style: {}
};

/**
 * Buttons are clickable items used to perform an action.
 */
const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
   const { text, id, tabIndex, onClick, disabled, className, type, style } = {
      ...defaultButtonProps,
      ...props
   };

   const StyledButton = useMemo(
      () => styled.button`
         font-family: "lato", sans-serif;
         cursor: pointer;
         border: none;
         outline: none;

         font-style: normal;
         line-height: 20px;
         text-align: center;
         letter-spacing: 2px;

         font-size: 20px;
         background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};
         border: ${({ theme }: ThemeContainer) => `2px solid ${theme.VARIABLES.COLORS.DarkBlue}`};

         min-width: 200px;
         padding: 14px 0;

         &:hover {
            border-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
            color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
            transition: color 0.2s ease, border-color 0.2s ease;
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
      `,
      []
   );

   return (
      <StyledButton
         data-id="button-element"
         id={id}
         className={className}
         style={style}
         disabled={disabled}
         tabIndex={tabIndex}
         onClick={onClick}
         type={type}
      >
         {text}
      </StyledButton>
   );
};

export default Button;

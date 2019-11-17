import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../styles/themes/DefaultTheme";

interface SpinnerProps {
   inverted?: boolean;
   children?: Object;
}

const SpinnerDefaultProps: SpinnerProps = {
   inverted: false
};

const Spinner: React.FC<SpinnerProps> = props => {
   const { inverted } = { ...SpinnerDefaultProps, ...props };

   const StyledSpinner = useMemo(
      () => styled.div`
         position: relative;
         border-radius: inherit;
         display: flex;
         justify-content: center;
         align-items: center;

         .container {
            display: inline-block;
            position: relative;
            width: 128px;
            height: 128px;
            display: flex;
            justify-content: center;
            align-items: center;

            .ring {
               box-sizing: border-box;
               display: block;
               position: absolute;
               width: 102px;
               height: 102px;
               margin: 6px;
               border: ${({ theme, inverted }: ThemeContainer) =>
                  `6px solid ${
                     inverted ? theme.VARIABLES.COLORS.DarkBlue : theme.VARIABLES.COLORS.Tan
                  }`};
               border-radius: 50%;
               animation: ring-anim 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
               border-color: ${({ theme, inverted }: ThemeContainer) =>
                  `${
                     inverted ? theme.VARIABLES.COLORS.DarkBlue : theme.VARIABLES.COLORS.Tan
                  } transparent transparent transparent`};
            }

            .ring:nth-child(1) {
               animation-delay: -0.45s;
            }

            .ring:nth-child(2) {
               animation-delay: -0.3s;
            }

            .ring:nth-child(3) {
               animation-delay: -0.15s;
            }

            @keyframes ring-anim {
               0% {
                  transform: rotate(0deg);
               }
               100% {
                  transform: rotate(360deg);
               }
            }
         }
      `,
      []
   );

   return (
      <StyledSpinner inverted={inverted} onClick={() => {}}>
         <div className="container">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
         </div>
      </StyledSpinner>
   );
};

export default Spinner;

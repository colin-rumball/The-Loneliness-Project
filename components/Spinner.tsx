import React, { useMemo } from "react";
import styled from "styled-components";

interface SpinnerProps {
   overlay?: boolean;
}

const SpinnerDefaultProps: SpinnerProps = {
   overlay: false
};

const Spinner: React.FC<SpinnerProps> = props => {
   const { overlay } = { ...SpinnerDefaultProps, ...props };

   const StyledSpinner = useMemo(
      () => styled.div`
         position: ${props => (props.overlay ? "absolute" : "relative")};
         top: 0;
         left: 0;
         bottom: 0;
         right: 0;
         display: flex;
         justify-content: center;
         align-items: center;

         .container {
            display: inline-block;
            position: relative;
            width: 128px;
            height: 128px;

            .ring {
               box-sizing: border-box;
               display: block;
               position: absolute;
               width: 102px;
               height: 102px;
               margin: 6px;
               border: ${({ theme }) => `6px solid ${theme.Tan}`};
               border-radius: 50%;
               animation: ring-anim 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
               border-color: ${({ theme }) => `${theme.Tan} transparent transparent transparent`};
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
      <StyledSpinner overlay={overlay}>
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

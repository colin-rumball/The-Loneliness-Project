import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../themes/common";

interface CloudAnimationProps {}

const CloudAnimationDefaultProps: CloudAnimationProps = {};

const CloudAnimation: React.FC<CloudAnimationProps> = props => {
   const {} = { ...CloudAnimationDefaultProps, ...props };

   const StyledCloudsContainer = useMemo(
      () => styled.div`
         position: absolute;
         overflow: hidden;
         animation: fadeIn 2s ease-in 0.4s both;
         width: 100%;
         height: 100%;
         pointer-events: none;

         @keyframes fadeIn {
            from {
               opacity: 0;
            }
            to {
               opacity: 1;
            }
         }
      `,
      []
   );

   const StyledCloudAnimation = useMemo(
      () => styled.div`
         position: absolute;
         overflow: hidden;
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.BACKGROUND};
         opacity: 0.3;
         animation: moveClouds 200s linear infinite;
         animation-fill-mode: both;
         animation-delay: ${props => props.delay};

         @keyframes moveClouds {
            from {
               left: -100vw;
            }

            to {
               left: 100vw;
            }
         }
      `,
      []
   );

   return (
      <StyledCloudsContainer>
         <StyledCloudAnimation delay={"0s"}>
            <img src="/static/images/clouds.png" />
         </StyledCloudAnimation>
         <StyledCloudAnimation delay={"-100s"}>
            <img src="/static/images/clouds.png" />
         </StyledCloudAnimation>
      </StyledCloudsContainer>
   );
};

export default CloudAnimation;

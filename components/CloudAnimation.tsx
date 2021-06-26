import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../themes/common";

const StyledCloudAnimation = styled.div<any>`
   position: absolute;
   overflow: hidden;

   background-image: url("/images/clouds.png");
   background-repeat: repeat-x;
   background-position-x: 0%;
   transition: background-image 1s ease-in-out;

   pointer-events: none;
   user-select: none;

   left: 0;
   right: 0;
   top: 0;
   bottom: 0;

   z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.BACKGROUND};
   opacity: 0.4;

   animation: moveClouds 50s linear infinite;
   animation-fill-mode: both;
   animation-delay: -3s;

   @keyframes moveClouds {
      from {
         background-position-x: 0;
      }

      to {
         background-position-x: 1985px;
      }
   }
`;

interface CloudAnimationProps {}

const CloudAnimationDefaultProps: CloudAnimationProps = {};

const CloudAnimation: React.FC<CloudAnimationProps> = (props) => {
   const {} = { ...CloudAnimationDefaultProps, ...props };

   return <StyledCloudAnimation />;
};

export default CloudAnimation;

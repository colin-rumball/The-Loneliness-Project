import React from "react";
import styled from "styled-components";
import { ThemeContainer } from "../themes/common";

// Style
interface StyledSloganProps {}
const StyledSlogan = styled.div<StyledSloganProps>`
   color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
   font-size: 24px;
   font-weight: 500;
   line-height: 26px;
   text-align: center;
   letter-spacing: 0.4px;
   padding-top: 25px;

   animation: fadeIn 1s ease-out 1s both;

   @keyframes fadeIn {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }
`;

// Component
const Slogan: React.FC = ({}) => {
   return (
      <StyledSlogan>
         <span>Weekly stories of loneliness. </span>
         <span>Visit an apartment to get started.</span>
      </StyledSlogan>
   );
};

export default Slogan;

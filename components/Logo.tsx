import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../themes/common";

const Logo: React.FC = () => {
   const StyledLogo = useMemo(
      () =>
         styled.img`
            max-height: 300px;
            max-width: 260px;

            @media (min-width: ${({ theme }: ThemeContainer) =>
                  theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
               max-width: 400px;
            }
         `,
      []
   );
   return <StyledLogo src="/thelonelinessproject.svg" alt="The Loneliness Project" />;
};

export default Logo;

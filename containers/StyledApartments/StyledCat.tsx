import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";

interface StyledCatProps {}

const StyledCatDefaultProps: StyledCatProps = {};

const StyledCat: React.FC<StyledCatProps> = props => {
   const {} = { ...StyledCatDefaultProps, ...props };

   const StyledCat = useMemo(
      () => styled.img`
         position: absolute;
         height: auto;
         width: 28%;
         left: 64%;
         top: 55.8%;

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
            width: 26%;
            top: 55.5%;
         }
      `,
      []
   );

   return <StyledCat src="/static/apartments/cat.gif" />;
};

export default StyledCat;

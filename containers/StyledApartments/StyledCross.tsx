import React, { useMemo } from "react";
import styled from "styled-components";

interface StyledCrossProps {}

const StyledCrossDefaultProps: StyledCrossProps = {};

const StyledCross: React.FC<StyledCrossProps> = props => {
   const {} = { ...StyledCrossDefaultProps, ...props };

   const StyledCross = useMemo(
      () => styled.img`
         position: absolute;
         height: auto;
         width: 27.5%;
         left: 5.5%;
         top: -7.5%;

         @media (min-width: 1286px) {
            /* width: 26%;
            top: 55.5%; */
         }
      `,
      []
   );

   return <StyledCross src="/static/apartments/cross.gif" />;
};

export default StyledCross;

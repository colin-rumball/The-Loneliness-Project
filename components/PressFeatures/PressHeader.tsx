import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";

interface PressHeaderProps {}

const PressHeaderDefaultProps: PressHeaderProps = {};

const PressHeader: React.FC<PressHeaderProps> = props => {
   const {} = { ...PressHeaderDefaultProps, ...props };

   const StyledPressHeader = useMemo(
      () => styled.div`
         width: 100%;
         padding: 20px 0;
         text-align: center;
         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
         opacity: 0.9;
         font-family: "lato", sans-serif;
         margin-top: 20px;
         font-size: 16px;
         font-weight: 500;
         letter-spacing: 1px;
         overflow: visible;
         white-space: nowrap;
      `,
      []
   );

   return <StyledPressHeader>PROUD TO BE FEATURED ON</StyledPressHeader>;
};

export default PressHeader;

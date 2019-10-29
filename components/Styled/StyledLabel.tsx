import React, { useMemo } from "react";
import styled from "styled-components";

interface StyledLabelProps
   extends React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {}

const StyledLabel: React.FC<StyledLabelProps> = ({ children, ...rest }) => {
   const InternalStyledLabel = useMemo(
      () => styled.label`
         margin-top: 1rem;
      `,
      []
   );

   return <InternalStyledLabel {...rest}>{children}</InternalStyledLabel>;
};

export default StyledLabel;

import React, { useMemo } from "react";
import styled from "styled-components";

const Logo: React.FC = () => {
   const StyledLogo = useMemo(
      () =>
         styled.img`
            max-height: 300px;
         `,
      []
   );
   return <StyledLogo src="/static/thelonelinessproject.svg" alt="The Loneliness Project" />;
};

export default Logo;

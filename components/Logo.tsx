import React, { useMemo } from "react";
import styled from "styled-components";

const Logo: React.FC = () => {
   const StyledLogo = useMemo(
      () =>
         styled.img`
            max-width: 400px;
         `,
      []
   );
   return <StyledLogo src="/static/thelonelinessproject.svg" alt="The Loneliness Project" />;
};

export default Logo;

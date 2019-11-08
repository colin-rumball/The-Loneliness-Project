import React, { useMemo } from "react";
import styled from "styled-components";

interface StyledApartmentsContainerProps {
   children: Object;
}

const StyledApartmentsContainer: React.FC<StyledApartmentsContainerProps> = ({ children }) => {
   const StyledApartmentsContainer = useMemo(
      () => styled.div`
         position: relative;
         display: flex;
         flex-direction: row;
         justify-content: center;
         flex-wrap: wrap;
         width: 100%;
         padding: 400px 5% 0 5%;
         min-height: 100vh;
      `,
      []
   );

   return <StyledApartmentsContainer>{children}</StyledApartmentsContainer>;
};

export default StyledApartmentsContainer;

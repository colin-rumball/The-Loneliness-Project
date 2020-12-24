import React, { useMemo } from "react";
import styled from "styled-components";
import Spinner from "../../components/Spinner";
import { ThemeContainer } from "../../themes/common";

const InternalStyledMainContent = styled.main`
   position: relative;
   display: flex;
   flex-direction: row;
   user-select: none;
   pointer-events: none;
   flex-wrap: wrap;
   width: 100%;
   padding: 400px 9% 0 9%;
   min-height: 100vh;
   z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.FOREGROUND};

   animation: fadeIn 2s ease-in 2s both;

   @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
      padding: 430px 5% 0 5%;
   }

   @keyframes fadeIn {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }
`;

interface StyledMainContentProps {
   loading: Boolean;
   children: Object;
}

const StyledMainContent: React.FC<StyledMainContentProps> = ({ loading, children }) => {
   return (
      <InternalStyledMainContent>
         {loading ? (
            <div style={{ paddingTop: "100px", width: "100%" }}>
               <Spinner />
            </div>
         ) : (
            children
         )}
      </InternalStyledMainContent>
   );
};

export default StyledMainContent;

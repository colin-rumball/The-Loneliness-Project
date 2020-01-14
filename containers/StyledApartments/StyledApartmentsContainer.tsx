import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";
import Spinner from "../../components/Spinner";

interface StyledApartmentsContainerProps {
   loading: Boolean;
   children: Object;
}

const StyledApartmentsContainer: React.FC<StyledApartmentsContainerProps> = ({
   loading,
   children
}) => {
   const StyledApartmentsContainer = useMemo(
      () => styled.div`
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

         animation: ${props => (!props.showingSpinner ? "fadeIn 2s ease-in 2s both" : null)};

         @media (min-width: 768px) {
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
      `,
      []
   );

   const StyledSpinnerContainer = useMemo(
      () => styled.div`
         padding-top: 100px;
         width: 100%;
      `,
      []
   );

   return (
      <StyledApartmentsContainer showingSpinner={loading}>
         {loading ? (
            <StyledSpinnerContainer>
               <Spinner />
            </StyledSpinnerContainer>
         ) : (
            children
         )}
      </StyledApartmentsContainer>
   );
};

export default StyledApartmentsContainer;

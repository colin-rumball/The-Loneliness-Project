import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../styles/themes/DefaultTheme";
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
         /* justify-content: center; */
         flex-wrap: wrap;
         width: 100%;
         padding: 400px 5% 0 5%;
         min-height: 100vh;
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.FOREGROUND};

         animation: ${props => (!props.showingSpinner ? "fadeIn 2s ease-in 0.4s both" : null)};

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
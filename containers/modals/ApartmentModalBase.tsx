import React, { useMemo } from "react";
import styled from "styled-components";
import { ApolloClient } from "apollo-boost";
import OverlayedSpinner from "../OverlayedSpinner";
import { ThemeContainer } from "../../themes/common";
import { NextRouter } from "next/router";

export interface ApartmentModalBaseProps {
   apolloClient?: ApolloClient<any>;
   router?: NextRouter;
   showSpinner?: boolean;
}

const ModalBaseDefaultProps: ApartmentModalBaseProps = {
   showSpinner: false
};

const ApartmentModalBase: React.FC<ApartmentModalBaseProps> = props => {
   const { children, showSpinner } = { ...ModalBaseDefaultProps, ...props };

   const StyledModalBase = useMemo(
      () => styled.div`
         background: #fff;
         height: 60vh;
         /* max-height: 600px; */
         width: 70vw;
         max-width: 900px;
         /* padding: 18px 36px; */
         box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
         box-shadow: ${({ theme }: ThemeContainer) => `10px 10px 0 ${theme.VARIABLES.COLORS.Tan}`};
         overflow: auto;
         border: 1px solid rgba(0, 0, 0, 0.9);
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.MODAL};

         &::-webkit-scrollbar {
            width: 0;
         }
      `,
      []
   );

   return (
      <StyledModalBase>
         {showSpinner ? <OverlayedSpinner show={showSpinner} children={children} /> : children}
      </StyledModalBase>
   );
};

export default ApartmentModalBase;

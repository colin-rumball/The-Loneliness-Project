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
   color: string;
}

const ModalBaseDefaultProps: ApartmentModalBaseProps = {
   showSpinner: false,
   color: "#e7c9b1"
};

const ApartmentModalBase: React.FC<ApartmentModalBaseProps> = props => {
   const { children, showSpinner, color } = { ...ModalBaseDefaultProps, ...props };

   const StyledModalBase = useMemo(
      () => styled.div`
         background: #fff;
         height: 80vh;
         width: 95vw;
         max-width: 95vw;
         overflow: auto;
         border: 1px solid rgba(0, 0, 0, 0.9);
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.MODAL};

         &::-webkit-scrollbar {
            width: 0;
         }

         @media (min-width: 768px) {
            width: 70vw;
            max-width: 900px;
            box-shadow: ${`10px 10px 0 ${color}`};
         }
      `,
      [color]
   );

   return (
      <StyledModalBase>
         {showSpinner ? <OverlayedSpinner show={showSpinner} children={children} /> : children}
      </StyledModalBase>
   );
};

export default ApartmentModalBase;

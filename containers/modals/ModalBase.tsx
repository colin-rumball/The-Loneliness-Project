import React, { useMemo } from "react";
import styled from "styled-components";
import { ApolloClient } from "apollo-boost";
import OverlayedSpinner from "../OverlayedSpinner";
import { ThemeContainer } from "../../themes/common";
import { NextRouter } from "next/router";

export interface ModalBaseProps {
   apolloClient?: ApolloClient<any>;
   router?: NextRouter;
   showSpinner?: boolean;
}

const ModalBaseDefaultProps: ModalBaseProps = {
   showSpinner: false
};

const ModalBase: React.FC<ModalBaseProps> = props => {
   const { children, showSpinner } = { ...ModalBaseDefaultProps, ...props };

   const StyledModalBase = useMemo(
      () => styled.div`
         border-radius: 22px;
         background: ${({ theme }) => theme.LightBlue};
         /* height: 60vh; */
         min-height: 300px;
         max-height: 600px;
         min-width: 440px;
         max-width: 610px;
         padding: 18px 36px;
         box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
         overflow: auto;
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.MODAL};
      `,
      []
   );
   return (
      <StyledModalBase>
         {showSpinner ? <OverlayedSpinner show={showSpinner} children={children} /> : children}
      </StyledModalBase>
   );
};

export default ModalBase;

import React, { useMemo, useEffect } from "react";
import styled from "styled-components";
import { ApolloClient } from "apollo-boost";
import Spinner from "../../components/Spinner";
import OverlayedSpinner from "../OverlayedSpinner";

export interface ModalBaseProps {
   apolloClient?: ApolloClient<any>;
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
         max-height: 500px;
         min-width: 440px;
         max-width: 610px;
         padding: 18px 36px;
         box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
         overflow: auto;
      `,
      []
   );
   return (
      <StyledModalBase>
         <OverlayedSpinner show={showSpinner} children={children} />
      </StyledModalBase>
   );
};

export default ModalBase;

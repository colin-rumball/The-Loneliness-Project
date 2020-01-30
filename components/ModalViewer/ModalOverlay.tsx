import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";

interface ModalOverlayProps {
   onClick: Function;
}

const ModalOverlayDefaultProps: ModalOverlayProps = {
   onClick: () => {}
};

const ModalOverlay: React.FC<ModalOverlayProps> = props => {
   const { children, onClick } = { ...ModalOverlayDefaultProps, ...props };
   const StyledModalOverlay = useMemo(
      () => styled.div`
         position: fixed;
         top: 0;
         bottom: 0;
         right: 0;
         left: 0;
         background: rgba(0, 0, 0, 0.6);

         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.MODAL - 1};
      `,
      []
   );
   return <StyledModalOverlay onClick={onClick}>{children}</StyledModalOverlay>;
};

export default ModalOverlay;

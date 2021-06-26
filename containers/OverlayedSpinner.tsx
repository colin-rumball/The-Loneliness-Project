import React, { useMemo } from "react";
import styled from "styled-components";
import Spinner, { SpinnerProps } from "../components/Spinner";
import { ThemeContainer } from "../themes/common";

const StyledOverlayedSpinner = styled.div<any>`
   position: absolute;
   background: rgba(0, 0, 0, 0.5);
   border-radius: inherit;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.MODAL + 3};
`;

const StyledContent = styled.div<any>`
   position: relative;
   filter: ${(props) => (props.blur ? "blur(4px)" : "none")};
   height: 100%;
   width: 100%;
   overflow: hidden;
`;

interface OverlayedSpinnerProps extends SpinnerProps {
   show?: boolean;
   children?: Object;
}

const OverlayedSpinnerDefaultProps: OverlayedSpinnerProps = {
   show: true,
   children: null,
};

const OverlayedSpinner: React.FC<OverlayedSpinnerProps> = (props) => {
   const { show, children } = { ...OverlayedSpinnerDefaultProps, ...props };

   if (!show) return <>{children}</>;

   return (
      <>
         <StyledContent blur={show}>{children}</StyledContent>
         {show && (
            <StyledOverlayedSpinner>
               <Spinner {...props} />
            </StyledOverlayedSpinner>
         )}
      </>
   );
};

export default OverlayedSpinner;

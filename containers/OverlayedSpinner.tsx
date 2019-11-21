import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../styles/themes/DefaultTheme";
import { SpinnerProps } from "../components/Base/Spinner/Spinner";
import Spinner from "../components/Spinner";

interface OverlayedSpinnerProps extends SpinnerProps {
   show?: boolean;
   children?: Object;
}

const OverlayedSpinnerDefaultProps: OverlayedSpinnerProps = {
   show: true,
   children: null
};

const OverlayedSpinner: React.FC<OverlayedSpinnerProps> = props => {
   const { show, children } = { ...OverlayedSpinnerDefaultProps, ...props };

   const StyledOverlayedSpinner = useMemo(
      () => styled.div`
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
      `,
      []
   );

   const StyledContent = useMemo(
      () => styled.div`
         position: relative;
         filter: ${props => (props.blur ? "blur(4px)" : "none")};
         height: 100%;
         width: 100%;
      `,
      []
   );

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

import React, { useMemo } from "react";
import styled from "styled-components";
import OverlayedSpinner from "../OverlayedSpinner";
import { ThemeContainer } from "../../themes/common";
import ModalTitleBar from "../../components/ModalViewer/ModalTitleBar";
import useRandomColor from "../../hooks/useRandomColor";
import { RandomColorContextProvider } from "../../contexts/RandomColorContext";

export interface NewModalBaseProps {
   showSpinner?: boolean;
}

const ModalBaseDefaultProps: NewModalBaseProps = {
   showSpinner: false
};

const NewModalBase: React.FC<NewModalBaseProps> = props => {
   const { children, showSpinner } = { ...ModalBaseDefaultProps, ...props };
   const { randomColor, randomDarkenedColor } = useRandomColor();

   const StyledModalBase = useMemo(
      () => styled.div`
         background: #fff;
         height: 75vh;
         width: 95vw;
         max-width: 95vw;
         overflow: auto;
         border: 1px solid rgba(0, 0, 0, 0.9);
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.MODAL};
         padding-top: 40px; /* Title Bar */

         &::-webkit-scrollbar {
            width: 0;
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
            width: 80vw;
            height: 85vh;
            max-width: 900px;
            box-shadow: ${props => `10px 10px 0${props.shadowColor}`};
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
            max-width: 980px;
         }
      `,
      []
   );

   return (
      <RandomColorContextProvider
         randomColor={randomColor}
         randomDarkenedColor={randomDarkenedColor}
      >
         <StyledModalBase shadowColor={randomDarkenedColor}>
            <ModalTitleBar bgColor={randomColor} />
            {showSpinner ? <OverlayedSpinner show={showSpinner} children={children} /> : children}
         </StyledModalBase>
      </RandomColorContextProvider>
   );
};

export default NewModalBase;

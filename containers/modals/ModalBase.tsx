import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";
import ModalTitleBar from "../../components/ModalViewer/ModalTitleBar";
import useRandomColor from "../../hooks/useRandomColor";
import { RandomColorContextProvider } from "../../contexts/RandomColorContext";
// import { ApolloClient } from "apollo-boost";

const StyledModalBase = styled.div`
   background: #fff;
   height: 75vh;
   overflow: auto;
   border: 1px solid rgba(0, 0, 0, 0.9);
   z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.MODAL};
   padding: 40px 40px 0 40px;

   &::-webkit-scrollbar {
      width: 0;
   }

   @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
      box-shadow: ${props => `10px 10px 0${props.shadowColor}`};
   }

   @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
      max-width: 980px;
   }

   .gradient-bottom {
      position: absolute;
      left: 1px;
      right: 1px;
      bottom: 1px;
      background: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 0, #fff);
      min-height: 40px;
      max-height: 40px;
   }
`;

export interface ModalBaseProps {
   // apolloClient?: ApolloClient<any>;
}

const ModalBaseDefaultProps: ModalBaseProps = {};

const ModalBase: React.FC<ModalBaseProps> = props => {
   const { children } = {
      ...ModalBaseDefaultProps,
      ...props
   };
   const { randomColor, randomDarkenedColor, rerandomizeColors } = useRandomColor();

   return (
      <RandomColorContextProvider
         randomColor={randomColor}
         randomDarkenedColor={randomDarkenedColor}
         rerandomizeColors={rerandomizeColors}
      >
         <StyledModalBase shadowColor={randomDarkenedColor}>
            <ModalTitleBar bgColor={randomColor} />
            {children}
            <div className="gradient-bottom" />
         </StyledModalBase>
      </RandomColorContextProvider>
   );
};

export default ModalBase;

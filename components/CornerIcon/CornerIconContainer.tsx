import React, { useMemo } from "react";
import styled from "styled-components";
import { IconCorner } from "./CornerIconWithContent";
import { ThemeContainer } from "../../themes/common";

interface IconContainerProps {
   shouldHide: boolean;
   corner: IconCorner;
   onClick();
}

const IconContainerDefaultProps: IconContainerProps = {
   shouldHide: false,
   corner: undefined,
   onClick: () => {}
};

const CornerIconContainer: React.FC<IconContainerProps> = props => {
   const { shouldHide, corner, onClick, children } = { ...IconContainerDefaultProps, ...props };

   const distanceFromCorner = "5%";
   const StyledIconContainer = useMemo(
      () => styled.div`
         cursor: pointer;
         position: fixed;
         left: ${props =>
            props.corner == IconCorner.BOTTOM_LEFT || props.corner == IconCorner.TOP_LEFT
               ? distanceFromCorner
               : null};
         top: ${props =>
            props.corner == IconCorner.TOP_LEFT || props.corner == IconCorner.TOP_RIGHT
               ? distanceFromCorner
               : null};
         bottom: ${props =>
            props.corner == IconCorner.BOTTOM_LEFT || props.corner == IconCorner.BOTTOM_RIGHT
               ? distanceFromCorner
               : null};
         right: ${props =>
            props.corner == IconCorner.BOTTOM_RIGHT || props.corner == IconCorner.TOP_RIGHT
               ? distanceFromCorner
               : null};
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.ON_TOP + 10};
         opacity: ${props => (props.shouldHide ? 0 : 1)};
         user-select: ${props => (props.shouldHide ? "none" : "auto")};
         pointer-events: ${props => (props.shouldHide ? "none" : "auto")};

         animation: fadeIn 2s ease-out 2.5s backwards;

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

   return (
      <StyledIconContainer shouldHide={shouldHide} corner={corner} onClick={onClick}>
         {children}
      </StyledIconContainer>
   );
};

export default CornerIconContainer;

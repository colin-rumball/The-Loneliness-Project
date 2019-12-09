import React, { useState, useCallback, useMemo } from "react";
import ScrollLock, { TouchScrollable } from "react-scrolllock";
import styled from "styled-components";
import { IoMdMenu, IoIosClose } from "react-icons/io";
import { ThemeContainer } from "../themes/common";
import StyledIcon from "./Styled/StyledIcon";
import useCurrentTheme from "../hooks/useCurrentTheme";

export enum IconCorner {
   TOP_LEFT,
   TOP_RIGHT,
   BOTTOM_LEFT,
   BOTTOM_RIGHT
}

export interface HiddenContentContainerProps {
   corner: IconCorner;
   icon: Object;
   content: Object;
}

const DefaultHiddenContentContainerProps: HiddenContentContainerProps = {
   corner: IconCorner.TOP_LEFT,
   icon: null,
   content: null
};

const HiddenContentContainer: React.FC<HiddenContentContainerProps> = props => {
   const { corner, icon, content } = { ...DefaultHiddenContentContainerProps, ...props };
   const currentTheme = useCurrentTheme();
   const [showContent, setShowContent] = useState(false);

   const StyledIconContainer = useMemo(
      () => styled.div`
         position: fixed;
         left: ${props =>
            props.corner == IconCorner.BOTTOM_LEFT || props.corner == IconCorner.TOP_LEFT
               ? "60px"
               : null};
         top: ${props =>
            props.corner == IconCorner.TOP_LEFT || props.corner == IconCorner.TOP_RIGHT
               ? "60px"
               : null};
         bottom: ${props =>
            props.corner == IconCorner.BOTTOM_LEFT || props.corner == IconCorner.BOTTOM_RIGHT
               ? "60px"
               : null};
         right: ${props =>
            props.corner == IconCorner.BOTTOM_RIGHT || props.corner == IconCorner.TOP_RIGHT
               ? "60px"
               : null};
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.ON_TOP + 10};
      `,
      []
   );

   const StyledContentContainer = useMemo(
      () => styled.div`
         /* animation: ${({ theme }: ThemeContainer) =>
            theme.ANIMATIONS.FadeOut} 0.6s ease-in both; */
			display: ${showContent ? "block" : "none"};
         user-select: ${showContent ? "auto" : "none"};
         pointer-events: ${showContent ? "auto" : "none"};
      `,
      [showContent]
   );

   const currentIcon = useMemo(() => (showContent ? IoIosClose : icon), [showContent]);

   return (
      <>
         <StyledIconContainer corner={corner}>
            <StyledIcon
               icon={currentIcon}
               size={"36px"}
               color={currentTheme.VARIABLES.COLORS.Tan}
               hovercolor={"#fff"}
               onClick={() => {
                  setShowContent(!showContent);
               }}
            />
         </StyledIconContainer>
         <ScrollLock isActive={showContent} />
         <TouchScrollable>
            <StyledContentContainer>{content}</StyledContentContainer>
         </TouchScrollable>
      </>
   );
};

export default HiddenContentContainer;

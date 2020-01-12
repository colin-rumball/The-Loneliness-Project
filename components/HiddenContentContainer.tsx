import React, { useState, useCallback, useMemo, useEffect } from "react";
import ScrollLock, { TouchScrollable } from "react-scrolllock";
import styled from "styled-components";
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
   closedIcon: Object;
   openIcon: Object;
   content: Object;
   showBehind: boolean;
   onVisibleStateChange(visible: boolean);
}

const DefaultHiddenContentContainerProps: HiddenContentContainerProps = {
   corner: IconCorner.TOP_LEFT,
   closedIcon: null,
   openIcon: null,
   content: null,
   showBehind: false,
   onVisibleStateChange: () => {}
};

const HiddenContentContainer: React.FC<HiddenContentContainerProps> = props => {
   const { corner, closedIcon, openIcon, content, showBehind, onVisibleStateChange } = {
      ...DefaultHiddenContentContainerProps,
      ...props
   };
   const currentTheme = useCurrentTheme();
   const [fadingOut, setFadingOut] = useState(false);
   const [showContent, setShowContent] = useState(false);

   useEffect(() => {
      if (fadingOut) {
         const timerId = setTimeout(() => {
            setFadingOut(false);
         }, 600);
         return () => {
            clearTimeout(timerId);
         };
      }
   }, [fadingOut]);

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
      `,
      []
   );

   const StyledContentContainer = useMemo(
      () => styled.div`
         position: absolute;
         animation: ${({ fadingOut }) => (fadingOut ? "fadeOut 0.6s ease both" : "")};
         display: ${({ showContent, fadingOut }) => (showContent || fadingOut ? "block" : "none")};
         user-select: ${({ showContent, fadingOut }) =>
            showContent || fadingOut ? "auto" : "none"};
         pointer-events: ${({ showContent, fadingOut }) =>
            showContent || fadingOut ? "auto" : "none"};
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.ON_TOP};

         @keyframes fadeOut {
            from {
               opacity: 1;
            }
            to {
               opacity: 0;
            }
         }
      `,
      []
   );

   return (
      <>
         <StyledIconContainer
            corner={corner}
            onClick={() => {
               onVisibleStateChange(!showContent);
               setShowContent(!showContent);
               setFadingOut(showContent);
            }}
         >
            <StyledIcon
               icon={showContent ? openIcon : closedIcon}
               size={"36px"}
               color={currentTheme.VARIABLES.COLORS.Tan}
               hovercolor={"#fff"}
            />
         </StyledIconContainer>
         <ScrollLock isActive={showContent || fadingOut} />
         <TouchScrollable>
            <StyledContentContainer showContent={showContent} fadingOut={fadingOut}>
               {content}
            </StyledContentContainer>
         </TouchScrollable>
      </>
   );
};

export default HiddenContentContainer;

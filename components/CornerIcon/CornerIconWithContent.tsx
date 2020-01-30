import React, { useState, useMemo, useEffect } from "react";
import ScrollLock, { TouchScrollable } from "react-scrolllock";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";
import StyledIcon from "../Styled/StyledIcon";
import useCurrentTheme from "../../hooks/useCurrentTheme";
import { useCornerIconsContext } from "../../contexts/CornerIconsContext";
import CornerIconContainer from "./CornerIconContainer";
import InteractionController from "../InteractionController";
import { Controller, useControllerContext } from "../../contexts/ControllerContext";

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
}

const DefaultHiddenContentContainerProps: HiddenContentContainerProps = {
   corner: IconCorner.TOP_LEFT,
   closedIcon: null,
   openIcon: null,
   content: null
};

const CornerIconWithContent: React.FC<HiddenContentContainerProps> = props => {
   const { corner, closedIcon, openIcon, content } = {
      ...DefaultHiddenContentContainerProps,
      ...props
   };
   const currentTheme = useCurrentTheme();
   const [fadingOut, setFadingOut] = useState(false);
   const [showContent, setShowContent] = useState(false);
   const { activeCorner, setActiveCorner } = useCornerIconsContext();
   const { setCurrentController } = useControllerContext();

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
         <CornerIconContainer
            shouldHide={activeCorner != undefined && activeCorner != corner}
            corner={corner}
            onClick={() => {
               setCurrentController(activeCorner == corner ? Controller.MAIN : Controller.OVERLAY);
               setActiveCorner(activeCorner == corner ? undefined : corner);
               setShowContent(!showContent);
               setFadingOut(showContent);
            }}
         >
            <StyledIcon
               icon={showContent ? openIcon : closedIcon}
               size={"36px"}
               color={currentTheme.VARIABLES.COLORS.Tan}
               hovercolor={"#fff"}
               onClick={() => {}}
            />
         </CornerIconContainer>
         <InteractionController controller={Controller.OVERLAY}>
            <StyledContentContainer showContent={showContent} fadingOut={fadingOut}>
               {content}
            </StyledContentContainer>
         </InteractionController>
      </>
   );
};

export default CornerIconWithContent;

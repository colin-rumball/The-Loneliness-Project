import React, { useState, useCallback, useMemo } from "react";
import ScrollLock, { TouchScrollable } from "react-scrolllock";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdMenu, IoIosClose } from "react-icons/io";
import AboutSection from "../containers/AboutSection";
import { ThemeContainer } from "../themes/common";
import StyledIcon from "./Styled/StyledIcon";
import useCurrentTheme from "../hooks/useCurrentTheme";

export interface SidebarControllerProps {
   controller?: Object;
   sidebar?: Object;
}

const SidebarController: React.FC<SidebarControllerProps> = ({ controller, sidebar }) => {
   const currentTheme = useCurrentTheme();
   const [isOpen, setIsOpen] = useState(false);

   const StyledSidebarController = useMemo(
      () => styled.div`
         position: fixed;
         left: 60px;
         top: 60px;
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.ON_TOP + 10};
      `,
      []
   );

   const currentIcon = useMemo(() => (isOpen ? IoIosClose : IoMdMenu), [isOpen]);

   return (
      <>
         <StyledSidebarController>
            <StyledIcon
               icon={currentIcon}
               size={"36px"}
               color={currentTheme.VARIABLES.COLORS.Tan}
               hovercolor={"#fff"}
               onClick={() => {
                  setIsOpen(!isOpen);
               }}
            />
         </StyledSidebarController>
         <ScrollLock isActive={isOpen} />
         <TouchScrollable>
            <AboutSection show={isOpen} />
         </TouchScrollable>
      </>
   );
};

export default SidebarController;

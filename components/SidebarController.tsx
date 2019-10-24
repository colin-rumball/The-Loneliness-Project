import React, { useState, useCallback, useRef, useMemo } from "react";
import classnames from "classnames";
import ScrollLock, { TouchScrollable } from "react-scrolllock";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";

export interface SidebarControllerProps {
   controller?: Object;
   sidebar?: Object;
}

const SidebarController: React.FC<SidebarControllerProps> = ({ controller, sidebar }) => {
   const [isOpen, setIsOpen] = useState(false);
   const cn = classnames("pd-sidebar-controller");

   const onControllerClicked = useCallback(() => {
      setIsOpen(true);
   }, []);

   const onCloseRequested = useCallback(() => {
      setIsOpen(false);
   }, [setIsOpen]);

   const StyledSidebarController = useMemo(
      () => styled.div`
         position: fixed;
         left: 60px;
         top: 60px;
         font-size: 30px;
         cursor: pointer;
         z-index: 2;
      `,
      []
   );

   return (
      <StyledSidebarController>
         <FaBars />
      </StyledSidebarController>
   );

   return (
      <>
         <StyledSidebarController onClick={onControllerClicked} className={cn}>
            {controller}
         </StyledSidebarController>
         <ScrollLock isActive={isOpen} />
         <TouchScrollable>
            {/* <Sidebar open={isOpen} onCloseRequested={onCloseRequested}>
               {sidebar}
            </Sidebar> */}
         </TouchScrollable>
      </>
   );
};

export default SidebarController;

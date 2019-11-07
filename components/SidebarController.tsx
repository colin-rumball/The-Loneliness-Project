import React, { useState, useCallback, useRef, useMemo } from "react";
import classnames from "classnames";
import ScrollLock, { TouchScrollable } from "react-scrolllock";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import AboutSection from "../containers/AboutSection";

export interface SidebarControllerProps {
   controller?: Object;
   sidebar?: Object;
}

const SidebarController: React.FC<SidebarControllerProps> = ({ controller, sidebar }) => {
   const [isOpen, setIsOpen] = useState(false);

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
         font-size: 28px;
         cursor: pointer;
         z-index: 99;
         color: ${({ theme }) => theme.Tan};
         transition: color 0.3s ease, transform 0.1s ease, opacity 0.3s ease;

         &:hover {
            color: #fff;
         }

         &:active {
            transform: scale(0.95);
         }
      `,
      []
   );

   if (!isOpen) {
      return (
         <StyledSidebarController
            onClick={() => {
               setIsOpen(true);
            }}
         >
            <FaBars />
         </StyledSidebarController>
      );
   } else {
      return (
         <>
            <StyledSidebarController
               onClick={() => {
                  setIsOpen(false);
               }}
            >
               <FaTimes />
            </StyledSidebarController>
            <ScrollLock isActive={true} />
            <TouchScrollable>
               <AboutSection />
            </TouchScrollable>
         </>
      );
   }
};

export default SidebarController;

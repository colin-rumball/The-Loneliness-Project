import React, { useState, useCallback, useRef } from "react";
import classnames from "classnames";
import Sidebar from "../Sidebar/Sidebar";
import ScrollLock, { TouchScrollable } from "react-scrolllock";
import "./sidebar-controller-style.scss";

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

   return (
      <>
         <span onClick={onControllerClicked} className={cn}>
            {controller}
         </span>
         <ScrollLock isActive={isOpen} />
         <TouchScrollable>
            <Sidebar open={isOpen} onCloseRequested={onCloseRequested}>
               {sidebar}
            </Sidebar>
         </TouchScrollable>
      </>
   );
};

export default SidebarController;

import React, { useCallback, useEffect, useMemo } from "react";
import classnames from "classnames";
import "./sidebar-style.scss";
import SidebarContext, { SidebarContextObject } from "./SidebarContext";

export interface SidebarProps {
   open?: boolean;
   orientation?: "left" | "right";
   header?: Object;
   children?: Object;
   footer?: Object;
   onCloseRequested: any;
}

const Sidebar: React.FC<SidebarProps> = props => {
   const defaultProps: SidebarProps = {
      open: false,
      orientation: "left",
      header: null,
      children: null,
      footer: null,
      onCloseRequested: () => {}
   };
   const { open, orientation, header, children, footer, onCloseRequested }: SidebarProps = {
      ...defaultProps,
      ...props
   };

   const onKeyPressWhileOpen = useCallback(
      e => {
         if (e.key == "Escape" || e.keyCode == 27) {
            onCloseRequested();
         }
      },
      [onCloseRequested]
   );

   useEffect(() => {
      if (open) {
         document.addEventListener("keyup", onKeyPressWhileOpen);
      }
      return () => {
         document.removeEventListener("keyup", onKeyPressWhileOpen);
      };
   }, [onKeyPressWhileOpen, open]);

   const onOverlayClicked = useCallback(() => {
      onCloseRequested();
   }, [onCloseRequested]);

   const sidebarClassNames = useMemo(() => classnames("pd-sidebar", orientation, { open: open }), [
      orientation,
      open
   ]);

   const overlayClassNames = useMemo(() => classnames("pd-sidebar-overlay", { visible: open }), [
      open
   ]);

   const contextObject: SidebarContextObject = { closeSidebar: onCloseRequested };

   return (
      <>
         <div onClick={onOverlayClicked} className={overlayClassNames} />
         <div className={sidebarClassNames}>
            <SidebarContext.Provider value={contextObject}>
               {header}
               <div className="pd-sidebar-content">{children}</div>
               {footer}
            </SidebarContext.Provider>
         </div>
      </>
   );
};

export default Sidebar;

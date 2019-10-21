import React, { useContext, MouseEventHandler } from "react";

export interface SidebarContextObject {
   closeSidebar?: MouseEventHandler<Element>;
}

const SidebarContext = React.createContext(null);

export default SidebarContext;

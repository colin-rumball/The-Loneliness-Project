import React, { useContext } from "react";
import NavigationMenuItem, {
   NavigationMenuItemProps
} from "./Base/NavigationMenu/NavigationMenuItem";
import SidebarContext, { SidebarContextObject } from "./Base/Sidebar/SidebarContext";

export interface SidebarNavItemProps extends NavigationMenuItemProps {}

const SidebarNavItem: React.FC<SidebarNavItemProps> = props => {
   const { closeSidebar }: SidebarContextObject = useContext(SidebarContext);
   return <NavigationMenuItem text="Item 1" onClick={closeSidebar} {...props} />;
};

export default SidebarNavItem;

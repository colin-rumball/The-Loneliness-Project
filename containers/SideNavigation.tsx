import React from "react";
import NavigationMenu, { MenuDirection } from "../components/Base/NavigationMenu/NavigationMenu";
import Avatar from "../components/Avatar";
import NavigationMenuItem from "../components/Base/NavigationMenu/NavigationMenuItem";

const SideNavigation: React.FC = () => {
   return (
      <NavigationMenu direction={MenuDirection.VERTICAL}>
         <Avatar />
         <NavigationMenuItem text="Item 1" />
         <NavigationMenuItem text="Item 2" />
         <NavigationMenuItem text="Item 3" />
         <NavigationMenuItem text="Item 4" />
      </NavigationMenu>
   );
};

export default SideNavigation;

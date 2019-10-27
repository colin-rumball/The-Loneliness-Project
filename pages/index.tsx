import React from "react";
import SidebarController from "../components/SidebarController";
import LogoHeader from "../containers/LogoHeader";
import Apartments from "../containers/Apartments";

const HomePage = props => {
   return (
      <>
         <SidebarController />
         <LogoHeader />
         <Apartments />
      </>
   );
};

export default HomePage;

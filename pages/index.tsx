import React from "react";
import SidebarController from "../components/SidebarController";
import LogoHeader from "../containers/LogoHeader";
import Apartments from "../containers/Apartments";
import PressFeatures from "../containers/PressFeatures";
import HomeUserActions from "../containers/HomeUserActions";

const HomePage = props => {
   return (
      <>
         <SidebarController />
         <LogoHeader />
         <Apartments />
         <HomeUserActions />
         <PressFeatures />
      </>
   );
};

export default HomePage;

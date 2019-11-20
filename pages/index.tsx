import React, { useMemo } from "react";
import styled from "styled-components";
import SidebarController from "../components/SidebarController";
import LogoHeader from "../containers/LogoHeader";
import ApartmentBuildings from "../containers/ApartmentsBuildings";
import PressFeatures from "../containers/PressFeatures";
import HomeUserActions from "../containers/HomeUserActions";
import CloudAnimation from "../components/CloudAnimation";

const HomePage = props => {
   const StyledHomePage = useMemo(
      () => styled.div`
         position: relative;
         background-image: url("/static/images/stars.png");
      `,
      []
   );

   return (
      <>
         <StyledHomePage>
            <SidebarController />
            <CloudAnimation />
            <LogoHeader />
            <ApartmentBuildings />
            <HomeUserActions />
         </StyledHomePage>
         <PressFeatures />
      </>
   );
};

export default HomePage;

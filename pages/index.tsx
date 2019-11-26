import React, { useMemo, useEffect } from "react";
import styled from "styled-components";
import SidebarController from "../components/SidebarController";
import LogoHeader from "../containers/LogoHeader";
import ApartmentBuildings from "../containers/ApartmentsBuildings";
import PressFeatures from "../containers/PressFeatures";
import HomeUserActions from "../containers/HomeUserActions";
import CloudAnimation from "../components/CloudAnimation";
import { useRouter } from "next/router";
import useModal from "../hooks/useModal";
import ApartmentDetailsModal from "../containers/modals/ApartmentDetailsModal";

const HomePage = ({ apolloClient }) => {
   const router = useRouter();
   const { pushModal } = useModal();

   useEffect(() => {
      if (router.query && router.query.a) {
         const apt = Number.parseInt(router.query.a as string);
         if (apt) {
            pushModal({
               html: (
                  <ApartmentDetailsModal
                     hideArrows={true}
                     apartmentsStart={apt}
                     apt={apt}
                     apolloClient={apolloClient}
                  />
               )
            });
         }
      }
   }, [router, apolloClient]);

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

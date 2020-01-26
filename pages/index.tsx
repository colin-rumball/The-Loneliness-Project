import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import CloudAnimation from "../components/CloudAnimation";
import ApartmentBuildings from "../containers/ApartmentsBuildings";
import CornerIcons from "../containers/CornerIcons";
import HomeUserActions from "../containers/HomeUserActions";
import LogoHeader from "../containers/LogoHeader";
import ApartmentDetailsModal from "../containers/modals/ApartmentDetailsModal";
import PressFeatures from "../containers/PressFeatures";
import useModal from "../hooks/useModal";

const HomePage = ({ apolloClient }) => {
   const router = useRouter();
   const { pushModal } = useModal();

   // query url param for apartment
   useEffect(() => {
      if (router.query && router.query.a && typeof router.query.a == "string") {
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
   }, [router.query.a]);

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
            <CornerIcons />
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

import { useRouter } from "next/router";
import React, { useEffect, useMemo, useContext } from "react";
import styled from "styled-components";
import CloudAnimation from "../components/CloudAnimation";
import ApartmentBuildings from "../containers/ApartmentsBuildings";
import CornerIcons from "../containers/CornerIcons";
import HomeUserActions from "../containers/HomeUserActions";
import LogoHeader from "../containers/LogoHeader";
import ApartmentDetailsModal from "../containers/modals/ApartmentDetailsModal";
import PressFeatures from "../containers/PressFeatures";
import { Controller } from "../contexts/ControllerContext";
import InteractionController from "../components/InteractionController";
import { useModalContext } from "../contexts/ModalContext";
import useAudio from "../hooks/useAudio";

const HomePage = ({ apolloClient }) => {
   const router = useRouter();
   const { pushModal } = useModalContext();
   const { play: playAudio } = useAudio("/static/audio/cityscapes_short.mp3");

   // query url param for apartment
   useEffect(() => {
      if (router.query && router.query.a && typeof router.query.a == "string") {
         const apt = Number.parseInt(router.query.a as string);
         if (apt) {
            pushModal(
               <ApartmentDetailsModal
                  hideArrows={true}
                  apartmentsStart={apt}
                  apt={apt}
                  apolloClient={apolloClient}
               />,
               { name: "apartment" }
            );
         }
      }
   }, []);

   const StyledHomePage = useMemo(
      () => styled.div`
         position: relative;
         background-image: url("/static/images/stars.png");
      `,
      []
   );

   return (
      <InteractionController controller={Controller.MAIN} onClick={() => playAudio()}>
         <StyledHomePage>
            <CornerIcons />
            <CloudAnimation />
            <LogoHeader />
            <ApartmentBuildings />
            <HomeUserActions />
         </StyledHomePage>
         <PressFeatures />
      </InteractionController>
   );
};

export default HomePage;

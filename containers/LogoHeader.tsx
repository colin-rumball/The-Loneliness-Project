import React, { useEffect, useCallback, useState, useMemo } from "react";
import Logo from "../components/Logo";
import styled from "styled-components";

const LogoHeader: React.FC = () => {
   const getOpacityAmount = useCallback(() => {
      if (typeof document == "undefined") return 1.0;

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      return Math.min(Math.max(1.0 - (winScroll / height - 0) / (0.2 - 0), 0.0), 1.0);
   }, []);

   const [opactiy, setOpacity] = useState(1.0);

   const onScroll = useCallback(() => {
      setOpacity(getOpacityAmount());
   }, []);

   useEffect(() => {
      window.addEventListener("scroll", onScroll);
      return () => {
         window.removeEventListener("scroll", onScroll);
      };
   }, []);

   const StyledLogoHeader = useMemo(
      () => styled.div`
         position: fixed;
         display: flex;
         flex-direction: column;
         align-items: center;
         width: 100%;
         padding-top: 70px;
         user-select: none;
         pointer-events: none;
         /* left: 12vw; */
         /* padding: 70px 12vw 0 12vw; */
         opacity: ${props => props.opactiy};
         transition: opacity 0.2s ease;
         z-index: 1;

         .slogan {
            color: ${props => props.theme.Tan};
            font-size: 19px;
            font-weight: 500;
            line-height: 23px;
            text-align: center;
            letter-spacing: 0.4px;
         }
      `,
      []
   );

   return (
      <StyledLogoHeader opactiy={opactiy}>
         <Logo />
         <div className="slogan">
            <span>Weekly stories of loneliness. </span>
            <span>Visit an apartment to get started.</span>
         </div>
      </StyledLogoHeader>
   );
};

export default LogoHeader;

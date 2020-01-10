import React, { useEffect, useCallback, useState, useMemo } from "react";
import Logo from "../components/Logo";
import styled from "styled-components";
import { ThemeContainer } from "../themes/common";
import useDebouncedValue from "../hooks/useDebouncedValue";

const LogoHeader: React.FC = () => {
   const getOpacityAmount = useCallback(() => {
      if (typeof document == "undefined") return 1.0;

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      return Math.min(Math.max(1.0 - (winScroll / height - 0) / 0.15, 0.0), 1.0);
   }, []);
   const [opactiy, setOpacity] = useDebouncedValue(getOpacityAmount(), 50);

   const onScroll = useCallback(() => {
      setOpacity(getOpacityAmount());
   }, []);

   useEffect(() => {
      setOpacity(getOpacityAmount());
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
         justify-content: space-evenly;

         width: 100%;
         height: 350px;
         padding-top: 70px;
         user-select: none;
         pointer-events: none;
         opacity: ${props => props.opactiy};
         transition: opacity 0.2s ease;
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.MID_GROUND};

         .slogan {
            color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
            font-size: 20px;
            font-weight: 500;
            line-height: 23px;
            text-align: center;
            letter-spacing: 0.4px;

            max-width: 80%;
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

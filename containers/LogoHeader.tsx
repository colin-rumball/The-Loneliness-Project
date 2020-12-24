import React, { useEffect, useCallback, useState, useMemo } from "react";
import Logo from "../components/Logo";
import styled from "styled-components";
import { ThemeContainer } from "../themes/common";
import { debounce } from "lodash";
import Slogan from "../components/Slogan";

const StyledLogoHeader = styled.div`
   position: fixed;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-evenly;

   width: 100%;
   height: 430px;
   padding-top: 70px;
   user-select: none;
   pointer-events: none;
   opacity: ${(props) => props.currentOpacity};
   transition: opacity 0.2s ease;
   z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.MID_GROUND};

   animation: fadeIn 2s ease-out 0.25s backwards;

   @keyframes fadeIn {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }
`;

const LogoHeader: React.FC = () => {
   const getOpacityAmount = useCallback(() => {
      if (typeof document == "undefined") return 1.0;

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

      return Math.max(1 - winScroll / 400, 0.0);
   }, []);
   const [opacity, setOpacity] = useState(1.0);

   const debouncedSet = useCallback(
      debounce(
         () => {
            const newOpacity = getOpacityAmount();
            setOpacity(() => newOpacity);
         },
         50,
         { maxWait: 200 }
      ),
      []
   );

   const onScroll = useCallback(() => {
      debouncedSet();
   }, []);

   useEffect(() => {
      setOpacity(1.0);
      window.addEventListener("scroll", onScroll);
      return () => {
         window.removeEventListener("scroll", onScroll);
      };
   }, []);

   return (
      <StyledLogoHeader currentOpacity={opacity}>
         <Logo />
         <Slogan />
      </StyledLogoHeader>
   );
};

export default LogoHeader;

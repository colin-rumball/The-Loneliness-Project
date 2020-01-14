import React, { useEffect, useCallback, useState, useMemo } from "react";
import Logo from "../components/Logo";
import styled from "styled-components";
import { ThemeContainer } from "../themes/common";
import { debounce } from "lodash";

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
            setOpacity(newOpacity);
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
         opacity: ${props => props.opacity};
         transition: opacity 0.2s ease;
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.MID_GROUND};

         animation: fadeIn 2s ease-out 0.25s both;

         @keyframes fadeIn {
            from {
               opacity: 0;
            }
            to {
               opacity: 1;
            }
         }

         .slogan {
            color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
            font-size: 20px;
            font-weight: 500;
            line-height: 23px;
            text-align: center;
            letter-spacing: 0.4px;

            max-width: 80%;
            animation: fadeIn 1s ease-out 1s both;

            @keyframes fadeIn {
               from {
                  opacity: 0;
               }
               to {
                  opacity: 1;
               }
            }
         }
      `,
      []
   );

   return (
      <StyledLogoHeader opacity={opacity}>
         <Logo />
         <div className="slogan">
            <span>Weekly stories of loneliness. </span>
            <span>Visit an apartment to get started.</span>
         </div>
      </StyledLogoHeader>
   );
};

export default LogoHeader;

import React, { useMemo, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";

interface StyledStoreFrontProps {
   position: "left" | "center" | "right";
   image: string;
   alt: string;
}

const StyledStoreFrontDefaultProps: StyledStoreFrontProps = {
   position: "center",
   image: "",
   alt: ""
};

const StyledStoreFront: React.FC<StyledStoreFrontProps> = props => {
   const { position, image, alt } = { ...StyledStoreFrontDefaultProps, ...props };

   const easterEggAudio = useMemo(() => new Audio("/static/audio/lottery-winner.mp3"), []);
   const [showEasterEgg, setShowEasterEgg] = useState(false);
   const onEasterEggClicked = useCallback(() => {
      easterEggAudio.volume = 0.25;
      easterEggAudio.play();
      setShowEasterEgg(true);
   }, []);

   useEffect(() => {
      let timeoutId;
      if (showEasterEgg) {
         timeoutId = setTimeout(() => {
            setShowEasterEgg(false);
         }, 6300);
      }
      return () => {
         clearTimeout(timeoutId);
      };
   }, [showEasterEgg]);

   const StyledStoreFront = useMemo(
      () => styled.div`
         position: relative;
         flex-basis: 100%;
         padding: 0 1.5%;

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
            flex-basis: 50%;
            padding: ${({ theme }: ThemeContainer) => `0 ${theme.APARTMENT_STYLES.STORE_PADDING}`};
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
            flex-basis: 33%;
            padding: ${({ theme }: ThemeContainer) => `0 ${theme.APARTMENT_STYLES.STORE_PADDING}`};
         }

         .image-container {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
         }

         &.left {
            display: none;

            .store-front-image {
               /* transform: translateX(-0.8%); */
               /* width: 101.6%; */
               width: 100%;
            }

            @media (min-width: ${({ theme }: ThemeContainer) =>
                  theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
               display: block;
            }

            @media (min-width: ${({ theme }: ThemeContainer) =>
                  theme.VARIABLES.BREAK_POINTS.LARGE}) {
               display: block;
            }
         }

         &.center {
            display: block;

            @media (min-width: ${({ theme }: ThemeContainer) =>
                  theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
               display: none;
            }

            @media (min-width: ${({ theme }: ThemeContainer) =>
                  theme.VARIABLES.BREAK_POINTS.LARGE}) {
               display: block;
            }

            .store-front-image {
               /* transform: translateX(-2%); */
               /* width: 104%; */
               width: 100%;
               height: 100%;
            }
         }

         &.right {
            display: none;

            .store-front-image {
               /* transform: translateX(-0.8%); */
               /* width: 101.6%; */
               width: 100%;
            }

            @media (min-width: ${({ theme }: ThemeContainer) =>
                  theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
               display: block;
            }

            @media (min-width: ${({ theme }: ThemeContainer) =>
                  theme.VARIABLES.BREAK_POINTS.LARGE}) {
               display: block;
            }
         }
      `,
      []
   );

   const EasterEggClickArea = useMemo(
      () => styled.div`
         position: absolute;
         top: 40%;
         left: 13%;
         width: 6%;
         height: 8%;

         user-select: initial;
         pointer-events: initial;

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
            left: 18%;
         }

         &:hover {
            cursor: pointer;
         }
      `,
      []
   );

   const EasterEggText = useMemo(
      () => styled.div`
         position: absolute;
         top: 18%;
         left: -8%;
         width: 6%;
         height: 8%;

         text-align: center;
         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};

         &:hover {
            cursor: pointer;
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
            left: -7%;
            top: 12%;
         }
      `,
      []
   );

   const EasterEggLine = useMemo(
      () => styled.svg`
         position: absolute;
         top: 39%;
         left: 0;
         width: 9%;

         stroke: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};

         &:hover {
            cursor: pointer;
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
            top: 34%;
            width: 16%;
         }
      `,
      []
   );

   return (
      <StyledStoreFront className={position}>
         <div className="image-container">
            <img
               className="store-front-image"
               src={showEasterEgg ? "/static/stores/store_2.gif" : image}
               alt={alt}
            />
         </div>
         {showEasterEgg && (
            <>
               <EasterEggLine>
                  <line x1="0" y1="0" x2="350" y2="250" />
               </EasterEggLine>
               <EasterEggText>Winner Gagnant!</EasterEggText>
            </>
         )}
         {position === "center" && <EasterEggClickArea onClick={onEasterEggClicked} />}
      </StyledStoreFront>
   );
};

export default StyledStoreFront;

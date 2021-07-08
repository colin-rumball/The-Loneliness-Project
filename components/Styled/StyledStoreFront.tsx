import React, { useMemo, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { ThemeContainer } from "../../themes/common";

const InternalStyledStoreFront = styled.div<any>`
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

      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
         display: block;
      }

      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
         display: block;
      }
   }

   &.center {
      display: block;

      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
         display: none;
      }

      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
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

      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
         display: block;
      }

      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
         display: block;
      }
   }
`;

const EasterEggClickArea = styled.div<any>`
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
`;

const EasterEggText = styled.div<any>`
   position: absolute;
   top: 18%;
   left: -8%;
   width: 6%;
   height: 8%;
   font-size: 5.4vw;
   font-weight: 600;

   text-align: center;
   color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};

   &:hover {
      cursor: pointer;
   }

   @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
      left: 1%;
      top: 20%;
      font-size: 1.4vw;
   }
`;

const EasterEggLine = styled.svg`
   position: absolute;
   top: 37%;
   left: 3%;
   width: 7%;
   height: 8%;

   stroke: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};

   &:hover {
      cursor: pointer;
   }

   @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
      top: 37%;
      left: 9%;
      width: 7%;
      height: 8%;
   }
`;

interface StyledStoreFrontProps {
   position: "left" | "center" | "right";
   image: StaticImageData;
   alt: string;
}

const StyledStoreFrontDefaultProps: StyledStoreFrontProps = {
   position: "center",
   image: null,
   alt: "",
};

const StyledStoreFront: React.FC<StyledStoreFrontProps> = (props) => {
   const { position, image, alt } = { ...StyledStoreFrontDefaultProps, ...props };

   const easterEggAudio = useMemo(() => new Audio("/audio/lottery-winner.mp3"), []);
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

   return (
      <InternalStyledStoreFront className={position}>
         <div className="image-container">
            <div className="store-front-image">
               {showEasterEgg ? (
                  <Image src={{ src: "/stores/store_2.gif", width: 1000, height: 866 }} alt={alt} />
               ) : (
                  <Image src={image} alt={alt} />
               )}
            </div>
         </div>
         {showEasterEgg && (
            <>
               <EasterEggLine>
                  <line x1="0" y1="0" x2="100%" y2="100%" />
               </EasterEggLine>
               <EasterEggText>Winner Gagnant!</EasterEggText>
            </>
         )}
         {position === "center" && <EasterEggClickArea onClick={onEasterEggClicked} />}
      </InternalStyledStoreFront>
   );
};

export default StyledStoreFront;

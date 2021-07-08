import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";
import useCurrentTheme from "../../hooks/useCurrentTheme";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Image from "next/image";

const InternalStyledApartmentRoof = styled.div<any>`
   flex-basis: 100%;
   padding: ${({ theme }: ThemeContainer) => `0 ${theme.APARTMENT_STYLES.ROOF_PADDING}`};

   @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
      flex-basis: 50%;
   }

   @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
      flex-basis: 33%;
   }

   .image-container {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
   }

   &.left {
      /* transform: translateY(17%); */
      /* padding-right: 2.5%; */
      display: none;
      transform: translateY(12%);

      .roof-image {
         /* margin-left: -2%; */
         /* width: 104.9%; */
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
      /* padding: 0 2.5%; */
      display: block;
      transform: translateY(9%);
      padding: 0 1.4%;

      .roof-image {
         /* margin-left: -2.1%; */
         width: 100%;
         /* width: 104.8%; */
         /* height: 100%; */
      }

      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
         display: none;
      }

      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
         display: block;
         padding: ${({ theme }: ThemeContainer) => `0 ${theme.APARTMENT_STYLES.ROOF_PADDING}`};
      }
   }

   &.right {
      /* padding-left: 2.5%; */
      /* transform: translateY(17%); */
      display: none;
      transform: translateY(12%);
      padding: 0;

      .roof-image {
         /* margin-left: -4%; */
         /* width: 108.2%; */
         width: 100%;
      }

      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
         padding: 0 1.7%;
         display: block;
      }

      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
         display: block;
         padding: 0 2.4%;
      }
   }
`;

interface StyledApartmentRoofProps {
   position: "left" | "center" | "right";
   src: StaticImageData;
   // srcset: string;
   alt: string;
}

const StyledShowMoreDefaultProps: StyledApartmentRoofProps = {
   position: "center",
   src: null,
   // srcset: "",
   alt: "",
};

const StyledApartmentRoof: React.FC<StyledApartmentRoofProps> = (props) => {
   const { position, src, alt } = { ...StyledShowMoreDefaultProps, ...props };
   const currentTheme = useCurrentTheme();
   const { width } = useWindowDimensions();

   const expectedImageWidth = useMemo(() => {
      const breakPoints = currentTheme.VARIABLES.BREAK_POINTS;
      if (width > parseInt(breakPoints.LARGE.substring(0, breakPoints.LARGE.length - 2))) {
         return "30vw";
      } else if (width > parseInt(breakPoints.MEDIUM.substring(0, breakPoints.MEDIUM.length - 2))) {
         return "45vw";
      }
      return "90vw";
   }, [currentTheme, width]);

   return (
      <InternalStyledApartmentRoof className={position}>
         <div className="image-container">
            {/* <div className="roof-image"> */}
            <Image
               priority
               src={src}
               alt={alt}
               className="roof-image" /*sizes={expectedImageWidth}*/
            />
            {/* </div> */}
         </div>
      </InternalStyledApartmentRoof>
   );
};

export default StyledApartmentRoof;

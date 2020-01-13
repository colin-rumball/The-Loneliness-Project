import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";

interface StyledApartmentRoofProps {
   position: "left" | "center" | "right";
   image: string;
   alt: string;
}

const StyledShowMoreDefaultProps: StyledApartmentRoofProps = {
   position: "center",
   image: "",
   alt: ""
};

const StyledApartmentRoof: React.FC<StyledApartmentRoofProps> = props => {
   const { position, image, alt } = { ...StyledShowMoreDefaultProps, ...props };
   const StyledApartmentRoof = useMemo(
      () => styled.div`
         flex-basis: 100%;
         padding: ${({ theme }: ThemeContainer) => `0 ${theme.APARTMENT_STYLES.ROOF_PADDING}`};

         @media (min-width: 768px) {
            flex-basis: 50%;
         }

         @media (min-width: 1286px) {
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

            @media (min-width: 768px) {
               display: block;
            }

            @media (min-width: 1286px) {
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

            @media (min-width: 768px) {
               display: none;
            }

            @media (min-width: 1286px) {
               display: block;
               padding: ${({ theme }: ThemeContainer) =>
                  `0 ${theme.APARTMENT_STYLES.ROOF_PADDING}`};
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

            @media (min-width: 768px) {
               padding: 0 1.7%;
               display: block;
            }

            @media (min-width: 1286px) {
               display: block;
               padding: 0 2.4%;
            }
         }
      `,
      []
   );

   return (
      <StyledApartmentRoof className={position}>
         <div className="image-container">
            <img className="roof-image" src={image} alt={alt} />
         </div>
      </StyledApartmentRoof>
   );
};

export default StyledApartmentRoof;

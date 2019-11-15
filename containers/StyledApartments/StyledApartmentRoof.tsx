import React, { useMemo } from "react";
import styled from "styled-components";

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
         display: flex;
         flex-direction: column;
         justify-content: flex-end;
         flex-basis: 100%;
         z-index: 40;

         @media (min-width: 768px) {
            flex-basis: 50%;
         }

         @media (min-width: 1286px) {
            flex-basis: 33%;
         }

         &.left {
            transform: translateY(17%);
            padding-right: 2.5%;
            display: none;

            .roof-image {
               margin-left: -2%;
               width: 104.9%;
            }

            @media (min-width: 768px) {
               display: block;
            }

            @media (min-width: 1286px) {
               display: block;
            }
         }

         &.center {
            padding: 0 2.5%;
            display: block;

            .roof-image {
               margin-left: -2.1%;
               width: 104.8%;
               height: 100%;
            }

            @media (min-width: 768px) {
               display: none;
            }

            @media (min-width: 1286px) {
               display: block;
            }
         }

         &.right {
            padding-left: 2.5%;
            transform: translateY(17%);
            display: none;

            .roof-image {
               margin-left: -4%;
               width: 108.2%;
            }

            @media (min-width: 768px) {
               display: block;
            }

            @media (min-width: 1286px) {
               display: block;
            }
         }
      `,
      []
   );

   return (
      <StyledApartmentRoof className={position}>
         <img className="roof-image" src={image} alt={alt} />
      </StyledApartmentRoof>
   );
};

export default StyledApartmentRoof;

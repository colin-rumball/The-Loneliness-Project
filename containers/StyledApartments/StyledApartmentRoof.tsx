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
         flex-basis: 33%;
         z-index: 40;

         &.left {
            transform: translateY(17%);
            padding-right: 2.5%;
            .roof-image {
               margin-left: -2%;
               width: 104.9%;
            }
         }

         &.center {
            padding: 0 2.5%;
            .roof-image {
               margin-left: -2.1%;
               width: 104.8%;
            }
         }

         &.right {
            padding-left: 2.5%;
            transform: translateY(17%);
            .roof-image {
               margin-left: -4%;
               width: 108.2%;
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

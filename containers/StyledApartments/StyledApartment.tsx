import React, { useMemo } from "react";
import styled from "styled-components";

interface StyledApartmentProps {
   image: string;
   onClick();
}

const StyledApartmentDefaultProps: StyledApartmentProps = {
   image: "",
   onClick: () => {}
};

const StyledApartment: React.FC<StyledApartmentProps> = props => {
   const { image, onClick } = { ...StyledApartmentDefaultProps, ...props };
   const StyledApartment = useMemo(
      () => styled.div`
         position: relative;
         flex-basis: 33%;
         padding: 0 2.5%;
         z-index: 40;

         &:nth-child(3n) {
            transform: translateY(10.5%);
            padding: 0 0 0 2.5%;
         }

         &:nth-child(3n + 1) {
            transform: translateY(10.5%);
            padding: 0 2.5% 0 0;
         }

         .apartment {
            position: relative;
            pointer-events: none;
            max-width: 100%;
            min-height: 100%;
         }

         .backer {
            position: absolute;
            top: 10%;
            left: 10%;
            right: 10%;
            bottom: 10%;
            background: #85c0d0;
            transition: background 0.4s ease;

            &:hover {
               cursor: pointer;
               background: #f5d297;
            }
         }
      `,
      []
   );
   return (
      <StyledApartment>
         <div className="backer" onClick={onClick} />
         <img src={image} className="apartment" />
      </StyledApartment>
   );
};

export default StyledApartment;

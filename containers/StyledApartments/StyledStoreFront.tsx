import React, { useMemo } from "react";
import styled from "styled-components";

interface StyledStoreFrontProps {
   position: "left" | "center" | "right";
   image: string;
   alt: string;
   children?: object;
}

const StyledStoreFrontDefaultProps: StyledStoreFrontProps = {
   position: "center",
   image: "",
   alt: ""
};

const StyledStoreFront: React.FC<StyledStoreFrontProps> = props => {
   const { position, image, alt, children } = { ...StyledStoreFrontDefaultProps, ...props };
   const StyledStoreFront = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         flex-basis: 100%;
         z-index: 40;
         padding: 0 2.5%;

         &.left {
            padding: 0 2.5% 0 0;
            transform: translateY(2%);
            display: none;

            .store-front-image {
               transform: translateX(-0.8%);
               width: 101.6%;
            }

            @media (min-width: 768px) {
               flex-basis: 50%;
               display: block;
            }

            @media (min-width: 1286px) {
               flex-basis: 33%;
               display: block;
            }
         }

         &.center {
            display: block;

            @media (min-width: 768px) {
               flex-basis: 50%;
               display: none;
            }

            @media (min-width: 1286px) {
               flex-basis: 33%;
               display: block;
            }

            .store-front-image {
               transform: translateX(-2%);
               width: 104%;
            }
         }

         &.right {
            padding: 0 0 0 2.5%;
            transform: translateY(2%);
            display: none;

            .store-front-image {
               transform: translateX(-0.8%);
               width: 101.6%;
            }

            @media (min-width: 768px) {
               flex-basis: 50%;
               display: block;
            }

            @media (min-width: 1286px) {
               flex-basis: 33%;
               display: block;
            }
         }
      `,
      []
   );

   return (
      <StyledStoreFront className={position}>
         <img className="store-front-image" src={image} alt={alt} />
         {children}
      </StyledStoreFront>
   );
};

export default StyledStoreFront;

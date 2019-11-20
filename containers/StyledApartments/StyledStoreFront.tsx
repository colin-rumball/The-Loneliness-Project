import React, { useMemo } from "react";
import styled from "styled-components";
import StyledCat from "./StyledCat";
import StyledCross from "./StyledCross";
import { ThemeContainer } from "../../styles/themes/DefaultTheme";

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
   const StyledStoreFront = useMemo(
      () => styled.div`
         flex-basis: 100%;
         padding: ${({ theme }: ThemeContainer) => `0 ${theme.APARTMENT_STYLES.STORE_PADDING}`};

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
            display: none;

            .store-front-image {
               /* transform: translateX(-0.8%); */
               /* width: 101.6%; */
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
            display: block;

            @media (min-width: 768px) {
               display: none;
            }

            @media (min-width: 1286px) {
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

   const FlareComponent = useMemo(() => {
      switch (position) {
         case "left":
            return <StyledCat />;
         case "center":
            return <></>;
         case "right":
            return <StyledCross />;
         default:
            return <></>;
      }
   }, [position]);

   return (
      <StyledStoreFront className={position}>
         <div className="image-container">
            <img className="store-front-image" src={image} alt={alt} />
         </div>
         {/* {FlareComponent} */}
      </StyledStoreFront>
   );
};

export default StyledStoreFront;

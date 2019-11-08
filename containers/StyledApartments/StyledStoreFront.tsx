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
         flex-basis: 33%;
         z-index: 40;
         padding: 0 2.5%;

         &.left {
            padding: 0 2.5% 0 0;
            transform: translateY(2%);

            .store-front-image {
               transform: translateX(-0.8%);
               width: 101.6%;
            }
         }

         &.center {
            .store-front-image {
               transform: translateX(-2%);
               width: 104%;
            }
         }

         &.right {
            padding: 0 0 0 2.5%;
            transform: translateY(2%);

            .store-front-image {
               transform: translateX(-0.8%);
               width: 101.6%;
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

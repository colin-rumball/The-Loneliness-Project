import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";

interface StyledShowMoreProps {
   onClick?();
}

const StyledShowMoreDefaultProps: StyledShowMoreProps = {
   onClick: () => {}
};

const StyledShowMore: React.FC<StyledShowMoreProps> = props => {
   const { onClick } = { ...StyledShowMoreDefaultProps, ...props };

   const StyledShowMoreContainer = useMemo(
      () => styled.div`
         position: absolute;
         top: 800px;
         right: 2%;
         bottom: 12%;
         width: 3.5%;
         min-width: 50px;
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.FOREGROUND - 1};

         @media (min-width: 768px) {
            right: 3%;
            bottom: 25%;
         }

         @media (min-width: 1286px) {
            right: 5%;
            bottom: 30%;
         }
      `,
      []
   );

   const StyledShowMore = useMemo(
      () => styled.div`
         position: sticky;
         width: 200%;
         height: auto;
         top: 50%;
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.FOREGROUND - 1};

         .load-more-image {
            display: block;
            z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.FOREGROUND - 1};
            transform: translateX(-50%);
            width: 100%;
         }
      `,
      []
   );

   const ClickableArea = useMemo(
      () => styled.div`
         position: absolute;
         right: 0;
         top: 0;
         bottom: 0;
         width: 100%;
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.ON_TOP};

         &:hover {
            cursor: pointer;
         }
      `,
      []
   );

   return (
      <>
         <StyledShowMoreContainer>
            <StyledShowMore>
               <img
                  className="load-more-image"
                  src="/static/apartments/load-more.png"
                  alt="load more"
               />
            </StyledShowMore>
         </StyledShowMoreContainer>
         <ClickableArea onClick={onClick} />
      </>
   );
};

export default StyledShowMore;

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
         right: 0;
         bottom: 850px;
         width: 3.5%;
         min-width: 50px;
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.FOREGROUND - 1};
         animation: ${({ theme }: ThemeContainer) => theme.ANIMATIONS.FadeIn} 3s 1s ease-in both;

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.SMALL}) {
            right: 2%;
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
            right: 3%;
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
            right: 5%;
            bottom: 600px;
         }
      `,
      []
   );

   const StyledShowMore = useMemo(
      () => styled.div`
         position: sticky;
         width: 100%;
         height: auto;
         top: 50%;
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.FOREGROUND - 1};

         .load-more-image {
            display: block;
            z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.FOREGROUND - 1};
            transform: translateX(-50%);
            width: 200%;
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
                  src="/static/images/load-more.png"
                  alt="load more"
               />
               <ClickableArea onClick={onClick} />
            </StyledShowMore>
         </StyledShowMoreContainer>
      </>
   );
};

export default StyledShowMore;

import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../styles/themes/DefaultTheme";

interface StyledShowMoreProps {
   onClick?();
}

const StyledShowMoreDefaultProps: StyledShowMoreProps = {
   onClick: () => {}
};

const StyledShowMore: React.FC<StyledShowMoreProps> = props => {
   const { onClick } = { ...StyledShowMoreDefaultProps, ...props };
   const StyledShowMore = useMemo(
      () => styled.div`
         position: absolute;
         right: 0;
         margin-right: 6%;
         bottom: 80vh;
         width: 3%;
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.FOREGROUND};

         .load-more-image {
            width: 100%;
         }

         &:hover {
            cursor: pointer;
         }
      `,
      []
   );

   return (
      <StyledShowMore onClick={onClick}>
         <img className="load-more-image" src="/static/apartments/load-more.png" alt="load more" />
      </StyledShowMore>
   );
};

export default StyledShowMore;

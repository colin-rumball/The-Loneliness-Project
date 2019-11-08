import React, { useMemo } from "react";
import styled from "styled-components";

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
         margin-right: 2.5%;
         bottom: 15%;
         z-index: 41;
         width: 3.5%;

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

import React, { useMemo } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import StyledIcon from "./Styled/StyledIcon";

interface ArrowsProps {
   currentApt: number;
   onLeftArrowClicked?(apt: number);
   onRightArrowClicked?(apt: number);
   showLeftArrow?: boolean;
   showRightArrow?: boolean;
}

const ArrowsDefaultProps: ArrowsProps = {
   currentApt: 1,
   onLeftArrowClicked: () => {},
   onRightArrowClicked: () => {},
   showLeftArrow: true,
   showRightArrow: true
};

const Arrows: React.FC<ArrowsProps> = props => {
   const { currentApt, onLeftArrowClicked, onRightArrowClicked, showLeftArrow, showRightArrow } = {
      ...ArrowsDefaultProps,
      ...props
   };
   const StyledArrows = useMemo(
      () => styled.div`
         position: absolute;
         display: flex;
         flex-wrap: nowrap;
         justify-content: space-between;
         align-items: center;
         left: -50px;
         right: -50px;
         top: 0;
         bottom: 0;
         pointer-events: none;
      `,
      []
   );

   const StyledArrowIcon = useMemo(
      () => styled.div`
         pointer-events: ${props => (props.showArrow ? "auto" : "none")};
         opacity: ${props => (props.showArrow ? "1" : "0")};
      `,
      []
   );

   return (
      <StyledArrows>
         <StyledArrowIcon showArrow={showLeftArrow}>
            <StyledIcon
               icon={FaArrowLeft}
               onClick={() => onLeftArrowClicked(currentApt + 1)}
               color={"#fff"}
               size={"30px"}
            />
         </StyledArrowIcon>

         <StyledArrowIcon showArrow={showRightArrow}>
            <StyledIcon
               icon={FaArrowRight}
               onClick={() => onRightArrowClicked(currentApt - 1)}
               color={"#fff"}
               size={"30px"}
            />
         </StyledArrowIcon>
      </StyledArrows>
   );
};

export default Arrows;

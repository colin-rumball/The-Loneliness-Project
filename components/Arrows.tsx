import React, { useMemo } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

         .arrow {
            font-size: 30px;
            color: #fff;
            opacity: 0.7;
            transition: opacity 0.3s ease, transform 0.3s ease;

            &:hover {
               cursor: pointer;
               opacity: 1;
               transform: scale(1.1);
            }

            &:active {
               transform: scale(0.9);
            }
         }
      `,
      []
   );
   return (
      <StyledArrows>
         {showLeftArrow && (
            <FaArrowLeft onClick={() => onLeftArrowClicked(currentApt + 1)} className="arrow" />
         )}
         {showRightArrow && (
            <FaArrowRight onClick={() => onRightArrowClicked(currentApt - 1)} className="arrow" />
         )}
      </StyledArrows>
   );
};

export default Arrows;

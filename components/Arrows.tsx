import React, { useMemo } from "react";
import styled from "styled-components";
import StyledIcon from "./Styled/StyledIcon";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

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
               icon={IoIosArrowBack}
               onClick={() => onLeftArrowClicked(currentApt + 1)}
               color={"#fff"}
               size={"38px"}
            />
         </StyledArrowIcon>

         <StyledArrowIcon showArrow={showRightArrow}>
            <StyledIcon
               icon={IoIosArrowForward}
               onClick={() => onRightArrowClicked(currentApt - 1)}
               color={"#fff"}
               size={"38px"}
            />
         </StyledArrowIcon>
      </StyledArrows>
   );
};

export default Arrows;

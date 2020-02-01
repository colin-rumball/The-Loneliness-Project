import React, { useMemo } from "react";
import styled from "styled-components";
import StyledIcon from "./Styled/StyledIcon";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { ThemeContainer } from "../themes/common";

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
         justify-content: space-around;
         align-items: center;
         left: 0;
         right: 0;
         bottom: -66px;
         pointer-events: none;

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
            justify-content: space-between;
            left: -60px;
            right: -60px;
            top: 0;
            bottom: 0;
         }
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
               icon={<IoIosArrowBack />}
               onClick={() => onLeftArrowClicked(currentApt + 1)}
               color={"#fff"}
               size={"54px"}
            />
         </StyledArrowIcon>

         <StyledArrowIcon showArrow={showRightArrow}>
            <StyledIcon
               icon={<IoIosArrowForward />}
               onClick={() => onRightArrowClicked(currentApt - 1)}
               color={"#fff"}
               size={"54px"}
            />
         </StyledArrowIcon>
      </StyledArrows>
   );
};

export default Arrows;

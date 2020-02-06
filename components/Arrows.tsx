import React, { useMemo, useContext } from "react";
import styled from "styled-components";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { ThemeContainer } from "../themes/common";
import { RandomColorContext } from "../contexts/RandomColorContext";

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
   const { randomColor } = useContext(RandomColorContext);
   const StyledArrows = useMemo(
      () => styled.div`
         position: absolute;
         display: flex;
         flex-wrap: nowrap;
         justify-content: space-around;
         align-items: center;
         bottom: -75px;
         pointer-events: none;
         left: 1px;
         right: 1px;

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
         display: flex;
         justify-content: center;
         align-items: center;
         text-align: center;

         filter: ${props => (props.showArrow ? null : "grayscale(100%)")};
         pointer-events: ${props => (props.showArrow ? "auto" : "none")};

         background: #fff;
         color: ${props => (props.showArrow ? props.randomColor : "rgba(100,100,100,0.5)")};
         border-top: solid 2px ${props => props.randomColor};

         width: 100%;

         padding: 10px 0;
         font-size: 54px;
         pointer-events: all;

         &:first-child {
            border-right: solid 1px ${props => props.randomColor};
         }

         &:last-child {
            border-left: solid 1px ${props => props.randomColor};
         }

         &:hover {
            cursor: ${props => (props.showArrow ? "pointer" : "default")};
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
            background: rgba(0, 0, 0, 0);
            width: auto;

            &:first-child {
               border: none;
            }

            &:last-child {
               border: none;
            }
         }
      `,
      []
   );

   return (
      <StyledArrows>
         <StyledArrowIcon
            showArrow={showLeftArrow}
            randomColor={randomColor}
            onClick={() => {
               if (showLeftArrow) onLeftArrowClicked(currentApt + 1);
            }}
         >
            <IoIosArrowBack />
         </StyledArrowIcon>

         <StyledArrowIcon
            showArrow={showRightArrow}
            randomColor={randomColor}
            onClick={() => {
               if (showRightArrow) onRightArrowClicked(currentApt - 1);
            }}
         >
            <IoIosArrowForward />
         </StyledArrowIcon>
      </StyledArrows>
   );
};

export default Arrows;

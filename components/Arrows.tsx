import React, { useMemo, useContext, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { ThemeContainer } from "../themes/common";
import { RandomColorContext } from "../contexts/RandomColorContext";

const StyledArrows = styled.div<any>`
   position: absolute;
   display: flex;
   flex-wrap: nowrap;
   justify-content: space-around;
   align-items: center;
   bottom: -69px;
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
`;

const StyledArrowIcon = styled.div<any>`
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;

   filter: ${(props) => (props.showArrow ? null : "grayscale(100%)")};
   pointer-events: ${(props) => (props.showArrow ? "auto" : "none")};

   background: #fff;
   color: ${(props) => (props.showArrow ? props.randomColor : "rgba(100,100,100,0.5)")};
   border-top: solid 2px ${(props) => props.randomColor};

   width: 100%;

   padding: 10px 0;
   font-size: 48px;
   pointer-events: all;
   opacity: 0.95;

   transition: scale 0.4s ease-in-out, opacity 0.4s ease-in-out;

   &:first-child {
      border-right: solid 1px ${(props) => props.randomColor};
   }

   &:last-child {
      border-left: solid 1px ${(props) => props.randomColor};
   }

   &:hover {
      cursor: ${(props) => (props.showArrow ? "pointer" : "default")};
      opacity: 1;
   }

   &:active {
      transform: scale(0.95);
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
`;

interface ArrowsProps {
   currentApt: number;
   onArrowClicked?(arrow: "left" | "right"): void;
   leftArrowEnabled?: boolean;
   rightArrowEnabled?: boolean;
}

const ArrowsDefaultProps: ArrowsProps = {
   currentApt: 1,
   onArrowClicked: () => {},
   leftArrowEnabled: true,
   rightArrowEnabled: true,
};

const Arrows: React.FC<ArrowsProps> = (props) => {
   const {
      currentApt,
      onArrowClicked = () => {},
      leftArrowEnabled,
      rightArrowEnabled,
   } = {
      ...ArrowsDefaultProps,
      ...props,
   };
   const { randomColor } = useContext(RandomColorContext);

   const onKeyPress = useCallback(
      (e) => {
         if (e.key === "ArrowLeft" && leftArrowEnabled) {
            onArrowClicked("left");
         } else if (e.key === "ArrowRight" && rightArrowEnabled) {
            onArrowClicked("right");
         }
      },
      [currentApt, leftArrowEnabled, rightArrowEnabled]
   );

   useEffect(() => {
      window?.addEventListener("keydown", onKeyPress);

      return () => {
         window?.removeEventListener("keydown", onKeyPress);
      };
   }, [onKeyPress]);

   return (
      <StyledArrows>
         <StyledArrowIcon
            showArrow={leftArrowEnabled}
            randomColor={randomColor}
            onClick={() => {
               if (leftArrowEnabled) onArrowClicked("left");
            }}
         >
            <FiArrowLeft />
         </StyledArrowIcon>

         <StyledArrowIcon
            showArrow={rightArrowEnabled}
            randomColor={randomColor}
            onClick={() => {
               if (rightArrowEnabled) onArrowClicked("right");
            }}
         >
            <FiArrowRight />
         </StyledArrowIcon>
      </StyledArrows>
   );
};

export default Arrows;

import React, { useMemo, forwardRef } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";

interface StyledApartmentProps {
   key?: any;
   image: string;
   onClick();
   [key: string]: any;
}

const StyledApartmentDefaultProps: StyledApartmentProps = {
   image: "",
   onClick: () => {}
};

const StyledApartment: React.FC<StyledApartmentProps> = forwardRef((props, ref) => {
   const { key, image, onClick } = { ...StyledApartmentDefaultProps, ...props };
   const StyledApartment = useMemo(
      () => styled.div`
         position: relative;
         flex-basis: 100%;
         padding: ${({ theme }: ThemeContainer) => `0 ${theme.APARTMENT_STYLES.UNIT_PADDING}`};

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
            flex-basis: 50%;
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
            flex-basis: 33%;
         }

         &:nth-child(3n) {
            /* Right Apartments */
            transform: translateY(0);
            @media (min-width: ${({ theme }: ThemeContainer) =>
                  theme.VARIABLES.BREAK_POINTS.LARGE}) {
               transform: translateY(8.4%);
            }
         }

         &:nth-child(3n + 1) {
            /* Left Apartments */
            transform: translateY(0);
            @media (min-width: ${({ theme }: ThemeContainer) =>
                  theme.VARIABLES.BREAK_POINTS.LARGE}) {
               transform: translateY(8.4%);
            }
         }

         .apartment {
            position: relative;
            pointer-events: none;
            max-width: 100%;
            min-height: 101%;
         }

         .backer {
            position: absolute;
            top: 10%;
            left: 14%;
            right: 14%;
            bottom: 10%;
            background: #85c0d0;
            transition: background 0.4s ease;
            user-select: initial;
            pointer-events: initial;

            &:hover {
               cursor: pointer;
               background: #f5d297;
            }
         }
      `,
      []
   );
   return (
      <StyledApartment>
         <div ref={ref as any} className="backer" onClick={onClick} />
         <img src={image} alt={`apartment-${key}-image`} className="apartment" />
      </StyledApartment>
   );
});

export default StyledApartment;

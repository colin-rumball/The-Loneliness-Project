import React, { useMemo, forwardRef, Key, MutableRefObject, useState } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useCurrentTheme from "../../hooks/useCurrentTheme";

const InternalStyledApartment = styled.article`
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
      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
         transform: translateY(8.4%);
      }
   }

   &:nth-child(3n + 1) {
      /* Left Apartments */
      transform: translateY(0);
      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
         transform: translateY(8.4%);
      }
   }

   .gap-filler-contianer {
      position: relative;
      width: 100%;

      .gap-filler {
         position: absolute;
         height: 20px;
         background: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.DarkBlue};
         bottom: 0;
         left: 0;
         right: 0;
      }
   }

   .apartment-image {
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
`;

interface StyledApartmentProps {
   key?: Key;
   src: string;
   srcset: string;
   onClick();
   ref?: any;
}

const StyledApartmentDefaultProps: StyledApartmentProps = {
   src: "",
   srcset: "",
   onClick: () => {},
};

const StyledApartment: React.FC<StyledApartmentProps> = forwardRef((props, ref) => {
   const { key, src, srcset, onClick } = { ...StyledApartmentDefaultProps, ...props };
   const currentTheme = useCurrentTheme();
   const { width } = useWindowDimensions();
   const [loaded, setLoaded] = useState(false);

   const expectedImageWidth = useMemo(() => {
      const breakPoints = currentTheme.VARIABLES.BREAK_POINTS;
      if (width > parseInt(breakPoints.LARGE.substring(0, breakPoints.LARGE.length - 2))) {
         return "30vw";
      } else if (width > parseInt(breakPoints.MEDIUM.substring(0, breakPoints.MEDIUM.length - 2))) {
         return "45vw";
      }
      return "90vw";
   }, [currentTheme, width]);

   return (
      <InternalStyledApartment>
         {loaded && <div ref={ref as any} className="backer" onClick={onClick} />}
         <img
            style={loaded ? {} : { display: "none" }}
            src={src}
            srcSet={srcset}
            sizes={expectedImageWidth}
            className="apartment-image"
            alt={`apartment-${key}-image`}
            onLoad={() => setLoaded(true)}
         />
         <div className="gap-filler-contianer">
            <div className="gap-filler" />
         </div>
      </InternalStyledApartment>
   );
});

export default StyledApartment;

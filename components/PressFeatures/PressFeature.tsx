import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";

export interface FeatureInfo {
   alt: string;
   class: string;
   src: string;
}

interface PressFeatureProps {
   info: FeatureInfo;
}

const PressFeatureDefaultProps: PressFeatureProps = {
   info: { alt: "", class: "", src: "" }
};

const PressFeature: React.FC<PressFeatureProps> = props => {
   const { info } = { ...PressFeatureDefaultProps, ...props };
   const StyledPressFeature = useMemo(
      () => styled.div`
         display: flex;
         justify-content: center;
         align-items: center;
         flex-basis: 50%;
         margin-bottom: 40px;
         text-align: center;
         height: 60px;

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
            flex-basis: 33.3%;
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
            flex-basis: 16.6%;
         }

         .press-image {
            max-width: 100%;
            max-height: 100%;

            &.walrus {
               max-width: 90%;
               max-height: 90%;
            }

            &.creative-boom {
               max-width: 90%;
            }

            &.macleans {
               max-width: 70%;
               max-height: 70%;
            }

            &.nice-that {
               max-width: 65%;
               max-height: 65%;
            }

            &.spark {
               max-width: 70%;
               max-height: 80%;
            }

            &.how {
            }

            &.the-globe {
            }

            &.national-post {
               max-width: 90%;
               max-height: 90%;
            }

            &.global {
               margin: 0 10px;
            }

            &.radio-canada {
               margin: 0 10px;
            }
         }
      `,
      []
   );

   return (
      <StyledPressFeature>
         <img
            className={`press-image ${info.class}`}
            src={`/static/press/${info.src}`}
            alt={`${info.alt}`}
         />
      </StyledPressFeature>
   );
};

export default PressFeature;

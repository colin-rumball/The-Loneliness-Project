import React, { useMemo } from "react";
import styled from "styled-components";
import pressFeatures from "./../static/press.json";
import { ThemeContainer } from "../themes/common.js";

interface PressFeaturesProps {}

const PressFeatures: React.FC<PressFeaturesProps> = ({}) => {
   const StyledPressHeader = useMemo(
      () => styled.div`
         width: 100%;
         padding: 20px 40px;
         text-align: center;
         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
         opacity: 0.9;
         font-family: "lato", sans-serif;
         margin-top: 20px;
         font-size: 16px;
         font-weight: 600;
      `,
      []
   );

   const StyledPressFeatures = useMemo(
      () => styled.div`
         display: flex;
         flex-wrap: wrap;
         justify-content: space-evenly;
         align-items: center;
         width: 100%;
         padding: 20px 40px;
         margin-bottom: 40px;

         a {
            opacity: 0.95;
            flex-basis: 50%;
            padding: 8px 14px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform 0.3s ease, opacity 0.3s ease;
            min-height: 80px;

            &:hover {
               transform: scale(1.1);
               opacity: 1;
            }

            @media (min-width: 768px) {
               flex-basis: 33.3%;
            }

            @media (min-width: 1286px) {
               flex-basis: 16.6%;
            }

            img {
               max-width: 100%;
               height: auto;
            }
         }
      `,
      []
   );

   return (
      <>
         <StyledPressHeader>PROUD TO BE FEATURED ON</StyledPressHeader>
         <StyledPressFeatures>
            {pressFeatures.map(feature => {
               return (
                  <a key={feature.alt} href={`${feature.press}`} target="_blank">
                     <img src={`/static/press/${feature.src}`} alt={`${feature.alt}`} />
                  </a>
               );
            })}
         </StyledPressFeatures>
      </>
   );
};

export default PressFeatures;

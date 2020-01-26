import React, { useMemo } from "react";
import styled from "styled-components";
import PressHeader from "../components/PressFeatures/PressHeader";
import RenderPressFeatures from "../components/PressFeatures/RenderPressFeatures";
import pressFeatures from "./../static/press.json";

interface PressFeaturesProps {}

const PressFeatures: React.FC<PressFeaturesProps> = ({}) => {
   const StyledPressFeatures = useMemo(
      () => styled.div`
         display: flex;
         flex-wrap: wrap;
         justify-content: space-evenly;
         align-items: center;
         width: 100%;
         padding: 20px 40px;
         margin-bottom: 40px;
      `,
      []
   );

   return (
      <>
         <PressHeader />
         <StyledPressFeatures>
            <RenderPressFeatures features={pressFeatures} />
         </StyledPressFeatures>
      </>
   );
};

export default PressFeatures;

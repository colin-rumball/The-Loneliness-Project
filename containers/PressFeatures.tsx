import React, { useMemo } from "react";
import styled from "styled-components";
import PressHeader from "../components/PressFeatures/PressHeader";
import RenderPressFeatures from "../components/PressFeatures/RenderPressFeatures";
import pressFeatures from "./../public/press.json";

const StyledPressFeatures = styled.div<any>`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;
   width: 100%;
   padding: ${(props) => (props.addPadding ? "20px 40px" : null)};
   margin-bottom: 40px;
`;

interface PressFeaturesProps {
   addPadding?: boolean;
}

const PressFeaturesDefaultProps: PressFeaturesProps = {
   addPadding: true,
};

const PressFeatures: React.FC<PressFeaturesProps> = (props) => {
   const { addPadding } = { ...PressFeaturesDefaultProps, ...props };

   return (
      <>
         <PressHeader />
         <StyledPressFeatures addPadding={addPadding}>
            <RenderPressFeatures features={pressFeatures} />
         </StyledPressFeatures>
      </>
   );
};

export default PressFeatures;

import React from "react";
import PressFeature, { FeatureInfo } from "./PressFeature";

interface RenderPressFeaturesProps {
   features: FeatureInfo[];
}

const RenderPressFeaturesDefaultProps: RenderPressFeaturesProps = {
   features: []
};

const RenderPressFeatures: React.FC<RenderPressFeaturesProps> = props => {
   const { features } = { ...RenderPressFeaturesDefaultProps, ...props };
   return (
      <>
         {features.map(feature => (
            <PressFeature info={feature} key={feature.alt} />
         ))}
      </>
   );
};

export default RenderPressFeatures;

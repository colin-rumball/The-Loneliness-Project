import React, { useMemo } from "react";
import styled from "styled-components";
import PressHeader from "../components/PressFeatures/PressHeader";
import RenderPressFeatures from "../components/PressFeatures/RenderPressFeatures";
import pressFeatures from "./../public/press.json";
import BuzzFeedImage from "../public/press/press-buzzfeed.png";
import GuardianImage from "../public/press/press-theguardian.png";
import CBCImage from "../public/press/press-cbc-metromorning.png";
import WalrusImage from "../public/press/press-thewalrus.png";
import TorontoStarImage from "../public/press/press-torontostar.png";
import CreativeImage from "../public/press/press-creativeboom.png";
import MacleansImage from "../public/press/press-macleans.png";
import GlobeImage from "../public/press/press-globe-and-mail.png";
import ItsNiceImage from "../public/press/press-itsnicethat.png";
import SparkImage from "../public/press/press-spark.png";
import NationalPostImage from "../public/press/press-nationalpost.png";
import GlobalImage from "../public/press/press-globalnews.png";
import RadioImage from "../public/press/press-radiocanada.png";
import HowImage from "../public/press/press-how.png";

const featureImageMap = {
   "press-buzzfeed.png": BuzzFeedImage,
   "press-theguardian.png": GuardianImage,
   "press-cbc-metromorning.png": CBCImage,
   "press-thewalrus.png": WalrusImage,
   "press-torontostar.png": TorontoStarImage,
   "press-creativeboom.png": CreativeImage,
   "press-macleans.png": MacleansImage,
   "press-globe-and-mail.png": GlobeImage,
   "press-itsnicethat.png": ItsNiceImage,
   "press-spark.png": SparkImage,
   "press-nationalpost.png": NationalPostImage,
   "press-globalnews.png": GlobalImage,
   "press-radiocanada.png": RadioImage,
   "press-how.png": HowImage,
};

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
            <RenderPressFeatures
               features={pressFeatures.map((feature) => ({
                  ...feature,
                  src: featureImageMap[feature.src],
               }))}
            />
         </StyledPressFeatures>
      </>
   );
};

export default PressFeatures;

import { CSSProperties } from "react";
import { FlexProps } from "../../helpers/withFlex";

export interface SectionProps extends FlexProps {
   children?: Object;
   className?: string;
   style?: CSSProperties;
}

const ScreenSection = (props: SectionProps) => {
   return <></>;
   // return <FlexibleComponent {...props} className={"pd-screen-section " + props.className} />;
};

export default ScreenSection;

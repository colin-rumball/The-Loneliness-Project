import classNames from "classnames";
import ScreenHeader, { ScreenHeaderProps } from "./ScreenHeader";
import { FlexDirection, ContentAlignment } from "./common";

export enum ScreenBackground {
   DEFAULT,
   RED,
   PURPLE
}

export interface ScreenProps {
   children?: Object;
   background?: ScreenBackground;
   header?: string | Object;
   headerProps?: ScreenHeaderProps;
}

const ScreenContent = (props: ScreenProps) => {
   const cn = classNames("pd-screen", {
      red: props.background == ScreenBackground.RED,
      purple: props.background == ScreenBackground.PURPLE
   });

   const header =
      typeof props.header == "string" ? (
         <ScreenHeader {...props.headerProps}>{props.header}</ScreenHeader>
      ) : (
         props.header
      );

   return (
      <></>
      // <FlexibleComponent
      //    className={cn}
      //    direction={FlexDirection.COLUMN}
      //    alignItems={ContentAlignment.CENTER}
      //    growValue={2}
      // >
      //    {header}
      //    <div className="content-container">{props.children}</div>
      // </FlexibleComponent>
   );
};

export default ScreenContent;

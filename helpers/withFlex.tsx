import { FlexDirection, ContentJustification, ContentAlignment } from "../components/Base/common";

import React, { CSSProperties } from "react";

export interface FlexProps {
   children?: Object;
   growValue?: number;
   direction?: FlexDirection;
   justifyContent?: ContentJustification;
   alignItems?: ContentAlignment;
   alignContent?: ContentAlignment;
   className?: string;
   style?: CSSProperties;
}

export const withFlex = <T extends FlexProps>(WrappedComponent) => {
   return class extends React.Component<T> {
      constructor(props) {
         super(props);
      }

      render() {
         const {
            growValue = 0,
            direction = FlexDirection.ROW,
            justifyContent = ContentJustification.FLEX_START,
            alignItems = ContentAlignment.STRETCH,
            alignContent = ContentAlignment.FLEX_START,
            style,
            ...rest
         } = this.props;
         return (
            <WrappedComponent
               className={this.props.className}
               style={{
                  display: "flex",
                  flexDirection: direction,
                  flexGrow: growValue,
                  justifyContent: justifyContent,
                  alignItems: alignItems,
                  alignContent: alignContent,
                  ...style
               }}
               {...rest}
            >
               {this.props.children}
            </WrappedComponent>
         );
      }
   };
};

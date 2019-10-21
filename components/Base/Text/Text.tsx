import classnames from "classnames";
import { CSSProperties } from "react";
import React from "react";
import "./text-style.scss";

export enum TextBackground {
   NONE
}

export enum TextSize {
   XSMALL = "xsmall",
   SMALL = "small",
   MEDIUM = "medium",
   LARGE = "large",
   XLARGE = "xlarge"
}

export enum TextAlign {
   LEFT = "left",
   CENTER = "center",
   RIGHT = "right"
}

export enum TextColor {
   DEFAULT
}

export interface TextProps {
   text: string;
   size?: TextSize;
   textAlign?: TextAlign;
   color?: TextColor;
   background?: TextBackground;
   className?: string;
   style?: CSSProperties;
}

class Text extends React.Component<TextProps> {
   static defaultProps: TextProps = {
      text: "",
      size: TextSize.MEDIUM,
      textAlign: TextAlign.LEFT,
      color: TextColor.DEFAULT,
      background: TextBackground.NONE,
      className: undefined,
      style: {}
   };

   constructor(props) {
      super(props);
   }

   getClassNames() {
      const { size, textAlign, className }: TextProps = this.props;
      return classnames("pd-text", size, textAlign, className);
   }

   render() {
      const { text, style } = this.props;
      return (
         <div className={this.getClassNames()} style={style}>
            {text}
         </div>
      );
   }
}

export default Text;

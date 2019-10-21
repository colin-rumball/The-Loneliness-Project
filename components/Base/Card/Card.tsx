import classnames from "classnames";
import React, { CSSProperties } from "react";
import "./card-style.scss";

export enum CardBackground {
   DEFAULT = "",
   PURPLE = "purple",
   LILAC = "lilac"
}

export enum CardSize {
   DEFAULT = "",
   SMALL = "small",
   WIDE = "wide",
   TALL = "tall",
   LARGE = "large"
}

export interface CardProps {
   size?: CardSize;
   header?: Object;
   children?: Object;
   footer?: Object;
   background?: CardBackground;
   key?: any;
   className?: string;
   style?: CSSProperties;
}

export default class Card extends React.Component<CardProps> {
   static defaultProps: CardProps = {
      size: CardSize.DEFAULT,
      header: null,
      children: null,
      footer: null,
      background: CardBackground.DEFAULT,
      key: undefined,
      className: undefined,
      style: {}
   };

   constructor(props) {
      super(props);
   }

   getClassNames() {
      const { size, background, className }: CardProps = this.props;
      return classnames("pd-card", size, background, className);
   }

   extractFlexStyles() {
      const {
         alignContent,
         alignItems,
         display,
         flexDirection,
         justifyContent,
         ...rest
      } = this.props.style;
      return {
         styleWithFlex: {
            alignContent,
            alignItems,
            display,
            flexDirection,
            justifyContent
         },
         styleWithoutFlex: { ...rest }
      };
   }

   render() {
      const { header, children, key, footer }: CardProps = this.props;
      const { styleWithFlex, styleWithoutFlex } = this.extractFlexStyles();
      return (
         <div key={key} className={this.getClassNames()} style={styleWithoutFlex}>
            <div className="pd-card-content">
               {header && <CardHeader>{header}</CardHeader>}
               <CardBody style={styleWithFlex}>{children}</CardBody>
               <CardFooter>{footer}</CardFooter>
            </div>
         </div>
      );
   }
}

export const CardDivider = () => {
   return <div className="divider" />;
};

const CardHeader = ({ children }) => {
   return <div className="pd-card-header">{children}</div>;
};

const CardBody = ({ style, children }) => {
   return (
      <div className="pd-card-body" style={style}>
         {children}
      </div>
   );
};

const CardFooter = ({ children }) => {
   return <div className="pd-card-footer">{children}</div>;
};

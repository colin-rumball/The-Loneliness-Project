import React from "react";
import "./page-container-style.scss";

export interface PageContainerProps {
   header?: Object;
   left?: Object;
   children?: Object;
   right?: Object;
   footer?: Object;
}

export default class PageContainer extends React.Component<PageContainerProps> {
   static defaultProps: PageContainerProps = {
      header: null,
      left: null,
      children: null,
      right: null
   };

   constructor(props) {
      super(props);
   }

   render() {
      const { header, left, children, right, footer }: PageContainerProps = this.props;
      return (
         <div className="pd-page-container">
            {header}
            <div className="pd-content">
               <span className="left">{left}</span>
               <span className="center">{children}</span>
               <span className="right">{right}</span>
            </div>
            {footer}
         </div>
      );
   }
}

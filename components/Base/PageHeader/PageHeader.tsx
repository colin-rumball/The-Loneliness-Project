import React from "react";
import "./page-header-style.scss";

export interface PageHeaderProps {
   left?: Object;
   middle?: Object;
   right?: Object;
}

export default class PageHeader extends React.Component<PageHeaderProps> {
   static defaultProps: PageHeaderProps = {
      left: null,
      middle: null,
      right: null
   };

   constructor(props) {
      super(props);
   }

   render() {
      const { left, middle, right }: PageHeaderProps = this.props;
      return (
         <>
            <div className="pd-page-header-backer" />
            <header className="pd-page-header">
               <div className="pd-page-header-content">
                  <span className="left">{left}</span>
                  <span className="middle">{middle}</span>
                  <span className="right">{right}</span>
               </div>
            </header>
         </>
      );
   }
}

import React, { CSSProperties } from "react";
import "./spinner-style.scss";

export interface SpinnerProps {
   style?: CSSProperties;
}

export default class Spinner extends React.Component<SpinnerProps> {
   static defaultProps: SpinnerProps = {
      style: {}
   };

   constructor(props) {
      super(props);
   }

   render() {
      const { style }: SpinnerProps = this.props;
      return (
         <div className={"pd-spinner"} style={style}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
         </div>
      );
   }
}

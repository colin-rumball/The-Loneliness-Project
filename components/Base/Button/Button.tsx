import React, { CSSProperties, MouseEventHandler } from "react";
import classnames from "classnames";
import "./button-style.scss";

export enum ButtonVariant {
   DEFAULT = "default"
}

export interface ButtonProps {
   text?: string;
   id?: string;
   tabIndex?: number;
   variant?: ButtonVariant;
   onClick?: MouseEventHandler<Element>;
   disabled?: boolean;
   className?: string;
   style?: CSSProperties;
}

/**
 * Buttons are clickable items used to perform an action.
 */
export default class Button extends React.Component<ButtonProps> {
   static defaultProps = {
      id: undefined,
      tabIndex: undefined,
      variant: ButtonVariant.DEFAULT,
      onClick: () => {},
      disabled: false,
      className: undefined,
      style: {}
   };

   constructor(props) {
      super(props);
   }

   getClassNames() {
      const { className, variant }: ButtonProps = this.props;
      return classnames("pd-button", variant, className);
   }

   render() {
      const { text, id, tabIndex, onClick, disabled, style }: ButtonProps = this.props;
      return (
         <button
            data-id="button-element"
            id={id}
            className={this.getClassNames()}
            style={style}
            disabled={disabled}
            tabIndex={tabIndex}
            onClick={onClick}
         >
            {text}
         </button>
      );
   }
}

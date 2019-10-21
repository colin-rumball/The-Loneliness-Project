import classnames from "classnames";
import React, { CSSProperties } from "react";
import "./navigation-menu-style.scss";

export enum MenuDirection {
   VERTICAL = "vertical",
   HORIZONTAL = "horizontal"
}

export interface NavigationMenuProps {
   children?: Object;
   direction?: MenuDirection;
   id?: string;
   className?: string;
   style?: CSSProperties;
}

export default class NavigationMenu extends React.Component<NavigationMenuProps> {
   static defaultProps: NavigationMenuProps = {
      children: null,
      direction: MenuDirection.HORIZONTAL,
      id: "",
      className: undefined,
      style: {}
   };

   constructor(props) {
      super(props);
   }

   getClassNames() {
      const { direction, className }: NavigationMenuProps = this.props;
      return classnames("pd-navigation-menu", direction, className);
   }

   render() {
      const { children, id, style }: NavigationMenuProps = this.props;
      return (
         <nav id={id} className={this.getClassNames()} style={style}>
            {children}
         </nav>
      );
   }
}

import { CSSProperties, MouseEventHandler } from "react";
import classnames from "classnames";
import Text from "../Text/Text";

export interface NavigationMenuItemProps {
   text?: string;
   onClick?: any;
   className?: string;
   style?: CSSProperties;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
   text,
   onClick,
   className,
   style
}) => {
   const cn = classnames("pd-navigation-menu-item", className);
   return (
      <span onClick={onClick} className={cn} style={style}>
         <Text text={text} />
      </span>
   );
};

export default NavigationMenuItem;

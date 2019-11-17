import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../styles/themes/DefaultTheme";

interface StyledIconProps {
   icon: Object;
   size?: string;
   color?: string;
   hovercolor?: string;
   onClick?();
}

const StyledIconDefaultProps: StyledIconProps = {
   icon: <></>,
   size: undefined,
   color: undefined,
   hovercolor: undefined,
   onClick: null
};

const StyledIcon: React.FC<StyledIconProps> = props => {
   const { icon, ...rest } = { ...StyledIconDefaultProps, ...props };

   const StyledAddIcon = useMemo(
      () => styled(icon)`
         color: ${({ theme, color = theme.ICON_STYLES.COLOR_DEFAULT }) => color};
         font-size: ${({ theme, size = theme.ICON_STYLES.SIZE_M }: ThemeContainer) => size};
         transition: color 0.3s ease, transform 0.3s ease;

         &:hover {
            cursor: ${props => (props.onClick ? "pointer" : "default")};
            color: ${({
               theme,
               color = theme.ICON_STYLES.COLOR_DEFAULT,
               hovercolor = theme.ICON_STYLES.COLOR_HOVER,
               onClick
            }) => (onClick ? hovercolor : color)};
            transform: ${props => (props.onClick ? "scale(1.1)" : "scale(1)")};
         }
      `,
      [icon]
   );

   return <StyledAddIcon {...rest} />;
};

export default StyledIcon;

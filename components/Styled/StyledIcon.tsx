import React, { ReactNode, useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";

const InternalStyledIcon = styled.span<any>`
   color: ${({ theme, staticcolor = theme.ICON_STYLES.COLOR_DEFAULT }) => staticcolor};
   font-size: ${({ theme, size = theme.ICON_STYLES.SIZE_M }: ThemeContainer) => size};
   transition: color 0.3s ease, transform 0.3s ease;

   &:hover {
      cursor: ${(props) => (props.onClick ? "pointer" : "default")};
      color: ${({
         theme,
         staticcolor = theme.ICON_STYLES.COLOR_DEFAULT,
         hovercolor = theme.ICON_STYLES.COLOR_HOVER,
         onClick,
      }) => (onClick ? hovercolor : staticcolor)};
      transform: ${(props) => (props.onClick ? "scale(1.1)" : "scale(1)")};
   }
`;

interface StyledIconProps {
   icon: ReactNode;
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
   onClick: null,
};

const StyledIcon: React.FC<StyledIconProps> = (props) => {
   const { icon, color: staticColor, ...rest } = { ...StyledIconDefaultProps, ...props };

   return (
      <InternalStyledIcon staticcolor={staticColor} {...rest}>
         {icon}
      </InternalStyledIcon>
   );
};

export default StyledIcon;

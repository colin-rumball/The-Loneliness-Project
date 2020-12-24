import React, { useMemo } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { ThemeContainer } from "../../themes/common";

const StyledCloseIcon = styled(AiOutlineClose)`
   position: absolute;
   top: 11px;
   right: 10px;

   font-size: 20px;
   opacity: 0.9;
   color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightGrey};
   transition: opacity 0.4s ease-out, transform 0.4s ease-out;

   &:hover {
      color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.DarkGrey};
      opacity: 1;
      transform: scale(1.1);
      cursor: pointer;
   }

   &:active {
      transform: scale(0.9);
   }
`;

interface CloseIconProps {
   onClick();
}

const CloseIconDefaultProps: CloseIconProps = {
   onClick: () => {}
};

const CloseIcon: React.FC<CloseIconProps> = props => {
   const { onClick } = { ...CloseIconDefaultProps, ...props };

   return <StyledCloseIcon onClick={onClick} />;
};

export default CloseIcon;

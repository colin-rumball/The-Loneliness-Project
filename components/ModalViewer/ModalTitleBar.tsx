import React, { useMemo } from "react";
import styled from "styled-components";

const StyledModalTitleBar = styled.div`
   position: absolute;
   top: 1px;
   left: 1px;
   right: 1px;
   min-height: 40px;
   max-height: 40px;
   background-color: ${props => props.bgColor};
`;

interface ModalTitleBarProps {
   bgColor: string;
}

const ModalTitleBarDefaultProps: ModalTitleBarProps = {
   bgColor: "#555"
};

const ModalTitleBar: React.FC<ModalTitleBarProps> = props => {
   const { bgColor } = { ...ModalTitleBarDefaultProps, ...props };

   return <StyledModalTitleBar bgColor={bgColor} />;
};

export default ModalTitleBar;

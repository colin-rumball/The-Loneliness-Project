import React, { useMemo } from "react";
import styled from "styled-components";
import ModalBase, { ModalBaseProps } from "./ModalBase";
import withModalBase from "../../helpers/withModalBase";

const StyledMessageContainer = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   min-height: 260px;
`;

interface MessageModalProps extends ModalBaseProps {
   message: string;
}

const MessageModalDefaultProps: MessageModalProps = {
   message: ""
};

const MessageModal: React.FC<MessageModalProps> = props => {
   const { message } = { ...MessageModalDefaultProps, ...props };

   return <StyledMessageContainer>{message}</StyledMessageContainer>;
};

export default withModalBase<MessageModalProps>(MessageModal);

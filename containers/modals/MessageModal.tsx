import React, { useMemo } from "react";
import styled from "styled-components";
import ModalBase, { ModalBaseProps } from "./ModalBase";

interface MessageModalProps extends ModalBaseProps {
   message: string;
}

const MessageModalDefaultProps: MessageModalProps = {
   message: ""
};

const MessageModal: React.FC<MessageModalProps> = props => {
   const { message } = { ...MessageModalDefaultProps, ...props };

   const StyledMessageContainer = useMemo(
      () => styled.div`
         height: 100%;
         display: flex;
         flex-direction: column;
         justify-content: center;
         min-height: 260px;
      `,
      []
   );

   return (
      <ModalBase>
         <StyledMessageContainer>{message}</StyledMessageContainer>
      </ModalBase>
   );
};

export default MessageModal;

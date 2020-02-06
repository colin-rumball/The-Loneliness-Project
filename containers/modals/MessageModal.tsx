import React, { useMemo } from "react";
import styled from "styled-components";
import ModalBase, { ModalBaseProps } from "./ModalBase";
import withModalBase from "../../helpers/withModalBase";

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

   return <StyledMessageContainer>{message}</StyledMessageContainer>;
};

export default withModalBase<MessageModalProps>(MessageModal);

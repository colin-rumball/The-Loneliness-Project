import React, { useMemo, useCallback, useContext } from "react";
import styled from "styled-components";
import Button from "../../components/Base/Button";
import ModalBase, { ModalBaseProps } from "./ModalBase";
import useModalSystemHelper from "../../hooks/useModalSystemHelper";
import withModalBase from "../../helpers/withModalBase";

interface ConfirmationModalProps extends ModalBaseProps {
   message: string;
   onContinueClicked?(): Promise<any>;
   onCancelClicked?();
}

const confirmationModalDefaultProps: ConfirmationModalProps = {
   message: "",
   onContinueClicked: async () => {},
   onCancelClicked: async () => {}
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = props => {
   const { message, onContinueClicked, onCancelClicked, ...rest } = {
      ...confirmationModalDefaultProps,
      ...props
   };

   const { popModal } = useModalSystemHelper();

   const StyledConfirmationModal = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         justify-content: center;
         height: 100%;
         min-height: 270px;
         min-width: 460px;
      `,
      []
   );

   const StyledConfirmationMessage = useMemo(
      () => styled.div`
         font-size: 24px;
      `,
      []
   );

   const StyledConfirmationButtons = useMemo(
      () => styled.div`
         display: flex;
         justify-content: space-between;
         padding-top: 30px;
         width: 100%;
      `,
      []
   );

   const onButtonClicked = useCallback(async cb => {
      await cb();
      popModal();
   }, []);

   return (
      <StyledConfirmationModal>
         <StyledConfirmationMessage>{message}</StyledConfirmationMessage>
         <StyledConfirmationButtons>
            <Button text="CONTINUE" onClick={() => onButtonClicked(onContinueClicked)} />
            <Button text="CANCEL" onClick={() => onButtonClicked(onCancelClicked)} />
         </StyledConfirmationButtons>
      </StyledConfirmationModal>
   );
};

export default withModalBase<ConfirmationModalProps>(ConfirmationModal);

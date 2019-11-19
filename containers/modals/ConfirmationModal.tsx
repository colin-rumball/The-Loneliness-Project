import React, { useMemo, useCallback, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Base/Button";
import useModal from "../../hooks/useModal";
import ModalBase, { ModalBaseProps } from "./ModalBase";

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

   const [showSpinner, setShowSpinner] = useState(false);
   const { closeTopModal } = useModal();

   const StyledConfirmationModal = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         padding: 20px;
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
         justify-content: space-evenly;
         padding-top: 20px;
      `,
      []
   );

   const onButtonClicked = useCallback(async cb => {
      setShowSpinner(true);
      await cb();
      closeTopModal();
   }, []);

   return (
      <ModalBase showSpinner={showSpinner} {...rest}>
         <StyledConfirmationModal>
            <StyledConfirmationMessage>{message}</StyledConfirmationMessage>
            <StyledConfirmationButtons>
               <Button text="CONTINUE" onClick={() => onButtonClicked(onContinueClicked)} />
               <Button text="CANCEL" onClick={() => onButtonClicked(onCancelClicked)} />
            </StyledConfirmationButtons>
         </StyledConfirmationModal>
      </ModalBase>
   );
};

export default ConfirmationModal;

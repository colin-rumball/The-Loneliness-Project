import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import Button from "../../components/Base/Button";
import useModal from "../../hooks/useModal";

interface ConfirmationModalProps {
   message: string;
   onContinueClicked?();
   onCancelClicked?();
}

const confirmationModalDefaultProps: ConfirmationModalProps = {
   message: "",
   onContinueClicked: () => {},
   onCancelClicked: () => {}
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = props => {
   const { closeTopModal } = useModal();
   const { message, onContinueClicked, onCancelClicked } = {
      ...confirmationModalDefaultProps,
      ...props
   };

   const StyledConfirmationModal = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         padding: 40px 30px 30px 20px;
      `,
      []
   );

   const StyledConfirmationMessage = useMemo(
      () => styled.div`
         font-size: 24px;
         color: #fff;
         padding: 20px;
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

   const onButtonClicked = useCallback(cb => {
      closeTopModal();
      cb();
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

export default ConfirmationModal;

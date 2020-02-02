import React, { useMemo, useContext } from "react";
import styled from "styled-components";
import InteractionController from "../InteractionController";
import { Controller } from "../../contexts/ControllerContext";
import { ModalContext, useModalContext, ModalState } from "../../contexts/ModalContext";
import { ThemeContainer } from "../../themes/common";
import ModalOverlay from "./ModalOverlay";
import CloseIcon from "./CloseIcon";

interface ModalViewerProps {}

const ModalViewerDefaultProps: ModalViewerProps = {};

const ModalViewer: React.FC<ModalViewerProps> = props => {
   const {} = { ...ModalViewerDefaultProps, ...props };
   const { currentModal, popModal } = useModalContext();

   const StyledModalViewer = useMemo(
      () => styled.div.attrs(props => ({}))`
         position: fixed;
         top: 0;
         bottom: 0;
         right: 0;
         left: 0;

         display: flex;
         justify-content: center;
         align-items: center;

         pointer-events: none;

         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.MODAL};

         ${({ state, theme }: ThemeContainer) => {
            switch (state as ModalState) {
               case ModalState.OPENING:
                  return theme.ANIMATIONS.MODAL_OPENING;
               case ModalState.CLOSING:
                  return theme.ANIMATIONS.MODAL_CLOSING;
            }
         }};

         .internal-modal-container {
            position: relative;
            pointer-events: auto;
         }
      `,
      []
   );

   if (currentModal == null || currentModal?.state == ModalState.QUEUED) return null;

   return (
      <InteractionController controller={Controller.MODAL}>
         <ModalOverlay onClick={popModal} />
         <StyledModalViewer state={currentModal.state}>
            <div className="internal-modal-container">
               {currentModal.node}
               <CloseIcon onClick={popModal} />
            </div>
         </StyledModalViewer>
      </InteractionController>
   );
};

export default ModalViewer;

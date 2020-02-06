import React, { useMemo } from "react";
import styled from "styled-components";
import InteractionController from "../InteractionController";
import { Controller } from "../../contexts/ControllerContext";
import { ThemeContainer } from "../../themes/common";
import ModalOverlay from "./ModalOverlay";
import CloseIcon from "./CloseIcon";
import { ModalSystemState } from "../../contexts/ModalSystem/actions/common";
import useModalSystemHelper from "../../hooks/useModalSystemHelper";

interface ModalViewerProps {}

const ModalViewerDefaultProps: ModalViewerProps = {};

const ModalViewer: React.FC<ModalViewerProps> = props => {
   const {} = { ...ModalViewerDefaultProps, ...props };
   const { currentModal, system, popModal } = useModalSystemHelper();

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
            switch (state as ModalSystemState) {
               case ModalSystemState.OPENING:
                  return theme.ANIMATIONS.MODAL_OPENING;
               case ModalSystemState.CLOSING:
                  return theme.ANIMATIONS.MODAL_CLOSING;
            }
         }};

         .internal-modal-container {
            position: relative;
            pointer-events: auto;

            @media (max-width: ${({ theme }: ThemeContainer) =>
                  theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
               transform: translateY(-30px);
            }
         }
      `,
      []
   );

   if (currentModal == null) return null;

   return (
      <InteractionController controller={Controller.MODAL}>
         <ModalOverlay onClick={popModal} />
         <StyledModalViewer state={system.state}>
            <div className="internal-modal-container">
               {currentModal.node}
               <CloseIcon onClick={popModal} />
            </div>
         </StyledModalViewer>
      </InteractionController>
   );
};

export default ModalViewer;

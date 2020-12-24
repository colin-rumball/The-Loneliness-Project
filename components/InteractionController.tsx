import React, { useMemo, useContext } from "react";
import styled from "styled-components";
import { Controller, ControllerContext, useControllerContext } from "../contexts/ControllerContext";

const StyledInteractionController = styled.div`
   user-select: ${props => (props.controlling ? "auto" : "none")};
   pointer-events: ${props => (props.controlling ? "auto" : "none")};
   overflow: ${props => (props.controlling ? "visible" : "hidden")};
`;

interface InteractionControllerProps {
   controller: Controller;
   onClick?();
}

const InteractionControllerDefaultProps: InteractionControllerProps = {
   controller: Controller.NONE,
   onClick: () => {}
};

const InteractionController: React.FC<InteractionControllerProps> = props => {
   const { controller, onClick, children } = { ...InteractionControllerDefaultProps, ...props };
   const { currentController } = useControllerContext();

   return (
      <StyledInteractionController controlling={controller == currentController} onClick={onClick}>
         {children}
      </StyledInteractionController>
   );
};

export default InteractionController;

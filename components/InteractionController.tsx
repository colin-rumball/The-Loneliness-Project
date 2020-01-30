import React, { useMemo, useContext } from "react";
import styled from "styled-components";
import { Controller, ControllerContext, useControllerContext } from "../contexts/ControllerContext";

interface InteractionControllerProps {
   controller: Controller;
}

const InteractionControllerDefaultProps: InteractionControllerProps = {
   controller: Controller.NONE
};

const InteractionController: React.FC<InteractionControllerProps> = props => {
   const { controller, children } = { ...InteractionControllerDefaultProps, ...props };
   const { currentController } = useControllerContext();

   const StyledInteractionController = useMemo(
      () => styled.div`
         user-select: ${props => (props.controlling ? "auto" : "none")};
         pointer-events: ${props => (props.controlling ? "auto" : "none")};
         overflow: ${props => (props.controlling ? "visible" : "hidden")};
      `,
      []
   );

   return (
      <StyledInteractionController controlling={controller == currentController}>
         {children}
      </StyledInteractionController>
   );
};

export default InteractionController;

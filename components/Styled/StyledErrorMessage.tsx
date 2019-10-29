import React from "react";
import styled from "styled-components";

interface StyledErrorMessageProps {
   message?: string;
}

const StyledErrorMessage: React.FC<StyledErrorMessageProps> = ({ message }) => {
   const InternalStyledErrorMessage = styled.div`
      font-size: 15px;
      color: ${({ theme }) => theme.Red};
      &:before {
         content: "❌ ";
         font-size: 12px;
      }
   `;

   return <InternalStyledErrorMessage>{message}</InternalStyledErrorMessage>;
};

export default StyledErrorMessage;

import React, { useMemo } from "react";
import styled from "styled-components";
import { useField } from "formik";
import StyledErrorMessage from "../Styled/StyledErrorMessage";

const StyledTextArea = styled.div`
   display: flex;
   flex-direction: column;
   flex-wrap: nowrap;
   width: 100%;

   margin: 10px 5px;

   text-align: left;

   textarea {
      width: 100%;
      resize: none;
      height: 200px;
   }
`;

interface TextAreaProps
   extends React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
   > {
   label?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
   const [field, meta] = useField(props as any);

   return (
      <StyledTextArea>
         <label htmlFor={props.id || props.name}>{label}</label>
         <textarea className="text-input" {...field} {...props} />
         {meta.touched && meta.error ? <StyledErrorMessage message={meta.error} /> : null}
      </StyledTextArea>
   );
};

export default TextArea;

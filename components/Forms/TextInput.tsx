import React, { useMemo } from "react";
import styled from "styled-components";
import { useField } from "formik";
import StyledErrorMessage from "../Styled/StyledErrorMessage";

const StyledTextInput = styled.div`
   display: flex;
   flex-direction: column;
   text-align: left;
   margin: 10px 5px;

   * {
      max-width: 100%;
      width: 100%;
   }
`;

interface TextInputProps
   extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
   label?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
   const [field, meta] = useField(props as any);

   return (
      <StyledTextInput>
         <label htmlFor={props.id || props.name}>{label}</label>
         <input {...field} {...props} />
         {meta.touched && meta.error ? <StyledErrorMessage message={meta.error} /> : null}
      </StyledTextInput>
   );
};

export default TextInput;

import React, { useMemo } from "react";
import styled from "styled-components";
import { useField } from "formik";
import StyledErrorMessage from "../Styled/StyledErrorMessage";

interface TextInputProps
   extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
   label?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
   const [field, meta] = useField(props as any);

   const StyledTextInput = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         text-align: left;
         margin: 10px 5px;

         * {
            max-width: 100%;
            width: 100%;
         }
      `,
      []
   );

   return (
      <StyledTextInput>
         <label htmlFor={props.id || props.name}>{label}</label>
         <input {...field} {...props} />
         {meta.touched && meta.error ? <StyledErrorMessage message={meta.error} /> : null}
      </StyledTextInput>
   );
};

export default TextInput;

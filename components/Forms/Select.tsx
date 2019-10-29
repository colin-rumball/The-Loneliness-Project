import React, { useMemo } from "react";
import styled from "styled-components";
import { useField } from "formik";
import StyledLabel from "../Styled/StyledLabel";
import StyledErrorMessage from "../Styled/StyledErrorMessage";

interface SelectProps
   extends React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
   > {
   label: Object;
}

const Select: React.FC<SelectProps> = ({ label, ...props }) => {
   const [field, meta] = useField(props as any);

   const StyledSelect = useMemo(
      () => styled.div`
         margin: 10px 5px;
      `,
      []
   );

   return (
      <StyledSelect>
         <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
         <select {...field} {...props} />
         {meta.touched && meta.error ? <StyledErrorMessage message={meta.error} /> : null}
      </StyledSelect>
   );
};

export default Select;

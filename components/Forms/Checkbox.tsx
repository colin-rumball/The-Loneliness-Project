import React, { useMemo } from "react";
import styled from "styled-components";
import { useField } from "formik";
import StyledErrorMessage from "../Styled/StyledErrorMessage";

const StyledCheckbox = styled.div`
   margin: 10px 5px;
`;

interface CheckboxProps
   extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const Checkbox: React.FC<CheckboxProps> = ({ children, ...props }) => {
   const [field, meta] = useField({ ...(props as any), type: "checkbox" });

   return (
      <StyledCheckbox>
         <label className="checkbox">
            <input {...field} {...props} type="checkbox" />
            {children}
         </label>
         {meta.touched && meta.error ? <StyledErrorMessage message={meta.error} /> : null}
      </StyledCheckbox>
   );
};

export default Checkbox;

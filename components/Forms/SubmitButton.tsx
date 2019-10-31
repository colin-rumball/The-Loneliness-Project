import React from "react";
import styled from "styled-components";
import Button, { ButtonProps } from "../Base/Button";
import { useFormikContext } from "formik";

interface SubmitButtonProps extends ButtonProps {}

const SubmitButton: React.FC<SubmitButtonProps> = props => {
   const { isSubmitting } = useFormikContext();
   return (
      <>
         <Button type="submit" {...props} />
      </>
   );
};

export default SubmitButton;

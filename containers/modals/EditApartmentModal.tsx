import React, { useMemo } from "react";
import styled from "styled-components";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/Forms/TextInput";
import Checkbox from "../../components/Forms/Checkbox";
import TextArea from "../../components/Forms/TextArea";
import Button from "../../components/Base/Button";

interface EditApartmentModalProps {
   id?: string;
   apt?: number;
   name?: string;
   age?: string;
   mostLonely?: string;
   lonelinessMeans?: string;
   firstTime?: string;
   lastTime?: string;
   published?: boolean;
   createdAt?: string;
   updateAt?: string;
   modalTitle: string;
   buttonText: string;
}

const EditApartmentModalDefaultProps: EditApartmentModalProps = {
   id: "",
   apt: 0,
   name: "",
   age: "",
   mostLonely: "",
   lonelinessMeans: "",
   firstTime: "",
   lastTime: "",
   published: false,
   createdAt: "",
   updateAt: "",
   modalTitle: "",
   buttonText: ""
};

const EditApartmentModal: React.FC<EditApartmentModalProps> = props => {
   const {
      id,
      apt,
      name,
      age,
      mostLonely,
      lonelinessMeans,
      firstTime,
      lastTime,
      published,
      createdAt,
      updateAt,
      modalTitle,
      buttonText
   } = { ...EditApartmentModalDefaultProps, ...props };

   const StyledEditApartmentModal = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         align-items: center;
         height: 700px;
         min-height: 50vh;
         max-height: 90vh;
         padding: 20px;
         margin-bottom: 30px;
         overflow: auto;
      `,
      []
   );

   const StyledForm = useMemo(
      () => styled(Form)`
         display: flex;
         flex-direction: column;
         max-width: 100%;
      `,
      []
   );

   const StyledSection = useMemo(
      () => styled.div`
         display: flex;
         flex-wrap: nowrap;
         max-width: 100%;
      `,
      []
   );

   return (
      <StyledEditApartmentModal>
         <h2>{modalTitle}</h2>
         <Formik
            initialValues={{
               id,
               apt,
               name,
               age,
               mostLonely,
               lonelinessMeans,
               firstTime,
               lastTime,
               published,
               createdAt,
               updateAt
            }}
            validationSchema={Yup.object({
               apt: Yup.number()
                  .min(1, "Must be greater than 0")
                  .required("Required"),
               name: Yup.string().required("Required"),
               age: Yup.string().required("Required")
            })}
            onSubmit={(values, { setSubmitting }) => {
               setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
               }, 400);
            }}
         >
            <StyledForm>
               <TextInput label="ID" name="id" type="text" disabled />
               <StyledSection>
                  <TextInput label="Name" name="name" type="text" placeholder="Jane Doe" />
                  <TextInput label="Apartment Number" name="apt" type="text" placeholder="999" />
                  <TextInput label="Age" name="age" type="text" placeholder="99" />
               </StyledSection>

               <TextArea
                  label="Most Lonely"
                  name="mostLonely"
                  placeholder="Tell me a story of the time you felt the most lonely..."
               />
               <TextArea
                  label="Loneliness Means"
                  name="lonelinessMeans"
                  placeholder="To me, loneliness means..."
               />
               <TextArea
                  label="First Time"
                  name="firstTime"
                  placeholder="One of the first times I realized I was lonely was..."
               />
               <TextArea
                  label="Last Time"
                  name="lastTime"
                  placeholder="The last time I felt lonely was..."
               />

               <Checkbox name="published">Published</Checkbox>

               <Button type="submit" text={buttonText} />
            </StyledForm>
         </Formik>
      </StyledEditApartmentModal>
   );
};

export default EditApartmentModal;

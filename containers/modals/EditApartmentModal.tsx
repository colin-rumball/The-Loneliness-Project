import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/Forms/TextInput";
import Checkbox from "../../components/Forms/Checkbox";
import TextArea from "../../components/Forms/TextArea";
import Button from "../../components/Base/Button";
import SubmitButton from "../../components/Forms/SubmitButton";
import { useQuery } from "@apollo/react-hooks";
import { APARTMENT_DETAILED } from "../../gql/queries";
import useGQLErrorHandler from "../../hooks/useGQLErrorHandler";
import ModalBase, { ModalBaseProps } from "./ModalBase";
import OverlayedSpinner from "../OverlayedSpinner";
import Spinner from "../../components/Spinner";
import ApartmentImage from "../../components/ApartmentImage";

interface EditApartmentModalProps extends ModalBaseProps {
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
   modalTitle?: string;
   buttonText?: string;
   onFormSubmit?(id: string, values);
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

const EditApartmentModal: React.FC<EditApartmentModalProps> = ({ apolloClient, ...props }) => {
   const [uploading, setUploading] = useState(false);
   const [queriedData, setQueriedData] = useState();
   const [currentImage, setCurrentImage] = useState();
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
      buttonText,
      onFormSubmit
   } = { ...EditApartmentModalDefaultProps, ...props, ...(queriedData as EditApartmentModalProps) };

   const { loading } = useQuery(APARTMENT_DETAILED, {
      client: apolloClient,
      variables: { id },
      onCompleted(data) {
         if (data && data.apartment) {
            setQueriedData(data.apartment);
         }
      },
      onError: useGQLErrorHandler
   });

   const StyledEditApartmentModal = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         align-items: center;
         height: 700px;
         min-height: 50vh;
         max-height: 90vh;
         padding: 20px;
         margin: 30px 0;
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

   if (loading) return <></>;

   return (
      <ModalBase showSpinner={loading || uploading} {...props}>
         {/* <StyledEditApartmentModal> */}
         <h2>{modalTitle}</h2>
         <Formik
            enableReinitialize={true}
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
            onSubmit={async (values, { setSubmitting }) => {
               setUploading(true);
               const data = new FormData();
               data.append("file", currentImage);
               await fetch("http://localhost:4000/upload", {
                  method: "POST",
                  body: data
               });
               setUploading(false);
               await onFormSubmit(values.id, values);
            }}
         >
            <StyledForm>
               <TextInput label="ID" name="id" type="text" disabled />
               <ApartmentImage
                  originalImage={`/static/apartments/storey_${apt}.png`}
                  currentImage={currentImage}
                  setCurrentImage={setCurrentImage}
               />
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

               <SubmitButton text={buttonText} />
            </StyledForm>
         </Formik>
         {/* </StyledEditApartmentModal> */}
      </ModalBase>
   );
};

export default EditApartmentModal;

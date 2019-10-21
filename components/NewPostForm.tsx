import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const CREATE_POST = gql`
   mutation($data: CreatePostInput!) {
      createPost(data: $data) {
         id
      }
   }
`;

const NewPostForm = () => {
   const [formMessage, setFormMessage] = React.useState();
   const [formFields, setFormFields] = React.useState({ title: "", body: "", published: false });

   const [createPostFunc, { loading, error }] = useMutation(CREATE_POST, {
      onCompleted(res) {
         console.log("TCL: onCompleted -> res", res);
      },
      onError({ graphQLErrors }) {
         if (graphQLErrors.length > 0) {
            setFormMessage(graphQLErrors[0].message);
         } else {
            setFormMessage("An error has occurred.");
         }
      }
   });

   const onInputChanged = React.useCallback((e, { name, value }) => {
      setFormMessage(null);
      setFormFields(prevState => ({ ...prevState, [name]: value }));
   }, []);

   const onFormSubmit = React.useCallback(() => {
      setFormMessage(null);

      createPostFunc({ variables: { data: formFields } });
   }, [formFields]);

   return (
      <></>
      // <Form onSubmit={onFormSubmit} loading={loading}>
      //    <Form.Input
      //       label="Title"
      //       name="title"
      //       value={formFields.title}
      //       onChange={onInputChanged}
      //    />
      //    <Form.TextArea
      //       label="Body"
      //       name="body"
      //       value={formFields.body}
      //       onChange={onInputChanged}
      //    />
      //    <Form.Checkbox
      //       toggle
      //       label="Published"
      //       name="published"
      //       checked={formFields.published}
      //       onChange={() =>
      //          setFormFields(prevState => ({ ...prevState, published: !prevState.published }))
      //       }
      //    />

      //    <Form.Button floated="right" content="Post" primary />
      //    <Message visible={!!formMessage} error content={formMessage} />
      // </Form>
   );
};

export default NewPostForm;

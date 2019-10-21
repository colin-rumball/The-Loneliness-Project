import React from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { onError } from "apollo-link-error";

const LOGIN = gql`
   mutation($data: LoginUserInput!) {
      login(data: $data) {
         token
      }
   }
`;

const LoginForm = () => {
   const [formMessage, setFormMessage] = React.useState();
   const [formErrors, setFormErrors] = React.useState({});
   const [formFields, setFormFields] = React.useState({ email: "", password: "" });

   const client = useApolloClient();
   const [loginFunc, { loading, error }] = useMutation(LOGIN, {
      onCompleted({ login }) {
         localStorage.setItem("token", login.token);
         client.writeData({ data: { isLoggedIn: true } });
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
      setFormErrors(prevState => ({ ...prevState, [name]: null }));
      setFormFields(prevState => ({ ...prevState, [name]: value }));
   }, []);

   const onFormSubmit = React.useCallback(() => {
      setFormMessage(null);

      if (!formFields.email) {
         setFormErrors(prevState => ({ ...prevState, email: "A valid email is required." }));
         return;
      }
      setFormErrors(prevState => ({ ...prevState, email: null }));

      if (!formFields.password) {
         setFormErrors(prevState => ({
            ...prevState,
            password: "The password cannot be blank."
         }));
         return;
      }
      setFormErrors(prevState => ({ ...prevState, password: null }));

      loginFunc({ variables: { data: formFields } });
   }, [formFields]);

   return (
      <></>
      // <Form onSubmit={onFormSubmit} loading={loading}>
      //    <Form.Input
      //       error={formErrors["email"]}
      //       icon="user"
      //       iconPosition="left"
      //       label="Email"
      //       name="email"
      //       placeholder="Email"
      //       value={formFields.email}
      //       onChange={onInputChanged}
      //    />
      //    <Form.Input
      //       error={formErrors["password"]}
      //       icon="lock"
      //       iconPosition="left"
      //       label="Password"
      //       type="password"
      //       name="password"
      //       placeholder="Password"
      //       value={formFields.password}
      //       onChange={onInputChanged}
      //    />

      //    <Form.Button floated="right" content="Login" primary />
      //    <Message visible={!!formMessage} error content={formMessage} />
      // </Form>
   );
};

export default LoginForm;

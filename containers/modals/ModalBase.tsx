import React from "react";
import { ApolloClient } from "apollo-boost";

export interface ModalBaseProps {
   apolloClient?: ApolloClient<any>;
}

const ModalBaseDefaultProps: ModalBaseProps = {};

const ModalBase: React.FC<ModalBaseProps> = props => {
   const {} = { ...ModalBaseDefaultProps, ...props };
   return <></>;
};

export default ModalBase;

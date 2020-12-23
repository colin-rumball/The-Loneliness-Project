import { ApolloProvider } from "@apollo/react-hooks";
import App from "next/app";
import Head from "next/head";
import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../components/GlobalStyles";
import ModalViewer from "../components/ModalViewer/ModalViewer";
import { ControllerContextProvider } from "../contexts/ControllerContext";
import { ModalSystemProvider } from "../contexts/ModalSystem/ModalSystem";
import { StoriesContextProvider } from "../contexts/StoriesContext";
import withApolloClient from "../lib/apollo/withApolloClient";
import DefaultTheme from "../themes/DefaultTheme";

class MyApp extends App {
   render() {
      const { Component, pageProps, router, apolloClient } = this.props as any;
      return (
         <>
            <Head>
               <title>The Loneliness Project</title>
            </Head>
            <GlobalStyles />
            <ApolloProvider client={apolloClient}>
               <ThemeProvider theme={DefaultTheme}>
                  <ControllerContextProvider>
                     <StoriesContextProvider>
                        <ModalSystemProvider>
                           <Component
                              {...pageProps}
                              key={router.route}
                              apolloClient={apolloClient}
                           />
                           <ModalViewer />
                        </ModalSystemProvider>
                     </StoriesContextProvider>
                  </ControllerContextProvider>
               </ThemeProvider>
            </ApolloProvider>
         </>
      );
   }
}

export default withApolloClient(MyApp);

import React from "react";
import App, { Container as NextAppContainer } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withApolloClient from "../lib/apollo/withApolloClient";
import { ThemeProvider } from "styled-components";
import DefaultTheme from "../themes/DefaultTheme";
import Head from "next/head";
import { ControllerContextProvider } from "../contexts/ControllerContext";
import ModalViewer from "../components/ModalViewer/ModalViewer";
import { ModalContextProvider } from "../contexts/ModalContext";

class MyApp extends App {
   render() {
      const { Component, pageProps, router, apolloClient } = this.props as any;
      return (
         <>
            <Head>
               <title>The Loneliness Project</title>
            </Head>
            <NextAppContainer>
               <ApolloProvider client={apolloClient}>
                  <ThemeProvider theme={DefaultTheme}>
                     <ControllerContextProvider>
                        <ModalContextProvider>
                           <Component
                              {...pageProps}
                              key={router.route}
                              apolloClient={apolloClient}
                           />
                           <ModalViewer />
                        </ModalContextProvider>
                     </ControllerContextProvider>
                  </ThemeProvider>
               </ApolloProvider>
            </NextAppContainer>
         </>
      );
   }
}

export default withApolloClient(MyApp);

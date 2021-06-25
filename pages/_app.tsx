import App from "next/app";
import Head from "next/head";
import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../components/GlobalStyles";
import ModalViewer from "../components/ModalViewer/ModalViewer";
import { ControllerContextProvider } from "../contexts/ControllerContext";
import { ModalSystemProvider } from "../contexts/ModalSystem/ModalSystem";
import { StoriesContextProvider } from "../contexts/StoriesContext";
import DefaultTheme from "../themes/DefaultTheme";
import "../themes/DefaultTheme/base.css";

class TheLonelinessProjectApp extends App {
   render() {
      const { Component, pageProps, router } = this.props as any;
      return (
         <>
            <Head>
               <title>The Loneliness Project</title>
            </Head>
            <GlobalStyles />
            <ThemeProvider theme={DefaultTheme}>
               <ControllerContextProvider>
                  <StoriesContextProvider>
                     <ModalSystemProvider>
                        <Component {...pageProps} key={router.route} />
                        <ModalViewer />
                     </ModalSystemProvider>
                  </StoriesContextProvider>
               </ControllerContextProvider>
            </ThemeProvider>
         </>
      );
   }
}

export default TheLonelinessProjectApp;

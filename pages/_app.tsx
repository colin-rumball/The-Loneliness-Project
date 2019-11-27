import React from "react";
import App, { Container as NextAppContainer } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withApolloClient from "../lib/apollo/withApolloClient";
import { ThemeProvider } from "styled-components";
import DefaultTheme from "../themes/DefaultTheme";
import Head from "next/head";

class MyApp extends App {
   // static async getInitialProps({ Component, ctx }) {
   //    let pageProps = {};

   //    if (Component.getInitialProps) {
   //       pageProps = await Component.getInitialProps(ctx);
   //    }
   //    return { pageProps };
   // }

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
                     <Component {...pageProps} key={router.route} apolloClient={apolloClient} />
                  </ThemeProvider>
               </ApolloProvider>
            </NextAppContainer>
         </>
      );
   }
}

export default withApolloClient(MyApp);

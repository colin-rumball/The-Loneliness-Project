import React from "react";
import App, { Container as NextAppContainer } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withApolloClient from "../lib/apollo/withApolloClient";
import { ThemeProvider } from "styled-components";
import MainTheme from "../styles/themes/MainTheme";
import "./../styles/main.scss";

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
         <NextAppContainer>
            <ApolloProvider client={apolloClient}>
               <ThemeProvider theme={MainTheme}>
                  <Component {...pageProps} key={router.route} />
               </ThemeProvider>
            </ApolloProvider>
         </NextAppContainer>
      );
   }
}

export default withApolloClient(MyApp);

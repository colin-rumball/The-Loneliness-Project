import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const sheet = new ServerStyleSheet();

      const originalRenderPage = ctx.renderPage;
      try {
         ctx.renderPage = () =>
            originalRenderPage({
               enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
            });
         const initialProps = await Document.getInitialProps(ctx);

         return {
            ...initialProps,
            styles: (
               <>
                  {initialProps.styles}
                  {sheet.getStyleElement()}
               </>
            )
         };
      } finally {
         sheet.seal();
      }
   }

   render() {
      return (
         <Html lang="en">
            <Head>
               <meta
                  name="description"
                  content="Sharing stories and starting a conversation about loneliness. Become part of our community of people who are not as alone as they think."
               />
               <meta name="keywords" content="Loneliness" />
               <meta name="author" content="Marissa Korda" />
               <link
                  href="https://fonts.googleapis.com/css?family=Lato:100,200,300,400,500,600,700,800,900&display=swap"
                  rel="stylesheet"
               />
               <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}

export default MyDocument;

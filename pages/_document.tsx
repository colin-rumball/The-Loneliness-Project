import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
   static async getInitialProps(ctx) {
      // Create an instance of ServerStyleSheet
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

      // // Step 2: Retrieve styles from components in the page
      // const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));

      // // Step 3: Extract the styles as <style> tags
      // const styleTags = sheet.getStyleElement();
      // const initialProps = await Document.getInitialProps(ctx);
      // console.log("TCL: MyDocument -> getInitialProps -> initialProps", initialProps);
      // return { ...initialProps, styleTags };
   }

   render() {
      return (
         <Html>
            <Head>
               <title>The Loneliness Project</title>
               <link
                  href="https://fonts.googleapis.com/css?family=Frank+Ruhl+Libre:400,700&display=swap"
                  rel="stylesheet"
               />
               <link
                  href="https://fonts.googleapis.com/css?family=Lato:400,900&display=swap"
                  rel="stylesheet"
               />
               <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
            <link href="/static/swal.css" rel="stylesheet" />
         </Html>
      );
   }
}

export default MyDocument;

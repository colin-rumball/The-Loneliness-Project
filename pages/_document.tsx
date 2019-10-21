import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps };
   }

   render() {
      return (
         <Html>
            <Head>
               <link
                  href="https://fonts.googleapis.com/css?family=Montserrat:400,600|Oswald:300&display=swap"
                  rel="stylesheet"
               />
               <link
                  href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:800|Playfair+Display:400|Permanent+Marker&display=swap"
                  rel="stylesheet"
               />
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

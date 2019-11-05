import React, { useMemo, useState } from "react";
import styled from "styled-components";
import TextInput from "./Forms/TextInput";

interface NewsletterSignupProps {}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({}) => {
   const [error, setError] = useState("");
   const [email, setEmail] = useState("");

   const StyledNewsletterHeader = useMemo(
      () => styled.div`
         width: 100%;
         text-align: center;
         color: ${({ theme }) => theme.Tan};
         opacity: 0.9;
         font-family: "lato", sans-serif;
         font-size: 28px;
         margin-bottom: 30px;
      `,
      []
   );

   const StyledNewletterInput = useMemo(
      () => styled.div`
         width: 100%;
         padding: 0 40px;
         max-width: 600px;

         .container {
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
            width: 100%;
            border-bottom: ${({ theme }) => `1px solid ${theme.Tan}`};

            input {
               flex-grow: 1;
               background: transparent;
               border: none;

               color: ${({ theme }) => theme.Tan};
               font-size: 16px;
               padding: 10px 6px;
            }

            button {
               cursor: pointer;
               background: transparent;
               border: none;
               padding: 10px 0;
               margin: 0;
               height: 100%;
               color: ${({ theme }) => theme.Tan};
            }
         }
      `,
      []
   );

   const StyledErrorMessage = useMemo(
      () => styled.div`
         width: 100%;
         padding: 20px 40px;
         text-align: center;
         color: ${({ theme }) => theme.Tan};
         opacity: 0.9;
         font-family: "lato", sans-serif;
         margin-top: 20px;
         font-size: 16px;
         font-weight: 600;
      `,
      []
   );

   return (
      <>
         <StyledNewsletterHeader>Weekly Stories in your Inbox</StyledNewsletterHeader>
         <StyledNewletterInput>
            <div className="container">
               <input
                  type="email"
                  name="email"
                  value={email}
                  autoComplete="off"
                  onChange={e => {
                     setEmail(e.target.value);
                  }}
                  placeholder="Leave your email for our newsletter"
               />
               <button onClick={() => {}}>SUBSCRIBE</button>
            </div>
         </StyledNewletterInput>
         {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
      </>
   );
};

export default NewsletterSignup;

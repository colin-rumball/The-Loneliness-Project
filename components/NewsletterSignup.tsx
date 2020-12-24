import React, { useMemo, useState } from "react";
import styled from "styled-components";
import TextInput from "./Forms/TextInput";
import { ThemeContainer } from "../themes/common";

const StyledNewsletterHeader = styled.div`
   width: 100%;
   text-align: center;
   color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
   opacity: 0.9;
   font-weight: 100;
   /* font-family: "lato", sans-serif; */
   font-size: 33px;
   margin-bottom: 30px;
`;

const StyledNewletterInput = styled.div`
   width: 100%;
   padding: 0 40px;
   display: flex;
   justify-content: center;

   .container {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: stretch;
      max-width: 600px;
      width: 100%;
      border-bottom: ${({ theme }: ThemeContainer) => `1px solid ${theme.VARIABLES.COLORS.Tan}`};

      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
      }

      @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
         flex-direction: row;
      }

      input {
         flex-grow: 1;
         background: transparent;
         border: none;

         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
         font-size: 16px;
         padding: 10px 6px;
      }

      button {
         font-family: "lato", sans-serif;
         font-size: 16px;
         letter-spacing: 1px;
         cursor: pointer;
         background: transparent;
         border: none;
         padding: 10px 0;
         margin: 0;
         height: 100%;
         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
      }
   }
`;

const StyledErrorMessage = styled.div`
   width: 100%;
   padding: 20px 40px;
   text-align: center;
   color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
   opacity: 0.9;
   font-family: "lato", sans-serif;
   margin-top: 20px;
   font-size: 16px;
   font-weight: 600;
`;

interface NewsletterSignupProps {
   showHeader?: boolean;
}

const NewsletterSignupDefaultProps: NewsletterSignupProps = {
   showHeader: true
};

const NewsletterSignup: React.FC<NewsletterSignupProps> = props => {
   const { showHeader } = { ...NewsletterSignupDefaultProps, ...props };
   const [error, setError] = useState("");
   const [email, setEmail] = useState("");

   return (
      <>
         {showHeader && (
            <StyledNewsletterHeader>Weekly Stories in your Inbox</StyledNewsletterHeader>
         )}
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

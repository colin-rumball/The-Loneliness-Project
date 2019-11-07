import React, { useMemo } from "react";
import styled from "styled-components";
import Button from "../components/Base/Button";
import NewsletterSignup from "../components/NewsletterSignup";
import SocialMedia from "../components/SocialMedia";
import TalkToSomeoneModal from "./modals/TalkToSomeoneModal";
import useModal from "../hooks/useModal";

interface HomeUserActionsProps {}

const HomeUserActions: React.FC<HomeUserActionsProps> = ({}) => {
   const { pushModal } = useModal();
   const StyledHomeUserActions = useMemo(
      () => styled.div`
         display: flex;
         flex-wrap: nowrap;
         justify-content: space-evenly;
         align-items: center;
         width: 100%;
         padding: 60px 40px;
         background-color: ${({ theme }) => theme.LightBlue};
      `,
      []
   );

   const StyledNewletterAndSocial = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         align-items: center;
         width: 100%;
         height: 100%;
      `,
      []
   );

   const StyledCredits = useMemo(
      () => styled.div`
         width: 100%;
         text-align: center;
         color: ${({ theme }) => theme.Tan};
         opacity: 0.5;
         a {
            color: ${({ theme }) => theme.Tan};
            text-decoration: none;

            &:hover {
               color: #fff;
            }
         }
      `,
      []
   );

   return (
      <StyledHomeUserActions>
         <a href="https://goo.gl/forms/yBwn2gFgvxyO0nTf2" target="_blank">
            <Button text="SUBMIT YOUR STORY" onClick={() => {}} />
         </a>
         <StyledNewletterAndSocial>
            <NewsletterSignup />
            <SocialMedia />
            <StyledCredits>
               Designed by{" "}
               <a href="http://marissakorda.com/" target="_blank">
                  Marissa Korda
               </a>{" "}
               / Programmed by Colin Rumball
            </StyledCredits>
         </StyledNewletterAndSocial>
         <Button
            text="TALK TO SOMEONE"
            onClick={() => {
               pushModal({ html: <TalkToSomeoneModal /> });
            }}
         />
      </StyledHomeUserActions>
   );
};

export default HomeUserActions;

import React, { useMemo } from "react";
import styled from "styled-components";
import Button from "../components/Base/Button";
import NewsletterSignup from "../components/NewsletterSignup";
import SocialMedia from "../components/SocialMedia";
import TalkToSomeoneModal from "./modals/TalkToSomeoneModal";
import useModal from "../hooks/useModal";
import { ThemeContainer } from "../themes/common";

interface HomeUserActionsProps {}

const HomeUserActions: React.FC<HomeUserActionsProps> = ({}) => {
   const { pushModal } = useModal();
   const StyledHomeUserActions = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         flex-wrap: nowrap;
         justify-content: space-evenly;
         align-items: center;
         width: 100%;
         padding: 60px 40px;
         background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};

         @media (min-width: 768px) {
            flex-direction: row;
         }

         @media (min-width: 1286px) {
            flex-direction: row;
         }
      `,
      []
   );

   const StyledNewletterAndSocial = useMemo(
      () => styled.div`
         order: 2;
         display: flex;
         flex-grow: 1;
         flex-direction: column;
         align-items: center;
         width: 100%;
         min-width: 360px;
         height: 100%;
      `,
      []
   );

   const StyledButton = useMemo(
      () => styled.div`
         display: flex;
         justify-content: center;
         order: 3;
         width: 100%;
         margin: 10px 5px;

         button,
         a {
            width: 100%;
            max-width: 300px;
         }

         @media (min-width: 768px) {
            order: ${props => props.order};
         }

         @media (min-width: 1286px) {
         }
      `,
      []
   );

   const StyledCredits = useMemo(
      () => styled.div`
         width: 100%;
         text-align: center;
         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
         opacity: 0.5;
         a {
            color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
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
         <StyledButton order={1}>
            <a href="https://goo.gl/forms/yBwn2gFgvxyO0nTf2" target="_blank">
               <Button text="SUBMIT YOUR STORY" onClick={() => {}} />
            </a>
         </StyledButton>
         <StyledNewletterAndSocial>
            <NewsletterSignup />
            <SocialMedia />
            <StyledCredits>
               Designed by{" "}
               <a href="http://marissakorda.com/" target="_blank">
                  Marissa Korda
               </a>{" "}
               / Developed by Colin Rumball
            </StyledCredits>
         </StyledNewletterAndSocial>
         <StyledButton order={3}>
            <Button
               text="TALK TO SOMEONE"
               onClick={() => {
                  pushModal({ html: <TalkToSomeoneModal /> });
               }}
            />
         </StyledButton>
      </StyledHomeUserActions>
   );
};

export default HomeUserActions;

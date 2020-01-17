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
         padding: 40px 40px;
         background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
            flex-direction: row;
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
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
         margin: 10px 10px;

         button,
         a {
            width: 100%;
            max-width: 300px;
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
            order: ${props => props.order};
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
         }
      `,
      []
   );

   const StyledCredits = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         width: 100%;
         text-align: center;
         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
         opacity: 0.5;
         margin-bottom: 20px;

         a {
            color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
            text-decoration: none;

            &:hover {
               color: #fff;
            }
         }

         .slash {
            display: none;
         }

         .line {
            display: inline-block;
            margin: 0 5px 0 0;
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
            margin-bottom: 0px;
            flex-direction: row;
            justify-content: space-between;
            .slash {
               flex-grow: 1;
               display: inline-block;
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
            {/* <NewsletterSignup /> */}
            <SocialMedia />
            <StyledCredits>
               <span>
                  <span className="line">Designed by </span>
                  <a className="line" href="http://marissakorda.com/" target="_blank">
                     Marissa Korda
                  </a>
               </span>
               {/* <span className="slash"> / </span> */}
               <span>
                  <span className="line">Developed by </span>
                  <a className="line" href="http://colinrumball.com/" target="_blank">
                     Colin Rumball
                  </a>
               </span>
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

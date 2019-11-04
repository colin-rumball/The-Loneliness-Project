import React, { useMemo } from "react";
import styled from "styled-components";
import Button from "../components/Base/Button";
import NewsletterSignup from "../components/NewsletterSignup";
import SocialMedia from "../components/SocialMedia";

interface HomeUserActionsProps {}

const HomeUserActions: React.FC<HomeUserActionsProps> = ({}) => {
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
      `,
      []
   );

   return (
      <StyledHomeUserActions>
         <Button text="SUBMIT YOUR STORY" onClick={() => {}} />
         <StyledNewletterAndSocial>
            <NewsletterSignup />
            <SocialMedia />
            <StyledCredits>Designed by Marissa Korda / Programmed by Colin Rumball</StyledCredits>
         </StyledNewletterAndSocial>
         <Button text="TALK TO SOMEONE" onClick={() => {}} />
      </StyledHomeUserActions>
   );
};

export default HomeUserActions;

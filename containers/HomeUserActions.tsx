import React, { useMemo } from "react";
import styled from "styled-components";
import Button from "../components/Base/Button";
import SocialMedia from "./SocialMedia";
import TalkToSomeoneModal from "./modals/TalkToSomeone/TalkToSomeoneModal";
import { ThemeContainer } from "../themes/common";
import StyledSocialAndCredits from "../components/Styled/StyledSocialAndCredits";
import useModalSystemHelper from "../hooks/useModalSystemHelper";

const StyledHomeUserActions = styled.div<any>`
   display: flex;
   flex-direction: column;
   flex-wrap: nowrap;
   justify-content: space-evenly;
   align-items: center;
   width: 100%;
   padding: 40px 40px;
   background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};

   transform: translateY(-4px);

   @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.MEDIUM}) {
      flex-direction: column;
   }

   @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
      flex-direction: row;
   }
`;

const StyledButton = styled.div<any>`
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
      order: ${(props) => props.order};
   }

   @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
   }
`;

interface HomeUserActionsProps {}

const HomeUserActions: React.FC<HomeUserActionsProps> = ({}) => {
   const { pushModal } = useModalSystemHelper();

   return (
      <StyledHomeUserActions>
         <StyledButton order={1}>
            <a href="https://goo.gl/forms/yBwn2gFgvxyO0nTf2" target="_blank" rel="noopener">
               <Button text="SUBMIT YOUR STORY" onClick={() => {}} />
            </a>
         </StyledButton>
         {/* SOCIAL AND CREDITS (MIDDLE) */}
         <StyledSocialAndCredits />
         <StyledButton order={3}>
            <Button
               text="TALK TO SOMEONE"
               onClick={() => {
                  pushModal(<TalkToSomeoneModal />);
               }}
            />
         </StyledButton>
      </StyledHomeUserActions>
   );
};

export default HomeUserActions;

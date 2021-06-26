import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../../themes/common";
import withModalBase from "../../../helpers/withModalBase";

const StyledHeader = styled.div<any>`
   font-size: 44px;
   font-weight: 400;
   margin-top: 40px;
   text-align: center;
`;

const StyledSubheader = styled.div<any>`
   font-family: "lato", sans-serif;
   font-size: 16px;
   font-weight: 600;
   text-align: center;
   letter-spacing: 1px;
   color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};

   margin-bottom: 40px;
`;

const StyledSectionsContainer = styled.div<any>`
   width: 100%;
   min-height: 50vh;
   display: flex;
   flex-direction: column;
   justify-content: center;
   flex-grow: 1;
   text-align: center;

   margin-bottom: 40px;
`;

const StyledSection = styled.div<any>`
   text-align: center;

   .name {
      font-family: "lato", sans-serif;
      font-size: 16px;
      line-height: 18px;
      text-decoration: none;
      color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};
      font-weight: 600;
      letter-spacing: 1px;
   }

   a.text {
      text-decoration: underline solid
         ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightGrey};
   }

   .text {
      font-size: 20px;
      line-height: 22px;
      letter-spacing: 0.5px;
      font-weight: 500;
      color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.DarkGrey};
   }
`;

const StyledHR = styled.hr`
   width: 50px;
   margin: 30px auto;
   border-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.DarkBlue};
`;

interface TalkToSomeoneModalProps {}

const TalkToSomeoneModal: React.FC<TalkToSomeoneModalProps> = ({}) => {
   return (
      <>
         <StyledHeader>Need to Talk to Someone?</StyledHeader>
         <StyledSubheader>IT’S OKAY. WE ALL DO SOMETIMES.</StyledSubheader>
         <StyledSectionsContainer>
            <StyledSection>
               <a
                  className="name"
                  href="https://suicidepreventionlifeline.org/"
                  target="_blank"
                  rel="noopener"
               >
                  NATIONAL SUICIDE PREVENTION LIFELINE
               </a>
               <div className="text">Free and confidential support and resources.</div>
               <div className="text">1 800 273 8255</div>
            </StyledSection>
            <StyledHR />
            <StyledSection>
               <a className="name" href="https://kidshelpphone.ca/" target="_blank" rel="noopener">
                  KIDS HELP PHONE
               </a>
               <div className="text">For kids and teens. No problem too small.</div>
               <div className="text">1 800 668 6868</div>
            </StyledSection>
            <StyledHR />
            <StyledSection>
               <div className="name">OUTSIDE OF NORTH AMERICA?</div>
               <div className="text">No problem. There's someone to talk to everywhere.</div>
               <a
                  className="text"
                  href="http://www.suicide.org/international-suicide-hotlines.html"
                  target="_blank"
                  rel="noopener"
               >
                  Browse the list of global hotlines
               </a>
            </StyledSection>
         </StyledSectionsContainer>
      </>
   );
};

export default withModalBase<TalkToSomeoneModalProps>(TalkToSomeoneModal);

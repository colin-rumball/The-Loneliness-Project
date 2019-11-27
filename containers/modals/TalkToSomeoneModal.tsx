import React, { useMemo } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../themes/common";
import ModalBase from "./ModalBase";

interface TalkToSomeoneModalProps {}

const TalkToSomeoneModal: React.FC<TalkToSomeoneModalProps> = ({}) => {
   const StyledHeader = useMemo(
      () => styled.div`
         font-size: 44px;
         font-weight: 200;
         margin: 30px 0 10px 0;
         max-width: 320;
         text-align: center;
      `,
      []
   );

   const StyledSubheader = useMemo(
      () => styled.div`
         font-family: "lato", sans-serif;
         font-size: 14px;
         font-weight: 700;
         text-align: center;
      `,
      []
   );

   const StyledSectionsContainer = useMemo(
      () => styled.div`
         width: 100%;
         height: 100%;
         min-height: 50vh;
         display: flex;
         flex-direction: column;
         justify-content: space-evenly;
         flex-grow: 1;
         text-align: center;
      `,
      []
   );

   const StyledSection = useMemo(
      () => styled.div`
         text-align: center;

         .text {
            font-size: 16px;
            a {
               font-family: "lato", sans-serif;
               font-size: 17px;
               text-decoration: none;
               color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Grey};
               font-weight: 600;
               letter-spacing: 1px;
            }
         }
      `,
      []
   );

   return (
      <ModalBase>
         <StyledHeader>Need to talk to someone?</StyledHeader>
         <StyledSubheader>IT’S OKAY. SOMETIMES WE ALL DO.</StyledSubheader>
         <StyledSectionsContainer>
            <StyledSection>
               <div className="text">
                  <a href="https://www.hopeline-nc.org/" target="_blank">
                     HOPELINE HOTLINE
                  </a>
               </div>
               <div className="text">Trained listeners available for those in crisis.</div>
               <div className="text">1 877 235 4525</div>
            </StyledSection>
            <StyledSection>
               <div className="text">
                  <a href="https://suicidepreventionlifeline.org/" target="_blank">
                     NATIONAL SUICIDE PREVENTION LIFELINE
                  </a>
               </div>
               <div className="text">Free and confidential support and resources.</div>
               <div className="text">1 800 273 8255</div>
            </StyledSection>
            <StyledSection>
               <div className="text">
                  <a href="https://kidshelpphone.ca/" target="_blank">
                     KIDS HELP PHONE
                  </a>
               </div>
               <div className="text">For teens and kids. No problem too small.</div>
               <div className="text">1 800 668 6868</div>
            </StyledSection>
         </StyledSectionsContainer>
      </ModalBase>
   );
};

export default TalkToSomeoneModal;

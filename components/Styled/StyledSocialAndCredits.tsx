import React, { useMemo } from "react";
import styled from "styled-components";
import SocialMedia from "../../containers/SocialMedia";
import { ThemeContainer } from "../../themes/common";

interface StyledSocialAndCreditsProps {}

const StyledSocialAndCreditsDefaultProps: StyledSocialAndCreditsProps = {};

const StyledSocialAndCredits: React.FC<StyledSocialAndCreditsProps> = props => {
   const {} = { ...StyledSocialAndCreditsDefaultProps, ...props };
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
            padding: 0 5px;
         }

         .line {
            display: inline-block;
            margin: 0 4px 0 0;
         }

         @media (min-width: ${({ theme }: ThemeContainer) => theme.VARIABLES.BREAK_POINTS.LARGE}) {
            margin-bottom: 0px;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .slash {
               display: inline-block;
            }
         }
      `,
      []
   );
   return (
      <StyledNewletterAndSocial>
         <SocialMedia />
         <StyledCredits>
            <span>
               <span className="line">Designed by </span>
               <a className="line" href="https://marissakorda.com/" target="_blank" rel="noopener">
                  Marissa Korda
               </a>
            </span>
            <span className="slash"> / </span>
            <span>
               <span className="line">Developed by </span>
               <a className="line" href="https://colinrumball.com/" target="_blank" rel="noopener">
                  Colin Rumball
               </a>
            </span>
         </StyledCredits>
      </StyledNewletterAndSocial>
   );
};

export default StyledSocialAndCredits;

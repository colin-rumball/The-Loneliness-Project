import React, { useMemo } from "react";
import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaEnvelope } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { ThemeContainer } from "../themes/common";

interface SocialMediaProps {
   divider?: boolean;
   justifyContent?: "center" | "flex-start";
}

const SocialMediaDefaultProps: SocialMediaProps = {
   divider: false,
   justifyContent: "center"
};

const SocialMedia: React.FC<SocialMediaProps> = props => {
   const { divider, justifyContent } = { ...SocialMediaDefaultProps, ...props };
   const StyledSocialMedia = useMemo(
      () => styled.div`
         display: flex;
         flex-wrap: nowrap;
         justify-content: ${props => props.justifyContent};
         width: 100%;
         margin: 20px 0;
         padding-bottom: ${props => (props.divider ? "30px" : 0)};
         border-bottom: ${({ theme, divider }: ThemeContainer) =>
            divider ? `1px solid ${theme.VARIABLES.COLORS.Tan}` : null};
      `,
      []
   );

   const StyledSocialIcon = useMemo(
      () => styled.a`
         font-size: 28px;
         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
         margin: 0 15px;

         &:hover {
            cursor: pointer;
            color: #fff;
         }
      `,
      []
   );

   return (
      <StyledSocialMedia divider={divider} justifyContent={justifyContent}>
         <StyledSocialIcon href="https://www.facebook.com/animperfectarchiveofus/" target="_blank">
            <FaFacebookF />
         </StyledSocialIcon>
         <StyledSocialIcon href="https://twitter.com/marissakorda" target="_blank">
            <FaTwitter />
         </StyledSocialIcon>
         <StyledSocialIcon href="https://www.instagram.com/thelonelinessproject/" target="_blank">
            <AiFillInstagram />
         </StyledSocialIcon>
         <StyledSocialIcon href="mailto:hello@marissakorda.com" target="_blank">
            <FaEnvelope />
         </StyledSocialIcon>
      </StyledSocialMedia>
   );
};

export default SocialMedia;

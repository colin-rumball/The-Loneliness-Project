import React, { useMemo } from "react";
import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaEnvelope } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { ThemeContainer } from "../themes/common";

const StyledSocialMedia = styled.div<any>`
   display: flex;
   flex-wrap: nowrap;
   justify-content: ${(props) => props.justifyContent};
   width: 100%;
   margin: 20px 0;
`;

const StyledSocialIcon = styled.a`
   font-size: 28px;
   color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
   margin: 0 15px;

   &:hover {
      cursor: pointer;
      color: #fff;
   }
`;

interface SocialMediaProps {
   justifyContent?: "center" | "flex-start";
}

const SocialMediaDefaultProps: SocialMediaProps = {
   justifyContent: "center",
};

const SocialMedia: React.FC<SocialMediaProps> = (props) => {
   const { justifyContent } = { ...SocialMediaDefaultProps, ...props };

   return (
      <StyledSocialMedia justifyContent={justifyContent}>
         <StyledSocialIcon
            href="https://www.facebook.com/animperfectarchiveofus/"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
         >
            <FaFacebookF />
         </StyledSocialIcon>
         <StyledSocialIcon
            href="https://twitter.com/marissakorda"
            target="_blank"
            rel="noopener"
            aria-label="Twitter"
         >
            <FaTwitter />
         </StyledSocialIcon>
         <StyledSocialIcon
            href="https://www.instagram.com/thelonelinessproject/"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
         >
            <AiFillInstagram />
         </StyledSocialIcon>
         <StyledSocialIcon
            href="mailto:hello@marissakorda.com"
            target="_blank"
            rel="noopener"
            aria-label="Email"
         >
            <FaEnvelope />
         </StyledSocialIcon>
      </StyledSocialMedia>
   );
};

export default SocialMedia;

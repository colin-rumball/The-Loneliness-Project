import React, { useMemo } from "react";
import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

interface SocialMediaProps {}

const SocialMedia: React.FC<SocialMediaProps> = ({}) => {
   const StyledSocialMedia = useMemo(
      () => styled.div`
         display: flex;
         flex-wrap: nowrap;
         justify-content: center;
         width: 100%;
         margin: 20px 0;
      `,
      []
   );

   const StyledSocialIcon = useMemo(
      () => styled.a`
         font-size: 28px;
         color: ${({ theme }) => theme.Tan};
         margin: 0 15px;

         &:hover {
            cursor: pointer;
            color: #fff;
         }
      `,
      []
   );

   return (
      <StyledSocialMedia>
         <StyledSocialIcon href="https://www.facebook.com/animperfectarchiveofus/" target="_blank">
            <FaFacebookF />
         </StyledSocialIcon>
         <StyledSocialIcon href="https://twitter.com/marissakorda" target="_blank">
            <FaTwitter />
         </StyledSocialIcon>
         <StyledSocialIcon href="https://www.instagram.com/thelonelinessproject/" target="_blank">
            <FaInstagram />
         </StyledSocialIcon>
         <StyledSocialIcon href="mailto:hello@marissakorda.com" target="_blank">
            <FaEnvelope />
         </StyledSocialIcon>
      </StyledSocialMedia>
   );
};

export default SocialMedia;

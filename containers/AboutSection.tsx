import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import NewsletterSignup from "../components/NewsletterSignup";
import PressFeatures from "./PressFeatures";
import SocialMedia from "../components/SocialMedia";
import { ThemeContainer } from "../themes/common";

interface AboutSectionProps {}

const AboutSection: React.FC<AboutSectionProps> = ({}) => {
   const StyledAboutSection = useMemo(
      () => styled.div`
         position: fixed;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         overflow: auto;
         padding: 20px 12% 30px 12%;
         padding-top: 15vh;
         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.ON_TOP};
         background-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.LightBlue};
         animation: ${({ theme }: ThemeContainer) => theme.ANIMATIONS.FadeIn} 0.6s ease-in both;

         .icon {
            width: 50px;
            fill: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
         }

         .about-title {
            font-size: 57px;
            font-weight: 100;
            margin: 15px 0;
         }
      `,
      []
   );

   const StyledFadeIn = useMemo(
      () => styled.div`
         animation: ${({ theme }: ThemeContainer) => theme.ANIMATIONS.FadeIn} 0.5s ease-in both;
         animation-delay: ${props => props.delay};

         &:last-child {
            padding-top: 10px;
         }
      `,
      []
   );

   const StyledParagraph = useMemo(
      () => styled.p`
         font-family: "lato", sans-serif;
         font-size: 16px;
         font-weight: 300;
         line-height: 22px;
         letter-spacing: 0.5px;
         margin-bottom: 30px;
         animation: ${({ theme }: ThemeContainer) => theme.ANIMATIONS.FadeIn} 0.5s ease-in both;
         animation-delay: ${props => props.delay};

         &.newsletter {
            font-size: 18px;
            font-style: italic;
            font-family: "Frank Ruhl Libre", sans-serif;
         }

         a {
            color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
         }
      `,
      []
   );

   return (
      <StyledAboutSection>
         <StyledFadeIn delay={"0.3s"}>
            <img className="icon" alt={"fingerprint-logo"} src="/static/finger-print-logo.svg" />
         </StyledFadeIn>
         <StyledFadeIn delay={"0.5s"}>
            <div className="about-title">Loneliness is human and that’s okay.</div>
         </StyledFadeIn>
         <StyledParagraph delay={"0.7s"}>
            At The Loneliness Project, we believe that stories have power—the power to heal both
            listener and teller, and to show us that we aren’t ever truly alone. Stories are
            powerful tools for building empathy and growing kindness. Those shared here are deeply
            personal yet profoundly universal. They reveal something about being human.
         </StyledParagraph>
         <StyledParagraph delay={"0.9s"}>
            The Loneliness Project is the first chapter of An Imperfect Archive of Us, a digital
            space to cultivate compassion—for others, but especially for ourselves. Become part of
            our community by{" "}
            <a
               href="https://docs.google.com/forms/d/e/1FAIpQLSf5hbVcxdWvkNSiVHucPs8Czjpehh58y2DkuGMlfmlHt1IoVQ/viewform?c=0&w=1"
               target="_blank"
            >
               sharing your story here
            </a>
            .
         </StyledParagraph>
         <StyledParagraph className="newsletter" delay={"1.1s"}>
            Sign up below for weekly stories about life, loneliness, and the parts of ourselves that
            we hide from others.
         </StyledParagraph>
         <StyledFadeIn delay={"1.3s"}>
            {/* <NewsletterSignup showHeader={false} /> */}
            <SocialMedia />
            <PressFeatures />
         </StyledFadeIn>
      </StyledAboutSection>
   );
};

export default AboutSection;

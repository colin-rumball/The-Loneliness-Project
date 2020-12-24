import React, { useMemo } from "react";
import styled from "styled-components";
import PressFeatures from "./PressFeatures";
import SocialMedia from "./SocialMedia";
import { ThemeContainer } from "../themes/common";

const StyledAboutSection = styled.div`
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
   user-select: text;

   .icon {
      width: 50px;
      fill: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
   }

   .about-title {
      font-size: 57px;
      font-weight: 100;
      margin: 15px 0;
   }
`;

const StyledParagraph = styled.p`
   font-family: "lato", sans-serif;
   font-size: 18px;
   font-weight: 300;
   line-height: 22px;
   letter-spacing: 0.5px;
   margin: 0 0 32px;
   animation: ${({ theme }: ThemeContainer) => theme.ANIMATIONS.FadeIn} 0.5s ease-in both;
   animation-delay: ${props => props.delay};

   &:nth-last-child(2) {
      margin-bottom: 40px;
   }

   a {
      color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
   }
`;

const StyledFadeIn = styled.div`
   animation: ${({ theme }: ThemeContainer) => theme.ANIMATIONS.FadeIn} 0.5s ease-in both;
   animation-delay: ${props => props.delay};
`;

const StyledHR = styled.hr`
   border-color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
   margin: 72px 0 60px 0;
`;

interface AboutSectionProps {}

const AboutSection: React.FC<AboutSectionProps> = ({}) => {
   return (
      <StyledAboutSection>
         <StyledFadeIn delay={"0.3s"}>
            <img className="icon" alt={"fingerprint-logo"} src="/finger-print-logo.svg" />
         </StyledFadeIn>
         <StyledFadeIn delay={"0.5s"}>
            <div className="about-title">Loneliness is human and that’s okay.</div>
         </StyledFadeIn>
         <StyledParagraph delay={"0.7s"}>
            Stories have power—the power to heal both listener and teller, and show us that we
            aren't ever truly alone. Those shared here are deeply personal yet profoundly universal.
            They reveal something about being human.
         </StyledParagraph>
         <StyledParagraph delay={"0.9s"}>
            The project is no longer publishing weekly stories but it remains up as an archive for
            whoever needs it. This is a digital space to cultivate compassion—for others, but
            especially for ourselves. Though the site is no longer publishing submissions, the
            anonymous form has remained open.{" "}
            <a
               href="https://docs.google.com/forms/d/e/1FAIpQLSf5hbVcxdWvkNSiVHucPs8Czjpehh58y2DkuGMlfmlHt1IoVQ/viewform?c=0&w=1"
               rel="noopener"
               target="_blank"
            >
               Share your story here
            </a>{" "}
            and know that someone on the other side is listening.
         </StyledParagraph>
         <StyledParagraph delay={"1.1s"}>
            Explore the site for stories about life, loneliness, and the parts of ourselves we hide
            from others.
         </StyledParagraph>
         <StyledFadeIn delay={"1.3s"}>
            <SocialMedia justifyContent={"flex-start"} />
            <StyledHR />
            <PressFeatures addPadding={false} />
         </StyledFadeIn>
      </StyledAboutSection>
   );
};

export default AboutSection;

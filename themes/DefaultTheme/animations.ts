import { keyframes, css } from "styled-components";
import { Animations } from "../common";

const FadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const FadeOut = keyframes`
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
`;

const PopIn = keyframes`
	0% {
         transform: scale(0.75);
			opacity: 0.7;
  }
  100% {
         transform: scale(1);
			opacity: 1.0;
  }
`;

const MODAL_OPENING = css`
   animation: ${PopIn} 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
`;

const MODAL_CLOSING = css`
   animation: ${FadeOut} 0.25s linear both;
`;

const ANIMATIONS: Animations = {
   FadeIn,
   FadeOut,
   MODAL_OPENING,
   MODAL_CLOSING
};

export default ANIMATIONS;

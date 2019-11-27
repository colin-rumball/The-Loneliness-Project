import { keyframes } from "styled-components";
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

const ANIMATIONS: Animations = {
   FadeIn,
   FadeOut
};

export default ANIMATIONS;

import { keyframes } from "styled-components";

export interface Animations {}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const ANIMATIONS: Animations = {};

export default ANIMATIONS;

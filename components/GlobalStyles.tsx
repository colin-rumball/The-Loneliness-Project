import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	@font-face {
   font-family: "freight-display-pro";
   src: url("/fonts/Freight Disp Light.otf") format("opentype");
}

* {
   box-sizing: border-box;
}

html {
   font-size: 18px;
   color: #222222;
   scroll-behavior: smooth;
   webkit-font-smoothing: antialiased;
   font-display: block;
}

.modal-open {
   overflow: hidden;
}

body {
   font-family: "freight-display-pro", serif;
   background-color: #1b2334;
   margin: 0;
}

*::-webkit-scrollbar {
   width: 0.5em;
}

*::-webkit-scrollbar-thumb {
   background-color: #e8d8b6;
   border-radius: 3px;
}

h1,
h2,
h3,
h4,
h5 {
   margin: 0;
}

`;

export default GlobalStyles;
import { createGlobalStyle } from "styled-components";

import { box, color } from "@utils/Themes";

const GlobalStyle = createGlobalStyle`
:root {
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
  
  color-scheme: ${(props) => props.theme.colorScheme};
  background-color: ${(props) => color(props).surface};
}

body {
  margin: 0;
  padding: 0;
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.swiper {
  height: fit-content;
  padding-bottom: 20px;

  z-index: ${(props) => box(props).zIndex.base};
}

.swiper-pagination {
  height: 10px;
  bottom: 0px !important;

  line-height: 0;
  text-align: end;
}

.swiper-pagination-bullet{
  width: 10px;
  height: 10px;

  background-color: ${(props) => color(props).primary};

  text-align: center;
}

.swiper-pagination-bullet-active{
  width: 10px;
  height: 10px;
}

.Toastify__toast  {
  margin: 16px auto auto auto;
  max-width: 95vw;

  border: 1px solid ${(props) => color(props).outlineVariant};
  border-radius: ${(props) => box(props).borderRadius.xl};
  background-color: ${(props) => color(props).surfaceContainer};

  overflow: hidden;
}

.Toastify__close-button {
  display: none;
}

.Toastify__toast-body {
  div {
    color: ${(props) => color(props).onSurface};
  }
}
`;

export default GlobalStyle;

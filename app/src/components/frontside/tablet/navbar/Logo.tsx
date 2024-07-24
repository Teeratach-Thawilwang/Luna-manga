import { darken } from "polished";

import { Link } from "react-router-dom";

import styled from "styled-components";

import { box, color, font } from "@utils/Themes";

export default function Logo() {
  return <Box to="/">Luna</Box>;
}

const Box = styled(Link)`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: fit-content;
  height: 100%;
  margin: 0 ${(props) => box(props).space.lg} 0 0;
  padding: ${(props) => box(props).space.none};
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${(props) => font(props).size["3xl"]};
  font-weight: ${(props) => font(props).weight.bold};
  font-family: Berkshire Swash;
  color: ${(props) => color(props).primary};
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }
`;

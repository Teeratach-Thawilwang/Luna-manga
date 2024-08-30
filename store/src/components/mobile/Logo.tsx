import { Link } from "react-router-dom";

import styled from "styled-components";

import { box, color, font } from "@utils/Themes";

export default function Logo() {
  return <Box to="/">Luna</Box>;
}

const Box = styled(Link)`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  margin-top: 0;
  margin-bottom: auto;
  padding: ${(props) => box(props).space.md} 0;
  text-decoration: none;

  color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size["4xl"]};
  font-weight: ${(props) => font(props).weight.bold};
  font-family: Berkshire Swash;
  white-space: nowrap;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
`;

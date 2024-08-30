import { Link } from "react-router-dom";

import { styled } from "styled-components";

import { color, font } from "@utils/Themes";

export const BaseItem = styled(Link)`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 60px;
  border-bottom: 1px solid ${(props) => color(props).outlineVariant};

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.md};

  white-space: nowrap;
  text-decoration: none;
  text-align: center;

  display: flex;
  justify-content: left;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => color(props).surfaceContainerHigh};
  }
`;

import { Link } from "react-router-dom";

import { styled } from "styled-components";

import { box, color, font } from "@utils/Themes";

export const BaseItem = styled(Link)`
  box-sizing: border-box;
  width: 100%;
  margin: ${(props) => box(props).space.md} 0;
  padding: ${(props) => box(props).space.md};

  border: 1px solid ${(props) => color(props).outlineVariant};
  border-radius: ${(props) => box(props).borderRadius.lg};

  color: ${(props) => color(props).onSurface};
  background-color: ${(props) => color(props).surfaceContainer};

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

import { Link } from "react-router-dom";

import { styled } from "styled-components";

import { box, color, font } from "@utils/Themes";

export default function NavbarButton({ url, children }: { url: string; children: string }) {
  return <Box to={url}>{children}</Box>;
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

  font-size: ${(props) => font(props).size.md};
  color: ${(props) => color(props).onSurface};
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    color: ${(props) => color(props).onSurfaceVariant};
  }
`;

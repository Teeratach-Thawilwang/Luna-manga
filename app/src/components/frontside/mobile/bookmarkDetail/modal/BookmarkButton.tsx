import { darken } from "polished";

import { styled } from "styled-components";

import BookmarkIcon from "@components/iconSvg/BookmarkIcon";
import { box, color, font } from "@utils/Themes";

export default function BookmarkButton({ setIsModalShow }: { setIsModalShow: (value: boolean) => void }) {
  return (
    <Box onClick={() => setIsModalShow(true)}>
      <BookmarkIcon />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  padding: ${(props) => box(props).space.md};
  padding-left: ${(props) => box(props).space.sm};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size.lg};
    height: ${(props) => font(props).size.lg};
  }

  path {
    fill: ${(props) => color(props).primary};
    stroke: ${(props) => color(props).primary};
    stroke-width: 1px;
  }

  &:hover {
    cursor: pointer;
    path {
      fill: ${(props) => darken(0.1, color(props).primary)};
      stroke: ${(props) => darken(0.1, color(props).primary)};
    }
  }
`;

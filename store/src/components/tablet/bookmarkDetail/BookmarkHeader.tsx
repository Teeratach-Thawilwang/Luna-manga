import styled from "styled-components";

import BookmarkIcon from "@components/iconSvg/BookmarkIcon";
import BookmarkService from "@services/BookmarkService";
import { box, color, font } from "@utils/Themes";

export default function BookmarkHeader() {
  const totalBookmark = BookmarkService.getTotalBookamrk();
  return (
    <Box>
      <BookmarkIcon />
      <Text>Bookmark ({totalBookmark})</Text>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  margin-top: ${(props) => box(props).space.xxl};

  border-bottom: 2px solid ${(props) => color(props).outlineVariant};

  display: flex;
  justify-content: start;
  align-items: center;

  svg {
    /* border: 1px solid red; */
    width: ${(props) => font(props).size.md};
    height: ${(props) => font(props).size.md};

    path {
      stroke: ${(props) => color(props).primary};
      fill: ${(props) => color(props).primary};
    }
  }
`;

const Text = styled.div`
  /* border: 1px solid red; */
  width: fit-content;
  height: 100%;
  margin-left: ${(props) => box(props).space.xs};
  padding: ${(props) => box(props).space.sm} 0;

  color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: center;
  align-items: center;
`;

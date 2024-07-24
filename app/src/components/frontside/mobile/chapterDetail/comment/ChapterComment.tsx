import styled from "styled-components";

import CommentHeader from "@components/frontside/mobile/chapterDetail/comment/CommentHeader";
import CommentListWrap from "@components/frontside/mobile/chapterDetail/comment/CommentListWrap";
import { box } from "@utils/Themes";

export default function ChapterComment() {
  return (
    <Box>
      <CommentHeader />
      <CommentListWrap />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.lg};

  position: relative;

  user-select: text;
`;

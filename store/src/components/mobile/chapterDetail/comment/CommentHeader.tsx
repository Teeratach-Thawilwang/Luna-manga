import styled from "styled-components";

import InputCommentBox from "@components/mobile/comment/InputCommentBox";
import ChapterCommentService from "@services/ChapterCommentService";
import ChapterService from "@services/ChapterService";
import CustomerProfileService from "@services/CustomerProfileService";
import { color, font } from "@utils/Themes";

export default function CommentHeader() {
  const chapter = ChapterService.getChapter();
  const commentCount = ChapterCommentService.getCommentCount();
  const customerId = CustomerProfileService.getCustomerId();
  const CommentBox = getCommentInputBox(chapter?.id, customerId);

  return (
    <Box>
      <CommentTitle>คอมเม้นต์ ({commentCount})</CommentTitle>
      {CommentBox}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
`;

const CommentTitle = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 50px;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.md};

  display: flex;
  justify-content: start;
  align-items: center;
`;

const NeedLoginToComment = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  min-height: 60px;

  color: ${(props) => color(props).onSurface};
  background-color: ${(props) => color(props).surfaceContainerHigh};

  font-size: ${(props) => font(props).size.md};

  display: flex;
  justify-content: center;
  align-items: center;
`;

function getCommentInputBox(chapterId: number | undefined, customerId: number | null) {
  if (customerId != null && chapterId != undefined) {
    return <InputCommentBox onSubmit={(text) => ChapterCommentService.createComment(chapterId, customerId, text)} />;
  }

  return <NeedLoginToComment>จำเป็นต้องเข้าสู่ระบบเพื่อเขียนคอมเม้นต์</NeedLoginToComment>;
}

import { styled } from "styled-components";

import CommentItemContent from "@components/tablet/comment/CommentItemContent";
import CommentItemHeader from "@components/tablet/comment/CommentItemHeader";
import { ReactionEnum } from "@enums/ReactionEnum";
import { CommentInterface } from "@interfaces/CommentInterface";
import { box, color } from "@utils/Themes";

interface CommentItemInterface {
  comment: CommentInterface;
  onReactionClick: (comment: CommentInterface, react: ReactionEnum) => void;
  optionModal: (commentId: number, commenterId: number, isShow: boolean, setIsShow: (value: boolean) => void) => JSX.Element;
}

export default function CommentItem({ comment, onReactionClick, optionModal }: CommentItemInterface) {
  return (
    <Box>
      <CommentItemHeader comment={comment} optionModal={optionModal} />
      <Line />
      <CommentItemContent comment={comment} onReactionClick={onReactionClick} />
    </Box>
  );
}

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  padding: 10px;
  margin-bottom: 10px;

  border: 1px solid ${(props) => color(props).outlineVariant};
  border-radius: ${(props) => box(props).borderRadius.md};
  background-color: ${(props) => color(props).surfaceContainer};
`;

const Line = styled.div`
  margin: 10px 0;
  border-bottom: 1px solid ${(props) => color(props).outlineVariant};
`;

﻿import { styled } from "styled-components";

import Reaction from "@components/frontside/mobile/comment/Reaction";
import { ReactionEnum } from "@enums/frontside/ReactionEnum";
import { CommentInterface } from "@interfaces/frontside/CommentInterface";
import { color, font } from "@utils/Themes";

interface CommentItemContentInterface {
  comment: CommentInterface;
  onReactionClick: (comment: CommentInterface, react: ReactionEnum) => void;
}

export default function CommentItemContent({ comment, onReactionClick }: CommentItemContentInterface) {
  return (
    <Box>
      <Text>{comment.message}</Text>
      <Reaction comment={comment} onClick={onReactionClick} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.sm};

  word-break: break-word;
  white-space: pre-wrap;
`;

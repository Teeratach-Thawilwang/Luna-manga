import styled from "styled-components";

import CommentItem from "@components/mobile/comment/CommentItem";
import SeeMoreButton from "@components/mobile/comment/SeeMoreButton";
import { ReactionEnum } from "@enums/ReactionEnum";
import { CommentInterface } from "@interfaces/CommentInterface";
import { PaginationInterface } from "@interfaces/PaginationInterface";
import { box } from "@utils/Themes";

interface CommentListInterface {
  comments: CommentInterface[];
  paginate: PaginationInterface | null;
  isLoading: boolean;
  onSeeMoreClick: () => void;
  onReactionClick: (comment: CommentInterface, react: ReactionEnum) => void;
  optionModal: (commentId: number, commenterId: number, isShow: boolean, setIsShow: (value: boolean) => void) => JSX.Element;
}

export default function CommentList({ comments, paginate, isLoading, onSeeMoreClick, onReactionClick, optionModal }: CommentListInterface) {
  const commentElements = createComments(comments, onReactionClick, optionModal);

  return (
    <Box>
      <CommentBox>{commentElements}</CommentBox>
      <SeeMoreButton paginate={paginate} isLoading={isLoading} onClick={onSeeMoreClick} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.sm};
`;

const CommentBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
`;

function createComments(
  comments: CommentInterface[],
  onReactionClick: (comment: CommentInterface, react: ReactionEnum) => void,
  optionModal: (commentId: number, commenterId: number, isShow: boolean, setIsShow: (value: boolean) => void) => JSX.Element,
) {
  return comments.map((comment) => {
    return <CommentItem comment={comment} onReactionClick={onReactionClick} optionModal={optionModal} key={comment.id} />;
  });
}

import { Link } from "react-router-dom";

import { styled } from "styled-components";

import { CommentInterface } from "@interfaces/frontside/CommentInterface";
import { transfromDateString } from "@utils/Helpers";
import { color, font } from "@utils/Themes";

export default function CommenterInfo({ comment }: { comment: CommentInterface }) {
  return (
    <Box>
      <DisplayName to={`/profile/${comment.commenter.id}`}>{comment.commenter.display_name}</DisplayName>
      <CommentDate>{transfromDateString(comment.created_at)}</CommentDate>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;
  margin: 0 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;

  flex-grow: 1;
`;

const DisplayName = styled(Link)`
  /* border: 1px solid red; */
  box-sizing: border-box;
  text-decoration: none;

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.md};
  line-height: ${(props) => font(props).lineHeight.xs};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: center;
  align-items: start;

  &:hover {
    cursor: pointer;
    color: ${(props) => color(props).onSurfaceVariant};
  }
`;

const CommentDate = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.xs};
  line-height: ${(props) => font(props).lineHeight.xs};
`;

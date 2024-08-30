import styled from "styled-components";

import LikeIcon from "@components/iconSvg/LikeIcon";
import { ReactionEnum } from "@enums/ReactionEnum";
import { CommentInterface } from "@interfaces/CommentInterface";
import AuthService from "@services/AuthService";
import CustomerProfileService from "@services/CustomerProfileService";
import { transformNumber } from "@utils/Helpers";
import { box, color, font } from "@utils/Themes";

interface ReactionInterface {
  comment: CommentInterface;
  onClick: (comment: CommentInterface, value: ReactionEnum) => void;
}

export default function Reaction({ comment, onClick }: ReactionInterface) {
  const isLoggedIn = CustomerProfileService.isLoggedIn() && AuthService.isLogin();

  return (
    <Box $isInteract={isLoggedIn} onClick={() => onClick(comment, ReactionEnum.LIKE)}>
      <IconBox>
        <LikeIcon />
      </IconBox>
      <Text>{transformNumber(comment.reaction.like)}</Text>
    </Box>
  );
}

const Box = styled.div<{ $isInteract: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;

  margin: 5px 0px 0px auto;
  padding: ${(props) => box(props).space.xs} ${(props) => box(props).space.md};

  border: 1px solid ${(props) => color(props).primary};
  border-radius: ${(props) => box(props).borderRadius["4xl"]};
  color: ${(props) => color(props).onSurface};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: ${(props) => (props.$isInteract ? "pointer" : "default")};
    background-color: ${(props) => (props.$isInteract ? color(props).surfaceContainerHighest : "transparent")};
  }

  &:active {
    transform: ${(props) => (props.$isInteract ? `scale(0.95)` : "")};
    background-color: ${(props) => (props.$isInteract ? color(props).surfaceContainerHigh : "transparent")};
  }
`;

const IconBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size.lg};
    height: ${(props) => font(props).size.lg};
    padding: 2px;

    path {
      fill: ${(props) => color(props).primary};
    }
    #svg_1 {
      fill: transparent;
    }
  }
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 2px;
  margin-left: ${(props) => box(props).space.xs};

  color: ${(props) => color(props).primary};
  font-size: ${(props) => font(props).size.md};
  line-height: ${(props) => font(props).lineHeight.sm};
`;

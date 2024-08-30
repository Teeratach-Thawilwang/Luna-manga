import styled from "styled-components";

import DislikeIcon from "@components/iconSvg/DislikeIcon";
import FavoriteIcon from "@components/iconSvg/FavoriteIcon";
import { ReactionEnum } from "@enums/ReactionEnum";
import ChapterService from "@services/ChapterService";
import CustomerProfileService from "@services/CustomerProfileService";
import { box, color, font } from "@utils/Themes";

export default function ChapterReactionVote() {
  const customerId = CustomerProfileService.getCustomerId();
  const chapter = ChapterService.getChapter()!;

  function onclickHandle(react: ReactionEnum) {
    if (customerId == null) {
      return;
    }

    let like: number | undefined = 0;
    let dislike: number | undefined = 0;
    const { is_liked, is_disliked } = chapter.reaction;

    switch (react) {
      case ReactionEnum.LIKE:
        like = is_liked ? 0 : 1;
        dislike = like ? 0 : undefined;
        ChapterService.reaction(customerId, chapter.id, like, dislike);
        break;
      case ReactionEnum.DISLIKE:
        dislike = is_disliked ? 0 : 1;
        like = dislike ? 0 : undefined;
        ChapterService.reaction(customerId, chapter.id, like, dislike);
        break;
    }
  }

  return (
    <Box>
      <Text>อ่านเเล้วรู้สึกอย่างไร ?</Text>
      <LikeIconBox $isSelect={chapter.reaction.is_liked} onClick={() => onclickHandle(ReactionEnum.LIKE)}>
        <FavoriteIcon />
      </LikeIconBox>
      <DislikeIconBox $isSelect={chapter.reaction.is_disliked} onClick={() => onclickHandle(ReactionEnum.DISLIKE)}>
        <DislikeIcon />
      </DislikeIconBox>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin-top: ${(props) => box(props).space.xxl};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.md};
`;

const ImageIcon = styled.div<{ $isSelect: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;
  margin-left: ${(props) => box(props).space.md};

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  svg {
    width: 30px;
    height: 30px;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;

const LikeIconBox = styled(ImageIcon)`
  svg {
    fill: ${(props) => (props.$isSelect ? "#fe7e7e" : "none")};
    path {
      stroke: "#fe7e7e";
      stroke-width: 2;
    }
  }
`;

const DislikeIconBox = styled(ImageIcon)`
  svg {
    fill: ${(props) => (props.$isSelect ? color(props).onSurface : "none")};
    path,
    circle {
      stroke-width: 1;
      stroke: ${(props) => (props.$isSelect ? color(props).surface : color(props).onSurface)};
    }
  }
`;

import { useState } from "react";

import styled from "styled-components";

import CenterModal from "@components/frontside/tablet/CenterModal";
import BookmarkConfirmModal from "@components/frontside/tablet/storyDetail/modal/BookmarkConfirmModal";
import BookmarkIcon from "@components/iconSvg/BookmarkIcon";
import { StoryInterface } from "@interfaces/frontside/StoryInterface";
import StoryService from "@services/frontside/StoryService";
import { box, color, font } from "@utils/Themes";

export default function BookmarkButton({ story }: { story: StoryInterface }) {
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const isBookmark = StoryService.getIsBookmark();

  return (
    <>
      <Box onClick={() => setIsModalShow((prev) => !prev)} $isActive={isBookmark}>
        <BookmarkIcon />
      </Box>
      <CenterModal isShow={isModalShow} setShow={setIsModalShow}>
        <BookmarkConfirmModal storyId={story.id} storyName={story.name} isBookmark={isBookmark} setShow={setIsModalShow} />
      </CenterModal>
    </>
  );
}

const Box = styled.div<{ $isActive: boolean }>`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  padding: ${(props) => box(props).space.sm};
  border-radius: 100%;

  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainerHigh};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size.md};
    height: ${(props) => font(props).size.md};
  }

  path {
    fill: ${(props) => (props.$isActive ? color(props).primary : "")};
    stroke: ${(props) => color(props).primary};
  }

  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => color(props).surfaceContainerHighest};
  }

  &:active {
    transform: scale(1);
    background-color: ${(props) => color(props).surfaceContainerHigh};
  }
`;

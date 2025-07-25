﻿import { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import CenterModal from "@components/frontside/mobile/CenterModal";
import ImageStory from "@components/frontside/mobile/ImageStory";
import Loading from "@components/frontside/mobile/Loading";
import BookmarkStoryDetail from "@components/frontside/mobile/bookmarkDetail/bookmarkStory/BookmarkStoryDetail";
import BookmarkButton from "@components/frontside/mobile/bookmarkDetail/modal/BookmarkButton";
import ConfirmDeleteBookmarkModal from "@components/frontside/mobile/bookmarkDetail/modal/ConfirmDeleteBookmarkModal";
import { BookmarkStoryInterface } from "@interfaces/frontside/BookmarkInterface";
import BookmarkService from "@services/frontside/BookmarkService";
import { box, color } from "@utils/Themes";

export default function BookmarkStory({ story }: { story: BookmarkStoryInterface }) {
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const isLoading = BookmarkService.getIsLoading();
  const boxLoadingElement = getBoxLoading(isLoading);

  return (
    <>
      <Box $isLoading={isLoading}>
        {boxLoadingElement}
        <ImageBox to={`/story/${story.slug}`}>
          <ImageStory src={story.images[0].thumbnail} borderRadius="4px" />
        </ImageBox>
        <BookmarkStoryDetail story={story} />
        <BookmarkButton setIsModalShow={setIsModalShow} />
      </Box>
      <CenterModal isShow={isModalShow} setShow={setIsModalShow}>
        <ConfirmDeleteBookmarkModal storyId={story.id} storyName={story.name} setShow={setIsModalShow} />
      </CenterModal>
    </>
  );
}

const Box = styled.div<{ $isLoading: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: ${(props) => box(props).space.sm} 0;

  border-radius: ${(props) => box(props).borderRadius.md};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;
  justify-content: start;
  align-items: center;

  position: relative;
  opacity: ${(props) => (props.$isLoading ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) => color(props).surfaceContainerHigh};
  }
`;

const BoxLoading = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  transform: scale(0.4);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: ${(props) => box(props).zIndex.dropdown};
  opacity: 1;
`;

const ImageBox = styled(Link)`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 110px;
  margin: ${(props) => box(props).space.sm};
  border-radius: ${(props) => box(props).borderRadius.md};

  /* overflow: hidden; */

  aspect-ratio: calc(200 / 300);
  object-fit: cover;
`;

function getBoxLoading(isLoading: boolean) {
  if (isLoading) {
    return (
      <BoxLoading>
        <Loading />
      </BoxLoading>
    );
  }
  return null;
}

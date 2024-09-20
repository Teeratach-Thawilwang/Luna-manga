import { Link, useParams } from "react-router-dom";

import styled from "styled-components";

import ImageChapterCover from "@components/mobile/ImageChapterCover";
import Loading from "@components/mobile/Loading";
import StoryChapterListItemDetail from "@components/mobile/storyDetail/storyChapterItem/StoryChapterListItemDetail";
import { StoryChapterInterface } from "@interfaces/StoryChapterInterface";
import StoryChapterService from "@services/StoryChapterService";
import { box, color } from "@utils/Themes";

export default function StoryChapterListItem({ chapter }: { chapter: StoryChapterInterface }) {
  const { slug } = useParams();
  const isLoading = StoryChapterService.getIsLoading();
  const boxLoadingElement = getBoxLoading(isLoading);

  return (
    <Box to={`/story/${slug}/${chapter.chapter_number}`} $isLoading={isLoading}>
      {boxLoadingElement}
      <ImageBox>
        <ImageChapterCover src={chapter.cover_images[0].desktop} aspectRatio={1} />
      </ImageBox>
      <StoryChapterListItemDetail chapter={chapter} />
    </Box>
  );
}

const Box = styled(Link)<{ $isLoading: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: ${(props) => box(props).space.sm} 0;
  text-decoration: none;

  border-radius: ${(props) => box(props).borderRadius.sm};
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

const ImageBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-width: 60px;
  margin: ${(props) => box(props).space.sm};
  border-radius: ${(props) => box(props).borderRadius.md};

  overflow: hidden;
  aspect-ratio: 1;
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

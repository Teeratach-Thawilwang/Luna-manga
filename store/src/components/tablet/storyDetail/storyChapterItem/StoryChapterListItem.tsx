import { Link, useParams } from "react-router-dom";

import styled from "styled-components";

import ImageChapterCover from "@components/tablet/ImageChapterCover";
import Loading from "@components/tablet/Loading";
import StoryChapterRatingViewCount from "@components/tablet/storyDetail/storyChapterItem/StoryChapterRatingViewCount";
import { StoryChapterInterface } from "@interfaces/StoryChapterInterface";
import StoryChapterService from "@services/StoryChapterService";
import { transfromDateString } from "@utils/Helpers";
import { box, color, font } from "@utils/Themes";

export default function StoryChapterListItem({ chapter }: { chapter: StoryChapterInterface }) {
  const { slug } = useParams();
  const isLoading = StoryChapterService.getIsLoading();
  const boxLoadingElement = getBoxLoading(isLoading);

  return (
    <Box to={`/story/${slug}/${chapter.chapter_number}`} $isLoading={isLoading}>
      {boxLoadingElement}
      <ImageBox>
        <ImageChapterCover src={chapter.cover_images[0].thumbnail} aspectRatio={1} />
      </ImageBox>
      <ChapterName>{chapter.name}</ChapterName>
      <ChapterReleaseDate>{transfromDateString(chapter.release_date)}</ChapterReleaseDate>
      <StoryChapterRatingViewCount ratingScore={chapter.score} viewCount={chapter.view_count} />
    </Box>
  );
}

const Box = styled(Link)<{ $isLoading: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: ${(props) => box(props).space.sm} 0;
  text-decoration: none;

  border-radius: ${(props) => box(props).borderRadius.sm};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  opacity: ${(props) => (props.$isLoading ? 0.5 : 1)};

  &:hover {
    cursor: pointer;
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
  transform: scale(0.6);

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
  max-width: 90px;
  margin: ${(props) => box(props).space.sm};
  border-radius: ${(props) => box(props).borderRadius.md};

  overflow: hidden;
  aspect-ratio: 1;
`;

const ChapterName = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.md};

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;

  flex: 1;
`;

const ChapterReleaseDate = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100px;
  margin-left: 10px;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.md};
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

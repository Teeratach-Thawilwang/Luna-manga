import { styled } from "styled-components";

import StoryChapterRatingViewCount from "@components/frontside/mobile/storyDetail/storyChapterItem/StoryChapterRatingViewCount";
import { StoryChapterInterface } from "@interfaces/frontside/StoryChapterInterface";
import { transfromDateString } from "@utils/Helpers";
import { box, color, font } from "@utils/Themes";

export default function StoryChapterListItemDetail({ chapter }: { chapter: StoryChapterInterface }) {
  return (
    <Box>
      <Name>{chapter.name}</Name>
      <Wrap>
        <StoryChapterRatingViewCount ratingScore={chapter.score} viewCount={chapter.view_count} />
        <ReleaseDate>{transfromDateString(chapter.release_date)}</ReleaseDate>
      </Wrap>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 60px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
`;

const Name = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.sm};
  font-weight: ${(props) => font(props).weight.bold};

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
`;

const Wrap = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  margin-bottom: 0;

  display: flex;
  justify-content: start;
  align-items: center;
`;

const ReleaseDate = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: fit-content;
  margin-left: auto;
  margin-right: ${(props) => box(props).space.md};

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.xs};

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
`;

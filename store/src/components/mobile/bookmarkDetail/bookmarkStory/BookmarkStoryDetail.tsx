import { Link } from "react-router-dom";

import { styled } from "styled-components";

import BookmarkStoryRatingViewCount from "@components/mobile/bookmarkDetail/bookmarkStory/BookmarkStoryRatingViewCount";
import BookmarkStoryType from "@components/mobile/bookmarkDetail/bookmarkStory/BookmarkStoryType";
import { BookmarkStoryInterface } from "@interfaces/BookmarkInterface";
import { box, color, font } from "@utils/Themes";

export default function BookmarkStoryDetail({ story }: { story: BookmarkStoryInterface }) {
  return (
    <Box to={`/story/${story.slug}`}>
      <Name>{story.name}</Name>
      <Author>ผู้เเต่ง : {story.author.display_name}</Author>
      <BookmarkStoryType type={story.type} />
      <BookmarkStoryRatingViewCount ratingScore={story.rating_score} viewCount={story.view_count} />
    </Box>
  );
}

const Box = styled(Link)`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin: ${(props) => box(props).space.sm} auto;
  text-decoration: none;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
`;

const Name = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
`;

const Author = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.xs};

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
`;

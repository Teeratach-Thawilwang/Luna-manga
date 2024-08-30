import { Link } from "react-router-dom";

import styled from "styled-components";

import StorySeachItemType from "@components/tablet/navbar/searchBox/StorySeachItemType";
import StorySearchItemName from "@components/tablet/navbar/searchBox/StorySearchItemName";
import StorySearchItemViewCount from "@components/tablet/navbar/searchBox/StorySearchItemViewCount";
import { StorySearchInterface } from "@interfaces/StorySearchInterface";
import StorySearchService from "@services/StorySearchService";
import { box, color } from "@utils/Themes";

export default function StorySearchItem({ story }: { story: StorySearchInterface }) {
  return (
    <Box to={`/story/${story.slug}`} onClick={() => StorySearchService.clearState()}>
      <Image src={story.images[0].desktop} />
      <StorySearchItemName name={story.name} authorName={story.author.display_name} />
      <StorySearchItemViewCount ratingScore={story.rating_score} viewCount={story.view_count} />
      <StorySeachItemType type={story.type} />
    </Box>
  );
}

const Box = styled(Link)`
  /* box-sizing: border-box; */
  width: 100%;
  height: fit-content;
  text-decoration: none;

  border: 1px solid ${(props) => color(props).outlineVariant};
  border-top: 0;
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;

  &:first-child {
    border-top: 1px solid ${(props) => color(props).outlineVariant};
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => color(props).surfaceContainerHigh};
  }
`;

const Image = styled.img`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100px;
  margin: ${(props) => box(props).space.sm};
  border-radius: ${(props) => box(props).borderRadius.md};

  aspect-ratio: calc(200 / 300);

  object-fit: cover;
`;

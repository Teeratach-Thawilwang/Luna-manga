import { Link } from "react-router-dom";

import styled from "styled-components";

import StorySeachItemType from "@components/frontside/mobile/navbar/searchBox/StorySeachItemType";
import StorySearchItemName from "@components/frontside/mobile/navbar/searchBox/StorySearchItemName";
import { StorySearchInterface } from "@interfaces/frontside/StorySearchInterface";
import StorySearchService from "@services/frontside/StorySearchService";
import { box, color } from "@utils/Themes";

export default function StorySearchItem({ story }: { story: StorySearchInterface }) {
  return (
    <Box to={`/story/${story.slug}`} onClick={() => StorySearchService.clearState()}>
      <Image src={story.images[0].mobile} />
      <StorySearchItemName story={story} />
      <StorySeachItemType type={story.type} />
    </Box>
  );
}

const Box = styled(Link)`
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  margin-top: ${(props) => box(props).space.sm};
  text-decoration: none;

  border-radius: ${(props) => box(props).borderRadius.md};
  border: 1px solid ${(props) => color(props).outlineVariant};
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
  height: 80px;
  margin: ${(props) => box(props).space.sm};
  border-radius: ${(props) => box(props).borderRadius.md};

  aspect-ratio: calc(200 / 300);

  object-fit: cover;
`;

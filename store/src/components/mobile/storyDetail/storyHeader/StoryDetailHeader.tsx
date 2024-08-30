import styled from "styled-components";

import StoryHeaderDescription from "@components/mobile/storyDetail/storyHeader/StoryHeaderDescription";
import StoryHeaderRatingViewCount from "@components/mobile/storyDetail/storyHeader/StoryHeaderRatingViewCount";
import StoryImageOptional from "@components/mobile/storyDetail/storyHeader/StoryImageOptional";
import StoryService from "@services/StoryService";
import { box, color, font } from "@utils/Themes";

export default function StoryDetailHeader() {
  const story = StoryService.getStory();

  return (
    <Box>
      <StoryImageOptional />
      <Title>{story!.name}</Title>
      <Author>ผู้แต่ง: {story!.author.display_name}</Author>
      <StoryHeaderRatingViewCount ratingScore={story!.reaction.rating_score} viewCount={story!.view_count} />
      <StoryHeaderDescription {...story!} />
    </Box>
  );
}

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.lg};

  border-radius: ${(props) => box(props).space.sm};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.md};
  margin-bottom: ${(props) => box(props).space.sm};
  padding: 0 ${(props) => box(props).space.md};

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};
  text-align: center;
  word-wrap: break-word;
`;

const Author = styled.div`
  /* border: 1px solid green; */
  box-sizing: border-box;

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.sm};
  font-weight: ${(props) => font(props).weight.regular};
`;

import styled from "styled-components";

import BoxLoading from "@components/tablet/BoxLoading";
import WidgetItem from "@components/tablet/WidgetItem";
import StoryChapterContent from "@components/tablet/storyDetail/StoryChapterContent";
import StoryDetailHeader from "@components/tablet/storyDetail/storyHeader/StoryDetailHeader";
import { WidgetTypeEnum } from "@enums/WidgetTypeEnum";
import StoryChapterService from "@services/StoryChapterService";
import StoryService from "@services/StoryService";
import WidgetOnPageService from "@services/WidgetOnPageService";
import { box } from "@utils/Themes";

export default function Detail() {
  const isStoryLoading = !StoryService.getStoryIsLoaded();
  const isStoryChapterLoading = !StoryChapterService.getStoryChapterIsLoaded();
  const isWidgetOnPageLoading = !WidgetOnPageService.getIsLoaded();

  if (isStoryLoading || isStoryChapterLoading || isWidgetOnPageLoading) {
    return (
      <Box>
        <BoxLoading />
      </Box>
    );
  }

  return (
    <Box>
      <WidgetItem type={WidgetTypeEnum.ADVERTISEMENT_GROUP} />
      <StoryDetailHeader />
      <StoryChapterContent />
      <WidgetItem type={WidgetTypeEnum.STORY_LIST} />
      <WidgetItem type={WidgetTypeEnum.ADVERTISEMENT_MEDIUM} />
      <WidgetItem type={WidgetTypeEnum.ADVERTISEMENT_SMALL} />
      <WidgetItem type={WidgetTypeEnum.STORY_WINDOW} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin: ${(props) => box(props).space.xxl} 0;
  padding: 0 10px;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  user-select: text;
`;

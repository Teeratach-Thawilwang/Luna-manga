import styled from "styled-components";

import BoxLoading from "@components/frontside/tablet/BoxLoading";
import WidgetItem from "@components/frontside/tablet/WidgetItem";
import StoryChapterContent from "@components/frontside/tablet/storyDetail/StoryChapterContent";
import StoryDetailHeader from "@components/frontside/tablet/storyDetail/storyHeader/StoryDetailHeader";
import { WidgetTypeEnum } from "@enums/frontside/WidgetTypeEnum";
import StoryChapterService from "@services/frontside/StoryChapterService";
import StoryService from "@services/frontside/StoryService";
import WidgetOnPageService from "@services/frontside/WidgetOnPageService";
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

import styled from "styled-components";

import BoxLoading from "@components/frontside/mobile/BoxLoading";
import Logo from "@components/frontside/mobile/Logo";
import WidgetItem from "@components/frontside/mobile/WidgetItem";
import StoryChapterContent from "@components/frontside/mobile/storyDetail/StoryChapterContent";
import StoryDetailHeader from "@components/frontside/mobile/storyDetail/storyHeader/StoryDetailHeader";
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
        <Logo />
        <BoxLoading />
      </Box>
    );
  }

  return (
    <Box>
      <Logo />
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
  margin-top: 0;
  margin-bottom: ${(props) => box(props).space.xxl};
  padding: 0 5px;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  user-select: text;
`;

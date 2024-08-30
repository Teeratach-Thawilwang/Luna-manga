import styled from "styled-components";

import BoxLoading from "@components/tablet/BoxLoading";
import Loading from "@components/tablet/Loading";
import WidgetTypeAdvertisementGroup from "@components/tablet/widget/WidgetTypeAdvertisementGroup";
import WidgetTypeAdvertisementMedium from "@components/tablet/widget/WidgetTypeAdvertisementMedium";
import WidgetTypeAdvertisementSmall from "@components/tablet/widget/WidgetTypeAdvertisementSmall";
import WidgetTypeChapterGroup from "@components/tablet/widget/WidgetTypeChapterGroup";
import WidgetTypeStoryList from "@components/tablet/widget/WidgetTypeStoryList";
import WidgetTypeStoryWindow from "@components/tablet/widget/WidgetTypeStoryWindow";
import { WidgetTypeEnum } from "@enums/WidgetTypeEnum";
import { WidgetInterface, WidgetStateInterface } from "@interfaces/WidgetInterface";
import WidgetService from "@services/WidgetService";
import { box } from "@utils/Themes";

export default function Detail() {
  const widgets = WidgetService.getWidgets();
  const isLoading = WidgetService.getIsLoading();
  const widgetElements = widgetManager(widgets);
  const seeMoreLoading = seeMoreLoadingElement(isLoading, widgets.length);

  return (
    <Box>
      {widgetElements}
      {seeMoreLoading}
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
`;

const SeeMoreBoxLoading = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  height: 200px;
  margin-top: ${(props) => box(props).space.xxl};

  display: flex;
  justify-content: center;
  align-items: center;
`;

function widgetManager(widgets: WidgetStateInterface[]) {
  if (widgets.length === 0) {
    return <BoxLoading />;
  }
  return widgets.map((widgetState: WidgetStateInterface) => {
    const widget: WidgetInterface = widgetState.data;

    switch (widget.type) {
      case WidgetTypeEnum.ADVERTISEMENT_GROUP:
        return <WidgetTypeAdvertisementGroup {...widget} key={widget.id} />;
      case WidgetTypeEnum.ADVERTISEMENT_MEDIUM:
        return <WidgetTypeAdvertisementMedium {...widget} key={widget.id} />;
      case WidgetTypeEnum.ADVERTISEMENT_SMALL:
        return <WidgetTypeAdvertisementSmall {...widget} key={widget.id} />;
      case WidgetTypeEnum.STORY_LIST:
        return <WidgetTypeStoryList {...widget} key={widget.id} />;
      case WidgetTypeEnum.STORY_WINDOW:
        return <WidgetTypeStoryWindow {...widget} key={widget.id} />;
      case WidgetTypeEnum.CHAPTER_GROUP:
        return <WidgetTypeChapterGroup {...widget} key={widget.id} />;
    }
  });
}

function seeMoreLoadingElement(isLoading: boolean, widgetsLength: number) {
  const isShowSeeMoreLoading = isLoading && widgetsLength > 0;

  if (isShowSeeMoreLoading) {
    return (
      <SeeMoreBoxLoading>
        <Loading />
      </SeeMoreBoxLoading>
    );
  }
  return null;
}

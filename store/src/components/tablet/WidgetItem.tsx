import React from "react";

import styled from "styled-components";

import WidgetTypeAdvertisementGroup from "@components/tablet/widget/WidgetTypeAdvertisementGroup";
import WidgetTypeAdvertisementMedium from "@components/tablet/widget/WidgetTypeAdvertisementMedium";
import WidgetTypeAdvertisementSmall from "@components/tablet/widget/WidgetTypeAdvertisementSmall";
import WidgetTypeStoryList from "@components/tablet/widget/WidgetTypeStoryList";
import WidgetTypeStoryWindow from "@components/tablet/widget/WidgetTypeStoryWindow";
import { WidgetTypeEnum } from "@enums/WidgetTypeEnum";
import { WidgetInterface } from "@interfaces/WidgetInterface";
import WidgetOnPageService from "@services/WidgetOnPageService";

export default React.memo(function WidgetItem({ type }: { type: WidgetTypeEnum }) {
  const widget = WidgetOnPageService.getWidgetByType(type);
  if (widget == null) {
    return null;
  }
  return <Box>{createWidgetItem(type, widget)}</Box>;
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
`;

function createWidgetItem(type: WidgetTypeEnum, widget: WidgetInterface): JSX.Element {
  switch (type) {
    case WidgetTypeEnum.ADVERTISEMENT_GROUP:
      return <WidgetTypeAdvertisementGroup {...widget} />;
    case WidgetTypeEnum.ADVERTISEMENT_MEDIUM:
      return <WidgetTypeAdvertisementMedium {...widget} />;
    case WidgetTypeEnum.ADVERTISEMENT_SMALL:
      return <WidgetTypeAdvertisementSmall {...widget} />;
    case WidgetTypeEnum.STORY_LIST:
      return <WidgetTypeStoryList {...widget} />;
    case WidgetTypeEnum.STORY_WINDOW:
      return <WidgetTypeStoryWindow {...widget} />;
    default:
      return <></>;
  }
}

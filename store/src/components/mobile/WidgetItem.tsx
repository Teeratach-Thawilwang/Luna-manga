import React from "react";

import styled from "styled-components";

import WidgetTypeAdvertisementGroup from "@components/mobile/widget/WidgetTypeAdvertisementGroup";
import WidgetTypeAdvertisementMedium from "@components/mobile/widget/WidgetTypeAdvertisementMedium";
import WidgetTypeAdvertisementSmall from "@components/mobile/widget/WidgetTypeAdvertisementSmall";
import WidgetTypeStoryList from "@components/mobile/widget/WidgetTypeStoryList";
import WidgetTypeStoryWindow from "@components/mobile/widget/WidgetTypeStoryWindow";
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
`;

function createWidgetItem(type: WidgetTypeEnum, widget: WidgetInterface) {
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

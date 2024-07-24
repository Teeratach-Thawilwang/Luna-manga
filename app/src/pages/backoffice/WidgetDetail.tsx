import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/widgetDetail/Detail";
import { GroupSettingEnum, GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import BannerListService from "@services/backoffice/BannerListService";
import WidgetCreateEditService from "@services/backoffice/WidgetCreateEditService";
import WidgetService from "@services/backoffice/WidgetService";
import { navigateTo } from "@utils/Helpers";

export default function WidgetDetail() {
  // console.log("In WidgetDetail");
  document.title = "Backoffice Luna: Widget Detail";
  const { id: widgetId } = useParams();
  const id = getWidgetId(widgetId);

  useEffect(() => {
    WidgetService.loadShow(id);
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      WidgetService.clearState();
      BannerListService.clearState();
      WidgetCreateEditService.clearState();
    };
  }, []);

  return (
    <Box>
      <SideBarLeft groupSetting={GroupSettingEnum.WIDGET_LIST} />
      <ContentWrap>
        <Detail />
      </ContentWrap>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 250px auto;
  background-color: #f4f6f8;

  min-height: 100vh;
  overflow-x: auto;
`;

const ContentWrap = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  background-color: #e4e8ed;
`;

function getWidgetId(id: string | undefined): number {
  const isValid = /^-?\d+$/.test(id ?? "");
  if (!isValid) {
    navigateTo(GroupSettingUrlEnum.WIDGET_LIST);
  }
  return Number(id);
}

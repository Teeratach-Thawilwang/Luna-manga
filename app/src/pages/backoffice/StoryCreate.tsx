﻿import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/storyCreate/Detail";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import StoryCreateEditService from "@services/backoffice/StoryCreateEditService";
import { navigateTo } from "@utils/Helpers";

export default function StoryCreate() {
  // console.log("In StoryCreate");
  const { type: slug } = useParams();
  const type = slug! as CategoryTypeEnum;
  const title = getTitleType(type!);
  document.title = `Luna: ${title} Create`;
  const groupSetting = createGroupSetting(type!);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      StoryCreateEditService.clearState();
    };
  }, []);

  return (
    <Box>
      <SideBarLeft groupSetting={groupSetting!} />
      <ContentWrap>
        <Detail title={title} />
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

function createGroupSetting(type: string) {
  switch (type) {
    case CategoryTypeEnum.MANGA:
      return GroupSettingEnum.MANGA;
    case CategoryTypeEnum.NOVEL:
      return GroupSettingEnum.NOVEL;
    default:
      navigateTo(`/backoffice`);
      break;
  }
}

function getTitleType(type: string): string {
  if (type == CategoryTypeEnum.MANGA) {
    return "Manga";
  }

  if (type == CategoryTypeEnum.NOVEL) {
    return "Novel";
  }

  return "Chapter";
}

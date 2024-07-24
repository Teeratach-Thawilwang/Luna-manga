import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/chapterCreate/Detail";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import ChapterCreateEditService from "@services/backoffice/ChapterCreateEditService";
import { navigateTo } from "@utils/Helpers";

export default function ChapterCreate() {
  // console.log("In ChapterCreate");
  document.title = "Backoffice Luna: Chapter Create";
  const { type } = useParams();
  const groupSetting = createGroupSetting(type!);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      ChapterCreateEditService.clearState();
    };
  }, []);

  return (
    <Box>
      <SideBarLeft groupSetting={groupSetting!} />
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

function createGroupSetting(type: string) {
  switch (type) {
    case CategoryTypeEnum.MANGA:
      return GroupSettingEnum.CHAPTER_MANGA;
    case CategoryTypeEnum.NOVEL:
      return GroupSettingEnum.CHAPTER_NOVEL;
    default:
      navigateTo(`/backoffice`);
      break;
  }
}

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/chapterList/Detail";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import ChapterListService from "@services/backoffice/ChapterListService";
import { navigateTo } from "@utils/Helpers";

export default function ChapterList() {
  // console.log("In ChapterList");
  const { type } = useParams();
  const groupSetting = createGroupSetting(type!);
  document.title = "Backoffice Luna: Chapter List";

  useEffect(() => {
    ChapterListService.loadChapterList(undefined, undefined, undefined, undefined, type as CategoryTypeEnum, 1, undefined);
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      ChapterListService.clearState();
    };
  }, []);

  useEffect(() => {
    ChapterListService.loadChapterList(undefined, undefined, undefined, undefined, type as CategoryTypeEnum, 1, undefined);
    window.scroll({ top: 0, behavior: "auto" });
  }, [type]);

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

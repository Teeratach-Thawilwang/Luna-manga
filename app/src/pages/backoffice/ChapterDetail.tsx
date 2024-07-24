import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/chapterDetail/Detail";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import ChapterCreateEditService from "@services/backoffice/ChapterCreateEditService";
import ChapterService from "@services/backoffice/ChapterService";

export default function ChapterDetail() {
  // console.log("In ChapterDetail");
  document.title = "Backoffice Luna: Chapter Detail";
  const { id } = useParams();
  const type = ChapterService.getChapterType();
  const groupSetting = createGroupSetting(type);

  useEffect(() => {
    ChapterService.loadShow(Number(id));
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      ChapterService.clearState();
      ChapterCreateEditService.clearState();
    };
  }, []);

  return (
    <Box>
      <SideBarLeft groupSetting={groupSetting ?? GroupSettingEnum.CHAPTER_MANGA} />
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

function createGroupSetting(type: CategoryTypeEnum | null) {
  switch (type) {
    case CategoryTypeEnum.MANGA:
      return GroupSettingEnum.CHAPTER_MANGA;
    case CategoryTypeEnum.NOVEL:
      return GroupSettingEnum.CHAPTER_NOVEL;
    default:
      return null;
  }
}

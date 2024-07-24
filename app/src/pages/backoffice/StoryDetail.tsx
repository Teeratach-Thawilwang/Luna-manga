import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/storyDetail/Detail";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import CategoryListService from "@services/backoffice/CategoryListService";
import StoryCreateEditService from "@services/backoffice/StoryCreateEditService";
import StoryService from "@services/backoffice/StoryService";

export default function StoryDetail() {
  // console.log("In StoryDetail");
  document.title = "Backoffice Luna: Story Detail";
  const { id } = useParams();
  const type = StoryService.getStoryType();
  const groupSetting = createGroupSetting(type);

  useEffect(() => {
    StoryService.loadShow(Number(id));
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      StoryService.clearState();
      StoryCreateEditService.clearState();
      CategoryListService.clearState();
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

function createGroupSetting(type: CategoryTypeEnum | null) {
  switch (type) {
    case CategoryTypeEnum.MANGA:
      return GroupSettingEnum.MANGA;
    case CategoryTypeEnum.NOVEL:
      return GroupSettingEnum.NOVEL;
    default:
      return null;
  }
}

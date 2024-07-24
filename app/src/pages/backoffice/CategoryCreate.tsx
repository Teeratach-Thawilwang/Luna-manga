import { useEffect } from "react";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/categoryCreate/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import CategoryCreateEditService from "@services/backoffice/CategoryCreateEditService";

export default function CategoryCreate() {
  // console.log("In CategoryCreate");
  document.title = "Backoffice Luna: Category Create";

  useEffect(() => {
    window.scroll({ top: 0, behavior: "auto" });

    return () => {
      CategoryCreateEditService.clearState();
    };
  }, []);

  return (
    <Box>
      <SideBarLeft groupSetting={GroupSettingEnum.CATEGORY} />
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

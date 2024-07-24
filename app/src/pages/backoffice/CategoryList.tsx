import { useEffect } from "react";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/categoryList/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import CategoryListService from "@services/backoffice/CategoryListService";

export default function CategoryList() {
  // console.log("In CategoryList");
  document.title = "Backoffice Luna: Category List";

  useEffect(() => {
    CategoryListService.loadCategoryList();
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      CategoryListService.clearState();
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

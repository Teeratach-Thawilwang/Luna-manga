import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/categoryDetail/Detail";
import { GroupSettingEnum, GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import CategoryCreateEditService from "@services/backoffice/CategoryCreateEditService";
import CategoryService from "@services/backoffice/CategoryService";
import { navigateTo } from "@utils/Helpers";

export default function CategoryDetail() {
  // console.log("In CategoryDetail");
  document.title = "Backoffice Luna: Category Detail";
  const { id: categoryId } = useParams();
  const id = getCategoryId(categoryId);

  useEffect(() => {
    CategoryService.loadShow(id);
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      CategoryService.clearState();
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

function getCategoryId(id: string | undefined): number {
  const isValid = /^-?\d+$/.test(id ?? "");
  if (!isValid) {
    navigateTo(GroupSettingUrlEnum.CATEGORY);
  }
  return Number(id);
}

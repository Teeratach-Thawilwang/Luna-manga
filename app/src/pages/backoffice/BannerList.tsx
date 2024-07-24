import { useEffect } from "react";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/bannerList/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import BannerListService from "@services/backoffice/BannerListService";

export default function BannerList() {
  // console.log("In BannerList");
  document.title = "Backoffice Luna: Banner List";

  useEffect(() => {
    BannerListService.loadBannerList();
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      BannerListService.clearState();
    };
  }, []);

  return (
    <Box>
      <SideBarLeft groupSetting={GroupSettingEnum.BANNER} />
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

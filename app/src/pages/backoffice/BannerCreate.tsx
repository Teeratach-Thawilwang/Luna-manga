import { useEffect } from "react";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/bannerCreate/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import BannerCreateEditService from "@services/backoffice/BannerCreateEditService";
import BannerService from "@services/backoffice/BannerService";

export default function BannerCreate() {
  // console.log("In BannerCreate");
  document.title = "Backoffice Luna: Banner Create";

  useEffect(() => {
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      BannerService.clearState();
      BannerCreateEditService.clearState();
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

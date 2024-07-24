import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/bannerDetail/Detail";
import { GroupSettingEnum, GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import BannerCreateEditService from "@services/backoffice/BannerCreateEditService";
import BannerService from "@services/backoffice/BannerService";
import { navigateTo } from "@utils/Helpers";

export default function BannerDetail() {
  // console.log("In BannerDetail");
  document.title = "Backoffice Luna: Banner Detail";
  const { id: bannerId } = useParams();
  const id = getBannerId(bannerId);

  useEffect(() => {
    BannerService.loadShow(id);
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

function getBannerId(id: string | undefined): number {
  const isValid = /^-?\d+$/.test(id ?? "");
  if (!isValid) {
    navigateTo(GroupSettingUrlEnum.BANNER);
  }
  return Number(id);
}

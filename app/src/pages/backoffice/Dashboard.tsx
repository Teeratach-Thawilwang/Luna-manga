import { useEffect } from "react";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/dashboard/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import DashboardService from "@services/backoffice/DashboardService";

export default function Dashboard() {
  // console.log("In Dashboard");
  document.title = "Backoffice Luna: Backoffice";

  useEffect(() => {
    DashboardService.loadDashboard();
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      DashboardService.clearState();
    };
  }, []);

  return (
    <Box>
      <SideBarLeft groupSetting={GroupSettingEnum.DASHBOARD} />
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

import { useEffect } from "react";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/customerReportList/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import CustomerReportListService from "@services/backoffice/CustomerReportListService";

export default function CustomerReportList() {
  // console.log("In CustomerReportList");
  document.title = "Backoffice Luna: Customer Report List";

  useEffect(() => {
    CustomerReportListService.loadCustomerReportList();
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      CustomerReportListService.clearState();
    };
  }, []);

  return (
    <Box>
      <SideBarLeft groupSetting={GroupSettingEnum.CUSTOMER_REPORT} />
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

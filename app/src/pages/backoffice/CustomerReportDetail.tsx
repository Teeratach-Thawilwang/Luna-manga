import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/customerReportDetail/Detail";
import { GroupSettingEnum, GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import CustomerReportService from "@services/backoffice/CustomerReportService";
import { navigateTo } from "@utils/Helpers";

export default function CustomerReportDetail() {
  // console.log("In CustomerReportDetail");
  document.title = "Backoffice Luna: Customer Report Detail";
  const { id: customerReportId } = useParams();
  const id = getCustomerReportId(customerReportId);

  useEffect(() => {
    CustomerReportService.loadShow(id);
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      CustomerReportService.clearState();
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

function getCustomerReportId(id: string | undefined): number {
  const isValid = /^-?\d+$/.test(id ?? "");
  if (!isValid) {
    navigateTo(GroupSettingUrlEnum.CUSTOMER_REPORT);
  }
  return Number(id);
}

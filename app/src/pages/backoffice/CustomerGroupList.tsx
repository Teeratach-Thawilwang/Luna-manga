import { useEffect } from "react";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/customerGroupList/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import CustomerGroupListService from "@services/backoffice/CustomerGroupListService";

export default function CustomerGroupList() {
  // console.log("In CustomerGroupList");
  document.title = "Backoffice Luna: Customer Group List";

  useEffect(() => {
    CustomerGroupListService.loadCustomerGroupList();
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      CustomerGroupListService.clearState();
    };
  }, []);

  return (
    <Box>
      <SideBarLeft groupSetting={GroupSettingEnum.CUSTOMER_GROUP} />
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

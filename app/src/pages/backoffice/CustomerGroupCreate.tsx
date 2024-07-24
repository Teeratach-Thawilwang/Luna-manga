import { useEffect } from "react";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/customerGroupCreate/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import CustomerGroupCreateEditService from "@services/backoffice/CustomerGroupCreateEditService";

export default function CustomerGroupCreate() {
  // console.log("In CustomerGroupCreate");
  document.title = "Backoffice Luna: Customer Group Create";

  useEffect(() => {
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      CustomerGroupCreateEditService.clearState();
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

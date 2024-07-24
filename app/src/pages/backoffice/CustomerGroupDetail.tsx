import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/customerGroupDetail/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import CustomerGroupCreateEditService from "@services/backoffice/CustomerGroupCreateEditService";
import CustomerGroupService from "@services/backoffice/CustomerGroupService";

export default function CustomerGroupDetail() {
  // console.log("In CustomerGroupDetail");
  document.title = "Backoffice Luna: Customer Group Detail";
  const { id } = useParams();

  useEffect(() => {
    CustomerGroupService.loadShow(Number(id));
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      CustomerGroupService.clearState();
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

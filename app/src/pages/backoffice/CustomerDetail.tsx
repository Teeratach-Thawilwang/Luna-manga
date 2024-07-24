import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/customerDetail/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import CustomerEditService from "@services/backoffice/CustomerEditService";
import CustomerGroupListService from "@services/backoffice/CustomerGroupListService";
import CustomerService from "@services/backoffice/CustomerService";

export default function CustomerDetail() {
  // console.log("In CustomerDetail");
  document.title = "Backoffice Luna: Customer Detail";
  const { id } = useParams();

  useEffect(() => {
    CustomerService.loadShow(Number(id));
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      CustomerService.clearState();
      CustomerEditService.clearState();
      CustomerGroupListService.clearState();
    };
  }, []);

  return (
    <Box>
      <SideBarLeft groupSetting={GroupSettingEnum.CUSTOMER_LIST} />
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

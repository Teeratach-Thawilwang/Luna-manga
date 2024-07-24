import { useEffect } from "react";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/userRoleList/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import UserRoleListService from "@services/backoffice/UserRoleListService";

export default function UserRoleList() {
  // console.log("In UserRoleList");
  document.title = "Backoffice Luna: User Role List";

  useEffect(() => {
    UserRoleListService.loadUserRoleList();
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      UserRoleListService.clearState();
    };
  }, []);

  return (
    <Box>
      <SideBarLeft groupSetting={GroupSettingEnum.USER_ROLE} />
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

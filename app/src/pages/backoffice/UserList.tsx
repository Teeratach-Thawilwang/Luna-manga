import { useEffect } from "react";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/userList/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import UserListService from "@services/backoffice/UserListService";

export default function UserList() {
  // console.log("In UserList");
  document.title = "Backoffice Luna: User List";

  useEffect(() => {
    UserListService.loadUserList();
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      UserListService.clearState();
    };
  }, []);

  return (
    <Box>
      <SideBarLeft groupSetting={GroupSettingEnum.USER_LIST} />
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

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/userRoleDetail/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import PermissionListService from "@services/backoffice/PermissionListService";
import UserRoleCreateEditService from "@services/backoffice/UserRoleCreateEditService";
import UserRoleService from "@services/backoffice/UserRoleService";

export default function UserRoleDetail() {
  // console.log("In UserRoleDetail");
  document.title = "Backoffice Luna: User Role Detail";
  const { id } = useParams();

  useEffect(() => {
    UserRoleService.loadShow(Number(id));
    PermissionListService.loadPermissionList();
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      UserRoleService.clearState();
      PermissionListService.clearState();
      UserRoleCreateEditService.clearState();
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

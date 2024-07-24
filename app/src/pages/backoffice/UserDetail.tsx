import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import SideBarLeft from "@components/backoffice/SideBarLeft";
import Detail from "@components/backoffice/userDetail/Detail";
import { GroupSettingEnum } from "@enums/backoffice/GroupSettingEnum";
import UserCreateEditService from "@services/backoffice/UserCreateEditService";
import UserService from "@services/backoffice/UserService";

export default function UserDetail() {
  // console.log("In UserDetail");
  document.title = "Backoffice Luna: User Detail";
  const { id } = useParams();

  useEffect(() => {
    UserService.loadShow(Number(id));
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      UserService.clearState();
      UserCreateEditService.clearState();
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

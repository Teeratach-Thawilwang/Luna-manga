import styled from "styled-components";

import Header from "@components/backoffice/Header";
import Loading from "@components/backoffice/Loading";
import FooterControl from "@components/backoffice/userRoleDetail/FooterControl";
import InputDescription from "@components/backoffice/userRoleForm/InputDescription";
import InputName from "@components/backoffice/userRoleForm/InputName";
import InputPermisisons from "@components/backoffice/userRoleForm/InputPermisisons";
import InputUsers from "@components/backoffice/userRoleForm/InputUsers";
import PermissionListService from "@services/backoffice/PermissionListService";
import UserRoleService from "@services/backoffice/UserRoleService";

export default function Detail() {
  const userRole = UserRoleService.getUserRole();
  const isPermissionLoading = !PermissionListService.getIsLoaded();

  if (userRole == null || isPermissionLoading) {
    return (
      <Box>
        <Header headerTitle="User Role Detail" />
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      </Box>
    );
  }

  return (
    <Box>
      <Header headerTitle="User Role Detail" />
      <Content>
        <InputName initial={userRole.name} />
        <InputDescription initial={userRole.description} />
        <InputPermisisons initial={userRole.permissions} />
        <InputUsers initial={userRole.users} />
      </Content>
      <Space />
      <FooterControl />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  min-width: 750px;

  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BoxLoading = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  flex-grow: 1;
  /* min-height: calc(100vh - 60px - 150px); */

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.form`
  /* border: 1px solid red; */
  box-sizing: border-box;
  /* min-width: 750px; */

  margin: 20px 20px 20px 20px;
`;

const Space = styled.div`
  flex-grow: 1;
  margin: auto 0 auto 0;
`;

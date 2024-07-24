import styled from "styled-components";

import Header from "@components/backoffice/Header";
import Loading from "@components/backoffice/Loading";
import FooterControl from "@components/backoffice/userRoleCreate/FooterControl";
import InputDescription from "@components/backoffice/userRoleForm/InputDescription";
import InputName from "@components/backoffice/userRoleForm/InputName";
import InputPermisisons from "@components/backoffice/userRoleForm/InputPermisisons";
import InputUsers from "@components/backoffice/userRoleForm/InputUsers";
import PermissionListService from "@services/backoffice/PermissionListService";

export default function Detail() {
  const isPermissionLoading = !PermissionListService.getIsLoaded();

  if (isPermissionLoading) {
    return (
      <Box>
        <Header headerTitle="User Role Create" />
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      </Box>
    );
  }

  return (
    <Box>
      <Header headerTitle="User Role Create" />
      <Content>
        <InputName />
        <InputDescription />
        <InputPermisisons />
        <InputUsers />
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

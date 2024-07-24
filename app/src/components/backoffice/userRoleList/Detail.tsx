import styled from "styled-components";

import Header from "@components/backoffice/Header";
import UserRoleFilter from "@components/backoffice/userRoleList/UserRoleFilter";
import UserRoleTable from "@components/backoffice/userRoleList/UserRoleTable";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="User Role List" />
      <Content>
        <UserRoleFilter />
        <UserRoleTable />
      </Content>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  min-width: 750px;
`;

const Content = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  /* min-width: 750px; */

  margin: 20px 20px 20px 20px;
`;

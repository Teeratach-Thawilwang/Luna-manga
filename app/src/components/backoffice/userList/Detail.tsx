import styled from "styled-components";

import Header from "@components/backoffice/Header";
import UserFilter from "@components/backoffice/userList/UserFilter";
import UserTable from "@components/backoffice/userList/UserTable";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="User List" />
      <Content>
        <UserFilter />
        <UserTable />
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

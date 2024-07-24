import { useEffect } from "react";

import styled from "styled-components";

import UserSearchBox from "@components/backoffice/userRoleForm/UserSearchBox";
import UserTable from "@components/backoffice/userRoleForm/UserTable";
import { UserListInterface } from "@interfaces/backoffice/UserInterface";
import UserRoleCreateEditService from "@services/backoffice/UserRoleCreateEditService";

export default function InputUsers({ initial }: { initial?: UserListInterface[] }) {
  useEffect(() => {
    if (initial) {
      UserRoleCreateEditService.update({ users: initial });
    }
  }, []);

  return (
    <Box>
      <Title>Users</Title>
      <UserSearchBox />
      <UserTable />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  margin-top: 20px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 50px;
  font-weight: 500;
  font-size: 20px;
  color: #505050;

  display: flex;
  align-items: center;
`;

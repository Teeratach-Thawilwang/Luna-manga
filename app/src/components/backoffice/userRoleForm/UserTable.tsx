import styled from "styled-components";

import TrashIcon from "@components/iconSvg/TrashIcon";
import { UserListInterface } from "@interfaces/backoffice/UserInterface";
import UserRoleCreateEditService from "@services/backoffice/UserRoleCreateEditService";
import { transformBgColorStatus, transformStatus } from "@utils/Helpers";

export default function UserTable() {
  const users = UserRoleCreateEditService.getter<UserListInterface[]>("users");

  function onDelete(userId: number) {
    const newUsers = users.filter((user) => user.id != userId);
    UserRoleCreateEditService.update({ users: newUsers });
  }

  if (users.length <= 0) {
    return null;
  }

  return (
    <Box>
      <Table>
        <thead>
          <tr>
            <Th>Id</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th></Th>
          </tr>
        </thead>
        <Tbody>
          {users.map((user, key) => (
            <tr key={key}>
              <Td>{user.id}</Td>
              <Td>{user.email}</Td>
              <Td>
                <StatusBox $bgcolor={transformBgColorStatus(user.status)}>{transformStatus(user.status)}</StatusBox>
              </Td>
              <Td>
                <div>
                  <IconBox onClick={() => onDelete(user.id)}>
                    <TrashIcon />
                  </IconBox>
                </div>
              </Td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  margin: 20px 0 0 0;

  position: relative;
  z-index: 1;
`;

const Table = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th`
  border: 1px solid #424b51;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  height: 40px;

  font-size: 16px;
  text-align: center;
  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;

  color: #fff;
  background-color: #424b51;
`;

const Td = styled.td`
  /* border: 1px solid #d5d5d5; */
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  height: 50px;
  max-width: 200px;

  font-size: 16px;
  text-align: center;
  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;

  color: #000000;
  background-color: #ffffff;
`;

const Tbody = styled.tbody`
  tr {
    border: 1px solid rgba(0, 0, 0, 0.1);

    &:hover {
      /* cursor: pointer; */

      td {
        background-color: #f3f3f3;
      }
    }
  }

  td:nth-child(1) {
    div {
      display: flex;
      justify-content: start;
      align-items: center;
      color: #000;

      span {
        margin-left: 10px;
      }
    }
  }

  td:nth-last-child(1) {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  :nth-child(2),
  :nth-last-child(1),
  :nth-last-child(2) {
    text-align: left;
  }
`;

const StatusBox = styled.div<{ $bgcolor: string }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: 3px;
  height: 30px;
  padding-left: 5px;
  padding-right: 5px;

  font-size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #ffffff;
  background-color: ${(props) => props.$bgcolor};
`;

const IconBox = styled.div`
  /* border: 1px solid red; */
  width: 20px;
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    /* border: 1px solid red; */
    width: 100%;
    height: 100%;
  }

  &:hover {
    cursor: pointer;
  }
`;

import styled from "styled-components";

import { UserListInterface } from "@interfaces/backoffice/UserInterface";
import UserListService from "@services/backoffice/UserListService";
import UserRoleCreateEditService from "@services/backoffice/UserRoleCreateEditService";
import { transformBgColorStatus, transformStatus } from "@utils/Helpers";

export default function UserSearchListItem() {
  const userSearch = UserListService.getData();
  const users = UserRoleCreateEditService.getter<UserListInterface[]>("users");

  function onAddStory(user: UserListInterface) {
    const isUserExist = users.some((item) => item.id == user.id);
    if (!isUserExist) {
      const newUsers = Array.from(users);
      newUsers.push(user);
      UserRoleCreateEditService.update({ users: newUsers });
    }
    UserListService.deleteById(user.id);
  }

  return (
    <Table>
      <Tbody>
        {userSearch.map((user, key) => {
          return (
            <tr key={key}>
              <Td>
                <div>{user.id}</div>
              </Td>
              <Td>{user.email}</Td>
              <Td>
                <StatusBox $bgcolor={transformBgColorStatus(user.status)}>{transformStatus(user.status)}</StatusBox>
              </Td>
              <Td>
                <AddButton onClick={() => onAddStory(user)}>+</AddButton>
              </Td>
            </tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

const Table = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;
`;

const Tbody = styled.tbody`
  tr {
    /* border: 1px solid rgba(0, 0, 0, 0.1); */

    &:hover {
      td {
        background-color: #f3f3f3;
      }
    }
  }

  td:nth-child(1) {
    div {
      display: flex;
      justify-content: center;
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

const AddButton = styled.div`
  box-sizing: border-box;
  border-radius: 100%;
  height: 25px;
  width: 25px;

  color: #ffffff;
  background-color: #3ba539;
  font-size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #5dc85b;
  }

  &:active {
    cursor: pointer;
    background-color: #3ba539;
  }
`;

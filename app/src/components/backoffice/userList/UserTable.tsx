import { MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import Loading from "@components/backoffice/Loading";
import UserListPagination from "@components/backoffice/userList/UserListPagination";
import UserListService from "@services/backoffice/UserListService";
import { transformBgColorStatus, transformStatus, transfromDateString } from "@utils/Helpers";

export default function UserTable() {
  const navigate = useNavigate();
  const users = UserListService.getData();
  const userFilter = UserListService.getFilter();
  const isLoading = UserListService.getIsLoading();
  const tableRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  function navigatePagination(page: number) {
    tableRef.current!.scrollIntoView({ block: "start", behavior: "smooth" });
    UserListService.loadUserList(userFilter?.q, userFilter?.status, userFilter?.start_date, userFilter?.end_date, page, userFilter?.order_by);
  }

  return (
    <Box ref={tableRef}>
      {isLoading == true ? (
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      ) : null}
      <Table $isLoading={isLoading}>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Email</Th>
            <Th>Nickname</Th>
            <Th>First name</Th>
            <Th>Last name</Th>
            <Th>Status</Th>
            <Th>Created At</Th>
            <Th>Updated At</Th>
          </tr>
        </thead>
        <Tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => navigate(`/backoffice/user/${user.id}`)}>
              <Td>{user.id}</Td>
              <Td>{user.email}</Td>
              <Td>{user.nick_name}</Td>
              <Td>{user.first_name}</Td>
              <Td>{user.last_name}</Td>
              <Td>
                <StatusBox $bgcolor={transformBgColorStatus(user.status)}>{transformStatus(user.status)}</StatusBox>
              </Td>
              <Td>{transfromDateString(user.created_at)}</Td>
              <Td>{transfromDateString(user.updated_at)}</Td>
            </tr>
          ))}
        </Tbody>
      </Table>
      <UserListPagination navigatePagination={navigatePagination} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  min-height: 500px;
  margin: 20px 0 0 0;

  position: relative;
  z-index: 1;
`;

const BoxLoading = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -30%);
  z-index: 99;
  opacity: 1;
  /* background-color: rgba(255, 223, 223, 0.35); */
`;

const Table = styled.table<{ $isLoading: boolean }>`
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;

  opacity: ${(props) => (props.$isLoading ? 0.5 : 1)};
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
      cursor: pointer;

      td {
        background-color: #f3f3f3;
      }
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

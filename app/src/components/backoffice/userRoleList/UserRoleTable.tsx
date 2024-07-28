import { MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import Loading from "@components/backoffice/Loading";
import UserRoleListPagination from "@components/backoffice/userRoleList/UserRoleListPagination";
import UserRoleListService from "@services/backoffice/UserRoleListService";
import { transfromDateString } from "@utils/Helpers";

export default function UserRoleTable() {
  const navigate = useNavigate();
  const userRoles = UserRoleListService.getData();
  const isLoading = UserRoleListService.getIsLoading();
  const tableRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  function navigatePagination(page: number) {
    tableRef.current!.scrollIntoView({ block: "start", behavior: "smooth" });
    UserRoleListService.loadUserRoleList(page);
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
            <Th>Name</Th>
            <Th>Description</Th>
            <Th># Users</Th>
            <Th>Created At</Th>
            <Th>Updated At</Th>
          </tr>
        </thead>
        <Tbody>
          {userRoles.map((userRole) => (
            <tr key={userRole.id} onClick={() => navigate(`/backoffice/user-role/${userRole.id}`)}>
              <Td>{userRole.id}</Td>
              <Td>{userRole.name}</Td>
              <Td>{userRole.description}</Td>
              <Td>{userRole.total_user}</Td>
              <Td>{transfromDateString(userRole.created_at)}</Td>
              <Td>{transfromDateString(userRole.updated_at)}</Td>
            </tr>
          ))}
        </Tbody>
      </Table>
      <UserRoleListPagination navigatePagination={navigatePagination} />
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

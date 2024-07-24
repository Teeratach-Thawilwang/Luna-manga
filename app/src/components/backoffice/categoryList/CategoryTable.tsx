import { MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import Loading from "@components/backoffice/Loading";
import CategoryListPagination from "@components/backoffice/categoryList/CategoryListPagination";
import CategoryListService from "@services/backoffice/CategoryListService";
import { transformBgColorStatus, transformStatus, transfromDateString } from "@utils/Helpers";

export default function CategoryTable() {
  const navigate = useNavigate();
  const categorys = CategoryListService.getData();
  const categoryFilter = CategoryListService.getFilter();
  const isLoading = CategoryListService.getIsLoading();
  const tableRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  function navigatePagination(page: number) {
    tableRef.current!.scrollIntoView({ block: "start", behavior: "smooth" });
    CategoryListService.loadCategoryList(
      categoryFilter?.q,
      categoryFilter?.status,
      categoryFilter?.type,
      categoryFilter?.start_date,
      categoryFilter?.end_date,
      page,
      categoryFilter?.order_by,
    );
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
            <Th>Total Story</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th>Created At</Th>
            <Th>Updated At</Th>
          </tr>
        </thead>
        <Tbody>
          {categorys.map((category) => (
            <tr key={category.id} onClick={() => navigate(`/backoffice/category/${category.id}`)}>
              <Td>{category.id}</Td>
              <Td>{category.name}</Td>
              <Td>{category.total_story}</Td>
              <Td>{category.type}</Td>
              <Td>
                <StatusBox $bgcolor={transformBgColorStatus(category.status)}>{transformStatus(category.status)}</StatusBox>
              </Td>
              <Td>{transfromDateString(category.created_at)}</Td>
              <Td>{transfromDateString(category.updated_at)}</Td>
            </tr>
          ))}
        </Tbody>
      </Table>
      <CategoryListPagination navigatePagination={navigatePagination} />
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

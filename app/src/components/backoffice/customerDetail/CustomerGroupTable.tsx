import styled from "styled-components";

import TrashIcon from "@components/iconSvg/TrashIcon";
import { CustomerGroupListInterface } from "@interfaces/backoffice/CustomerGroupInterface";
import CustomerEditService from "@services/backoffice/CustomerEditService";
import { transformBgColorStatus, transformStatus } from "@utils/Helpers";

export default function CustomerGroupTable() {
  const customerGroup = CustomerEditService.getter<CustomerGroupListInterface>("customer_group");

  function onDeleteHandle() {
    CustomerEditService.update({ customer_group: null });
  }

  if (customerGroup == null) {
    return null;
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>Id</Th>
          <Th>Name</Th>
          <Th>Customer</Th>
          <Th>Status</Th>
          <Th></Th>
        </tr>
      </thead>
      <Tbody>
        <tr>
          <Td>{customerGroup.id}</Td>
          <Td>{customerGroup.name}</Td>
          <Td>{customerGroup.total_customer}</Td>
          <Td>
            <StatusBox $bgcolor={transformBgColorStatus(customerGroup.status)}>{transformStatus(customerGroup.status)}</StatusBox>
          </Td>
          <Td>
            <div>
              <IconBox onClick={onDeleteHandle}>
                <TrashIcon />
              </IconBox>
            </div>
          </Td>
        </tr>
      </Tbody>
    </Table>
  );
}

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

import styled from "styled-components";

import CustomerReportListService from "@services/backoffice/CustomerReportListService";

export default function SearchBox() {
  const customerReportFilter = CustomerReportListService.getFilter();

  function onSearchHandle(e: any) {
    e.preventDefault();

    if (customerReportFilter?.q == undefined || customerReportFilter?.q == "") {
      return;
    }

    CustomerReportListService.loadCustomerReportList(
      customerReportFilter?.q,
      customerReportFilter?.group,
      customerReportFilter?.source,
      customerReportFilter.is_accept,
      customerReportFilter?.start_date,
      customerReportFilter?.end_date,
      1,
      customerReportFilter?.order_by,
    );
  }

  return (
    <Box onSubmit={(e) => onSearchHandle(e)}>
      <SearchInput
        type="text"
        name="q"
        placeholder="ค้นหาด้วย Id, Customer Id (Reporter), Story Id, Chapter Id, Post Id or Comment Id"
        autoComplete="nope"
        value={customerReportFilter?.q ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => CustomerReportListService.updateFilter({ q: e.target.value })}
      />
      <SearchButton onClick={(e) => onSearchHandle(e)}>Search</SearchButton>
    </Box>
  );
}

const Box = styled.form`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 50px;

  display: flex;
  flex-grow: 1;
`;

const SearchInput = styled.input`
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  padding-left: 20px;

  height: 50px;
  flex-grow: 1;

  font-size: 18px;
  font-weight: normal;
  color: #000000;
  background-color: #ffffff;

  &::placeholder {
    color: #787878;
  }
`;

const SearchButton = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: 5px;
  height: 50px;
  width: 125px;
  margin-left: 20px;

  font-size: 20px;
  color: #fff;
  background-color: #424b51;

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;

  &:hover {
    background-color: #576269;
    cursor: pointer;
  }

  &:active {
    background-color: #4d575e;
  }
`;

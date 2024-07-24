import styled from "styled-components";

import CustomerGroupListService from "@services/backoffice/CustomerGroupListService";

export default function SearchBox() {
  const customerGroupFilter = CustomerGroupListService.getFilter();

  function onSearchHandle(e: any) {
    e.preventDefault();

    if (customerGroupFilter?.q == undefined || customerGroupFilter?.q == "") {
      return;
    }

    CustomerGroupListService.loadCustomerGroupList(
      customerGroupFilter?.q,
      customerGroupFilter?.status,
      customerGroupFilter?.start_date,
      customerGroupFilter?.end_date,
      1,
      customerGroupFilter?.order_by,
    );
  }

  return (
    <Box onSubmit={(e) => onSearchHandle(e)}>
      <SearchInput
        type="text"
        name="q"
        placeholder="ค้นหาด้วย Customer Group Id, Customer Group Name"
        autoComplete="nope"
        value={customerGroupFilter?.q ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => CustomerGroupListService.updateFilter({ q: e.target.value })}
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

  &:hover {
    background-color: #576269;
    cursor: pointer;
  }

  &:active {
    background-color: #4d575e;
  }
`;

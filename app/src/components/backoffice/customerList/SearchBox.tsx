import styled from "styled-components";

import CustomerListService from "@services/backoffice/CustomerListService";

export default function SearchBox() {
  const customerFilter = CustomerListService.getFilter();

  function onSearchHandle(e: any) {
    e.preventDefault();

    if (customerFilter?.q == undefined || customerFilter?.q == "") {
      return;
    }

    CustomerListService.loadCustomerList(
      customerFilter?.q,
      customerFilter?.status,
      customerFilter?.start_date,
      customerFilter?.end_date,
      1,
      customerFilter?.order_by,
    );
  }

  return (
    <Box onSubmit={(e) => onSearchHandle(e)}>
      <SearchInput
        type="text"
        name="q"
        placeholder="ค้นหาด้วย Customer Id, Email, First name"
        autoComplete="nope"
        value={customerFilter?.q ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => CustomerListService.updateFilter({ q: e.target.value })}
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

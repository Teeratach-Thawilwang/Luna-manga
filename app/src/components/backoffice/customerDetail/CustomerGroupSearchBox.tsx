import { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import CustomerGroupSearchListItem from "@components/backoffice/customerDetail/CustomerGroupSearchListItem";
import SearchLoading from "@components/backoffice/customerDetail/SearchLoading";
import CustomerGroupListService from "@services/backoffice/CustomerGroupListService";
import { useDebounce } from "@utils/Hooks";

export default function CustomerGroupSearchBox() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const customerGroupFilter = CustomerGroupListService.getFilter();
  const customerGroupSearch = CustomerGroupListService.getData();
  const customerGroupSearchIsLoading = CustomerGroupListService.getIsLoading();
  const debouncedSearch = useDebounce(customerGroupFilter?.q);

  useEffect(() => {
    if (customerGroupFilter?.q == undefined || customerGroupFilter?.q == "") {
      setIsDropdownOpen(false);
      return;
    }

    CustomerGroupListService.loadCustomerGroupList(
      customerGroupFilter?.q,
      customerGroupFilter?.status,
      customerGroupFilter?.start_date,
      customerGroupFilter?.end_date,
      1,
      customerGroupFilter?.order_by,
      5,
    );
  }, [debouncedSearch]);

  useEffect(() => {
    if (customerGroupSearchIsLoading) {
      setIsDropdownOpen(true);
    }

    if (customerGroupSearch.length >= 0) {
      setIsDropdownOpen(true);
    }
  }, [customerGroupSearchIsLoading]);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    CustomerGroupListService.updateFilter({ q: event.target.value });
  }

  return (
    <SearchBox $isOpen={isDropdownOpen} $itemCount={customerGroupSearchIsLoading ? 1 : customerGroupSearch.length}>
      <SearchInput
        type="text"
        name="q"
        placeholder="ค้นหาด้วย Customer Group Id, Customer Group Name"
        autoComplete="nope"
        value={customerGroupFilter?.q ?? ""}
        onChange={onChangeHandle}
      />
      {isDropdownOpen ? <SearchLine /> : null}
      {customerGroupSearchIsLoading ? <SearchLoading /> : null}
      {!customerGroupSearchIsLoading ? <CustomerGroupSearchListItem /> : null}
    </SearchBox>
  );
}

const SearchBox = styled.form<{ $isOpen: boolean; $itemCount: number }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: ${(props) => (props.$isOpen ? `calc(50px * ${props.$itemCount} + 50px + 2px)` : "50px")};
  flex-grow: 1;

  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  overflow: hidden;

  color: #000000;
  background-color: #ffffff;
`;

const SearchInput = styled.input`
  /* border: 1px solid #bdbdbd; */
  border: 0px;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  padding-left: 20px;

  width: 100%;
  height: 50px;
  flex-grow: 1;

  font-size: 18px;
  font-weight: normal;
  color: #000000;
  background-color: transparent;
  /* background-color: #ffffff; */

  &::placeholder {
    color: #787878;
  }
`;

const SearchLine = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  height: 2px;
  width: 95%;
  margin: 0 auto 0 auto;
  background-color: #3ba539;
`;

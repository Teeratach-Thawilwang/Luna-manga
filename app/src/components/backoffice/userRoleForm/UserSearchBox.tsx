import { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import SearchLoading from "@components/backoffice/userRoleForm/SearchLoading";
import UserSearchListItem from "@components/backoffice/userRoleForm/UserSearchListItem";
import UserListService from "@services/backoffice/UserListService";
import { useDebounce } from "@utils/Hooks";

export default function UserSearchBox() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userFilter = UserListService.getFilter();
  const userSearch = UserListService.getData();
  const userSearchIsLoading = UserListService.getIsLoading();
  const debouncedSearch = useDebounce(userFilter?.q);

  useEffect(() => {
    if (userFilter?.q == undefined || userFilter?.q == "") {
      setIsDropdownOpen(false);
      return;
    }

    UserListService.loadUserList(userFilter?.q, userFilter?.status, userFilter?.start_date, userFilter?.end_date, 1, userFilter?.order_by, 5);
  }, [debouncedSearch]);

  useEffect(() => {
    if (userSearchIsLoading) {
      setIsDropdownOpen(true);
    }

    if (userSearch.length >= 0) {
      setIsDropdownOpen(true);
    }
  }, [userSearchIsLoading]);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    UserListService.updateFilter({ q: event.target.value });
  }

  return (
    <SearchBox $isOpen={isDropdownOpen} $itemCount={userSearchIsLoading ? 1 : userSearch.length}>
      <SearchInput
        type="text"
        name="q"
        placeholder="ค้นหาด้วย User Id, User Name"
        autoComplete="nope"
        value={userFilter?.q ?? ""}
        onChange={onChangeHandle}
      />
      {isDropdownOpen ? <SearchLine /> : null}
      {userSearchIsLoading ? <SearchLoading /> : null}
      {!userSearchIsLoading ? <UserSearchListItem /> : null}
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

import { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import SearchLoading from "@components/backoffice/bannerForm/SearchLoading";
import StorySearchListItem from "@components/backoffice/bannerForm/StorySearchListItem";
import StoryListService from "@services/backoffice/StoryListService";
import { useDebounce } from "@utils/Hooks";

export default function StorySearchBox() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const storyFilter = StoryListService.getFilter();
  const storySearch = StoryListService.getData();
  const storySearchIsLoading = StoryListService.getIsLoading();
  const debouncedSearch = useDebounce(storyFilter?.q);

  useEffect(() => {
    if (storyFilter?.q == undefined || storyFilter?.q == "") {
      setIsDropdownOpen(false);
      return;
    }

    StoryListService.loadStoryList(
      storyFilter?.q,
      storyFilter?.status,
      storyFilter?.start_date,
      storyFilter?.end_date,
      undefined,
      1,
      storyFilter?.order_by,
      5,
    );
  }, [debouncedSearch]);

  useEffect(() => {
    if (storySearchIsLoading) {
      setIsDropdownOpen(true);
    }

    if (storySearch.length >= 0) {
      setIsDropdownOpen(true);
    }
  }, [storySearchIsLoading]);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    StoryListService.updateFilter({ q: event.target.value });
  }

  return (
    <SearchBox $isOpen={isDropdownOpen} $itemCount={storySearchIsLoading ? 1 : storySearch.length}>
      <SearchInput
        type="text"
        name="q"
        placeholder="ค้นหาด้วย Story Id, Story Name"
        autoComplete="nope"
        value={storyFilter?.q ?? ""}
        onChange={onChangeHandle}
      />
      {isDropdownOpen ? <SearchLine /> : null}
      {storySearchIsLoading ? <SearchLoading /> : null}
      {!storySearchIsLoading ? <StorySearchListItem /> : null}
    </SearchBox>
  );
}

const SearchBox = styled.div<{ $isOpen: boolean; $itemCount: number }>`
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

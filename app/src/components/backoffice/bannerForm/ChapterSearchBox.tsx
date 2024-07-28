import { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import ChapterSearchListItem from "@components/backoffice/bannerForm/ChapterSearchListItem";
import SearchLoading from "@components/backoffice/bannerForm/SearchLoading";
import ChapterListService from "@services/backoffice/ChapterListService";
import { useDebounce } from "@utils/Hooks";

export default function ChapterSearchBox() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const chapterFilter = ChapterListService.getFilter();
  const chapterSearch = ChapterListService.getData();
  const chapterSearchIsLoading = ChapterListService.getIsLoading();
  const debouncedSearch = useDebounce(chapterFilter?.q);

  useEffect(() => {
    if (chapterFilter?.q == undefined || chapterFilter?.q == "") {
      setIsDropdownOpen(false);
      return;
    }

    ChapterListService.loadChapterList(
      chapterFilter?.q,
      chapterFilter?.status,
      chapterFilter?.start_date,
      chapterFilter?.end_date,
      undefined,
      1,
      chapterFilter?.order_by,
      5,
    );
  }, [debouncedSearch]);

  useEffect(() => {
    if (chapterSearchIsLoading) {
      setIsDropdownOpen(true);
    }

    if (chapterSearch.length >= 0) {
      setIsDropdownOpen(true);
    }
  }, [chapterSearchIsLoading]);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    ChapterListService.updateFilter({ q: event.target.value });
  }

  return (
    <SearchBox $isOpen={isDropdownOpen} $itemCount={chapterSearchIsLoading ? 1 : chapterSearch.length}>
      <SearchInput
        type="text"
        name="q"
        placeholder="ค้นหาด้วย Chapter Id, Chapter Name"
        autoComplete="nope"
        value={chapterFilter?.q ?? ""}
        onChange={onChangeHandle}
      />
      {isDropdownOpen ? <SearchLine /> : null}
      {chapterSearchIsLoading ? <SearchLoading /> : null}
      {!chapterSearchIsLoading ? <ChapterSearchListItem /> : null}
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

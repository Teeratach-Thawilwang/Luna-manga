import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import CategorySearchListItem from "@components/backoffice/storyForm/CategorySearchListItem";
import SearchLoading from "@components/backoffice/storyForm/SearchLoading";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import CategoryListService from "@services/backoffice/CategoryListService";
import { useDebounce } from "@utils/Hooks";

export default function CategorySearchBox() {
  const { type: slug } = useParams();
  const type = slug! as CategoryTypeEnum;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categoryFilter = CategoryListService.getFilter();
  const categorySearch = CategoryListService.getData();
  const categorySearchIsLoading = CategoryListService.getIsLoading();
  const debouncedSearch = useDebounce(categoryFilter?.q);

  useEffect(() => {
    if (categoryFilter?.q == undefined || categoryFilter?.q == "") {
      setIsDropdownOpen(false);
      return;
    }

    CategoryListService.loadCategoryList(
      categoryFilter?.q,
      categoryFilter?.status,
      type,
      categoryFilter?.start_date,
      categoryFilter?.end_date,
      1,
      categoryFilter?.order_by,
      5,
    );
  }, [debouncedSearch]);

  useEffect(() => {
    if (categorySearchIsLoading) {
      setIsDropdownOpen(true);
    }

    if (categorySearch.length >= 0) {
      setIsDropdownOpen(true);
    }
  }, [categorySearchIsLoading]);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    CategoryListService.updateFilter({ q: event.target.value });
  }

  return (
    <SearchBox $isOpen={isDropdownOpen} $itemCount={categorySearchIsLoading ? 1 : categorySearch.length}>
      <SearchInput
        type="text"
        name="q"
        placeholder="ค้นหาด้วย Category Id, Category Name"
        autoComplete="nope"
        value={categoryFilter?.q ?? ""}
        onChange={onChangeHandle}
      />
      {isDropdownOpen ? <SearchLine /> : null}
      {categorySearchIsLoading ? <SearchLoading /> : null}
      {!categorySearchIsLoading ? <CategorySearchListItem /> : null}
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

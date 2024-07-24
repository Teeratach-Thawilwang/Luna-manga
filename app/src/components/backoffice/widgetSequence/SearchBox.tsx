import { useEffect, useState } from "react";

import styled from "styled-components";

import SearchListItem from "@components/backoffice/widgetSequence/SearchListItem";
import SearchLoading from "@components/backoffice/widgetSequence/SearchLoading";
import WidgetListService from "@services/backoffice/WidgetListService";
import { useDebounce } from "@utils/Hooks";

export default function SearchBox() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const widgetFilter = WidgetListService.getFilter();
  const widgetsSearch = WidgetListService.getData();
  const widgetSearchIsLoading = WidgetListService.getIsLoading();
  const debouncedSearch = useDebounce(widgetFilter?.q);

  useEffect(() => {
    if (widgetFilter?.q == undefined || widgetFilter?.q == "") {
      setIsDropdownOpen(false);
      return;
    }
    WidgetListService.loadWidgetList(
      widgetFilter?.q,
      widgetFilter?.status,
      widgetFilter?.type,
      widgetFilter?.start_date,
      widgetFilter?.end_date,
      1,
      widgetFilter?.order_by,
      5,
    );
  }, [debouncedSearch]);

  useEffect(() => {
    if (widgetSearchIsLoading) {
      setIsDropdownOpen(true);
    }

    if (widgetsSearch.length >= 0) {
      setIsDropdownOpen(true);
    }
  }, [widgetSearchIsLoading]);

  return (
    <Box $isOpen={isDropdownOpen} $itemCount={widgetSearchIsLoading ? 1 : widgetsSearch.length}>
      <SearchInput
        type="text"
        name="q"
        placeholder="ค้นหาด้วย Widget Id, Widget Name"
        autoComplete="nope"
        value={widgetFilter?.q ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => WidgetListService.updateFilter({ q: e.target.value })}
      />
      {isDropdownOpen ? <SearchLine /> : null}
      {widgetSearchIsLoading ? <SearchLoading /> : null}
      {!widgetSearchIsLoading ? <SearchListItem /> : null}
    </Box>
  );
}

const Box = styled.form<{ $isOpen: boolean; $itemCount: number }>`
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

import { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import BannerSearchListItem from "@components/backoffice/widgetForm/BannerSearchListItem";
import SearchLoading from "@components/backoffice/widgetForm/SearchLoading";
import { WidgetTypeEnum } from "@enums/backoffice/WidgetTypeEnum";
import BannerListService from "@services/backoffice/BannerListService";
import WidgetCreateEditService from "@services/backoffice/WidgetCreateEditService";
import { useDebounce } from "@utils/Hooks";
import { getBannerTypeFromWidgetType } from "@utils/WidgetCreateUpdateHelpers";

export default function BannerSearchBox() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const widgetType = WidgetCreateEditService.getter<WidgetTypeEnum | null>("type");
  const type = getBannerTypeFromWidgetType(widgetType);
  const bannerFilter = BannerListService.getFilter();
  const bannerSearch = BannerListService.getData();
  const bannerSearchIsLoading = BannerListService.getIsLoading();
  const debouncedSearch = useDebounce(bannerFilter?.q);

  useEffect(() => {
    if (bannerFilter?.q == undefined || bannerFilter?.q == "") {
      setIsDropdownOpen(false);
      return;
    }

    BannerListService.loadBannerList(
      bannerFilter?.q,
      bannerFilter?.status,
      type,
      bannerFilter?.start_date,
      bannerFilter?.end_date,
      1,
      bannerFilter?.order_by,
      5,
    );
  }, [debouncedSearch]);

  useEffect(() => {
    if (bannerSearchIsLoading) {
      setIsDropdownOpen(true);
    }

    if (bannerSearch.length >= 0) {
      setIsDropdownOpen(true);
    }
  }, [bannerSearchIsLoading]);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    BannerListService.updateFilter({ q: event.target.value });
  }

  return (
    <SearchBox $isOpen={isDropdownOpen} $itemCount={bannerSearchIsLoading ? 1 : bannerSearch.length}>
      <SearchInput
        type="text"
        name="q"
        placeholder="ค้นหาด้วย Banner Id, Banner Name"
        autoComplete="nope"
        value={bannerFilter?.q ?? ""}
        onChange={onChangeHandle}
      />
      {isDropdownOpen ? <SearchLine /> : null}
      {bannerSearchIsLoading ? <SearchLoading /> : null}
      {!bannerSearchIsLoading ? <BannerSearchListItem /> : null}
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

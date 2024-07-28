import { useParams } from "react-router-dom";

import styled from "styled-components";

import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import StoryListService from "@services/backoffice/StoryListService";

export default function SearchBox() {
  const { type: slug } = useParams();
  const type = slug! as CategoryTypeEnum;
  const mangaFilter = StoryListService.getFilter();

  function onSearchHandle(e: any) {
    e.preventDefault();

    if (mangaFilter?.q == undefined || mangaFilter?.q == "") {
      return;
    }

    StoryListService.loadStoryList(
      mangaFilter?.q,
      mangaFilter?.status,
      mangaFilter?.start_date,
      mangaFilter?.end_date,
      type,
      1,
      mangaFilter?.order_by,
    );
  }

  return (
    <Box onSubmit={(e) => onSearchHandle(e)}>
      <SearchInput
        type="text"
        name="q"
        placeholder="ค้นหาด้วย Story Id, Story Name"
        autoComplete="nope"
        value={mangaFilter?.q ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => StoryListService.updateFilter({ q: e.target.value })}
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

import styled from "styled-components";

import CreateButton from "@components/backoffice/chapterList/CreateButton";
import FilterEndDate from "@components/backoffice/chapterList/FilterEndDate";
import FilterSortBy from "@components/backoffice/chapterList/FilterSortBy";
import FilterStartDate from "@components/backoffice/chapterList/FilterStartDate";
import FilterStatus from "@components/backoffice/chapterList/FilterStatus";
import SearchBox from "@components/backoffice/chapterList/SearchBox";

export default function ChapterFilter() {
  return (
    <Box>
      <Row>
        <SearchBox />
        <CreateButton />
      </Row>
      <Row>
        <FilterStatus />
        <FilterSortBy />
        <FilterStartDate />
        <FilterEndDate />
      </Row>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

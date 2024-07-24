import styled from "styled-components";

import CreateButton from "@components/backoffice/storyList/CreateButton";
import FilterEndDate from "@components/backoffice/storyList/FilterEndDate";
import FilterSortBy from "@components/backoffice/storyList/FilterSortBy";
import FilterStartDate from "@components/backoffice/storyList/FilterStartDate";
import FilterStatus from "@components/backoffice/storyList/FilterStatus";
import SearchBox from "@components/backoffice/storyList/SearchBox";

export default function StoryFilter() {
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

import styled from "styled-components";

import CreateButton from "@components/backoffice/categoryList/CreateButton";
import FilterEndDate from "@components/backoffice/categoryList/FilterEndDate";
import FilterSortBy from "@components/backoffice/categoryList/FilterSortBy";
import FilterStartDate from "@components/backoffice/categoryList/FilterStartDate";
import FilterStatus from "@components/backoffice/categoryList/FilterStatus";
import SearchBox from "@components/backoffice/categoryList/SearchBox";

export default function CategoryFilter() {
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

import styled from "styled-components";

import FilterEndDate from "@components/backoffice/customerList/FilterEndDate";
import FilterSortBy from "@components/backoffice/customerList/FilterSortBy";
import FilterStartDate from "@components/backoffice/customerList/FilterStartDate";
import FilterStatus from "@components/backoffice/customerList/FilterStatus";
import SearchBox from "@components/backoffice/customerList/SearchBox";

export default function CustomerFilter() {
  return (
    <Box>
      <Row>
        <SearchBox />
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

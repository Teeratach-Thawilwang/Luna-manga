import styled from "styled-components";

import CreateButton from "@components/backoffice/customerGroupList/CreateButton";
import FilterEndDate from "@components/backoffice/customerGroupList/FilterEndDate";
import FilterSortBy from "@components/backoffice/customerGroupList/FilterSortBy";
import FilterStartDate from "@components/backoffice/customerGroupList/FilterStartDate";
import FilterStatus from "@components/backoffice/customerGroupList/FilterStatus";
import SearchBox from "@components/backoffice/customerGroupList/SearchBox";

export default function CustomerGroupFilter() {
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

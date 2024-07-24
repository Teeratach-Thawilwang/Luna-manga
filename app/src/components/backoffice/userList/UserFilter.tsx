import styled from "styled-components";

import CreateButton from "@components/backoffice/userList/CreateButton";
import FilterEndDate from "@components/backoffice/userList/FilterEndDate";
import FilterSortBy from "@components/backoffice/userList/FilterSortBy";
import FilterStartDate from "@components/backoffice/userList/FilterStartDate";
import FilterStatus from "@components/backoffice/userList/FilterStatus";
import SearchBox from "@components/backoffice/userList/SearchBox";

export default function UserFilter() {
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

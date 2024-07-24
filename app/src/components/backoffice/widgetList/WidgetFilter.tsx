import styled from "styled-components";

import CreateButton from "@components/backoffice/widgetList/CreateButton";
import FilterEndDate from "@components/backoffice/widgetList/FilterEndDate";
import FilterSortBy from "@components/backoffice/widgetList/FilterSortBy";
import FilterStartDate from "@components/backoffice/widgetList/FilterStartDate";
import FilterStatus from "@components/backoffice/widgetList/FilterStatus";
import FilterType from "@components/backoffice/widgetList/FilterType";
import SearchBox from "@components/backoffice/widgetList/SearchBox";

export default function WidgetFilter() {
  return (
    <Box>
      <Row>
        <SearchBox />
        <CreateButton />
      </Row>
      <Row>
        <FilterStatus />
        <FilterType />
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

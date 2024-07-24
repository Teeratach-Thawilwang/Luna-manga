import styled from "styled-components";

import FilterEndDate from "@components/backoffice/customerReportList/FilterEndDate";
import FilterGroup from "@components/backoffice/customerReportList/FilterGroup";
import FilterIsAccept from "@components/backoffice/customerReportList/FilterIsAccept";
import FilterSortBy from "@components/backoffice/customerReportList/FilterSortBy";
import FilterSource from "@components/backoffice/customerReportList/FilterSource";
import FilterStartDate from "@components/backoffice/customerReportList/FilterStartDate";
import SearchBox from "@components/backoffice/customerReportList/SearchBox";

export default function CustomerReportFilter() {
  return (
    <Box>
      <Row>
        <SearchBox />
      </Row>
      <Row>
        <FilterGroup />
        <FilterSource />
        <FilterSortBy />
        <FilterIsAccept />
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

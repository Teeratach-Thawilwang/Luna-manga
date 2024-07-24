import styled from "styled-components";

import CreateButton from "@components/backoffice/bannerList/CreateButton";
import FilterEndDate from "@components/backoffice/bannerList/FilterEndDate";
import FilterSortBy from "@components/backoffice/bannerList/FilterSortBy";
import FilterStartDate from "@components/backoffice/bannerList/FilterStartDate";
import FilterStatus from "@components/backoffice/bannerList/FilterStatus";
import FilterType from "@components/backoffice/bannerList/FilterType";
import SearchBox from "@components/backoffice/bannerList/SearchBox";

export default function BannerFilter() {
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

import styled from "styled-components";

import Header from "@components/backoffice/Header";
import BannerFilter from "@components/backoffice/bannerList/BannerFilter";
import BannerTable from "@components/backoffice/bannerList/BannerTable";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="Banner List" />
      <Content>
        <BannerFilter />
        <BannerTable />
      </Content>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  min-width: 750px;
`;

const Content = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  /* min-width: 750px; */

  margin: 20px 20px 20px 20px;
`;

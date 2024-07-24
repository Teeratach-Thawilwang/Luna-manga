import styled from "styled-components";

import Header from "@components/backoffice/Header";
import CustomerReportFilter from "@components/backoffice/customerReportList/CustomerReportFilter";
import CustomerReportTable from "@components/backoffice/customerReportList/CustomerReportTable";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="Customer Report List" />
      <Content>
        <CustomerReportFilter />
        <CustomerReportTable />
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

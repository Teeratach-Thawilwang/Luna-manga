import styled from "styled-components";

import Header from "@components/backoffice/Header";
import CustomerGroupFilter from "@components/backoffice/customerGroupList/CustomerGroupFilter";
import CustomerGroupTable from "@components/backoffice/customerGroupList/CustomerGroupTable";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="Customer Group List" />
      <Content>
        <CustomerGroupFilter />
        <CustomerGroupTable />
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

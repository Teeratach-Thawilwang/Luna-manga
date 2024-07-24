import styled from "styled-components";

import Header from "@components/backoffice/Header";
import CustomerFilter from "@components/backoffice/customerList/CustomerFilter";
import CustomerTable from "@components/backoffice/customerList/CustomerTable";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="Customer List" />
      <Content>
        <CustomerFilter />
        <CustomerTable />
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

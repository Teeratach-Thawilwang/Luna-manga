import styled from "styled-components";

import Header from "@components/backoffice/Header";
import CategoryFilter from "@components/backoffice/categoryList/CategoryFilter";
import CategoryTable from "@components/backoffice/categoryList/CategoryTable";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="Category List" />
      <Content>
        <CategoryFilter />
        <CategoryTable />
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

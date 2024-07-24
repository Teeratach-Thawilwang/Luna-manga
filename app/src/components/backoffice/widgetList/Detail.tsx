import styled from "styled-components";

import Header from "@components/backoffice/Header";
import WidgetFilter from "@components/backoffice/widgetList/WidgetFilter";
import WidgetTable from "@components/backoffice/widgetList/WidgetTable";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="Widget List" />
      <Content>
        <WidgetFilter />
        <WidgetTable />
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

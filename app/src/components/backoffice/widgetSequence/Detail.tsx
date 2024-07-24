import styled from "styled-components";

import Header from "@components/backoffice/Header";
import FooterControl from "@components/backoffice/widgetSequence/FooterControl";
import SearchBox from "@components/backoffice/widgetSequence/SearchBox";
import WidgetTable from "@components/backoffice/widgetSequence/WidgetTable";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="Widget Sequence" />
      <Content>
        <SearchBox />
        <WidgetTable />
      </Content>
      <Space />
      <FooterControl />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  min-width: 750px;

  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  /* min-width: 750px; */

  margin: 20px 20px 20px 20px;
`;

const Space = styled.div`
  flex-grow: 1;
  margin: auto 0 auto 0;
`;

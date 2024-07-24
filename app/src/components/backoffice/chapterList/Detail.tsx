import styled from "styled-components";

import Header from "@components/backoffice/Header";
import ChapterFilter from "@components/backoffice/chapterList/ChapterFilter";
import ChapterTable from "@components/backoffice/chapterList/ChapterTable";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="Chapter List" />
      <Content>
        <ChapterFilter />
        <ChapterTable />
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

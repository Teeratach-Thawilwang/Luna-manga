import styled from "styled-components";

import Header from "@components/backoffice/Header";
import StoryFilter from "@components/backoffice/storyList/StoryFilter";
import StoryTable from "@components/backoffice/storyList/StoryTable";

export default function Detail({ title }: { title: string }) {
  return (
    <Box>
      <Header headerTitle={`${title} List`} />
      <Content>
        <StoryFilter />
        <StoryTable />
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

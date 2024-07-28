import styled from "styled-components";

import Header from "@components/backoffice/Header";
import Loading from "@components/backoffice/Loading";
import FooterControl from "@components/backoffice/storyDetail/FooterControl";
import InputCategories from "@components/backoffice/storyForm/InputCategories";
import InputCoverImage from "@components/backoffice/storyForm/InputCoverImage";
import InputDescription from "@components/backoffice/storyForm/InputDescription";
import InputName from "@components/backoffice/storyForm/InputName";
import InputSlug from "@components/backoffice/storyForm/InputSlug";
import InputStatus from "@components/backoffice/storyForm/InputStatus";
import InputType from "@components/backoffice/storyForm/InputType";
import StoryService from "@services/backoffice/StoryService";

export default function Detail() {
  const story = StoryService.getStory();

  if (story == null) {
    return (
      <Box>
        <Header headerTitle="Story Detail" />
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      </Box>
    );
  }

  return (
    <Box>
      <Header headerTitle="Story Detail" />
      <Content>
        <InputCoverImage initial={story.cover_image[0]} />
        <InputName initial={story.name} />
        <InputSlug />
        <InputType initial={story.type} />
        <InputStatus initial={story.status} />
        <InputDescription initial={story.description} />
        <InputCategories initial={story.categories} />
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

const BoxLoading = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  flex-grow: 1;
  /* min-height: calc(100vh - 60px - 150px); */

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.form`
  /* border: 1px solid red; */
  box-sizing: border-box;
  /* min-width: 750px; */

  margin: 20px 20px 20px 20px;
`;

const Space = styled.div`
  flex-grow: 1;
  margin: auto 0 auto 0;
`;

import { useEffect } from "react";

import styled from "styled-components";

import StorySearchBox from "@components/backoffice/bannerForm/StorySearchBox";
import StoryTable from "@components/backoffice/bannerForm/StoryTable";
import { StoryListInterface } from "@interfaces/backoffice/StoryInterface";
import BannerCreateEditService from "@services/backoffice/BannerCreateEditService";

export default function InputStory({ initial }: { initial?: StoryListInterface }) {
  const story = BannerCreateEditService.getter<StoryListInterface | null>("story");
  const element = getElement(story);

  useEffect(() => {
    if (initial) {
      BannerCreateEditService.update({ story: initial });
    }
  }, []);

  const errorMessage = BannerCreateEditService.getter<string>("story_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  return (
    <Box>
      <Title>Story</Title>
      {element}
      {errorMessageElement}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  margin-top: 20px;
`;

const Title = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 50px;
  font-weight: 500;
  font-size: 20px;
  color: #505050;

  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 5px;

  font-size: 16px;
  color: #ff0000;
`;

function getElement(story: StoryListInterface | null) {
  if (story == null) {
    return <StorySearchBox />;
  }

  return <StoryTable />;
}

function getErrorMessageElement(error: string) {
  if (error == "") {
    return null;
  }
  return <ErrorMessage>{error}</ErrorMessage>;
}

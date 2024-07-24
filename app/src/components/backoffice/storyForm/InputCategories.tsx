import { useEffect } from "react";

import styled from "styled-components";

import CategorySearchBox from "@components/backoffice/storyForm/CategorySearchBox";
import CategoryTable from "@components/backoffice/storyForm/CategoryTable";
import { CategoryListInterface } from "@interfaces/backoffice/CategoryInterface";
import StoryCreateEditService from "@services/backoffice/StoryCreateEditService";

export default function InputCategories({ initial }: { initial?: CategoryListInterface[] }) {
  useEffect(() => {
    if (initial) {
      StoryCreateEditService.update({ categories: initial });
    }
  }, []);

  const errorMessage = StoryCreateEditService.getter<string>("categories_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  return (
    <Box>
      <Title>Categories</Title>
      <CategorySearchBox />
      <CategoryTable />
      {errorMessageElement}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  margin-top: 20px;
  margin-bottom: 20px;
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

function getErrorMessageElement(error: string) {
  if (error == "") {
    return null;
  }
  return <ErrorMessage>{error}</ErrorMessage>;
}

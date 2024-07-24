import { useEffect } from "react";

import styled from "styled-components";

import ChapterSearchBox from "@components/backoffice/bannerForm/ChapterSearchBox";
import ChapterTable from "@components/backoffice/bannerForm/ChapterTable";
import { ChapterListInterface } from "@interfaces/backoffice/ChapterInterface";
import BannerCreateEditService from "@services/backoffice/BannerCreateEditService";

export default function InputChapter({ initial }: { initial?: ChapterListInterface }) {
  const chapter = BannerCreateEditService.getter<ChapterListInterface | null>("chapter");
  const element = getElement(chapter);

  useEffect(() => {
    if (initial) {
      BannerCreateEditService.update({ chapter: initial });
    }
  }, []);

  const errorMessage = BannerCreateEditService.getter<string>("chapter_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  return (
    <Box>
      <Title>Chapter</Title>
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

function getElement(chapter: ChapterListInterface | null) {
  if (chapter == null) {
    return <ChapterSearchBox />;
  }

  return <ChapterTable />;
}

function getErrorMessageElement(error: string) {
  if (error == "") {
    return null;
  }
  return <ErrorMessage>{error}</ErrorMessage>;
}

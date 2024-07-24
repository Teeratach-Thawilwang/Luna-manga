import { useEffect, useState } from "react";

import styled from "styled-components";

import RichTextEditor from "@components/backoffice/richTextEditor/RichTextEditor";
import { TextEditorElement } from "@interfaces/EditorInterface";
import ChapterCreateEditService from "@services/backoffice/ChapterCreateEditService";
import { loadFontForNovel } from "@utils/Helpers";
import { useDebounce } from "@utils/Hooks";

export default function InputText({ initial }: { initial?: TextEditorElement[] }) {
  const [data, setData] = useState<TextEditorElement[]>(initial ? initial : []);
  const dataDebounce = useDebounce(data);

  const errorMessage = ChapterCreateEditService.getter<string>("text_editor_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  useEffect(() => {
    loadFontForNovel();
  }, []);

  useEffect(() => {
    ChapterCreateEditService.update({ text_editor: dataDebounce });
  }, [dataDebounce]);

  return (
    <Box>
      <Title>Text</Title>
      <RichTextEditor initialData={initial} setData={setData} />
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

function getErrorMessageElement(error: string) {
  if (error == "") {
    return null;
  }
  return <ErrorMessage>{error}</ErrorMessage>;
}
